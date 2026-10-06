import { seedDb } from "@/lib/admin/seed";
import { OrderDetail } from "./order-detail";

export function generateStaticParams() {
  return seedDb().orders.map((o) => ({ id: String(o.id) }));
}

export default function AdminOrderDetailPage() {
  return <OrderDetail />;
}
