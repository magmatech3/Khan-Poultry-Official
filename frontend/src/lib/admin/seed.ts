import { listAllProducts, listBranchOptions } from "@/lib/catalog";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/settings";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentStatus = "UNPAID" | "PENDING" | "PAID" | "REFUNDED";

export interface DemoOrderItem {
  id: number;
  productId: number;
  productName: string;
  variant: string | null;
  notes: string | null;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
}

export interface DemoOrder {
  id: number;
  orderNumber: string;
  userId: number | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  branchId: number | null;
  fulfilmentType: "PICKUP" | "DELIVERY";
  deliveryAddress: string | null;
  deliveryCity: string | null;
  deliveryLandmark: string | null;
  customerNotes: string | null;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  createdAt: string;
  items: DemoOrderItem[];
}

export interface DemoCustomer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  roleName: string;
  isActive: boolean;
  createdAt: string;
}

export interface DemoProduct {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  categoryId: number | null;
  categoryName: string | null;
  price: number | null;
  salePrice: number | null;
  pricingType: string;
  unit: string;
  minimumQuantity: number;
  quantityStep: number;
  stockQuantity: number;
  trackInventory: boolean;
  lowStockThreshold: number;
  isAvailable: boolean;
  isActive: boolean;
  shortDescription: string | null;
  fullDescription: string | null;
  imageUrl: string | null;
  createdAt: string;
}

export interface DemoDb {
  version: number;
  products: DemoProduct[];
  orders: DemoOrder[];
  customers: DemoCustomer[];
  settings: SiteSettings;
}

export const DB_VERSION = 3;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rnd: () => number, arr: T[]): T {
  return arr[Math.floor(rnd() * arr.length)];
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

const CUSTOMERS = [
  { name: "Anisa Baksh", email: "anisa.baksh@example.com", phone: "868-555-0142", role: "Customer" },
  { name: "Marcus Joseph", email: "m.joseph@example.com", phone: "868-555-0187", role: "Customer" },
  { name: "Priya Ramlogan", email: "priya.r@example.com", phone: "868-555-0231", role: "Customer" },
  { name: "Daniel Ali", email: "daniel.ali@example.com", phone: "868-555-0298", role: "Customer" },
  { name: "Sasha Mohammed", email: "sasha.m@example.com", phone: "868-555-0311", role: "Customer" },
  { name: "Ravi Persad", email: "ravi.persad@example.com", phone: "868-555-0355", role: "Customer" },
  { name: "Leah Charles", email: "leah.charles@example.com", phone: "868-555-0402", role: "Customer" },
  { name: "Imran Khan", email: "imran.khan@example.com", phone: "868-555-0448", role: "Customer" },
  { name: "Nadia Singh", email: "nadia.singh@example.com", phone: "868-555-0512", role: "Customer" },
  { name: "Tobias Williams", email: "tobias.w@example.com", phone: "868-555-0567", role: "Customer" },
  { name: "Zara Hosein", email: "zara.hosein@example.com", phone: "868-555-0603", role: "Customer" },
  { name: "Kernel Greaves", email: "k.greaves@example.com", phone: "868-555-0644", role: "Customer" },
];

const DELIVERY_AREAS = [
  { city: "Port of Spain", landmark: "near the Savannah", fee: 35 },
  { city: "San Juan", landmark: "by the market", fee: 30 },
  { city: "Diego Martin", landmark: "above the mall", fee: 35 },
  { city: "Arima", landmark: "near the dial", fee: 40 },
  { city: "Chaguanas", landmark: "by the flyover", fee: 45 },
];

const ORDER_NOTES = [
  "Please cut into 8 pieces.",
  "Call on arrival, gate is locked.",
  "Skin on please.",
  null,
  null,
  "Leave with the security guard.",
];

function seedProducts(): DemoProduct[] {
  const rnd = mulberry32(1990);
  return listAllProducts().map((p) => {
    const track = p.price > 0 && rnd() > 0.4;
    const stock = track ? Math.floor(rnd() * 60) + 2 : 0;
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      categoryId: p.categoryId,
      categoryName: p.categoryName,
      price: p.pricingType === "CONTACT" ? null : p.price,
      salePrice: p.salePrice,
      pricingType: p.pricingType === "CONTACT" ? "CONTACT" : "PER_LB",
      unit: p.unit || "lb",
      minimumQuantity: p.minimumQuantity,
      quantityStep: p.quantityStep,
      stockQuantity: stock,
      trackInventory: track,
      lowStockThreshold: 10,
      isAvailable: p.isAvailable,
      isActive: true,
      shortDescription: p.shortDescription,
      fullDescription: p.description,
      imageUrl: p.imageUrl,
      createdAt: new Date(2025, 0, 1 + (p.id % 300)).toISOString(),
    };
  });
}

function seedCustomers(): DemoCustomer[] {
  const rnd = mulberry32(707);
  const now = Date.now();
  return CUSTOMERS.map((c, i) => ({
    id: i + 1,
    name: c.name,
    email: c.email,
    phone: c.phone,
    roleName: c.role,
    isActive: rnd() > 0.12,
    createdAt: new Date(now - (30 + i * 37) * 86400000).toISOString(),
  }));
}

function seedOrders(products: DemoProduct[], customers: DemoCustomer[]): DemoOrder[] {
  const rnd = mulberry32(4242);
  const purchasable = products.filter((p) => p.pricingType !== "CONTACT" && (p.price ?? 0) > 0);
  const statuses: OrderStatus[] = [
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "READY",
    "OUT_FOR_DELIVERY",
    "COMPLETED",
    "COMPLETED",
    "CANCELLED",
  ];
  const branches = listBranchOptions();
  const orders: DemoOrder[] = [];
  const now = new Date();

  for (let i = 0; i < 64; i++) {
    const customer = pick(rnd, customers);
    const daysAgo = Math.floor(rnd() * 45);
    const created = new Date(now.getTime() - daysAgo * 86400000 - Math.floor(rnd() * 86400000));
    const lineCount = 1 + Math.floor(rnd() * 3);
    const items: DemoOrderItem[] = [];
    let subtotal = 0;

    for (let j = 0; j < lineCount; j++) {
      const product = pick(rnd, purchasable);
      const quantity = round2((1 + Math.floor(rnd() * 6)) * 0.5);
      const unitPrice = product.price ?? 0;
      const lineTotal = round2(quantity * unitPrice);
      subtotal = round2(subtotal + lineTotal);
      items.push({
        id: orders.length * 10 + j + 1,
        productId: product.id,
        productName: product.name,
        variant: rnd() > 0.55 ? "Fresh" : "Seasoned",
        notes: rnd() > 0.75 ? "Cut to order" : null,
        quantity,
        unit: product.unit,
        unitPrice,
        subtotal: lineTotal,
      });
    }

    const delivery = rnd() > 0.4;
    const area = pick(rnd, DELIVERY_AREAS);
    const deliveryFee = delivery ? (subtotal >= 500 ? 0 : area.fee) : 0;
    const status = statuses[Math.floor(rnd() * statuses.length)];
    const paymentStatus: PaymentStatus = status === "CANCELLED" ? "UNPAID" : rnd() > 0.25 ? "PAID" : "UNPAID";
    const branch = pick(rnd, branches);

    orders.push({
      id: i + 1,
      orderNumber: `KH-${String(100000 + i).slice(-6)}`,
      userId: rnd() > 0.15 ? customer.id : null,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      branchId: branch.id,
      fulfilmentType: delivery ? "DELIVERY" : "PICKUP",
      deliveryAddress: delivery ? `${10 + Math.floor(rnd() * 80)} Main Road` : null,
      deliveryCity: delivery ? area.city : null,
      deliveryLandmark: delivery ? area.landmark : null,
      customerNotes: rnd() > 0.55 ? pick(rnd, ORDER_NOTES) : null,
      subtotal,
      deliveryFee,
      tax: 0,
      total: round2(subtotal + deliveryFee),
      orderStatus: status,
      paymentStatus,
      paymentMethod: delivery ? "CARD" : pick(rnd, ["CASH_ON_PICKUP", "CARD"]),
      createdAt: created.toISOString(),
      items,
    });
  }

  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function seedDb(): DemoDb {
  const products = seedProducts();
  const customers = seedCustomers();
  return {
    version: DB_VERSION,
    products,
    orders: seedOrders(products, customers),
    customers,
    settings: { ...DEFAULT_SETTINGS },
  };
}

export function nextOrderNumber(db: DemoDb): string {
  const max = db.orders.reduce((m, o) => Math.max(m, Number(o.orderNumber.replace(/\D/g, "")) || 0), 100000);
  return `KH-${String(max + 1).slice(-6)}`;
}

export function nextId(rows: { id: number }[]): number {
  return rows.reduce((m, r) => Math.max(m, r.id), 0) + 1;
}
