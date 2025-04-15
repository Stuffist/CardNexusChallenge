import { z } from "zod";

export const QuerySchema = z.object({
  game: z.enum(["MTG", "Lorcana", ""]).optional(),
  name: z.string().optional(),
  rarity: z.string().array().optional(),
  color: z.string().array().optional(),
  ink_cost_min: z.coerce.number().int().min(0).optional(),
  ink_cost_max: z.coerce.number().int().optional(),
  limit: z.coerce.number().int().min(1).max(1000).default(10).optional(),
});
