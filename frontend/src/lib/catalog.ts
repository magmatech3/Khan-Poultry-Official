import type { PublicProduct } from "@/lib/catalog-format";
import { MENU } from "@/lib/menu";
import { LOCATIONS } from "@/lib/data";
import { productImage } from "@/lib/product-images";

export type { PublicProduct };

export interface CategoryView {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

export interface BranchOption {
  id: number;
  name: string;
  area: string;
  address: string;
  phone: string;
  phoneHref: string;
  mapQuery: string;
  hours: [string, string][];
  supportsPickup: boolean;
  supportsDelivery: boolean;
  isClosed: boolean;
}

function cleanSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parsePrice(raw: string | undefined): number {
  if (!raw) return 0;
  const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function menuType(categoryId: string): "FRESH" | "SEASONED" | "PREPARED" | "OTHER" {
  switch (categoryId) {
    case "poultry-fresh": return "FRESH";
    case "poultry-seasoned": return "SEASONED";
    default: return "OTHER";
  }
}

const CATEGORIES: CategoryView[] = MENU.map((cat, i) => ({
  id: i + 1,
  slug: cat.id,
  name: cat.title,
  description: cat.kicker,
  imageUrl: null,
}));

const PRODUCTS: PublicProduct[] = (() => {
  const usedSlugs = new Set<string>();
  const rows: PublicProduct[] = [];
  for (const cat of MENU) {
    const category = CATEGORIES.find((c) => c.slug === cat.id)!;
    for (const item of cat.items) {
      const price = parsePrice(item.price);
      const slugBase = cleanSlug(item.name);
      let slug = slugBase;
      let suffix = 1;
      while (usedSlugs.has(slug)) {
        slug = `${slugBase}-${suffix++}`;
      }
      usedSlugs.add(slug);
      rows.push({
        id: rows.length + 1,
        name: item.name,
        slug,
        sku: null,
        categoryId: category.id,
        categoryName: category.name,
        categorySlug: category.slug,
        productType: menuType(cat.id),
        imageUrl: productImage(item.name, category.slug, slug),
        price,
        salePrice: null,
        effectivePrice: price,
        hasSale: false,
        currency: "TTD",
        pricingType: price > 0 ? "PER_LB" : "CONTACT",
        unit: "lb",
        minimumQuantity: 1,
        quantityStep: 1,
        stockQuantity: 0,
        trackInventory: false,
        // Availability is a stock question, not a pricing one. Fresh chilled cuts
        // have no published price, so they sell as CONTACT rather than vanish.
        isAvailable: true,
        isFeatured: price > 0 && cat.id === "poultry-seasoned",
        isPopular: false,
        isSeasonal: false,
        tags: item.tag ? [item.tag] : [],
        shortDescription: item.price ? `$${item.price}/lb` : "Contact for price",
        description: null,
      });
    }
  }
  return rows;
})();

const BRANCHES: BranchOption[] = LOCATIONS.map((loc, i) => ({
  id: i + 1,
  name: loc.name,
  area: loc.area,
  address: loc.area,
  phone: loc.phone,
  phoneHref: loc.phoneHref,
  mapQuery: loc.mapQuery,
  hours: loc.hours,
  supportsPickup: true,
  supportsDelivery: true,
  isClosed: false,
}));

export function listCategories(): CategoryView[] {
  return CATEGORIES;
}

/**
 * Categories that contain at least one product a shopper can buy, so a filter
 * chip can never link to an empty result. Mark a product isAvailable and its
 * category option reappears on its own.
 */
export function listBrowsableCategories(): CategoryView[] {
  const slugs = new Set(PRODUCTS.filter((p) => p.isAvailable).map((p) => p.categorySlug));
  return CATEGORIES.filter((c) => slugs.has(c.slug));
}

export function listAllProducts(): PublicProduct[] {
  return PRODUCTS;
}

export interface ProductsQuery {
  page?: number;
  pageSize?: number;
  q?: string;
  category?: string;
  type?: "FRESH" | "SEASONED" | "PREPARED" | "OTHER";
  sort?: "featured" | "name" | "price-asc" | "price-desc" | "newest";
  onlyAvailable?: boolean;
}

export function queryProducts(filters: ProductsQuery) {
  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 24;

  let items = PRODUCTS.filter((p) => p.isAvailable);
  if (filters.q) {
    const q = filters.q.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.shortDescription ?? "").toLowerCase().includes(q),
    );
  }
  if (filters.category) {
    items = items.filter((p) => p.categorySlug === filters.category);
  }
  if (filters.type) items = items.filter((p) => p.productType === filters.type);
  if (filters.onlyAvailable) items = items.filter((p) => p.isAvailable);

  const sort = filters.sort;
  const sorted = [...items];
  if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "price-asc") sorted.sort((a, b) => a.effectivePrice - b.effectivePrice);
  else if (sort === "price-desc") sorted.sort((a, b) => b.effectivePrice - a.effectivePrice);
  else if (sort === "newest") sorted.sort((a, b) => b.id - a.id);
  else sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || a.id - b.id);

  return {
    items: sorted.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
    total: sorted.length,
    pageSize,
  };
}

export function findProductBySlug(slug: string): PublicProduct | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export function getProductById(id: number): PublicProduct | null {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export function listBranchOptions(): BranchOption[] {
  return BRANCHES;
}

export function toPublicProduct(p: PublicProduct): PublicProduct {
  return p;
}