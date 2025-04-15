import { Prisma } from "@prisma/client";

export function nameFilter(name?: string) {
  if (!name) return null;

  const safeName = name.replace(/[%_]/g, "\\$&");

  return Prisma.sql`card.name ILIKE ${"%" + safeName + "%"}`;
}
