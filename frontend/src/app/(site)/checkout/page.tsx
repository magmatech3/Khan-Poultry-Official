"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { money } from "@/lib/catalog-format";
import { listBranchOptions } from "@/lib/catalog";
import { getSettings } from "@/lib/settings";

interface OrderView {
  id: number;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  paymentMethodLabel: string;
  fulfilmentType: string;
  branch: { id: number; name: string; area: string | null } | null;
  customerName: string;
  deliveryAddress: string | null;
  desiredDate: string | null;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
  currency: string;
  items: {
    name: string;
    variant: string | null;
    quantity: number;
    unit: string;
    unitPrice: number;
    subtotal: number;
    notes: string | null;
  }[];
  createdAt: string;
}

const inputCls =
  "w-full rounded-full border border-line bg-cream-light/40 px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-flame";

const PAYMENT_LABELS = {
  CASH_ON_PICKUP: "cash on pickup",
  CASH_ON_DELIVERY: "cash on delivery",
  MANUAL: "manual invoice",
} as const;

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const settings = getSettings();
  const branches = useMemo(() => listBranchOptions(), []);

  const [fulfilment, setFulfilment] = useState<"PICKUP" | "DELIVERY">("PICKUP");
  const [branchId, setBranchId] = useState<number | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryLandmark, setDeliveryLandmark] = useState("");
  const [desiredDate, setDesiredDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"CASH_ON_PICKUP" | "CASH_ON_DELIVERY" | "MANUAL">("CASH_ON_PICKUP");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderView | null>(null);

  const subtotal = cart?.subtotal ?? 0;
  const resolvedBranchId = fulfilment === "PICKUP" && branchId == null ? branches[0]?.id ?? null : branchId;
  const resolvedPaymentMethod =
    fulfilment === "PICKUP" && paymentMethod === "CASH_ON_DELIVERY"
      ? "CASH_ON_PICKUP"
      : fulfilment === "DELIVERY" && paymentMethod === "CASH_ON_PICKUP"
        ? "CASH_ON_DELIVERY"
        : paymentMethod;
  const deliveryFee = useMemo(() => {
    if (fulfilment !== "DELIVERY") return 0;
    if (subtotal >= settings.freeDeliveryThreshold) return 0;
    return settings.deliveryFee;
  }, [fulfilment, subtotal, settings]);
  const tax = Math.round(subtotal * settings.taxRate * 100) / 100;
  const total = subtotal + deliveryFee + tax;

  function submit() {
    setError(null);
    setSubmitting(true);
    try {
      const branch = branches.find((b) => b.id === resolvedBranchId) ?? null;
      const next: OrderView = {
        id: Date.now(),
        orderNumber: `KH-${Math.floor(100000 + Math.random() * 900000)}`,
        status: "PENDING",
        paymentStatus: "UNPAID",
        paymentMethod: resolvedPaymentMethod,
        paymentMethodLabel: PAYMENT_LABELS[resolvedPaymentMethod],
        fulfilmentType: fulfilment,
        branch: branch ? { id: branch.id, name: branch.name, area: branch.area } : null,
        customerName: name,
        deliveryAddress: fulfilment === "DELIVERY" ? deliveryAddress || null : null,
        desiredDate: desiredDate || null,
        subtotal,
        deliveryFee,
        discount: 0,
        tax,
        total,
        currency: settings.currency,
        items: (cart?.items ?? []).map((l) => ({
          name: l.product.name,
          variant: l.variantValue,
          quantity: l.quantity,
          unit: l.unit,
          unitPrice: l.unitPrice,
          subtotal: l.subtotal,
          notes: l.notes,
        })),
        createdAt: new Date().toISOString(),
      };
      setOrder(next);
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not place order");
    } finally {
      setSubmitting(false);
    }
  }

  if (order) {
    return <Confirmation order={order} symbol={settings.currencySymbol} />;
  }

  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-flame">Checkout</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Lock in your order.
        </h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Pick a branch or we deliver. Pay in store or at your door.
        </p>

        {settings.announcement && (
          <p className="mt-5 rounded-2xl border border-warn/25 bg-warn-soft px-4 py-3 text-sm text-warn">
            {settings.announcement}
          </p>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}
            className="flex flex-col gap-8"
          >
            {/* Fulfilment */}
            <fieldset>
              <legend className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                How do you want it?
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(["PICKUP", "DELIVERY"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFulfilment(f)}
                    className={`rounded-2xl border px-5 py-4 text-left transition-colors ${
                      fulfilment === f
                        ? "border-wood bg-wood/5"
                        : "border-line bg-paper hover:border-wood/30"
                    }`}
                  >
                    <span className={`font-display text-lg font-bold ${fulfilment === f ? "text-wood" : "text-ink"}`}>
                      {f === "PICKUP" ? "Pick up" : "Delivery"}
                    </span>
                    <span className="mt-1 block text-sm text-ink-soft">
                      {f === "PICKUP" ? "Collect at a branch, pay in store" : "We bring it to you"}
                    </span>
                  </button>
                ))}
              </div>

              {fulfilment === "PICKUP" ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-ink">Branch</span>
                    <select
                      value={resolvedBranchId ?? ""}
                      onChange={(e) => setBranchId(Number(e.target.value))}
                      className={inputCls}
                    >
                      {branches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} — {b.area}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-ink">
                      Pickup date <span className="text-ink-soft/60">(optional)</span>
                    </span>
                    <input
                      type="date"
                      value={desiredDate}
                      onChange={(e) => setDesiredDate(e.target.value)}
                      className={inputCls}
                    />
                  </label>
                </div>
              ) : (
                <div className="mt-4 grid gap-3">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-ink">Address</span>
                    <input
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Street, house number…"
                      className={inputCls}
                    />
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-ink">
                        City/Town <span className="text-ink-soft/60">(optional)</span>
                      </span>
                      <input
                        value={deliveryCity}
                        onChange={(e) => setDeliveryCity(e.target.value)}
                        className={inputCls}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-ink">
                        Landmark <span className="text-ink-soft/60">(optional)</span>
                      </span>
                      <input
                        value={deliveryLandmark}
                        onChange={(e) => setDeliveryLandmark(e.target.value)}
                        className={inputCls}
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-ink">
                      Delivery date <span className="text-ink-soft/60">(optional)</span>
                    </span>
                    <input
                      type="date"
                      value={desiredDate}
                      onChange={(e) => setDesiredDate(e.target.value)}
                      className={inputCls}
                    />
                  </label>
                </div>
              )}
            </fieldset>

            {/* Payment */}
            <fieldset>
              <legend className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                Payment
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {fulfilment === "PICKUP" && (
                  <PaymentOption
                    active={resolvedPaymentMethod === "CASH_ON_PICKUP"}
                    onClick={() => setPaymentMethod("CASH_ON_PICKUP")}
                    title="Cash on pickup"
                    hint="Pay at the counter when you collect"
                  />
                )}
                {fulfilment === "DELIVERY" && (
                  <PaymentOption
                    active={resolvedPaymentMethod === "CASH_ON_DELIVERY"}
                    onClick={() => setPaymentMethod("CASH_ON_DELIVERY")}
                    title="Cash on delivery"
                    hint="Pay the driver on arrival"
                  />
                )}
                <PaymentOption
                  active={resolvedPaymentMethod === "MANUAL"}
                  onClick={() => setPaymentMethod("MANUAL")}
                  title="Manual / invoice"
                  hint="We'll confirm payment details after you order"
                />
              </div>
            </fieldset>

            {/* Contact */}
            <fieldset>
              <legend className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
                Who&apos;s this for?
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">Full name</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} required className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">Phone</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+1 868 …"
                    className={inputCls}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputCls}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-ink">
                    Notes <span className="text-ink-soft/60">(optional)</span>
                  </span>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="Cut instructions, how you'll cook it…"
                    className="w-full resize-none rounded-2xl border border-line bg-cream-light/40 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-flame"
                  />
                </label>
              </div>
            </fieldset>

            {error && (
              <p className="rounded-2xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm font-semibold text-danger">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || (cart?.items.length ?? 0) === 0}
              className="rounded-full bg-wood px-8 py-4 font-semibold text-cream transition-[transform,background-color] duration-200 hover:bg-flame active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
            >
              {submitting ? "Placing order…" : `Place order · ${money(total, settings.currencySymbol)}`}
            </button>
            <p className="text-center text-xs text-ink-soft">
              This is a demo checkout — no payment is taken and no order is sent.
            </p>
          </form>

          {/* Summary */}
          <aside className="h-fit rounded-3xl border border-line bg-paper p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-lg font-bold text-ink">Your bag</h2>
            {(cart?.items.length ?? 0) === 0 ? (
              <p className="mt-4 text-sm text-ink-soft">
                Your bag is empty.{" "}
                <Link href="/menu" className="font-semibold text-wood hover:underline">
                  Browse the menu
                </Link>
                .
              </p>
            ) : (
              <>
                <ul className="mt-4 flex flex-col gap-3">
                  {cart!.items.map((line) => (
                    <li key={line.id} className="flex items-start justify-between gap-3 text-sm">
                      <span className="text-ink">
                        <span className="font-semibold tabular-nums text-wood">{line.quantity}</span>
                        {" "}{line.unit} × {line.product.name}
                        {line.variantValue ? ` (${line.variantValue})` : ""}
                      </span>
                      <span className="shrink-0 font-semibold tabular-nums text-ink">
                        {money(line.subtotal, settings.currencySymbol)}
                      </span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-5 flex flex-col gap-2 border-t border-line pt-4 text-sm">
                  <div className="flex justify-between text-ink-soft">
                    <dt>Subtotal</dt>
                    <dd className="tabular-nums text-ink">{money(subtotal, settings.currencySymbol)}</dd>
                  </div>
                  <div className="flex justify-between text-ink-soft">
                    <dt>Delivery fee</dt>
                    <dd className="tabular-nums text-ink">
                      {deliveryFee === 0 ? "Free" : money(deliveryFee, settings.currencySymbol)}
                    </dd>
                  </div>
                  {settings.taxRate > 0 && (
                    <div className="flex justify-between text-ink-soft">
                      <dt>Tax</dt>
                      <dd className="tabular-nums text-ink">{money(tax, settings.currencySymbol)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-line pt-3 font-display text-lg font-bold text-ink">
                    <dt>Total</dt>
                    <dd className="tabular-nums">{money(total, settings.currencySymbol)}</dd>
                  </div>
                </dl>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function PaymentOption({
  active,
  onClick,
  title,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-5 py-4 text-left transition-colors ${
        active ? "border-wood bg-wood/5" : "border-line bg-paper hover:border-wood/30"
      }`}
    >
      <span className={`font-display text-lg font-bold ${active ? "text-wood" : "text-ink"}`}>{title}</span>
      <span className="mt-1 block text-sm text-ink-soft">{hint}</span>
    </button>
  );
}

function Confirmation({ order, symbol }: { order: OrderView; symbol: string }) {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-2xl px-5 py-16 text-center md:py-24">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf text-3xl text-white">
          ✓
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Order {order.orderNumber}
        </h1>
        <p className="mt-3 text-ink-soft">
          Thanks, {order.customerName.split(" ")[0]}! We&apos;ve got your order.
          {order.fulfilmentType === "PICKUP" && order.branch
            ? ` Pick it up at ${order.branch.name}${order.branch.area ? ` (${order.branch.area})` : ""}.`
            : " We'll arrange delivery with you."}
        </p>

        <div className="mt-10 rounded-3xl border border-line bg-paper p-6 text-left">
          <ul className="flex flex-col gap-3">
            {order.items.map((item, i) => (
              <li key={i} className="flex items-start justify-between gap-4 text-sm">
                <span className="text-ink">
                  <span className="font-semibold tabular-nums text-wood">{item.quantity}</span>{" "}
                  {item.unit} × {item.name}
                  {item.variant ? ` (${item.variant})` : ""}
                  {item.notes ? <span className="block text-xs italic text-ink-soft">“{item.notes}”</span> : null}
                </span>
                <span className="shrink-0 font-semibold tabular-nums text-ink">
                  {money(item.subtotal, symbol)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 flex flex-col gap-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-ink-soft">
              <dt>Subtotal</dt>
              <dd className="tabular-nums text-ink">{money(order.subtotal, symbol)}</dd>
            </div>
            <div className="flex justify-between text-ink-soft">
              <dt>Delivery fee</dt>
              <dd className="tabular-nums text-ink">
                {order.deliveryFee === 0 ? "Free" : money(order.deliveryFee, symbol)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 font-display text-xl font-bold text-ink">
              <dt>Total</dt>
              <dd className="tabular-nums">{money(order.total, symbol)}</dd>
            </div>
          </dl>
          <p className="mt-5 rounded-2xl bg-flame/5 px-4 py-3 text-sm text-ink-soft">
            Pay by <span className="font-semibold text-ink">{order.paymentMethodLabel}</span>.{" "}
            {order.fulfilmentType === "PICKUP" ? "We'll have it ready at the counter." : "Our team may call to confirm delivery details."}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/menu"
            className="rounded-full bg-wood px-6 py-3 font-semibold text-cream transition-colors hover:bg-flame"
          >
            Order more
          </Link>
          <Link
            href="/"
            className="rounded-full border border-line px-6 py-3 font-semibold text-ink transition-colors hover:border-wood/40"
          >
            Back home
          </Link>
        </div>
        <p className="mt-6 text-xs text-ink-soft">
          Demo order — nothing was charged and no details were sent anywhere.
        </p>
      </div>
    </div>
  );
}