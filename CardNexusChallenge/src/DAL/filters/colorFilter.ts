import { Prisma } from "@prisma/client";

export function colorFilter(color?: string | string[]) {
  if (!color) return null;
  const list = Array.isArray(color) ? color : color.split(",");
  const includesNull = list.includes("null");
  const realColors = list.filter((c) => c !== "null");

  if (includesNull && realColors.length) {
    return Prisma.sql`(gamedata->>'color') IS NULL OR gamedata->>'color' IN (${Prisma.join(realColors)})`;
  } else if (includesNull) {
    return Prisma.sql`(gamedata->>'color') IS NULL`;
  } else if (realColors.length > 0) {
    return Prisma.sql`gamedata->>'color' IN (${Prisma.join(realColors)})`;
  }

  return null;
}
