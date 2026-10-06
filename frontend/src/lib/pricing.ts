export type PricingType =
  | "FIXED"
  | "PER_LB"
  | "PER_KG"
  | "PER_PACK"
  | "PER_ITEM"
  | "WEIGHT"
  | "CONTACT";

export interface PricedProduct {
  price: number;
  salePrice: number | null;
  pricingType: PricingType;
  minimumQuantity: number;
  quantityStep: number;
  unit: string;
  isAvailable: boolean;
  trackInventory: boolean;
  stockQuantity: number;
}

export interface LinePricing {
  unitPrice: number;
  subtotal: number;
  ok: boolean;
  reason?: string;
}

const EPS = 1e-6;

/**
 * Client-side price/quantity validation shared with the cart and checkout.
 */
export function priceLine(product: PricedProduct, quantity: number): LinePricing {
  const fail = (reason: string): LinePricing => ({ unitPrice: 0, subtotal: 0, ok: false, reason });

  if (!product.isAvailable) return fail("Product is not available");
  const qty = Number(quantity);
  if (!Number.isFinite(qty) || qty <= 0) return fail("Quantity must be greater than zero");

  const unitPrice = product.salePrice ?? product.price;
  if (product.pricingType === "CONTACT") {
    return fail("Price confirmed after contacting the store");
  }

  const min = product.minimumQuantity || 1;
  const step = product.quantityStep || 1;
  if (qty < min - EPS) return fail(`Minimum quantity is ${min} ${product.unit}`);
  if (Math.abs(((qty - min) - Math.round((qty - min) / step) * step)) > EPS) {
    return fail(`Quantity must be in ${step} ${product.unit} increments`);
  }

  if (product.trackInventory && qty > product.stockQuantity + EPS) {
    return fail(`Only ${product.stockQuantity} ${product.unit}(s) in stock`);
  }

  const subtotal = round2(unitPrice * qty);
  return { unitPrice, subtotal, ok: true };
}

export function effectivePrice(product: Pick<PricedProduct, "price" | "salePrice">): number {
  return product.salePrice ?? product.price;
}

export function isIntegersOnly(pricingType: PricingType): boolean {
  return pricingType === "FIXED" || pricingType === "PER_PACK" || pricingType === "PER_ITEM";
}

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}