"use client";

import { useState } from "react";
import { useDemoDb } from "@/lib/admin/demo-store";

export function SettingsForm() {
  const { db, update } = useDemoDb();
  const [saved, setSaved] = useState(false);

  if (!db) return <p className="mt-4 text-sm text-ink-soft">Loading settings…</p>;

  const save = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    update((draft) => {
      draft.settings.storeName = String(form.get("storeName") ?? draft.settings.storeName);
      draft.settings.freeDeliveryThreshold = Number(form.get("freeDeliveryThreshold") ?? draft.settings.freeDeliveryThreshold);
      draft.settings.allowOrders = form.get("allowOrders") === "on";
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={save} className="mt-4 space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Store Name</label>
        <input
          name="storeName"
          defaultValue={db.settings.storeName}
          className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Contact Email</label>
        <input
          name="contactEmail"
          type="email"
          defaultValue="orders@khanspoultry.local"
          className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Contact Phone</label>
        <input
          name="contactPhone"
          defaultValue="+1 868-XXX-XXXX"
          className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Free Delivery Threshold (TTD)</label>
        <input
          name="freeDeliveryThreshold"
          type="number"
          defaultValue={db.settings.freeDeliveryThreshold}
          className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink"
        />
      </div>
      <div>
        <label className="flex items-center gap-2">
          <input
            name="allowOrders"
            type="checkbox"
            defaultChecked={db.settings.allowOrders}
            className="h-4 w-4 rounded border-line"
          />
          <span className="text-sm text-ink">Accept online orders</span>
        </label>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-wood px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-flame"
      >
        {saved ? "Saved!" : "Save Settings"}
      </button>
    </form>
  );
}
