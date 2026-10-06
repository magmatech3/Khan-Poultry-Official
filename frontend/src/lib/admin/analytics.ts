import type { DemoDb, DemoOrder } from "./seed";

export interface AnalyticsPayload {
  currencySymbol: string;
  summary: {
    grossSales: number;
    returningCustomers: number;
    returningCustomerRate: number;
    ordersFulfilled: number;
    orders: number;
    sales: number;
  };
  hasOrders: boolean;
  hasSessions: boolean;
  salesOverTime: { label: string; value: number }[];
  salesBreakdown: {
    grossSales: number;
    discounts: number;
    salesReversals: number;
    netSales: number;
    shipping: number;
    returnFees: number;
    taxes: number;
    totalSales: number;
  };
  sessionsOverTime: { label: string; value: number }[];
  salesByChannel: { channel: string; orders: number; sales: number }[];
  aovOverTime: { label: string; value: number }[];
  conversionOverTime: { label: string; value: number }[];
  salesByProduct: { name: string; imageUrl: string | null; unitsSold: number; gross: number; discounts: number; net: number; total: number }[];
  conversionBreakdown: { dimension: string; label: string; orders: number; sessions: number | null; rate: number | null }[];
  sessionsByDevice: { device: string; sessions: number; pct: number }[];
  sessionsByLocation: { country: string; sessions: number; pct: number }[];
  sessionsBySocialReferrer: { source: string; sessions: number; pct: number }[];
  sessionsByLandingPage: { landingPage: string; sessions: number; pct: number }[];
  referrerStats: { referrer: string; source: string | null; sessions: number }[];
  cohorts: { month: string; customers: number; cells: { offset: number; pct: number }[] }[];
  sellThrough: { name: string; unitsSold: number; available: number | null; rate: number | null }[];
}

const round2 = (n: number) => Math.round(n * 100) / 100;

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function label(d: Date): string {
  return `${d.getDate()} ${d.toLocaleString("en", { month: "short" })}`;
}

interface Bucket {
  from: string;
  to: string;
  label: string;
}

function buildBuckets(from: string, to: string): Bucket[] {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);
  const step = days > 62 ? 7 : 1;
  const buckets: Bucket[] = [];
  for (let t = start.getTime(); t <= end.getTime(); t += step * 86400000) {
    const s = new Date(t);
    const e = new Date(Math.min(t + (step - 1) * 86400000, end.getTime()));
    buckets.push({
      from: dayKey(s),
      to: dayKey(e),
      label: step === 1 ? label(s) : `${label(s)} – ${label(e)}`,
    });
  }
  return buckets;
}

function inRange(order: DemoOrder, from: string, to: string): boolean {
  const key = dayKey(new Date(order.createdAt));
  return key >= from && key <= to;
}

export function buildAnalytics(db: DemoDb, from: string, to: string): AnalyticsPayload {
  const sym = db.settings.currencySymbol;
  const orders = db.orders.filter((o) => inRange(o, from, to));
  const valid = orders.filter((o) => o.orderStatus !== "CANCELLED" && o.orderStatus !== "REFUNDED");
  const buckets = buildBuckets(from, to);

  const sumTotal = (rows: DemoOrder[]) => round2(rows.reduce((s, o) => s + o.total, 0));
  const totalSales = sumTotal(valid);
  const refunds = sumTotal(orders.filter((o) => o.orderStatus === "REFUNDED"));
  const shipping = round2(valid.reduce((s, o) => s + o.deliveryFee, 0));
  const ordersFulfilled = orders.filter((o) => o.orderStatus === "COMPLETED").length;

  const ordersByCustomer = new Map<number, number>();
  for (const o of valid) {
    if (o.userId != null) ordersByCustomer.set(o.userId, (ordersByCustomer.get(o.userId) ?? 0) + 1);
  }
  const returningCustomers = [...ordersByCustomer.values()].filter((n) => n > 1).length;
  const uniqueCustomers = ordersByCustomer.size;

  const salesOverTime = buckets.map((b) => ({
    label: b.label,
    value: round2(valid.filter((o) => dayKey(new Date(o.createdAt)) >= b.from && dayKey(new Date(o.createdAt)) <= b.to).reduce((s, o) => s + o.total, 0)),
  }));

  const ordersOverTime = buckets.map((b) => valid.filter((o) => dayKey(new Date(o.createdAt)) >= b.from && dayKey(new Date(o.createdAt)) <= b.to).length);

  const aovOverTime = buckets.map((b, i) => ({
    label: b.label,
    value: ordersOverTime[i] > 0 ? round2(salesOverTime[i].value / ordersOverTime[i]) : 0,
  }));

  // Synthetic session data — the demo has no real traffic source.
  const sessionsOverTime = ordersOverTime.map((n, i) => ({
    label: buckets[i].label,
    value: n > 0 ? n * 7 + (i % 3) * 2 : 6 + (i % 4),
  }));
  const totalSessions = sessionsOverTime.reduce((s, p) => s + p.value, 0);
  const conversionOverTime = buckets.map((b, i) => ({
    label: b.label,
    value: sessionsOverTime[i].value > 0 ? (ordersOverTime[i] / sessionsOverTime[i].value) * 100 : 0,
  }));

  const productMap = new Map<string, { name: string; imageUrl: string | null; unitsSold: number; gross: number; net: number }>();
  for (const o of valid) {
    for (const item of o.items) {
      const existing = productMap.get(item.productName) ?? {
        name: item.productName,
        imageUrl: db.products.find((p) => p.id === item.productId)?.imageUrl ?? null,
        unitsSold: 0,
        gross: 0,
        net: 0,
      };
      existing.unitsSold = round2(existing.unitsSold + item.quantity);
      existing.gross = round2(existing.gross + item.subtotal);
      existing.net = round2(existing.net + item.subtotal);
      productMap.set(item.productName, existing);
    }
  }
  const salesByProduct = [...productMap.values()]
    .map((p) => ({ ...p, discounts: 0, total: p.net }))
    .sort((a, b) => b.total - a.total);

  const salesByChannel = [
    { channel: "Online", orders: valid.filter((o) => o.fulfilmentType === "DELIVERY").length, sales: sumTotal(valid.filter((o) => o.fulfilmentType === "DELIVERY")) },
    { channel: "Store pickup", orders: valid.filter((o) => o.fulfilmentType === "PICKUP").length, sales: sumTotal(valid.filter((o) => o.fulfilmentType === "PICKUP")) },
  ];

  const sessionsByDevice = [
    { device: "MOBILE", share: 0.62 },
    { device: "DESKTOP", share: 0.31 },
    { device: "TABLET", share: 0.07 },
  ].map((d) => ({ device: d.device, sessions: Math.round(totalSessions * d.share), pct: round2(d.share * 100) }));

  const sessionsByLocation = [
    { country: "Trinidad and Tobago", share: 0.88 },
    { country: "United States", share: 0.07 },
    { country: "Canada", share: 0.05 },
  ].map((l) => ({ country: l.country, sessions: Math.round(totalSessions * l.share), pct: round2(l.share * 100) }));

  const sessionsBySocialReferrer = [
    { source: "Instagram", share: 0.46 },
    { source: "Facebook", share: 0.34 },
    { source: "TikTok", share: 0.2 },
  ].map((s) => ({ source: s.source, sessions: Math.round(totalSessions * 0.18 * s.share), pct: round2(s.share * 100) }));

  const sessionsByLandingPage = [
    { landingPage: "/", share: 0.44 },
    { landingPage: "/menu", share: 0.29 },
    { landingPage: "/recipes", share: 0.16 },
    { landingPage: "/directions", share: 0.11 },
  ].map((p) => ({ landingPage: p.landingPage, sessions: Math.round(totalSessions * p.share), pct: round2(p.share * 100) }));

  const referrerStats = [
    { referrer: "instagram.com", source: "social" },
    { referrer: "facebook.com", source: "social" },
    { referrer: "google.com", source: "search" },
    { referrer: "(direct)", source: null },
  ].map((r, i) => ({ ...r, sessions: Math.round(totalSessions * [0.22, 0.17, 0.33, 0.28][i]) }));

  const cohortMap = new Map<string, { first: string; orders: Map<number, Set<number>>; customers: number }>();
  for (const o of db.orders) {
    if (o.userId == null) continue;
    const created = new Date(o.createdAt);
    const month = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, "0")}`;
    const entry = cohortMap.get(month) ?? { first: month, orders: new Map(), customers: 0 };
    const firstMonth = db.orders
      .filter((x) => x.userId === o.userId)
      .map((x) => new Date(x.createdAt))
      .sort((a, b) => a.getTime() - b.getTime())[0];
    const firstKey = `${firstMonth.getFullYear()}-${String(firstMonth.getMonth() + 1).padStart(2, "0")}`;
    entry.first = firstKey;
    entry.customers += 1;
    const offset = (created.getFullYear() - firstMonth.getFullYear()) * 12 + (created.getMonth() - firstMonth.getMonth());
    const set = entry.orders.get(offset) ?? new Set<number>();
    set.add(o.userId);
    entry.orders.set(offset, set);
    cohortMap.set(month, entry);
  }

  const cohorts = [...cohortMap.values()]
    .sort((a, b) => a.first.localeCompare(b.first))
    .map((c) => ({
      month: c.first,
      customers: c.customers,
      cells: [...c.orders.entries()].map(([offset, set]) => ({
        offset: Math.max(0, offset),
        pct: c.customers > 0 ? round2((set.size / c.customers) * 100) : 0,
      })),
    }));

  const soldByProduct = new Map(salesByProduct.map((p) => [p.name, p.unitsSold]));
  const sellThrough = db.products
    .filter((p) => p.trackInventory)
    .map((p) => {
      const units = soldByProduct.get(p.name) ?? 0;
      const available = p.stockQuantity;
      return {
        name: p.name,
        unitsSold: units,
        available,
        rate: units + available > 0 ? round2((units / (units + available)) * 100) : null,
      };
    })
    .sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));

  return {
    currencySymbol: sym,
    summary: {
      grossSales: totalSales + refunds,
      returningCustomers,
      returningCustomerRate: uniqueCustomers > 0 ? round2((returningCustomers / uniqueCustomers) * 100) : 0,
      ordersFulfilled,
      orders: orders.length,
      sales: totalSales,
    },
    hasOrders: orders.length > 0,
    hasSessions: true,
    salesOverTime,
    salesBreakdown: {
      grossSales: round2(totalSales + refunds),
      discounts: 0,
      salesReversals: refunds,
      netSales: totalSales,
      shipping,
      returnFees: 0,
      taxes: 0,
      totalSales: round2(totalSales + shipping),
    },
    sessionsOverTime,
    salesByChannel,
    aovOverTime,
    conversionOverTime,
    salesByProduct,
    conversionBreakdown: buckets.map((b, i) => ({
      dimension: "date",
      label: b.label,
      orders: ordersOverTime[i],
      sessions: sessionsOverTime[i].value,
      rate: sessionsOverTime[i].value > 0 ? round2((ordersOverTime[i] / sessionsOverTime[i].value) * 100) : null,
    })),
    sessionsByDevice,
    sessionsByLocation,
    sessionsBySocialReferrer,
    sessionsByLandingPage,
    referrerStats,
    cohorts,
    sellThrough,
  };
}
