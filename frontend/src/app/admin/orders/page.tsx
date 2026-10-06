"use client";

import { useMemo, useState } from "react";
import { useDemoDb } from "@/lib/admin/demo-store";
import { OrderTable } from "./table";

const STATUSES = [
  { value: "all", label: "All statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "PREPARING", label: "Preparing" },
  { value: "READY", label: "Ready" },
  { value: "OUT_FOR_DELIVERY", label: "Out for delivery" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const LIMIT = 25;

export default function AdminOrdersPage() {
  const { db } = useDemoDb();
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const rows = db?.orders ?? [];
    const q = search.trim().toLowerCase();
    return rows.filter((o) => {
      if (status !== "all" && o.orderStatus !== status) return false;
      if (!q) return true;
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
      );
    });
  }, [db, status, search]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / LIMIT));
  const current = Math.min(page, pages);
  const offset = (current - 1) * LIMIT;
  const list = filtered.slice(offset, offset + LIMIT);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Orders</h1>
          <p className="mt-1 text-ink-soft">Manage customer orders and fulfilment.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <input
          type="search"
          placeholder="Search by number, name, email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="min-w-[240px] rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50"
        />
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-paper">
        <OrderTable orders={list} />
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
