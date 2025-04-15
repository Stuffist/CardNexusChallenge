"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSchema = exports.LorcanaCardSchema = exports.MTGCardSchema = void 0;
const zod_1 = require("zod");
exports.MTGCardSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    game: zod_1.z.literal('MTG'),
    rarity: zod_1.z.enum(['common', 'mythic', 'rare', 'special', 'uncommon']),
    color: zod_1.z.enum(['W', 'U', 'B', 'R', 'G']).optional(),
});
exports.LorcanaCardSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    game: zod_1.z.literal('Lorcana'),
    rarity: zod_1.z.enum(['Common', 'Enchanted', 'Legendary', 'Promo', 'Rare', 'Super Rare', 'Uncommon']),
    ink_cost: zod_1.z.number(),
});
exports.CardSchema = zod_1.z.discriminatedUnion('game', [exports.MTGCardSchema, exports.LorcanaCardSchema]);
//# sourceMappingURL=cardSchema.js.map