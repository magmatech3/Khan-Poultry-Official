"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useDemoDb } from "@/lib/admin/demo-store";

const LIMIT = 25;

export default function AdminCustomersPage() {
  const { db } = useDemoDb();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const rows = db?.customers ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [db, search]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / LIMIT));
  const current = Math.min(page, pages);
  const offset = (current - 1) * LIMIT;
  const list = filtered.slice(offset, offset + LIMIT);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-ink">Customers</h1>
      <p className="mt-1 text-ink-soft">View registered users and their activity.</p>

      <div className="mt-6">
        <input
          type="search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="min-w-[240px] rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50"
        />
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-paper">
        {list.length === 0 ? (
          <div className="p-8 text-center text-ink-soft">No customers found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-ink-soft">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr key={u.id} className="border-b border-line/50 hover:bg-cream-light/30">
                  <td className="px-4 py-3 font-medium text-ink">
                    <Link href={`/admin/customers/${u.id}`} className="hover:text-wood">
                      {u.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{u.email}</td>
                  <td className="px-4 py-3 text-ink-soft">{u.phone ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-soft">{u.roleName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                        u.isActive ? "bg-leaf/10 text-leaf" : "bg-ink/10 text-ink-soft"
                      }`}
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
