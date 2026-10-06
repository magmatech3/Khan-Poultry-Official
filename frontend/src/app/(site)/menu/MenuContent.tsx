"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ProductGrid from "@/components/catalog/ProductGrid";
import SortSelect from "@/components/catalog/SortSelect";
import { listBrowsableCategories, listCategories, queryProducts } from "@/lib/catalog";
import { listProductsSchema } from "@/lib/validation";
import { getSettings } from "@/lib/settings";
import type { PublicProduct } from "@/lib/catalog";

function wrap(href: string, active?: boolean) {
  return `rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
    active ?? false
      ? "border-leaf bg-leaf text-white"
      : "border-line bg-paper text-ink hover:border-leaf/40"
  }`;
}

export default function MenuContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const settings = getSettings();
  const categories = listBrowsableCategories();

  const parsed = useMemo(
    () =>
      listProductsSchema.parse({
        q: searchParams.get("q") ?? undefined,
        category: searchParams.get("category") ?? undefined,
        type: searchParams.get("type") ?? undefined,
        sort: searchParams.get("sort") ?? undefined,
        page: searchParams.get("page") ?? undefined,
      }),
    [searchParams],
  );

  const { q, category, type, sort, page } = parsed;

  const catalog = useMemo(
    () =>
      queryProducts({
        page,
        pageSize: parsed.pageSize,
        q: q || undefined,
        category: category || undefined,
        type,
        sort,
        onlyAvailable: true,
      }),
    [page, parsed.pageSize, q, category, type, sort],
  );

  const totalPages = Math.max(1, Math.ceil(catalog.total / catalog.pageSize));

  const withParam = (key: string, value: string, resetPage = true) => {
    const p = new URLSearchParams();
    if (key !== "q" && q) p.set("q", q);
    if (key !== "category" && category) p.set("category", category);
    if (key !== "type" && type) p.set("type", type);
    if (key !== "sort" && sort) p.set("sort", sort);
    if (value) p.set(key, value);
    if (resetPage) p.delete("page");
    const qs = p.toString();
    return `/menu${qs ? `?${qs}` : ""}`;
  };

  const runSearch = (value: string) => {
    const p = new URLSearchParams();
    if (value) p.set("q", value);
    if (category) p.set("category", category);
    if (type) p.set("type", type);
    if (sort) p.set("sort", sort);
    const qs = p.toString();
    router.push(`/menu${qs ? `?${qs}` : ""}`);
  };

  const fmtBadge = (count: number) => `${count.toLocaleString()} item${count === 1 ? "" : "s"}`;

  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 pt-10 md:px-8 md:pt-16">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-leaf">
            Order online · Pick up or delivery
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.02em] text-ink md:text-6xl">
            The case, <span className="text-leaf">by category.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Search {catalog.total}+ fresh and seasoned cuts from the counter.
            Everything is halal, cut to order, and priced per pound.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Whole chicken", img: "/images/products/whole-chicken.webp" },
              { label: "Seasoned", img: "/images/products/seasoned-chicken.webp" },
              { label: "Lamb", img: "/images/products/lamb-chops.webp" },
              { label: "Beef", img: "/images/products/beef-steak.webp" },
              { label: "Shrimp", img: "/images/products/shrimp.webp" },
              { label: "Salmon", img: "/images/products/salmon.webp" },
            ].map((chip) => (
              <Link
                key={chip.label}
                href={withParam("q", chip.label)}
                className="press group inline-flex items-center gap-2 rounded-full border border-line bg-paper py-1.5 pl-1.5 pr-4 text-sm font-semibold text-ink transition-colors hover:border-leaf/40"
              >
                <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-paper/90">
                  <Image
                    src={chip.img}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </span>
                {chip.label}
              </Link>
            ))}
          </div>

          {/* Toolbar */}
          <div className="mt-10 flex flex-col gap-4 border-y border-line py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <form
                action="/menu"
                onSubmit={(e) => {
                  e.preventDefault();
                  runSearch(String(new FormData(e.currentTarget).get("q") ?? ""));
                }}
                className="relative flex-1 lg:max-w-sm"
              >
                <input
                  key={q}
                  name="q"
                  type="text"
                  defaultValue={q}
                  placeholder="Search the case… e.g. jerk, shrimp, lamb"
                  className="w-full rounded-full border border-line bg-cream-light/60 py-2.5 pl-4 pr-24 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-leaf"
                />
                <div className="absolute inset-y-1 right-1 flex items-center">
                  <button
                    type="submit"
                    className="rounded-full bg-leaf px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-leaf-light"
                  >
                    Search
                  </button>
                </div>
              </form>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                  Sort
                </span>
                <SortSelect current={sort} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link className={wrap(`/menu${q ? `?q=${encodeURIComponent(q)}` : ""}`, !category)} href={withParam("category", "")}>
                All
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={withParam("category", c.slug)}
                  className={wrap(
                    withParam("category", c.slug),
                    category === c.slug,
                  )}
                >
                  {c.name.replace(/^.*·\s*/, "")}
                </Link>
              ))}

              <span className="mx-1 hidden h-8 w-px bg-line sm:block" aria-hidden />

            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-6 text-sm font-semibold text-ink-soft">
            Showing {fmtBadge(catalog.total)}
            {category && (
              <>
                {" in "}
                <span className="text-leaf">
                  {listCategories().find((c) => c.slug === category)?.name ?? category}
                </span>
              </>
            )}
          </p>

          {catalog.total === 0 ? (
            <div className="rounded-2xl border border-line bg-cream-light/50 px-6 py-16 text-center">
              <p className="font-display text-xl font-bold text-ink">
                Nothing in the case matches that.
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Try a different search or clear the filters.
              </p>
              <Link
                href="/menu"
                className="press mt-6 inline-block rounded-full bg-leaf px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-leaf-light"
              >
                Clear filters
              </Link>
            </div>
          ) : (
            <ProductGrid products={catalog.items as PublicProduct[]} currencySymbol={settings.currencySymbol} />
          )}

          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
              {page > 1 && (
                <Link href={withParam("page", String(page - 1), false)} className={wrap("p", false)}>
                  ← Prev
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p, i, arr) => (
                  <span key={p} className="flex items-center gap-2">
                    {i > 0 && arr[i - 1] !== p - 1 && <span className="px-1 text-ink-soft">…</span>}
                    <Link
                      href={withParam("page", String(p), false)}
                      aria-current={p === page ? "page" : undefined}
                      className={
                        p === page
                          ? "flex h-9 min-w-9 items-center justify-center rounded-full bg-leaf px-3 text-sm font-bold text-white"
                          : "flex h-9 min-w-9 items-center justify-center rounded-full border border-line px-3 text-sm font-semibold text-ink transition-colors hover:border-leaf/40"
                      }
                    >
                      {p}
                    </Link>
                  </span>
                ))}
              {page < totalPages && (
                <Link href={withParam("page", String(page + 1), false)} className={wrap("p", false)}>
                  Next →
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}