export function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-warn/10 text-warn",
    CONFIRMED: "bg-wood/10 text-wood",
    PREPARING: "bg-wood/10 text-wood",
    READY: "bg-ok/10 text-ok",
    OUT_FOR_DELIVERY: "bg-ok/10 text-ok",
    COMPLETED: "bg-ok/10 text-ok",
    CANCELLED: "bg-danger/10 text-danger",
    REFUNDED: "bg-danger/10 text-danger",
  };

  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${styles[status] ?? "bg-line text-ink-soft"}`}>
      {status}
    </span>
  );
}
