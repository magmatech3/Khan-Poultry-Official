import type { PublicProduct } from "@/lib/catalog-format";

export interface CartLineView {
  id: string;
  productId: number;
  variantId: number | null;
  variantName: string | null;
  variantValue: string | null;
  product: PublicProduct;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
  notes: string | null;
}

export interface CartView {
  items: CartLineView[];
  subtotal: number;
  count: number;
}