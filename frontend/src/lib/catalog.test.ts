import { test } from "node:test";
import assert from "node:assert/strict";
import { listBrowsableCategories, listAllProducts, queryProducts } from "./catalog";

test("every category filter chip links to at least one available product", () => {
  const categories = listBrowsableCategories();

  assert.ok(categories.length > 0);
  for (const category of categories) {
    assert.ok(
      queryProducts({ category: category.slug, onlyAvailable: true }).total > 0,
      `category ${category.slug} returns no products`,
    );
  }
});

test("no available product is unreachable by the category filter", () => {
  const slugs = new Set(listBrowsableCategories().map((c) => c.slug));
  const available = listAllProducts().filter((p) => p.isAvailable);

  assert.ok(available.length > 0);
  assert.ok(available.every((p) => !!p.categorySlug && slugs.has(p.categorySlug)));
});

test("search matches name and description case-insensitively", () => {
  const lower = queryProducts({ q: "lamb", onlyAvailable: true }).total;
  const upper = queryProducts({ q: "LAMB", onlyAvailable: true }).total;

  assert.ok(lower > 0);
  assert.equal(upper, lower);
});
