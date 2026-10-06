"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useDemoDb, getCategories } from "@/lib/admin/demo-store";
import { ProductTable } from "./table";

const LIMIT = 25;

export default function AdminProductsPage() {
  const { db } = useDemoDb();
  const categories = getCategories();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const rows = db?.products ?? [];
    const q = search.trim().toLowerCase();
    return rows.filter((p) => {
      if (category !== "all" && String(p.categoryId) !== category) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q) || (p.sku ?? "").toLowerCase().includes(q);
    });
  }, [db, category, search]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / LIMIT));
  const current = Math.min(page, pages);
  const offset = (current - 1) * LIMIT;
  const list = filtered.slice(offset, offset + LIMIT);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Products</h1>
          <p className="mt-1 text-ink-soft">Manage your product catalog.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-wood px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-flame"
        >
          + Add Product
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="search"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="min-w-[240px] rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50"
        />
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-paper">
        <ProductTable products={list} />
      </div>

      {pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-ink-soft">
          <p>
            Showing {offset + 1}–{Math.min(offset + LIMIT, total)} of {total}
          </p>
          <div className="flex gap-2">
            {current > 1 && (
              <button
                type="button"
                onClick={() => setPage(current - 1)}
                className="rounded-lg border border-line px-3 py-1.5 hover:bg-cream-light"
              >
                ← Previous
              </button>
            )}
            {current < pages && (
              <button
                type="button"
                onClick={() => setPage(current + 1)}
                className="rounded-lg border border-line px-3 py-1.5 hover:bg-cream-light"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
