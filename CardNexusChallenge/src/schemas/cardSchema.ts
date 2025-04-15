import { z } from 'zod';

export const MTGCardSchema = z.object({
    id: z.string(),
    name: z.string(),
    game: z.literal('MTG'),
    rarity: z.enum(['common', 'mythic', 'rare', 'special', 'uncommon']),
    color: z.enum(['W', 'U', 'B', 'R', 'G']).optional(),
});

export const LorcanaCardSchema = z.object({
    id: z.string(),
    name: z.string(),
    game: z.literal('Lorcana'),
    rarity: z.enum(['Common', 'Enchanted', 'Legendary', 'Promo', 'Rare', 'Super Rare', 'Uncommon']),
    ink_cost: z.number(),
});

export const CardSchema = z.discriminatedUnion('game', [MTGCardSchema, LorcanaCardSchema]);
export type CardInput = z.infer<typeof CardSchema>;
