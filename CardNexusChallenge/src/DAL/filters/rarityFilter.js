"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rarityFilter = rarityFilter;
const client_1 = require("@prisma/client");
function rarityFilter(rarity) {
    if (!rarity)
        return null;
    const list = Array.isArray(rarity) ? rarity : rarity.split(',');
    return client_1.Prisma.sql `rarity.name IN (${client_1.Prisma.join(list)})`;
}
//# sourceMappingURL=rarityFilter.js.map