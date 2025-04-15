import { Prisma } from '@prisma/client';

export function gameFilter(game?: string)
{
    return game ? Prisma.sql`card.game = ${game}` : null;
}
