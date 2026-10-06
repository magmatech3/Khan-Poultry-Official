"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/admin/demo-store";

export function LogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        logout();
        router.push("/");
      }}
      className="inline-flex w-full items-center justify-center rounded-lg border border-line px-3 py-2 text-sm font-semibold text-ink transition-colors hover:border-danger/40 hover:bg-danger/5 hover:text-danger"
    >
      Logout
    </button>
  );
}
