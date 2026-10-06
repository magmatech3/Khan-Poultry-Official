"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDemoDb, getBranches } from "@/lib/admin/demo-store";
import type { OrderStatus } from "@/lib/admin/seed";
import { OrderStatusBadge } from "../status-badge";

const STATUS_FLOW: OrderStatus[] = ["PENDING", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "COMPLETED"];

export function OrderDetail() {
  const params = useParams<{ id: string }>();
  const orderId = Number(params?.id);
  const { db, update } = useDemoDb();
  const [busy, setBusy] = useState(false);

  const order = db?.orders.find((o) => o.id === orderId);
  const branch = order?.branchId ? getBranches().find((b) => b.id === order.branchId) : null;

  if (!db) return <p className="text-sm text-ink-soft">Loading order…</p>;
  if (!order) {
    return (
      <div>
        <Link href="/admin/orders" className="text-sm font-medium text-ink-soft hover:text-ink">
          ← Orders
        </Link>
        <p className="mt-4 text-ink-soft">Order not found.</p>
      </div>
    );
  }

  const currentIndex = STATUS_FLOW.indexOf(order.orderStatus);
  const nextStatus = currentIndex >= 0 && currentIndex < STATUS_FLOW.length - 1 ? STATUS_FLOW[currentIndex + 1] : null;
  const isCancellable = ["PENDING", "CONFIRMED"].includes(order.orderStatus);
  const canMarkPaid = order.paymentStatus !== "PAID" && !["CASH_ON_DELIVERY", "CASH_ON_PICKUP"].includes(order.paymentMethod);

  const mutate = (fn: (o: NonNullable<typeof order>) => void) => {
    setBusy(true);
    update((draft) => {
      const target = draft.orders.find((o) => o.id === orderId);
      if (target) fn(target);
    });
    setBusy(false);
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/admin/orders" className="text-sm font-medium text-ink-soft hover:text-ink">
            ← Orders
          </Link>
          <h1 className="mt-1 font-display text-3xl font-bold text-ink">{order.orderNumber}</h1>
          <p className="mt-1 text-ink-soft">Placed {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {nextStatus && (
            <button
              type="button"
              onClick={() => mutate((o) => { o.orderStatus = nextStatus; })}
              disabled={busy}
              className="rounded-lg bg-wood px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-flame disabled:opacity-50"
            >
              Mark {nextStatus.toLowerCase().replace(/_/g, " ")}
            </button>
          )}
          {canMarkPaid && (
            <button
              type="button"
              onClick={() => mutate((o) => { o.paymentStatus = "PAID"; })}
              disabled={busy}
              className="rounded-lg border border-leaf bg-leaf/10 px-4 py-2 text-sm font-semibold text-leaf transition-colors hover:bg-leaf/20 disabled:opacity-50"
            >
              Mark Paid
            </button>
          )}
          {isCancellable && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Cancel this order?")) mutate((o) => { o.orderStatus = "CANCELLED"; });
              }}
              disabled={busy}
              className="rounded-lg border border-danger px-4 py-2 text-sm font-semibold text-danger transition-colors hover:bg-danger/10 disabled:opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-line bg-paper p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-bold text-ink">Items</h2>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-ink-soft">
                <th className="pb-2 font-medium">Product</th>
                <th className="pb-2 font-medium text-right">Qty</th>
                <th className="pb-2 font-medium text-right">Unit</th>
                <th className="pb-2 font-medium text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-b border-line/50">
                  <td className="py-3 text-ink">
                    {item.productName}
                    {item.variant ? <span className="ml-2 text-ink-soft">({item.variant})</span> : null}
                    {item.notes && <p className="text-xs italic text-ink-soft">&ldquo;{item.notes}&rdquo;</p>}
                  </td>
                  <td className="py-3 text-right tabular-nums">{item.quantity}</td>
                  <td className="py-3 text-right tabular-nums">{item.unit}</td>
                  <td className="py-3 text-right tabular-nums font-medium">TT${item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between text-ink-soft">
              <dt>Subtotal</dt>
              <dd className="tabular-nums text-ink">TT${order.subtotal}</dd>
            </div>
            <div className="flex justify-between text-ink-soft">
              <dt>Delivery</dt>
              <dd className="tabular-nums text-ink">{order.deliveryFee === 0 ? "Free" : `TT${order.deliveryFee}`}</dd>
            </div>
            {order.tax > 0 && (
              <div className="flex justify-between text-ink-soft">
                <dt>Tax</dt>
                <dd className="tabular-nums text-ink">TT${order.tax}</dd>
              </div>
            )}
            <div className="col-span-2 flex justify-between border-t border-line pt-3 font-display text-lg font-bold text-ink">
              <dt>Total</dt>
              <dd className="tabular-nums">TT${order.total}</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-paper p-6">
            <h3 className="font-semibold text-ink">Status</h3>
            <div className="mt-2 flex items-center gap-2">
              <OrderStatusBadge status={order.orderStatus} />
              <span className="text-sm text-ink-soft">
                Payment: <span className="font-medium text-ink">{order.paymentStatus}</span>
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-6">
            <h3 className="font-semibold text-ink">Customer</h3>
            <dl className="mt-2 space-y-1 text-sm">
              <div className="text-ink">{order.customerName}</div>
              <div className="text-ink-soft">{order.customerEmail}</div>
              {order.customerPhone && <div className="text-ink-soft">{order.customerPhone}</div>}
            </dl>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-6">
            <h3 className="font-semibold text-ink">{order.fulfilmentType === "PICKUP" ? "Pickup" : "Delivery"}</h3>
            {order.fulfilmentType === "PICKUP" && branch && (
              <dl className="mt-2 space-y-1 text-sm text-ink-soft">
                <div className="font-medium text-ink">{branch.name}</div>
                <div>{branch.area}</div>
              </dl>
            )}
            {order.fulfilmentType === "DELIVERY" && (
              <dl className="mt-2 space-y-1 text-sm text-ink-soft">
                <div>{order.deliveryAddress}</div>
                {order.deliveryCity && <div>{order.deliveryCity}</div>}
                {order.deliveryLandmark && <div className="italic">Landmark: {order.deliveryLandmark}</div>}
              </dl>
            )}
          </div>

          {order.customerNotes && (
            <div className="rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-semibold text-ink">Customer Notes</h3>
              <p className="mt-2 text-sm text-ink">{order.customerNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
