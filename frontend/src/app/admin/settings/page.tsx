import { SettingsForm } from "./form";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-ink">Settings</h1>
      <p className="mt-1 text-ink-soft">Manage store configuration and preferences.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-paper p-6">
          <h2 className="font-display text-lg font-bold text-ink">Store Settings</h2>
          <SettingsForm />
        </div>

        <div className="rounded-2xl border border-line bg-paper p-6">
          <h2 className="font-display text-lg font-bold text-ink">Delivery Zones</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Configure delivery fees by zone. Minimum order TT$500 for free delivery.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink">
              <span>Port of Spain</span>
              <span>TT$35</span>
            </div>
            <div className="flex justify-between text-ink">
              <span>San Juan / St. Joseph</span>
              <span>TT$30</span>
            </div>
            <div className="flex justify-between text-ink">
              <span>Diego Martin / Petit Valley</span>
              <span>TT$35</span>
            </div>
            <div className="flex justify-between text-ink">
              <span>Arima / Arouca</span>
              <span>TT$40</span>
            </div>
            <div className="flex justify-between text-ink">
              <span>Other areas</span>
              <span>TT$45</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
