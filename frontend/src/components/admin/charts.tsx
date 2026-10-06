"use client";

export function fmtMoney(n: number, symbol: string): string {
  const v = Number.isFinite(n) ? n : 0;
  const r = Math.round(v * 100) / 100;
  return `${symbol}${r.toLocaleString()}`;
}

export function pct(n: number): string {
  return `${Number.isFinite(n) ? Math.round(n * 10) / 10 : 0}%`;
}

export function EmptyState({
  message = "No data for this date range",
}: {
  message?: string;
}) {
  return (
    <div className="flex min-h-28 items-center justify-center rounded-xl border border-line/60 bg-cream-light/30 p-6 text-sm text-ink-soft">
      {message}
    </div>
  );
}

interface LineChartProps {
  points: { label: string; value: number }[];
  format: (n: number) => string;
  color?: string;
}

const W = 720;
const H = 180;
const PAD = 24;

export function LineChart({ points, format, color = "#2f6d3f" }: LineChartProps) {
  const max = Math.max(...points.map((p) => p.value), 1);
  const innerW = W - PAD * 2;
  const innerH = H - PAD * 2;
  const x = (i: number) => PAD + (points.length > 1 ? (i / (points.length - 1)) * innerW : innerW / 2);
  const y = (v: number) => PAD + innerH - (v / max) * innerH;
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(p.value)}`).join(" ");

  const labelIdx = points.length > 1 ? [0, Math.floor((points.length - 1) / 2), points.length - 1] : [0];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Line chart">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={PAD}
          x2={W - PAD}
          y1={y(max * f)}
          y2={y(max * f)}
          stroke="currentColor"
          strokeOpacity={0.12}
          strokeDasharray="3 3"
        />
      ))}
      <text x={PAD} y={y(max)} dy="-4" fontSize="10" fill="currentColor" fillOpacity={0.5}>
        {format(max)}
      </text>
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {labelIdx.map((i) => (
        <text key={i} x={x(i)} y={H - 4} fontSize="10" textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"} fill="currentColor" fillOpacity={0.5}>
          {points[i].label}
        </text>
      ))}
    </svg>
  );
}

interface BarChartProps {
  rows: { label: string; value: number }[];
  format: (n: number) => string;
}

export function BarChart({ rows, format }: BarChartProps) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div className="flex h-40 items-end gap-2">
      {rows.map((r) => (
        <div key={r.label} className="group flex flex-1 flex-col items-center gap-1" title={`${r.label}: ${format(r.value)}`}>
          <div
            className="w-full rounded-t bg-leaf/70 transition-colors group-hover:bg-leaf"
            style={{ height: `${String(Math.max((r.value / max) * 100, r.value > 0 ? 4 : 2))}%` }}
          />
          <span className="w-full truncate text-center text-[10px] text-ink-soft">{r.label}</span>
        </div>
      ))}
    </div>
  );
}