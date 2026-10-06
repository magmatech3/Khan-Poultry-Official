export interface SiteSettings {
  storeName: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  allowOrders: boolean;
  orderNotes: string;
  announcement: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  storeName: "Khan's Poultry & Meats",
  currency: "TTD",
  currencySymbol: "TT$",
  taxRate: 0,
  deliveryFee: 25,
  freeDeliveryThreshold: 500,
  allowOrders: true,
  orderNotes: "",
  announcement: "",
};

export function getSettings(): SiteSettings {
  return { ...DEFAULT_SETTINGS };
}

export function formatMoney(amount: number, currency: string, symbol: string): string {
  const n = Number.isFinite(amount) ? amount : 0;
  return `${symbol}${n.toFixed(2)}`;
}