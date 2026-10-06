"use client";

import Link from "next/link";
import { useDemoDb } from "@/lib/admin/demo-store";

function statusClass(status: string): string {
  if (status === "PENDING") return "bg-warn/10 text-warn";
  if (status === "COMPLETED") return "bg-ok/10 text-ok";
  if (status === "CANCELLED" || status === "REFUNDED") return "bg-danger/10 text-danger";
  return "bg-line text-ink-soft";
}

export default function AdminDashboardPage() {
  const { db } = useDemoDb();

  if (!db) {
    return <p className="text-sm text-ink-soft">Loading dashboard…</p>;
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  const todayOrders = db.orders.filter((o) => new Date(o.createdAt).getTime() >= todayStart).length;
  const monthOrders = db.orders.filter((o) => new Date(o.createdAt).getTime() >= monthStart);
  const monthRevenue = monthOrders
    .filter((o) => o.orderStatus !== "CANCELLED" && o.orderStatus !== "REFUNDED")
    .reduce((s, o) => s + o.total, 0);
  const pendingOrders = db.orders.filter((o) => o.orderStatus === "PENDING").length;
  const activeProducts = db.products.filter((p) => p.isActive).length;
  const recentOrders = db.orders.slice(0, 10);
  const lowStock = db.products
    .filter((p) => p.isActive && p.trackInventory && p.stockQuantity <= p.lowStockThreshold)
    .slice(0, 10);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-ink-soft">Demo store — changes you make here live in your browser only.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Orders" value={todayOrders} icon="📦" />
        <StatCard label="This Month" value={monthOrders.length} icon="📈" />
        <StatCard label="Month Revenue" value={`TT$${monthRevenue.toLocaleString()}`} icon="💰" />
        <StatCard label="Pending Orders" value={pendingOrders} icon="⏳" highlight />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-paper p-6">
          <h2 className="font-display text-lg font-bold text-ink">Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="mt-4 text-sm text-ink-soft">No orders yet.</p>
          ) : (
            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-ink-soft">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium text-right">Total</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-line/50">
                    <td className="py-3 font-medium text-ink">
                      <Link href={`/admin/orders/${o.id}`} className="hover:text-wood">
                        {o.orderNumber}
                      </Link>
                    </td>
                    <td className="py-3 text-ink-soft">{o.customerName}</td>
                    <td className="py-3 text-right tabular-nums text-ink">TT${o.total}</td>
                    <td className="py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${statusClass(o.orderStatus)}`}>
                        {o.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-paper p-6">
          <h2 className="font-display text-lg font-bold text-ink">Quick Stats</h2>
          <dl className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-cream-light/50 p-4">
              <dt className="text-sm text-ink-soft">Active Products</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink">{activeProducts}</dd>
            </div>
            <div className="rounded-xl bg-cream-light/50 p-4">
              <dt className="text-sm text-ink-soft">Registered Users</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink">{db.customers.length}</dd>
            </div>
          </dl>

          {lowStock.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-warn">Low Stock Alert</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {lowStock.map((p) => (
                  <li key={p.id} className="text-ink-soft">
                    {p.name}: {p.stockQuantity} left
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string | number;
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${highlight ? "border-flame/30 bg-flame/5" : "border-line bg-paper"}`}>
      <div className="flex items-center gap-2 text-sm text-ink-soft">
        <span>{icon}</span>
        {label}
      </div>
      <p className={`mt-2 font-display text-3xl font-bold ${highlight ? "text-flame" : "text-ink"}`}>{value}</p>
    </div>
  );
}
