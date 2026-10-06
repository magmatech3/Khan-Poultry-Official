"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { PublicProduct } from "@/lib/catalog-format";
import {
  money,
  productPriceLabel,
  productOriginalPriceLabel,
  pricingHint,
} from "@/lib/catalog-format";
import { priceLine } from "@/lib/pricing";
import { productImage } from "@/lib/product-images";
import { findProductBySlug } from "@/lib/catalog";
import { WHATSAPP_LINK, PHONE_LINK } from "@/lib/data";
import { useCart } from "@/components/cart/CartProvider";

interface Detail {
  product: PublicProduct;
  variants: {
    id: number;
    name: string;
    value: string;
    priceDelta: number;
    stockQuantity: number | null;
  }[];
}

function badges(p: PublicProduct) {
  const list: string[] = [];
  if (p.productType === "FRESH") list.push("Fresh");
  if (p.productType === "SEASONED") list.push("Seasoned");
  if (p.hasSale) list.push("Sale");
  if (p.isAvailable === false) list.push("Call to check");
  if (Array.isArray(p.tags)) {
    for (const t of p.tags) if (typeof t === "string") list.push(t);
  }
  return [...new Set(list)].slice(0, 3);
}

function badgeTone(label: string) {
  if (label === "Seasoned" || label === "Sale") return "bg-flame/10 text-flame";
  if (label === "Mild" || label === "Fresh") return "bg-cream text-wood";
  return "bg-leaf-light text-leaf";
}

function ProductImage({
  name,
  categorySlug,
  slug,
  prioritySeed,
}: {
  name: string;
  categorySlug: string | null;
  slug: string;
  prioritySeed: number;
}) {
  const src = productImage(name, categorySlug, slug);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-cream-light">
      {!loaded && <div className="media-shimmer absolute inset-0" aria-hidden />}
      <Image
        src={src}
        alt={name}
        fill
        priority={prioritySeed < 4}
        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 100vw"
        className={`object-cover transition-[transform,opacity] duration-700 group-hover:scale-[1.06] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        loading={prioritySeed < 4 ? undefined : "lazy"}
      />
    </div>
  );
}

export default function ProductGrid({
  products,
  currencySymbol,
}: {
  products: PublicProduct[];
  currencySymbol: string;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [selected, setSelected] = useState<PublicProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const { addItem } = useCart();
  const [addState, setAddState] = useState<{ ok: boolean; error?: string } | null>(null);
  const [adding, setAdding] = useState(false);

  const open = useCallback(async (product: PublicProduct) => {
    setSelected(product);
    setSlug(product.slug);
    setNotes("");
    setQuantity(product.minimumQuantity);
    setError(null);
    setAddState(null);
    setVariantId(null);
    setLoading(false);
    const found = findProductBySlug(product.slug);
    if (!found) {
      setDetail(null);
      setError("Could not load product");
      return;
    }
    setDetail({ product: found, variants: [] });
  }, []);

  const close = useCallback(() => {
    setSlug(null);
    setDetail(null);
  }, []);

  const active = detail?.product ?? selected;

  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [slug, close]);

  const inc = () => {
    if (!active) return;
    const step = active.quantityStep || 1;
    setQuantity((q) => Math.min(999, +(q + step).toFixed(3)));
  };
  const dec = () => {
    if (!active) return;
    const step = active.quantityStep || 1;
    const min = active.minimumQuantity || 1;
    setQuantity((q) => Math.max(min, +(q - step).toFixed(3)));
  };

  const line = useMemo(() => {
    if (!active) return null;
    const price = detail?.variants?.find((v) => v.id === variantId);
    return priceLine(
      {
        price: active.price + (price?.priceDelta ?? 0),
        salePrice: active.salePrice != null ? active.salePrice + (price?.priceDelta ?? 0) : null,
        pricingType: active.pricingType,
        minimumQuantity: active.minimumQuantity,
        quantityStep: active.quantityStep,
        unit: active.unit,
        isAvailable: active.isAvailable,
        trackInventory: active.trackInventory,
        stockQuantity: active.trackInventory
          ? Math.min(active.stockQuantity, price?.stockQuantity ?? active.stockQuantity)
          : active.stockQuantity,
      },
      quantity,
    );
  }, [active, detail, variantId, quantity]);

  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-line bg-paper p-16 text-center">
        <p className="font-display text-2xl font-bold text-wood">Nothing matched that search.</p>
        <p className="mt-2 text-ink-soft">Try a different keyword, or clear the filters above.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p, idx) => {
          const price = productPriceLabel(p, currencySymbol);
          const original = productOriginalPriceLabel(p, currencySymbol);
          return (
            <article
              key={p.id}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-line bg-paper transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-wood/25 hover:shadow-[0_24px_50px_-24px_rgba(42,30,22,0.4)] active:translate-y-0"
              onClick={() => open(p)}
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open(p)}
              aria-label={`View ${p.name}`}
            >
              <div className="relative">
                <ProductImage name={p.name} categorySlug={p.categorySlug} slug={p.slug} prioritySeed={idx} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                {p.categorySlug && (
                  <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink backdrop-blur-md">
                    {p.categoryName ?? ""}
                  </span>
                )}
                {p.hasSale && (
                  <span className="absolute right-3 top-3 rounded-full bg-flame px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                    Sale
                  </span>
                )}
                <a
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
                    `Hi, I'd like to order: ${p.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Order ${p.name} on WhatsApp`}
                  className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-leaf text-white opacity-0 shadow-lg transition-[transform,opacity] duration-300 hover:bg-leaf-light focus-visible:translate-y-0 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.16L2 22l5.02-1.6A9.9 9.9 0 1 0 12.04 2Zm5.8 14.1c-.24.68-1.4 1.3-1.94 1.35-.52.05-1.01.24-3.4-.7-2.87-1.13-4.68-4.05-4.82-4.24-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.37.26-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.4-.06.63.48.24.55.8 1.9.87 2.04.07.14.12.3.02.49-.1.19-.15.3-.29.47-.15.17-.31.37-.44.5-.14.14-.29.29-.13.57.17.28.74 1.22 1.59 1.98 1.1.98 2.03 1.28 2.31 1.42.28.14.45.12.61-.07.17-.19.7-.82.89-1.1.19-.28.37-.24.63-.14.25.09 1.6.75 1.88.89.28.14.46.21.53.32.07.12.07.68-.17 1.36Z" />
                  </svg>
                </a>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex min-h-[2.5rem] items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-bold leading-snug text-ink">{p.name}</h3>
                </div>
                <div className="mt-auto flex flex-col gap-3 pt-2">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      {original && <p className="text-xs text-ink-soft line-through">{original}</p>}
                      <p className={`font-semibold tabular-nums ${price.sale ? "text-flame" : "text-wood"}`}>
                        {price.main}
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {badges(p).map((b) => (
                        <span
                          key={b}
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeTone(b)}`}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      setAdding(true);
                      const result = await addItem({
                        productId: p.id,
                        quantity: p.minimumQuantity,
                        notes: "",
                        variantId: null,
                      });
                      setAdding(false);
                      if (!result.ok) {
                        setAddState(result);
                        setTimeout(() => setAddState(null), 3000);
                      }
                    }}
                    disabled={adding}
                    className="press w-full rounded-full bg-leaf px-4 py-2.5 text-sm font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-leaf-light active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label={`Add ${p.name} to cart`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {slug && active && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 backdrop-blur-sm md:items-center md:p-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
        >
          <div
            className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-paper shadow-2xl md:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl bg-wood-deep md:rounded-t-3xl">
                <Image
                  src={productImage(active.name, active.categorySlug, active.slug)}
                  alt={active.name}
                  fill
                  sizes="(min-width: 768px) 48rem, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" aria-hidden />
              </div>
              <button
                onClick={close}
                aria-label="Close"
                className="press absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/40 text-white backdrop-blur transition-colors hover:bg-flame"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 md:p-9">
              {loading ? (
                <p className="py-4 text-center text-ink-soft">Loading details…</p>
              ) : error ? (
                <p className="py-4 text-center text-danger">{error}</p>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-flame">
                    {active.categoryName}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                    {active.name}
                  </h2>
                  {pricingHint(active) && (
                    <p className="mt-2 text-sm text-ink-soft">{pricingHint(active)}</p>
                  )}

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                        Price
                      </p>
                      <div className="mt-2 flex items-baseline gap-3">
                        {active.hasSale && active.salePrice != null && (
                          <span className="text-lg text-ink-soft line-through">
                            {money(active.price, currencySymbol)}
                          </span>
                        )}
                        <span className="font-display text-3xl font-bold tabular-nums text-wood">
                          {money(
                            active.salePrice ?? active.price,
                            currencySymbol,
                          )}
                          {active.pricingType === "PER_LB" && "/lb"}
                        </span>
                      </div>

                      {detail?.variants && detail.variants.length > 0 && (
                        <div className="mt-5">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                            {detail.variants[0].name}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {detail.variants.map((v) => (
                              <button
                                key={v.id}
                                onClick={() => setVariantId(v.id)}
                                className={`press rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                                  variantId === v.id
                                    ? "border-wood bg-wood text-cream"
                                    : "border-line text-ink hover:border-wood/40"
                                }`}
                              >
                                {v.value}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                        Quantity
                      </p>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center overflow-hidden rounded-full border border-line">
                          <button
                            onClick={dec}
                            disabled={active.pricingType === "CONTACT"}
                            aria-label="Decrease quantity"
                            className="press flex h-11 w-11 items-center justify-center text-xl text-ink transition-colors hover:bg-line/40 disabled:opacity-40"
                          >
                            −
                          </button>
                          <span className="min-w-[4.5rem] text-center font-semibold tabular-nums text-ink">
                            {quantity} {active.unit}
                          </span>
                          <button
                            onClick={inc}
                            disabled={active.pricingType === "CONTACT"}
                            aria-label="Increase quantity"
                            className="press flex h-11 w-11 items-center justify-center text-xl text-ink transition-colors hover:bg-line/40 disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {line && !line.ok && (
                        <p className="mt-3 text-sm font-semibold text-danger">{line.reason}</p>
                      )}
                      {line && line.ok && (
                        <p className="mt-3 text-sm font-semibold text-ink">
                          Subtotal:{" "}
                          <span className="tabular-nums text-wood">
                            {money(line.subtotal, currencySymbol)}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
                      Notes for this order
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      placeholder="Cut preference, how you'll cook it, anything else…"
                      className="mt-2 w-full resize-none rounded-2xl border border-line bg-cream-light/60 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-flame"
                    />
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    {line && line.ok && active.pricingType !== "CONTACT" ? (
                      <>
                        <button
                          onClick={async () => {
                            setAdding(true);
                            setAddState(null);
                            const result = await addItem({
                              productId: active.id,
                              variantId,
                              quantity,
                              notes: notes || undefined,
                            });
                            setAdding(false);
                            setAddState(result);
                            if (result.ok) setNotes("");
                          }}
                          disabled={adding}
                          className="press flex flex-1 items-center justify-center gap-2 rounded-full bg-wood px-6 py-3.5 font-semibold text-cream transition-colors hover:bg-flame disabled:pointer-events-none disabled:opacity-60"
                        >
                          {adding
                            ? "Adding…"
                            : addState?.ok
                              ? "Added to bag ✓"
                              : "Add to bag"}
                        </button>
                        <a
                          href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
                            `Hi Khan's! I'd like to order ${quantity} ${active.unit} of ${active.name}${notes ? ` — ${notes}` : ""}`,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="press flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-wood/40"
                        >
                          WhatsApp
                        </a>
                      </>
                    ) : (
                      <a
                        href={PHONE_LINK}
                        className="press flex flex-1 items-center justify-center gap-2 rounded-full bg-wood px-6 py-3.5 font-semibold text-cream transition-colors hover:bg-flame"
                      >
                        Call to order
                      </a>
                    )}
                    <button
                      onClick={close}
                      className="press rounded-full border border-line px-6 py-3.5 font-semibold text-ink transition-colors hover:border-wood/40"
                    >
                      Keep browsing
                    </button>
                  </div>
                  {!addState?.ok && addState?.error && (
                    <p className="mt-3 text-center text-sm font-semibold text-danger">
                      {addState.error}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}