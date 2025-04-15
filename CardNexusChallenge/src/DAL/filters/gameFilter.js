"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameFilter = gameFilter;
const client_1 = require("@prisma/client");
function gameFilter(game) {
    return game ? client_1.Prisma.sql `card.game = ${game}` : null;
}
//# sourceMappingURL=gameFilter.js.map