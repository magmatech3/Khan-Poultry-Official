"use client";

import { useCallback, useMemo, useState } from "react";
import type { AnalyticsPayload } from "@/lib/admin/analytics";
import { buildAnalytics } from "@/lib/admin/analytics";
import { useDemoDb } from "@/lib/admin/demo-store";
import { BarChart, EmptyState, LineChart, fmtMoney, pct } from "@/components/admin/charts";

const NO_DATA = "No data for this date range";
const NO_SESSIONS = "No session data for this date range. Session tracking starts now, so past ranges stay empty.";

function iso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function presetRange(key: string, now: Date): { from: string; to: string } {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  switch (key) {
    case "today":
      return { from: iso(today), to: iso(today) };
    case "yesterday": {
      const d = new Date(today.getTime() - 86400000);
      return { from: iso(d), to: iso(d) };
    }
    case "last7":
      return { from: iso(new Date(today.getTime() - 6 * 86400000)), to: iso(today) };
    case "last30":
      return { from: iso(new Date(today.getTime() - 29 * 86400000)), to: iso(today) };
    case "thisMonth":
      return { from: iso(new Date(today.getFullYear(), today.getMonth(), 1)), to: iso(today) };
    case "lastMonth": {
      const first = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const last = new Date(today.getFullYear(), today.getMonth(), 0);
      return { from: iso(first), to: iso(last) };
    }
    default:
      return { from: iso(new Date(today.getTime() - 29 * 86400000)), to: iso(today) };
  }
}

const PRESETS: { key: string; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "last7", label: "Last 7 days" },
  { key: "last30", label: "Last 30 days" },
  { key: "thisMonth", label: "This month" },
  { key: "lastMonth", label: "Last month" },
  { key: "custom", label: "Custom" },
];

type Column = { label: React.ReactNode; key: string; right?: boolean; className?: string };

function DataTable({ columns, rows }: { columns: Column[]; rows: Record<string, React.ReactNode>[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line text-left text-ink-soft">
            {columns.map((c) => (
              <th key={c.key} className={`px-3 py-2 font-medium ${c.right ? "text-right" : ""} ${c.className ?? ""}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-line/50">
              {columns.map((c) => (
                <td key={c.key} className={`px-3 py-2 ${c.right ? "text-right tabular-nums" : ""}`}>
                  {r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-paper p-5">
      <h2 className="font-display text-base font-bold text-ink">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-ink-soft">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-5">
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-ink">{value}</p>
      {sub && <p className="mt-1 text-xs text-ink-soft">{sub}</p>}
    </div>
  );
}

export function AnalyticsDashboard() {
  const { db } = useDemoDb();
  const [preset, setPreset] = useState("last30");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [customRange, setCustomRange] = useState<{ from: string; to: string } | null>(null);
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 }>({ key: "gross", dir: -1 });

  const range = useMemo(() => customRange ?? presetRange(preset, new Date()), [customRange, preset]);
  const usedFrom = range.from;
  const usedTo = range.to;
  const data = useMemo(() => (db ? buildAnalytics(db, range.from, range.to) : null), [db, range]);

  const apply = useCallback((p: string, from: string, to: string) => {
    setPreset(p);
    setCustomRange({ from, to });
  }, []);

  const choosePreset = (key: string) => {
    if (key === "custom") {
      setPreset("custom");
      if (customFrom && customTo) apply("custom", customFrom, customTo);
      return;
    }
    const r = presetRange(key, new Date());
    apply(key, r.from, r.to);
  };

  const sym = data?.currencySymbol ?? "TT$";

  const productRows = useMemo(() => {
    if (!data) return [];
    const rows = [...data.salesByProduct];
    const order = sort.dir;
    rows.sort((a, b) => {
      const av = a[sort.key as keyof typeof a];
      const bv = b[sort.key as keyof typeof b];
      const an = typeof av === "number" ? av : String(av ?? "").toLowerCase();
      const bn = typeof bv === "number" ? bv : String(bv ?? "").toLowerCase();
      if (an < bn) return -1 * order;
      if (an > bn) return 1 * order;
      return 0;
    });
    return rows;
  }, [data, sort]);

  const toggleSort = (key: string) => setSort((s) => ({ key, dir: s.key === key ? (s.dir * -1) as 1 | -1 : -1 }));

  const chartMoney = (n: number) => fmtMoney(n, sym);
  const hasOrdersSections = !!data && data.hasOrders;
  const hasSessionsSections = !!data && data.hasSessions;

  const breakDownRows = data
    ? [
        { label: "Gross sales", value: data.salesBreakdown.grossSales },
        { label: "Discounts", value: -data.salesBreakdown.discounts },
        { label: "Sales reversals", value: -data.salesBreakdown.salesReversals },
        { label: "Net sales", value: data.salesBreakdown.netSales },
        { label: "Shipping", value: data.salesBreakdown.shipping },
        { label: "Return fees", value: data.salesBreakdown.returnFees },
        { label: "Taxes", value: data.salesBreakdown.taxes },
        { label: "Total sales", value: data.salesBreakdown.totalSales },
      ]
    : [];

  const maxCohortOffset = useMemo(() => Math.max(0, ...(data?.cohorts ?? []).flatMap((c) => c.cells.map((x) => x.offset))), [data]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Analytics</h1>
          <p className="mt-1 text-ink-soft">Shop performance for the selected date range.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => choosePreset(p.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                preset === p.key ? "bg-wood text-cream" : "border border-line text-ink-soft hover:text-ink"
              }`}
            >
              {p.label}
            </button>
          ))}
          {preset === "custom" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="rounded-lg border border-line bg-paper px-2 py-1.5 text-xs text-ink"
              />
              <span className="text-xs text-ink-soft">to</span>
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="rounded-lg border border-line bg-paper px-2 py-1.5 text-xs text-ink"
              />
              <button
                type="button"
                onClick={() => customFrom && customTo && apply("custom", customFrom, customTo)}
                className="rounded-lg bg-wood px-3 py-1.5 text-xs font-semibold text-cream hover:bg-flame"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {!data && <p className="mt-6 text-sm text-ink-soft">Loading analytics…</p>}

      {data && (
        <div className="mt-8 space-y-8">
          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Gross Sales" value={fmtMoney(data.summary.grossSales, sym)} sub={rangeLabel(usedFrom, usedTo)} />
            <StatCard
              label="Returning Customers"
              value={String(data.summary.returningCustomers)}
              sub={data.summary.returningCustomerRate > 0 ? `${pct(data.summary.returningCustomerRate)} of customers` : undefined}
            />
            <StatCard label="Orders Fulfilled" value={String(data.summary.ordersFulfilled)} />
            <StatCard label="Orders" value={String(data.summary.orders)} sub={`${fmtMoney(data.summary.sales, sym)} sales`} />
          </div>

          {/* Sales over time */}
          <Card title="Sales over time" subtitle="Order total per time bucket">
            {!hasOrdersSections ? (
              <EmptyState />
            ) : (
              <LineChart points={data.salesOverTime.map((p) => ({ label: p.label, value: p.value }))} format={chartMoney} />
            )}
          </Card>

          {/* Sales breakdown */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Sales breakdown" subtitle="Gross − discounts − reversals = Net. Net + shipping + return fees + taxes = Total">
              {!hasOrdersSections ? (
                <EmptyState />
              ) : (
                <dl className="divide-y divide-line/50 text-sm">
                  {breakDownRows.map((r) => (
                    <div key={r.label} className="flex items-center justify-between py-2">
                      <dt className="text-ink-soft">{r.label}</dt>
                      <dd className={`tabular-nums font-medium ${r.value < 0 ? "text-danger" : "text-ink"}`}>{fmtMoney(r.value, sym)}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </Card>
            <Card title="Total sales breakdown" subtitle="Relative contribution of each component">
              {!hasOrdersSections ? (
                <EmptyState />
              ) : (
                <div className="pt-2">
                  <BarChart
                    rows={breakDownRows.map((r) => ({ label: r.label, value: Math.abs(r.value) }))}
                    format={chartMoney}
                  />
                </div>
              )}
            </Card>
          </div>

          {/* Sessions over time */}
          <Card title="Sessions over time" subtitle="Session count per time bucket">
            {!hasSessionsSections ? (
              <EmptyState message={NO_SESSIONS} />
            ) : (
              <LineChart points={data.sessionsOverTime.map((p) => ({ label: p.label, value: p.value }))} format={(n) => String(Math.round(n))} color="#b45309" />
            )}
          </Card>

          {/* Sales by channel */}
          <Card title="Total sales by sales channel" subtitle="Only channels present in the database are shown">
            {!hasOrdersSections ? (
              <EmptyState />
            ) : (
              <DataTable
                columns={[
                  { label: "Channel", key: "channel" },
                  { label: "Orders", key: "orders", right: true },
                  { label: "Sales", key: "sales", right: true },
                ]}
                rows={data.salesByChannel.map((c) => ({
                  channel: <span className="font-medium text-ink">{c.channel}</span>,
                  orders: c.orders,
                  sales: fmtMoney(c.sales, sym),
                }))}
              />
            )}
          </Card>

          {/* AOV + conversion */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Average order value over time" subtitle="Total sales ÷ number of orders">
              {!hasOrdersSections ? (
                <EmptyState />
              ) : (
                <LineChart points={data.aovOverTime.map((p) => ({ label: p.label, value: p.value }))} format={chartMoney} />
              )}
            </Card>
            <Card title="Conversion rate over time" subtitle="Orders ÷ sessions × 100">
              {!hasSessionsSections ? (
                <EmptyState message={NO_SESSIONS} />
              ) : (
                <LineChart points={data.conversionOverTime.map((p) => ({ label: p.label, value: p.value }))} format={(n) => pct(n)} />
              )}
            </Card>
          </div>

          {/* Sales by product */}
          <Card title="Total sales by product" subtitle="Discounts are apportioned by each product's share of order subtotal">
            {!hasOrdersSections ? (
              <EmptyState />
            ) : data.salesByProduct.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line text-left text-ink-soft">
                      <th className="px-3 py-2 font-medium">Product</th>
                      {(["unitsSold", "gross", "discounts", "net", "total"] as const).map((k) => (
                        <th key={k} className="cursor-pointer px-3 py-2 text-right font-medium hover:text-ink" onClick={() => toggleSort(k)}>
                          {sort.key === k && <span className="mr-1 text-ink">{sort.dir === -1 ? "↓" : "↑"}</span>}
                          {k === "unitsSold" ? "Units" : k[0].toUpperCase() + k.slice(1)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {productRows.map((p, i) => (
                      <tr key={i} className="border-b border-line/50">
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            {p.imageUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={p.imageUrl} alt="" className="h-8 w-8 rounded object-cover" />
                            ) : (
                              <span className="h-8 w-8 rounded bg-cream-light" />
                            )}
                            <span className="font-medium text-ink">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">{p.unitsSold}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{fmtMoney(p.gross, sym)}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{fmtMoney(p.discounts, sym)}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{fmtMoney(p.net, sym)}</td>
                        <td className="px-3 py-2 text-right tabular-nums font-medium text-ink">{fmtMoney(p.total, sym)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* Conversion breakdown */}
          <Card title="Conversion rate breakdown" subtitle="By date and by sales channel (channel sessions are not yet linked)">
            {!hasOrdersSections ? (
              <EmptyState />
            ) : (
              <DataTable
                columns={[
                  { label: "Dimension", key: "dimension" },
                  { label: "Label", key: "label" },
                  { label: "Orders", key: "orders", right: true },
                  { label: "Sessions", key: "sessions", right: true },
                  { label: "Rate", key: "rate", right: true },
                ]}
                rows={data.conversionBreakdown.map((r) => ({
                  dimension: <span className="capitalize text-ink-soft">{r.dimension}</span>,
                  label: r.label,
                  orders: r.orders,
                  sessions: r.sessions === null ? "—" : r.sessions,
                  rate: r.rate === null ? "—" : pct(r.rate),
                }))}
              />
            )}
          </Card>

          {/* Sessions by device & location */}
          <div className="grid gap-6 lg:grid-cols-2">
            <DeviceTable data={data} has={hasSessionsSections} sym={sym} />
            <LocationTable data={data} has={hasSessionsSections} sym={sym} />
          </div>

          {/* Social referrers */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Total sales by social referrer" subtitle="Sales are not yet attributable to a social visit, so this stays empty.">
              <EmptyState message={NO_DATA} />
            </Card>
            <Card title="Sessions by social referrer">
              {!hasSessionsSections ? (
                <EmptyState message={NO_SESSIONS} />
              ) : data.sessionsBySocialReferrer.length === 0 ? (
                <EmptyState />
              ) : (
                <DataTable
                  columns={[
                    { label: "Platform", key: "source" },
                    { label: "Sessions", key: "sessions", right: true },
                    { label: "%", key: "pct", right: true },
                  ]}
                  rows={data.sessionsBySocialReferrer.map((s) => ({
                    source: <span className="font-medium text-ink">{s.source}</span>,
                    sessions: s.sessions,
                    pct: pct(s.pct),
                  }))}
                />
              )}
            </Card>
          </div>

          {/* Landing pages */}
          <Card title="Sessions by landing page">
            {!hasSessionsSections ? (
              <EmptyState message={NO_SESSIONS} />
            ) : (
              <DataTable
                columns={[
                  { label: "Landing page", key: "page" },
                  { label: "Sessions", key: "sessions", right: true },
                  { label: "%", key: "pct", right: true },
                  { label: "Orders / Sales", key: "orders", right: true },
                ]}
                rows={data.sessionsByLandingPage.map((p) => ({
                  page: <span className="font-medium text-ink">{p.landingPage}</span>,
                  sessions: p.sessions,
                  pct: pct(p.pct),
                  orders: "—",
                }))}
              />
            )}
          </Card>

          {/* Referring channel performance */}
          <Card title="Performance by referring channel" subtitle="Sessions grouped by referrer. Orders/sales per referrer are not yet linked.">
            {!hasSessionsSections ? (
              <EmptyState message={NO_SESSIONS} />
            ) : (
              <DataTable
                columns={[
                  { label: "Referrer", key: "referrer" },
                  { label: "Source", key: "source" },
                  { label: "Sessions", key: "sessions", right: true },
                  { label: "Orders", key: "orders", right: true },
                  { label: "Conv.", key: "rate", right: true },
                  { label: "Sales", key: "sales", right: true },
                  { label: "AOV", key: "aov", right: true },
                ]}
                rows={data.referrerStats.map((r) => ({
                  referrer: <span className="font-medium text-ink">{r.referrer}</span>,
                  source: r.source ?? "—",
                  sessions: r.sessions,
                  orders: "—",
                  rate: "—",
                  sales: "—",
                  aov: "—",
                }))}
              />
            )}
          </Card>

          {/* Referrer sales + sessions */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Total sales by referrer" subtitle="Order-to-referrer attribution is not wired up yet, so sales stay empty.">
              {!hasSessionsSections ? (
                <EmptyState message={NO_SESSIONS} />
              ) : (
                <DataTable
                  columns={[
                    { label: "Referrer", key: "referrer" },
                    { label: "Sessions", key: "sessions", right: true },
                    { label: "Orders", key: "orders", right: true },
                    { label: "Sale", key: "sales", right: true },
                  ]}
                  rows={data.referrerStats.map((r) => ({
                    referrer: <span className="font-medium text-ink">{r.referrer}</span>,
                    sessions: r.sessions,
                    orders: "—",
                    sales: "—",
                  }))}
                />
              )}
            </Card>
            <Card title="Sessions by referrer">
              {!hasSessionsSections ? (
                <EmptyState message={NO_SESSIONS} />
              ) : (
                <DataTable
                  columns={[
                    { label: "Referrer", key: "referrer" },
                    { label: "Sessions", key: "sessions", right: true },
                    { label: "%", key: "pct", right: true },
                    { label: "Orders", key: "orders", right: true },
                  ]}
                  rows={data.referrerStats.map((r) => ({
                    referrer: <span className="font-medium text-ink">{r.referrer}</span>,
                    sessions: r.sessions,
                    pct: pct(data.sessionsOverTime.reduce((s, p) => s + p.value, 0) > 0 ? (r.sessions / data.sessionsOverTime.reduce((s, p) => s + p.value, 0)) * 100 : 0),
                    orders: "—",
                  }))}
                />
              )}
            </Card>
          </div>

          {/* Cohorts */}
          <Card title="Customer cohort analysis" subtitle="Repeat-purchase % by month since first purchase, from real order history.">
            {data.cohorts.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line text-left text-ink-soft">
                      <th className="px-3 py-2 font-medium">Cohort</th>
                      <th className="px-3 py-2 text-right font-medium">Customers</th>
                      {Array.from({ length: Math.min(maxCohortOffset + 1, 12) }, (_, i) => (
                        <th key={i} className="px-2 py-2 text-right font-medium">
                          M{i}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.cohorts.map((c) => (
                      <tr key={c.month} className="border-b border-line/50">
                        <td className="px-3 py-2 font-medium text-ink">{c.month}</td>
                        <td className="px-3 py-2 text-right tabular-nums text-ink-soft">{c.customers}</td>
                        {Array.from({ length: Math.min(maxCohortOffset + 1, 12) }, (_, i) => {
                          const cell = c.cells.find((x) => x.offset === i);
                          return (
                            <td key={i} className="px-2 py-2 text-right tabular-nums">
                              {cell ? <span className="font-medium text-leaf">{pct(cell.pct)}</span> : "—"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* Sell-through */}
          <Card title="Products by sell-through rate" subtitle="Sell-through = units sold ÷ (units sold + available stock) × 100, for tracked-inventory products in range.">
            {!hasOrdersSections ? (
              <EmptyState />
            ) : data.sellThrough.length === 0 ? (
              <EmptyState />
            ) : (
              <DataTable
                columns={[
                  { label: "Product", key: "name" },
                  { label: "Units sold", key: "units", right: true },
                  { label: "Available", key: "available", right: true },
                  { label: "Sell-through", key: "rate", right: true },
                ]}
                rows={data.sellThrough.map((p) => ({
                  name: <span className="font-medium text-ink">{p.name}</span>,
                  units: p.unitsSold,
                  available: p.available === null ? "—" : p.available,
                  rate: p.rate === null ? "—" : pct(p.rate),
                }))}
              />
            )}
          </Card>

          {/* POS */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="POS staff sales total" subtitle="POS is not implemented — no staff sales data exists.">
              <EmptyState message="Point of sale is not set up yet. No staff data to show." />
            </Card>
            <Card title="Total sales by POS location" subtitle="POS is not implemented — no location data exists.">
              <EmptyState message="Point of sale is not set up yet. No location data to show." />
            </Card>
          </div>

          <p className="text-xs text-ink-soft">
            Currency {sym} · Range {rangeLabel(usedFrom, usedTo)}. Demo data — analytics are computed in your browser from the
            sample orders, nothing leaves this page.
          </p>
        </div>
      )}
    </div>
  );
}

function rangeLabel(from: string, to: string): string {
  if (!from && !to) return "";
  if (from === to) return from;
  return `${from} – ${to}`;
}

function DeviceTable({ data, has, sym }: { data: AnalyticsPayload; has: boolean; sym: string }) {
  void sym;
  return (
    <Card title="Sessions by device type">
      {!has ? (
        <EmptyState message={NO_SESSIONS} />
      ) : (
        <DataTable
          columns={[
            { label: "Device", key: "device" },
            { label: "Sessions", key: "sessions", right: true },
            { label: "%", key: "pct", right: true },
          ]}
          rows={data.sessionsByDevice.map((d) => ({
            device: <span className="capitalize font-medium text-ink">{d.device.toLowerCase()}</span>,
            sessions: d.sessions,
            pct: pct(d.pct),
          }))}
        />
      )}
    </Card>
  );
}

function LocationTable({ data, has, sym }: { data: AnalyticsPayload; has: boolean; sym: string }) {
  void sym;
  return (
    <Card title="Sessions by location (country)">
      {!has ? (
        <EmptyState message={NO_SESSIONS} />
      ) : (
        <DataTable
          columns={[
            { label: "Country", key: "country" },
            { label: "Sessions", key: "sessions", right: true },
            { label: "%", key: "pct", right: true },
          ]}
          rows={data.sessionsByLocation.map((l) => ({
            country: <span className="font-medium text-ink">{l.country}</span>,
            sessions: l.sessions,
            pct: pct(l.pct),
          }))}
        />
      )}
    </Card>
  );
}