import { rarityFilter } from "../../src/DAL/filters/rarityFilter";

describe("rarityFilter", () => {
  it("returns null if no rarity given", () => {
    expect(rarityFilter(undefined)).toBeNull();
  });

  it("filters single rarity", () => {
    const result = rarityFilter("Rare");
    expect(result?.sql).toContain("rarity.name IN");
  });

  it("filters multiple rarities", () => {
    const result = rarityFilter(["Rare", "Uncommon"]);
    expect(result?.sql).toContain("rarity.name IN");
  });
});
