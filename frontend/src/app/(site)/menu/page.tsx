import type { Metadata } from "next";
import { Suspense } from "react";
import MenuContent from "./MenuContent";

export const metadata: Metadata = {
  title: "Menu — Order Fresh Halal Poultry, Meats & Seafood",
  description:
    "Browse Khan's Poultry & Meats — fresh and seasoned chicken, specialty meats and seafood, priced per pound and ready to order across Trinidad.",
};

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-5 py-24 text-center text-ink-soft md:px-8">
          Loading the case…
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}