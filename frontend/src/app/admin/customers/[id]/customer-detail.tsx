"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useDemoDb } from "@/lib/admin/demo-store";

export function CustomerDetail() {
  const params = useParams<{ id: string }>();
  const customerId = Number(params?.id);
  const { db } = useDemoDb();
  const customer = db?.customers.find((c) => c.id === customerId);

  if (!db) return <p className="text-sm text-ink-soft">Loading customer…</p>;
  if (!customer) {
    return (
      <div>
        <Link href="/admin/customers" className="text-sm font-medium text-ink-soft hover:text-ink">
          ← Customers
        </Link>
        <p className="mt-4 text-ink-soft">Customer not found.</p>
      </div>
    );
  }

  const orders = db.orders
    .filter((o) => o.userId === customerId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const totalSpent = orders
    .filter((o) => o.orderStatus !== "CANCELLED" && o.orderStatus !== "REFUNDED")
    .reduce((s, o) => s + o.total, 0);

  return (
    <div>
      <div>
        <Link href="/admin/customers" className="text-sm font-medium text-ink-soft hover:text-ink">
          ← Customers
        </Link>
        <h1 className="mt-1 font-display text-3xl font-bold text-ink">{customer.name}</h1>
        <p className="mt-1 text-ink-soft">
          {customer.email}
          {customer.phone && ` · ${customer.phone}`} · {customer.roleName}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-paper p-5">
          <p className="text-sm text-ink-soft">Total Orders</p>
          <p className="mt-2 font-display text-3xl font-bold text-ink">{orders.length}</p>
        </div>
        <div className="rounded-2xl border border-line bg-paper p-5">
          <p className="text-sm text-ink-soft">Total Spent</p>
          <p className="mt-2 font-display text-3xl font-bold text-ink">TT${totalSpent.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-line bg-paper p-5">
          <p className="text-sm text-ink-soft">Last Order</p>
          <p className="mt-2 font-display text-3xl font-bold text-ink">
            {orders[0] ? new Date(orders[0].createdAt).toLocaleDateString() : "—"}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-paper">
        <h2 className="border-b border-line px-5 py-4 font-display text-lg font-bold text-ink">Order history</h2>
        {orders.length === 0 ? (
          <div className="p-8 text-center text-ink-soft">No orders yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-ink-soft">
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-line/50 hover:bg-cream-light/30">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${o.id}`} className="font-medium text-ink hover:text-wood">
                      {o.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 tabular-nums text-ink-soft">{o.items.length}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-line px-2 py-0.5 text-xs font-semibold text-ink-soft">
                      {o.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium text-ink">TT${o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
