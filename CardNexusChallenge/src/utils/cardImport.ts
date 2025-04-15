import fs from "fs/promises";
import path from "path";
import { GameType, PrismaClient } from "@prisma/client";
import { CardSchema } from "../schemas/cardSchema";
import { RarityRepository } from "../DAL/rarityRepository";
import { CardRepository } from "../DAL/cardRepository";
import prisma from "../../prisma/prismaConnection";

const cardRepo = new CardRepository(prisma);
const rarityRepo = new RarityRepository(prisma);

async function loadJson(filePath: string) {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function importCardsFromFile(filePath: string, game: GameType) {
  const rarityMap = await rarityRepo.getAllAsMap();
  const rawCards = await loadJson(filePath);
  const batch = [];

  for (const rawCard of rawCards) {
    const card = { ...rawCard, game };
    const parsed = CardSchema.safeParse(card);
    if (!parsed.success) {
      console.warn(`Invalid card [id=${card.id}]:`, parsed.error.format());
      continue;
    }

    const rarityId = rarityMap.get(`${game}:${card.rarity}`);
    if (!rarityId) {
      console.warn(`Skipping card ${card.id} - unknown rarity ${card.rarity}`);
      continue;
    }

    const parsedCard = parsed.data;
    const gamedata: Record<string, any> = {};
    switch (parsedCard.game) {
      case "MTG":
        gamedata.color = parsedCard.color ?? null;
        break;

      case "Lorcana":
        gamedata.ink_cost = parsedCard.ink_cost;
        break;
    }

    batch.push({
      id: parsedCard.id,
      name: parsedCard.name,
      game,
      rarityId,
      gamedata,
    });
  }

  if (batch.length > 0) {
    try {
      await cardRepo.createMany(batch);
      console.log(`Imported ${batch.length} cards from ${filePath}`);
    } catch (err: any) {
      console.warn(`Skipped card import: ${err.message}`);
    }
  }
}

export async function importAllCards() {
  const basePath = path.resolve("data");
  await importCardsFromFile(path.join(basePath, "mtg-cards.json"), "MTG");
  await importCardsFromFile(
    path.join(basePath, "lorcana-cards.json"),
    "Lorcana",
  );
}
