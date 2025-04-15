import { colorFilter } from '../../src/DAL/filters/colorFilter';

describe('colorFilter', () => {
    it('returns null if no color given', () => {
        expect(colorFilter(undefined)).toBeNull();
    });

    it('filters by single color', () => {
        const result = colorFilter('R');
        expect(result?.sql).toContain("gamedata->>'color' IN");
    });

    it('filters by multiple colors', () => {
        const result = colorFilter(['R', 'G']);
        expect(result?.sql).toContain("gamedata->>'color' IN");
    });

    it('filters including null', () => {
        const result = colorFilter(['null', 'R']);
        expect(result?.sql).toContain('IS NULL');
        expect(result?.sql).toContain('IN');
    });

    it('filters only null', () => {
        const result = colorFilter(['null']);
        expect(result?.sql).toContain('IS NULL');
    });
});
