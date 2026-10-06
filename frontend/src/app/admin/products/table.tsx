import Link from "next/link";
import type { DemoProduct } from "@/lib/admin/seed";
import { DeleteProductButton } from "./delete-button";

export function ProductTable({ products }: { products: DemoProduct[] }) {
  if (products.length === 0) {
    return <div className="p-8 text-center text-ink-soft">No products found.</div>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-line text-left text-ink-soft">
          <th className="px-4 py-3 font-medium">Product</th>
          <th className="px-4 py-3 font-medium">Category</th>
          <th className="px-4 py-3 font-medium">Price</th>
          <th className="px-4 py-3 font-medium">Stock</th>
          <th className="px-4 py-3 font-medium">Status</th>
          <th className="px-4 py-3 text-right font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-b border-line/50 hover:bg-cream-light/30">
            <td className="px-4 py-3">
              <Link href={`/admin/products/${p.id}`} className="font-medium text-ink hover:text-wood">
                {p.name}
              </Link>
              {p.sku && <span className="ml-2 text-xs text-ink-soft">({p.sku})</span>}
            </td>
            <td className="px-4 py-3 text-ink-soft">{p.categoryName ?? "-"}</td>
            <td className="px-4 py-3 tabular-nums text-ink">
              {p.pricingType === "CONTACT" ? (
                <span className="text-ink-soft">Contact</span>
              ) : (
                <>
                  TT${p.salePrice ?? p.price ?? 0}
                  {p.salePrice != null && p.price != null && (
                    <span className="ml-1 text-xs text-ink-soft line-through">TT${p.price}</span>
                  )}
                  <span className="ml-1 text-xs text-ink-soft">/{p.unit}</span>
                </>
              )}
            </td>
            <td className="px-4 py-3">
              {p.trackInventory ? (
                <span className={p.stockQuantity <= 5 ? "font-medium text-warn" : "text-ink"}>{p.stockQuantity}</span>
              ) : (
                <span className="text-ink-soft">-</span>
              )}
            </td>
            <td className="px-4 py-3">
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                  p.isActive && p.isAvailable
                    ? "bg-leaf/10 text-leaf"
                    : p.isActive
                      ? "bg-warn/10 text-warn"
                      : "bg-ink/10 text-ink-soft"
                }`}
              >
                {!p.isActive ? "Inactive" : !p.isAvailable ? "Unavailable" : "Active"}
              </span>
            </td>
            <td className="px-4 py-3 text-right">
              <div className="inline-flex items-center gap-2">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-ink transition-colors hover:border-wood/40 hover:bg-wood/5 hover:text-wood"
                >
                  Edit
                </Link>
                <DeleteProductButton id={p.id} name={p.name} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
