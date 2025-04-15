import { Prisma } from '@prisma/client';

export function inkCostFilter(min?: number, max?: number)
{
    const conditions = [];
    if (min !== undefined)
    {
        conditions.push(Prisma.sql`(gamedata->>'ink_cost')::int >= ${Number(min)}`);
    }

    if (max !== undefined)
    {
        conditions.push(Prisma.sql`(gamedata->>'ink_cost')::int <= ${Number(max)}`);
    }

    if (conditions.length === 0) return null;
    return conditions.length === 1 ? conditions[0] : Prisma.sql`${conditions[0]} AND ${conditions[1]}`;
}
