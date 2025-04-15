"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rarityFilter_1 = require("../../src/DAL/filters/rarityFilter");
describe('rarityFilter', () => {
    it('returns null if no rarity given', () => {
        expect((0, rarityFilter_1.rarityFilter)(undefined)).toBeNull();
    });
    it('filters single rarity', () => {
        const result = (0, rarityFilter_1.rarityFilter)('Rare');
        expect(result === null || result === void 0 ? void 0 : result.sql).toContain("rarity.name IN");
    });
    it('filters multiple rarities', () => {
        const result = (0, rarityFilter_1.rarityFilter)(['Rare', 'Uncommon']);
        expect(result === null || result === void 0 ? void 0 : result.sql).toContain("rarity.name IN");
    });
});
//# sourceMappingURL=rarityFilter.test.js.map