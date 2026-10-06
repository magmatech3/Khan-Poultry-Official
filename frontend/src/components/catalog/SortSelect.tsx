"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "name", label: "Name (A–Z)" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "newest", label: "Newest first" },
] as const;

export default function SortSelect({ current }: { current: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  return (
    <div className="relative inline-flex items-center">
      <select
        value={current}
        aria-label="Sort products"
        disabled={pending}
        onChange={(e) => {
          const next = new URLSearchParams(searchParams.toString());
          next.set("sort", e.target.value);
          next.delete("page");
          startTransition(() => router.push(`/menu?${next.toString()}`));
        }}
        className="cursor-pointer appearance-none rounded-full border border-line bg-paper py-2 pl-4 pr-9 text-sm font-semibold text-ink outline-none transition-colors hover:border-wood/40 focus:border-flame"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute right-3 text-ink-soft"
        aria-hidden
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}