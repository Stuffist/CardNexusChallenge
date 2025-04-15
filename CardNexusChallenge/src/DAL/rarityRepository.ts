import { PrismaClient, GameType } from "@prisma/client";

export class RarityRepository {
  constructor(private prisma: PrismaClient) {}

  async getOrThrow(name: string, game: GameType) {
    const rarity = await this.prisma.rarity.findUnique({
      where: {
        name_game: { name, game },
      },
    });

    if (!rarity) {
      throw new Error(`Unknown rarity "${name}" for game "${game}"`);
    }
    return rarity;
  }

  async upsert(name: string, game: GameType) {
    return this.prisma.rarity.upsert({
      where: {
        name_game: { name, game },
      },
      update: {},
      create: { name, game },
    });
  }

  async createMany(
    rarities: { name: string; game: GameType }[],
    skipDuplicates: boolean,
  ) {
    return this.prisma.rarity.createMany({
      data: rarities,
      skipDuplicates: skipDuplicates,
    });
  }

  async getAllAsMap() {
    const rarities = await this.findManySorted();
    const map = new Map<string, number>();
    for (const r of rarities) {
      map.set(`${r.game}:${r.name}`, r.id);
    }
    return map;
  }

  async findManySorted() {
    return await this.prisma.rarity.findMany({
      orderBy: [{ game: "asc" }, { id: "asc" }],
    });
  }
}
