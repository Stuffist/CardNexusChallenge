import { PrismaClient, Prisma } from '@prisma/client';
import { gameFilter } from '../DAL/filters/gameFilter';
import { nameFilter } from '../DAL/filters/nameFilter';
import { rarityFilter } from '../DAL/filters/rarityFilter';
import { colorFilter } from '../DAL/filters/colorFilter';
import { inkCostFilter } from '../DAL/filters/inkCostFilter';
import { CardRepository } from '../DAL/cardRepository';
import prisma from '../../prisma/prismaConnection'

const { sql } = Prisma;

export function buildCardWhereClause(filters: any): Prisma.Sql
{
    const all = [
        gameFilter(filters.game),
        nameFilter(filters.name),
        rarityFilter(filters.rarity),
        colorFilter(filters.color),
        inkCostFilter(filters.ink_cost_min, filters.ink_cost_max),
    ].filter(Boolean) as Prisma.Sql[];

    return all.length
        ? Prisma.sql`WHERE ${all.reduce((acc, cond, i) => i === 0 ? cond : Prisma.sql`${acc} AND ${cond}`)}`
        : Prisma.sql``;
}


export async function searchCards(params: any) {
    const {
        game,
        name,
        rarity,
        color,
        ink_cost_min,
        ink_cost_max,
        limit
    } = params;

    const sqlWhere = buildCardWhereClause(params);
    const safeLimit = Math.min(Number(limit), 1000); // Set hardcode max 1000 - can we worked around with pagination later

    const cardRepo = new CardRepository(prisma);
    const cards = await cardRepo.getCards(sqlWhere, safeLimit);

    // Mapping DTO
    return cards.map((card) => ({
        id: card.id,
        name: card.name,
        game: card.game,
        rarity: card.rarity,
        gamedata: card.gamedata,
    }));
}