import { seedDb } from "@/lib/admin/seed";
import { CustomerDetail } from "./customer-detail";

export function generateStaticParams() {
  return seedDb().customers.map((c) => ({ id: String(c.id) }));
}

export default function AdminCustomerDetailPage() {
  return <CustomerDetail />;
}
