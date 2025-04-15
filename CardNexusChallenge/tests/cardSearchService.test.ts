import { buildCardWhereClause } from "../src/service/cardSearchService";

describe("buildCardSearchQuery", () => {
  it("returns empty SQL if no filters", () => {
    const sql = buildCardWhereClause({});
    expect(sql.sql).not.toContain("WHERE");
  });

  it("includes all filters when provided", () => {
    const sql = buildCardWhereClause({
      game: "MTG",
      name: "Bolt",
      color: ["R", "null"],
      rarity: ["Rare"],
      ink_cost_min: 1,
      ink_cost_max: 5,
    });
    expect(sql.sql).toContain("game");
    expect(sql.sql).toContain("ILIKE");
    expect(sql.sql).toContain("gamedata->>'color'");
    expect(sql.sql).toContain("rarity.name");
  });
});
