import { GameType, MTGColor, Prisma, PrismaClient } from '@prisma/client';
import { CardDTO } from '../types/cardDTO';

export class CardRepository
{
    constructor(private prisma: PrismaClient) { }

    async getCardById(id: string)
    {
        return this.prisma.card.findUnique({ where: { id } });
    }

    async upsertCard(data: {
        id: string;
        name: string;
        game: string;
        rarityId: number;
    })
    {
        return this.prisma.card.upsert({
            where: { id: data.id },
            update: {},
            create: {
                id: data.id,
                name: data.name,
                game: data.game as GameType,
                rarityId: data.rarityId,
            },
        });
    }

    async createMany(data: Prisma.CardCreateManyInput[])
    {
        return this.prisma.card.createMany({
            data,
            skipDuplicates: true,
        });
    }

    async getCards(where: Prisma.Sql, limit: number)
    {
        return await this.prisma.$queryRaw<CardDTO[]>(Prisma.sql`
            SELECT card.*, rarity.name as rarity
            FROM card
            JOIN rarity ON card."rarityId" = rarity.id
            ${where}
            LIMIT ${limit}`);
    }
}
