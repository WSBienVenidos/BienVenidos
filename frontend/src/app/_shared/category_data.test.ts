import { CATEGORIES, CATEGORY_MAP, RESOURCES_BY_CATEGORY } from "./category_data";

describe("category_data", () => {
  it("exposes categories and category map with matching keys", () => {
    expect(CATEGORIES.length).toBeGreaterThan(0);
    for (const category of CATEGORIES) {
      expect(CATEGORY_MAP[category.key]).toBe(category);
    }
  });

  it("has resources for each category key", () => {
    for (const category of CATEGORIES) {
      expect(Array.isArray(RESOURCES_BY_CATEGORY[category.key])).toBe(true);
    }
  });
});
