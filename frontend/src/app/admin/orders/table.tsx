import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { DemoOrder } from "@/lib/admin/seed";
import { OrderStatusBadge } from "./status-badge";

export function OrderTable({ orders }: { orders: DemoOrder[] }) {
  if (orders.length === 0) {
    return <div className="p-8 text-center text-ink-soft">No orders found.</div>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-line text-left text-ink-soft">
          <th className="px-4 py-3 font-medium">Order</th>
          <th className="px-4 py-3 font-medium">Customer</th>
          <th className="px-4 py-3 font-medium">Type</th>
          <th className="px-4 py-3 font-medium text-right">Total</th>
          <th className="px-4 py-3 font-medium">Status</th>
          <th className="px-4 py-3 font-medium">Payment</th>
          <th className="px-4 py-3 font-medium">Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-b border-line/50 hover:bg-cream-light/30">
            <td className="px-4 py-3">
              <Link href={`/admin/orders/${order.id}`} className="font-medium text-ink hover:text-wood">
                {order.orderNumber}
              </Link>
            </td>
            <td className="px-4 py-3 text-ink-soft">
              <div>{order.customerName}</div>
              <div className="text-xs">{order.customerEmail}</div>
            </td>
            <td className="px-4 py-3 text-ink-soft">
              {order.fulfilmentType === "PICKUP" ? "Pickup" : "Delivery"}
            </td>
            <td className="px-4 py-3 text-right tabular-nums font-medium text-ink">TT${order.total}</td>
            <td className="px-4 py-3">
              <OrderStatusBadge status={order.orderStatus} />
            </td>
            <td className="px-4 py-3">
              <span className={`text-xs font-medium ${order.paymentStatus === "PAID" ? "text-leaf" : "text-ink-soft"}`}>
                {order.paymentStatus}
              </span>
            </td>
            <td className="px-4 py-3 text-ink-soft">
              {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
