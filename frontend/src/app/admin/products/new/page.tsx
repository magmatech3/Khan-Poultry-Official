"use client";

import type { DemoProduct } from "@/lib/admin/demo-store";
import { getCategories } from "@/lib/admin/demo-store";
import { ProductForm } from "../[id]/form";

const BLANK: DemoProduct = {
  id: 0,
  name: "",
  slug: "",
  sku: null,
  categoryId: null,
  categoryName: null,
  price: null,
  salePrice: null,
  pricingType: "PER_LB",
  unit: "lb",
  minimumQuantity: 1,
  quantityStep: 1,
  stockQuantity: 0,
  trackInventory: false,
  lowStockThreshold: 5,
  isAvailable: true,
  isActive: true,
  shortDescription: null,
  fullDescription: null,
  imageUrl: null,
  createdAt: "",
};

export default function AdminProductNewPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-ink">Add Product</h1>
      <p className="mt-1 text-ink-soft">Create a new menu item.</p>

      <div className="mt-8 max-w-3xl rounded-2xl border border-line bg-paper p-6">
        <ProductForm product={BLANK} categories={getCategories()} />
      </div>
    </div>
  );
}
