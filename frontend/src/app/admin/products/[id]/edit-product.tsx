"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getCategories, useDemoDb } from "@/lib/admin/demo-store";
import { ProductForm } from "./form";

export function EditProduct() {
  const params = useParams<{ id: string }>();
  const productId = Number(params?.id);
  const { db } = useDemoDb();
  const product = db?.products.find((p) => p.id === productId);

  if (!db) return <p className="text-sm text-ink-soft">Loading product…</p>;
  if (!product) {
    return (
      <div>
        <Link href="/admin/products" className="text-sm font-medium text-ink-soft hover:text-ink">
          ← Products
        </Link>
        <p className="mt-4 text-ink-soft">Product not found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-ink">Edit Product</h1>
      <p className="mt-1 text-ink-soft">{product.name}</p>

      <div className="mt-8 max-w-3xl rounded-2xl border border-line bg-paper p-6">
        <ProductForm product={product} categories={getCategories()} />
      </div>
    </div>
  );
}
