"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorFilter_1 = require("../../src/DAL/filters/colorFilter");
describe('colorFilter', () => {
    it('returns null if no color given', () => {
        expect((0, colorFilter_1.colorFilter)(undefined)).toBeNull();
    });
    it('filters by single color', () => {
        const result = (0, colorFilter_1.colorFilter)('R');
        expect(result === null || result === void 0 ? void 0 : result.sql).toContain("gamedata->>'color' IN");
    });
    it('filters by multiple colors', () => {
        const result = (0, colorFilter_1.colorFilter)(['R', 'G']);
        expect(result === null || result === void 0 ? void 0 : result.sql).toContain("gamedata->>'color' IN");
    });
    it('filters including null', () => {
        const result = (0, colorFilter_1.colorFilter)(['null', 'R']);
        expect(result === null || result === void 0 ? void 0 : result.sql).toContain('IS NULL');
        expect(result === null || result === void 0 ? void 0 : result.sql).toContain('IN');
    });
    it('filters only null', () => {
        const result = (0, colorFilter_1.colorFilter)(['null']);
        expect(result === null || result === void 0 ? void 0 : result.sql).toContain('IS NULL');
    });
});
//# sourceMappingURL=colorFilter.test.js.map