"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import type { CartView, CartLineView } from "@/lib/cart";
import type { PublicProduct } from "@/lib/catalog-format";
import { priceLine } from "@/lib/pricing";
import { getProductById } from "@/lib/catalog";

const STORAGE_KEY = "khans_cart_v1";

const EMPTY: CartView = { items: [], subtotal: 0, count: 0 };

interface CartContextValue {
  cart: CartView | null;
  loading: boolean;
  refresh: () => Promise<void>;
  addItem: (input: {
    productId: number;
    variantId?: number | null;
    quantity: number;
    notes?: string;
  }) => Promise<{ ok: boolean; error?: string }>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function recompute(items: CartLineView[]): CartView {
  const subtotal = round2(items.reduce((sum, l) => sum + l.subtotal, 0));
  const count = round2(items.reduce((sum, l) => sum + l.quantity, 0));
  return { items, subtotal, count };
}

function lineKey(productId: number, variantId: number | null, notes?: string): string {
  return `${productId}:v${variantId ?? "0"}:n${notes ?? ""}`;
}

function buildLine(
  product: PublicProduct,
  quantity: number,
  notes: string | undefined,
): CartLineView {
  const priced = priceLine(product, quantity);
  const key = lineKey(product.id, null, notes);
  return {
    id: key,
    productId: product.id,
    variantId: null,
    variantName: null,
    variantValue: null,
    product,
    quantity,
    unit: product.unit,
    unitPrice: priced.ok ? priced.unitPrice : product.salePrice ?? product.price,
    subtotal: priced.ok ? priced.subtotal : round2((product.salePrice ?? product.price) * quantity),
    notes: notes ?? null,
  };
}

function readCart(): CartView {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CartView;
      if (parsed && Array.isArray(parsed.items)) return parsed;
    }
  } catch {
    /* corrupted storage → empty cart */
  }
  return EMPTY;
}

let cartCache: CartView | null = null;
const cartListeners = new Set<() => void>();

function cartSnapshot(): CartView {
  if (!cartCache) cartCache = readCart();
  return cartCache;
}

function subscribeCart(listener: () => void): () => void {
  cartListeners.add(listener);
  return () => {
    cartListeners.delete(listener);
  };
}

function writeCart(next: CartView): void {
  cartCache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable → cart lives in memory for this session */
  }
  for (const listener of cartListeners) listener();
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useSyncExternalStore(subscribeCart, cartSnapshot, () => null);
  const [open, setOpen] = useState(false);

  const refresh = useCallback(async () => {
    cartCache = readCart();
    for (const listener of cartListeners) listener();
  }, []);

  const addItem = useCallback<CartContextValue["addItem"]>(async (input) => {
    const product = getProductById(input.productId);
    if (!product) return { ok: false, error: "Product not found" };
    const priced = priceLine(product, input.quantity);
    if (!priced.ok) return { ok: false, error: priced.reason };

    const base = cartCache ?? readCart();
    const key = lineKey(product.id, input.variantId ?? null, input.notes);
    const existing = base.items.find((l) => l.id === key);
    const lines = existing
      ? base.items.map((l) =>
          l.id === key
            ? buildLine(product, l.quantity + input.quantity, input.notes)
            : l,
        )
      : [...base.items, buildLine(product, input.quantity, input.notes)];
    writeCart(recompute(lines));
    setOpen(true);
    return { ok: true };
  }, []);

  const updateQuantity = useCallback<CartContextValue["updateQuantity"]>(
    async (itemId, quantity) => {
      const base = cartCache ?? readCart();
      const lines = base.items.map((l) => {
        if (l.id !== itemId) return l;
        const product = getProductById(l.productId);
        if (!product) return l;
        return buildLine(product, quantity, l.notes ?? undefined);
      });
      writeCart(recompute(lines));
    },
    [],
  );

  const removeItem = useCallback<CartContextValue["removeItem"]>(async (itemId) => {
    const base = cartCache ?? readCart();
    writeCart(recompute(base.items.filter((l) => l.id !== itemId)));
  }, []);

  const clearCart = useCallback(() => {
    writeCart(EMPTY);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      loading: cart === null,
      refresh,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      open,
      setOpen,
    }),
    [cart, refresh, addItem, updateQuantity, removeItem, clearCart, open],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

function initials(name: string): string {
  const words = name.replace(/-/g, " ").split(" ").filter(Boolean);
  return ((words[0]?.[0] ?? "K") + (words[1]?.[0] ?? "")).toUpperCase();
}

const TILES = ["bg-wood", "bg-leaf", "bg-ink", "bg-flame/90"];

function money(value: number, symbol: string): string {
  const n = Number.isFinite(value) ? Math.round(value * 100) / 100 : 0;
  return `${symbol}${Number.isInteger(n) ? n : n.toFixed(2)}`;
}

function CartDrawer() {
  const { cart, open, setOpen, updateQuantity, removeItem } = useCart();
  const currencySymbol = "TT$";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const items = cart?.items ?? [];
  const subtotal = cart?.subtotal ?? 0;

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Order bag"
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-xl font-bold text-ink">
            Your Order Bag
            <span className="ml-2 text-sm font-semibold text-ink-soft">
              {items.length} line{items.length === 1 ? "" : "s"}
            </span>
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close bag"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-light"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-light text-3xl">
                🛍
              </div>
              <p className="max-w-[24ch] text-ink-soft">
                Your bag is empty. Fresh cuts are waiting in the case.
              </p>
              <Link
                href="/menu"
                onClick={() => setOpen(false)}
                className="rounded-full bg-wood px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-flame"
              >
                Browse the menu
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((line) => (
                <li key={line.id} className="flex gap-4">
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-bold text-white/85 ${TILES[line.productId % TILES.length]}`}
                  >
                    {initials(line.product.name)}
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display font-semibold leading-snug text-ink">
                          {line.product.name}
                        </p>
                        {line.variantValue && (
                          <p className="text-sm text-ink-soft">{line.variantValue}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => void removeItem(line.id)}
                        aria-label={`Remove ${line.product.name}`}
                        className="text-ink-soft transition-colors hover:text-flame"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                          <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center overflow-hidden rounded-full border border-line">
                        <button
                          type="button"
                          onClick={() => void updateQuantity(line.id, Math.max(line.product.minimumQuantity || 1, line.quantity - (line.product.quantityStep || 1)))}
                          aria-label="Decrease quantity"
                          className="flex h-8 w-8 items-center justify-center text-lg text-ink transition-colors hover:bg-line/40"
                        >
                          −
                        </button>
                        <span className="min-w-14 text-center text-sm font-semibold tabular-nums text-ink">
                          {line.quantity} {line.unit}
                        </span>
                        <button
                          type="button"
                          onClick={() => void updateQuantity(line.id, line.quantity + (line.product.quantityStep || 1))}
                          aria-label="Increase quantity"
                          className="flex h-8 w-8 items-center justify-center text-lg text-ink transition-colors hover:bg-line/40"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold tabular-nums text-wood">
                        {money(line.subtotal, currencySymbol)}
                      </p>
                    </div>
                    {line.notes && (
                      <p className="text-xs italic text-ink-soft">“{line.notes}”</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-line px-6 py-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink-soft">
                Subtotal
                <span className="block text-xs normal-case text-ink-soft/70">
                  Delivery calculated at checkout
                </span>
              </p>
              <p className="font-display text-2xl font-bold tabular-nums text-ink">
                {money(subtotal, currencySymbol)}
              </p>
            </div>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="mt-4 flex w-full items-center justify-center rounded-full bg-wood px-6 py-4 font-semibold text-cream transition-[transform,background-color] duration-200 hover:bg-flame active:scale-[0.99]"
            >
              Checkout →
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-2 w-full rounded-full py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              Continue shopping
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}