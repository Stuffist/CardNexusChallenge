"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySchema = void 0;
const zod_1 = require("zod");
exports.QuerySchema = zod_1.z.object({
    game: zod_1.z.enum(['MTG', 'Lorcana', '']).optional(),
    name: zod_1.z.string().optional(),
    rarity: zod_1.z.string().array().optional(),
    color: zod_1.z.string().array().optional(),
    ink_cost_min: zod_1.z.coerce.number().int().min(0).optional(),
    ink_cost_max: zod_1.z.coerce.number().int().optional(),
    limit: zod_1.z.coerce.number().int().min(1).max(1000).default(10).optional()
});
//# sourceMappingURL=querySchema.js.map