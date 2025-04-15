"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardSearchService_1 = require("../src/service/cardSearchService");
describe('buildCardSearchQuery', () => {
    it('returns empty SQL if no filters', () => {
        const sql = (0, cardSearchService_1.buildCardWhereClause)({});
        expect(sql.sql).not.toContain('WHERE');
    });
    it('includes all filters when provided', () => {
        const sql = (0, cardSearchService_1.buildCardWhereClause)({
            game: 'MTG',
            name: 'Bolt',
            color: ['R', 'null'],
            rarity: ['Rare'],
            ink_cost_min: 1,
            ink_cost_max: 5,
        });
        expect(sql.sql).toContain('game');
        expect(sql.sql).toContain('ILIKE');
        expect(sql.sql).toContain('gamedata->>\'color\'');
        expect(sql.sql).toContain('rarity.name');
    });
});
//# sourceMappingURL=cardSearchService.test.js.map