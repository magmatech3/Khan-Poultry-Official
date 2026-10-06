import { seedDb } from "@/lib/admin/seed";
import { EditProduct } from "./edit-product";

export function generateStaticParams() {
  return seedDb().products.map((p) => ({ id: String(p.id) }));
}

export default function AdminProductEditPage() {
  return <EditProduct />;
}
