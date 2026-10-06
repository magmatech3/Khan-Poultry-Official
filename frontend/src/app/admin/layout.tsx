"use client";

import Link from "next/link";
import { useState } from "react";
import { login, resetDb, useIsAuthed } from "@/lib/admin/demo-store";
import { AdminNav } from "./nav";
import { LogoutButton } from "./logout-button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = useIsAuthed();

  if (!authed) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-paper">
      <aside className="fixed left-0 top-0 z-40 h-full w-64 border-r border-line bg-paper">
        <div className="flex h-full flex-col">
          <div className="border-b border-line px-5 py-4">
            <Link href="/admin" className="font-display text-lg font-bold text-ink">
              Khan&apos;s Admin
            </Link>
            <span className="ml-2 rounded-full bg-warn/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-warn">
              Demo
            </span>
          </div>
          <AdminNav />
          <div className="mt-auto space-y-2 border-t border-line p-4">
            <LogoutButton />
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Reset all demo data back to its seeded state?")) {
                  resetDb();
                  window.location.reload();
                }
              }}
              className="block w-full rounded-lg border border-line px-3 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-warn/40 hover:bg-warn/5 hover:text-warn"
            >
              Reset demo data
            </button>
            <Link href="/" className="block text-center text-xs text-ink-soft hover:text-ink">
              back to site
            </Link>
          </div>
        </div>
      </aside>
      <main className="ml-64 min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        className="w-full max-w-sm rounded-2xl border border-line bg-paper p-8 shadow-sm"
      >
        <h1 className="font-display text-2xl font-bold text-ink">Admin demo</h1>
        <p className="mt-1 text-sm text-ink-soft">
          This is a front-end demo. Any credentials work — for example{" "}
          <span className="font-medium text-ink">demo@khans.local / demo123</span>.
        </p>

        <label className="mt-6 block text-sm font-medium text-ink">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="demo@khans.local"
          className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        />

        <label className="mt-4 block text-sm font-medium text-ink">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="demo123"
          className="mt-1.5 w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        />

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-wood px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-flame"
        >
          Sign in
        </button>
        <Link href="/" className="mt-4 block text-center text-xs text-ink-soft hover:text-ink">
          back to site
        </Link>
      </form>
    </div>
  );
}
