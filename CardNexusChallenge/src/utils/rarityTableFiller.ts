import { PrismaClient, GameType } from "@prisma/client";
import { RarityRepository } from "../DAL/rarityRepository";
import prisma from "../../prisma/prismaConnection";

const rarities = [
  { game: "MTG" as GameType, name: "common" },
  { game: "MTG" as GameType, name: "uncommon" },
  { game: "MTG" as GameType, name: "rare" },
  { game: "MTG" as GameType, name: "mythic" },
  { game: "MTG" as GameType, name: "special" },
  { game: "Lorcana" as GameType, name: "Common" },
  { game: "Lorcana" as GameType, name: "Uncommon" },
  { game: "Lorcana" as GameType, name: "Rare" },
  { game: "Lorcana" as GameType, name: "Super Rare" },
  { game: "Lorcana" as GameType, name: "Legendary" },
  { game: "Lorcana" as GameType, name: "Enchanted" },
  { game: "Lorcana" as GameType, name: "Promo" },
];

export async function seedRarities() {
  const rarityRepo = new RarityRepository(prisma);
  await rarityRepo.createMany(rarities, true);
  await prisma.$disconnect();
}
