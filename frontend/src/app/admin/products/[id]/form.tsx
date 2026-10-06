"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { nextId, useDemoDb, type DemoProduct } from "@/lib/admin/demo-store";
import { ImageUploader } from "../image-uploader";

interface Category {
  id: number;
  name: string;
}

export function ProductForm({
  product,
  categories,
}: {
  product: DemoProduct;
  categories: Category[];
}) {
  const router = useRouter();
  const { update } = useDemoDb();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState(product.name);
  const [sku, setSku] = useState(product.sku ?? "");
  const [categoryId, setCategoryId] = useState(product.categoryId?.toString() ?? "");
  const [price, setPrice] = useState(product.price?.toString() ?? "");
  const [salePrice, setSalePrice] = useState(product.salePrice?.toString() ?? "");
  const [pricingType, setPricingType] = useState(product.pricingType);
  const [unit, setUnit] = useState(product.unit ?? "lb");
  const [minimumQuantity, setMinimumQuantity] = useState(product.minimumQuantity?.toString() ?? "1");
  const [quantityStep, setQuantityStep] = useState(product.quantityStep?.toString() ?? "1");
  const [stockQuantity, setStockQuantity] = useState(product.stockQuantity?.toString() ?? "");
  const [trackInventory, setTrackInventory] = useState(Boolean(product.trackInventory));
  const [lowStockThreshold, setLowStockThreshold] = useState(product.lowStockThreshold?.toString() ?? "10");
  const [isAvailable, setIsAvailable] = useState(Boolean(product.isAvailable));
  const [isActive, setIsActive] = useState(Boolean(product.isActive));
  const [shortDescription, setShortDescription] = useState(product.shortDescription ?? "");
  const [fullDescription, setFullDescription] = useState(product.fullDescription ?? "");
  const [imageUrl, setImageUrl] = useState(product.imageUrl ?? "");

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const isNew = !product.id;
    const categoriesList = categories;

    update((draft) => {
      const fields = {
        name,
        slug: product.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
        sku: sku || null,
        categoryId: categoryId ? Number(categoryId) : null,
        categoryName: categoriesList.find((c) => String(c.id) === categoryId)?.name ?? null,
        price: price ? Number(price) : null,
        salePrice: salePrice ? Number(salePrice) : null,
        pricingType,
        unit,
        minimumQuantity: minimumQuantity ? Number(minimumQuantity) : 1,
        quantityStep: quantityStep ? Number(quantityStep) : 1,
        stockQuantity: stockQuantity ? Number(stockQuantity) : 0,
        trackInventory,
        lowStockThreshold: lowStockThreshold ? Number(lowStockThreshold) : 10,
        isAvailable,
        isActive,
        shortDescription: shortDescription || null,
        fullDescription: fullDescription || null,
        imageUrl: imageUrl || null,
      };

      if (isNew) {
        draft.products.push({
          id: nextId(draft.products),
          createdAt: new Date().toISOString(),
          ...fields,
        });
      } else {
        const existing = draft.products.find((p) => p.id === product.id);
        if (existing) Object.assign(existing, fields);
      }
    });

    setSaving(false);
    if (isNew) {
      router.push("/admin/products");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Name *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">SKU</label>
          <input
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
          >
            <option value="">None</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Pricing Type</label>
          <select
            value={pricingType}
            onChange={(e) => setPricingType(e.target.value)}
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
          >
            <option value="PER_LB">Per lb</option>
            <option value="PER_UNIT">Per unit</option>
            <option value="FIXED">Fixed price</option>
            <option value="CONTACT">Contact for price</option>
          </select>
        </div>
      </div>

      {pricingType !== "CONTACT" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Price (TTD) *</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Sale Price</label>
            <input
              type="number"
              step="0.01"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Unit</label>
            <input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
            />
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Minimum Quantity</label>
          <input
            type="number"
            step="0.1"
            value={minimumQuantity}
            onChange={(e) => setMinimumQuantity(e.target.value)}
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Quantity Step</label>
          <input
            type="number"
            step="0.1"
            value={quantityStep}
            onChange={(e) => setQuantityStep(e.target.value)}
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
          />
        </div>
      </div>

      <div className="rounded-xl border border-line p-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={trackInventory}
            onChange={(e) => setTrackInventory(e.target.checked)}
            className="h-4 w-4 rounded border-line"
          />
          <span className="text-sm font-medium text-ink">Track inventory</span>
        </label>
        {trackInventory && (
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm text-ink-soft">Stock Quantity</label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-ink-soft">Low Stock Threshold</label>
              <input
                type="number"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(e.target.value)}
                className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Short Description</label>
          <input
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="$20/lb"
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
          />
        </div>
        <ImageUploader value={imageUrl} onChange={setImageUrl} />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Full Description</label>
        <textarea
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        />
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="h-4 w-4 rounded border-line"
          />
          <span className="text-sm font-medium text-ink">Available for order</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 rounded border-line"
          />
          <span className="text-sm font-medium text-ink">Active</span>
        </label>
      </div>

      {saved && <p className="text-sm font-medium text-leaf">Saved.</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-wood px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-flame disabled:opacity-50"
        >
          {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
        </button>
        <Link
          href="/admin/products"
          className="rounded-lg border border-line px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-cream-light"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
