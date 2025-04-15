"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inkCostFilter = inkCostFilter;
const client_1 = require("@prisma/client");
function inkCostFilter(min, max) {
    const conditions = [];
    if (min !== undefined) {
        conditions.push(client_1.Prisma.sql `(gamedata->>'ink_cost')::int >= ${Number(min)}`);
    }
    if (max !== undefined) {
        conditions.push(client_1.Prisma.sql `(gamedata->>'ink_cost')::int <= ${Number(max)}`);
    }
    if (conditions.length === 0)
        return null;
    return conditions.length === 1 ? conditions[0] : client_1.Prisma.sql `${conditions[0]} AND ${conditions[1]}`;
}
//# sourceMappingURL=inkCostFilter.js.map