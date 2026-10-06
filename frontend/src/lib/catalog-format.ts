export interface PublicProduct {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  categoryId: number | null;
  categoryName: string | null;
  categorySlug: string | null;
  productType: "FRESH" | "SEASONED" | "PREPARED" | "OTHER";
  imageUrl: string | null;
  price: number;
  salePrice: number | null;
  effectivePrice: number;
  hasSale: boolean;
  currency: string;
  pricingType: "FIXED" | "PER_LB" | "PER_KG" | "PER_PACK" | "PER_ITEM" | "WEIGHT" | "CONTACT";
  unit: string;
  minimumQuantity: number;
  quantityStep: number;
  stockQuantity: number;
  trackInventory: boolean;
  isAvailable: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  isSeasonal: boolean;
  tags: unknown;
  shortDescription: string | null;
  description: string | null;
}

export function money(value: number, symbol: string): string {
  const n = Number.isFinite(value) ? Math.round(value * 100) / 100 : 0;
  return `${symbol}${Number.isInteger(n) ? n : n.toFixed(2)}`;
}

export interface PriceLabel {
  main: string;
  note?: string;
  sale?: boolean;
}

export function productPriceLabel(p: PublicProduct, symbol: string): PriceLabel {
  if (p.pricingType === "CONTACT") {
    return { main: "Price on request", note: "Call to confirm" };
  }
  const base = money(p.effectivePrice, symbol);
  const per = (u: string) => `${base}/${u}`;
  switch (p.pricingType) {
    case "PER_LB": return { main: per("lb"), sale: p.hasSale };
    case "PER_KG": return { main: per("kg"), sale: p.hasSale };
    case "FIXED":
    case "PER_PACK":
    case "PER_ITEM":
    case "WEIGHT":
    default: return { main: base, sale: p.hasSale };
  }
}

export function productOriginalPriceLabel(p: PublicProduct, symbol: string): string | null {
  if (!p.hasSale || p.salePrice == null) return null;
  return money(p.price, symbol);
}

export function pricingHint(p: PublicProduct): string {
  switch (p.pricingType) {
    case "PER_LB": return "Priced per pound — whole or cut to order.";
    case "PER_KG": return "Priced per kilogram — whole or cut to order.";
    case "PER_PACK": return "Priced per pack.";
    case "PER_ITEM": return "Priced per item.";
    case "FIXED": return "Fixed price.";
    case "WEIGHT": return "Weighed fresh at the counter.";
    case "CONTACT": return "Confirm today's price at your nearest store.";
    default: return "";
  }
}