import { Prisma } from '@prisma/client';

export function rarityFilter(rarity?: string | string[])
{
    if (!rarity) return null;

    const list = Array.isArray(rarity) ? rarity : rarity.split(',');
    return Prisma.sql`rarity.name IN (${Prisma.join(list)})`;
}
