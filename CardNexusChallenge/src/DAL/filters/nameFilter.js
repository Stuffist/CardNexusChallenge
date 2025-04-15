"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameFilter = nameFilter;
const client_1 = require("@prisma/client");
function nameFilter(name) {
    if (!name)
        return null;
    const safeName = name.replace(/[%_]/g, '\\$&');
    return client_1.Prisma.sql `card.name ILIKE ${'%' + safeName + '%'}`;
}
//# sourceMappingURL=nameFilter.js.map