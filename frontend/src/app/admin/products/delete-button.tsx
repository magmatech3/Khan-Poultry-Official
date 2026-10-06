"use client";

import { useState } from "react";
import { useDemoDb } from "@/lib/admin/demo-store";

export function DeleteProductButton({ id, name }: { id: number; name: string }) {
  const { update } = useDemoDb();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        if (!window.confirm(`Remove "${name}" from the menu? It will be deactivated, not deleted.`)) return;
        setBusy(true);
        update((draft) => {
          const product = draft.products.find((p) => p.id === id);
          if (product) product.isActive = false;
        });
        setBusy(false);
      }}
      disabled={busy}
      className="rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-danger transition-colors hover:border-danger/40 hover:bg-danger/5 disabled:opacity-50"
    >
      {busy ? "…" : "Remove"}
    </button>
  );
}
