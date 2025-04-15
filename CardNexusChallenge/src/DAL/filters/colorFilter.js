"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorFilter = colorFilter;
const client_1 = require("@prisma/client");
function colorFilter(color) {
    if (!color)
        return null;
    const list = Array.isArray(color) ? color : color.split(',');
    const includesNull = list.includes('null');
    const realColors = list.filter(c => c !== 'null');
    if (includesNull && realColors.length) {
        return client_1.Prisma.sql `(gamedata->>'color') IS NULL OR gamedata->>'color' IN (${client_1.Prisma.join(realColors)})`;
    }
    else if (includesNull) {
        return client_1.Prisma.sql `(gamedata->>'color') IS NULL`;
    }
    else if (realColors.length > 0) {
        return client_1.Prisma.sql `gamedata->>'color' IN (${client_1.Prisma.join(realColors)})`;
    }
    return null;
}
//# sourceMappingURL=colorFilter.js.map