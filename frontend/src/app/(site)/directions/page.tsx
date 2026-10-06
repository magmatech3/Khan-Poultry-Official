import type { Metadata } from "next";
import DirectionShowcase from "@/components/directions/DirectionShowcase";

export const metadata: Metadata = {
  title: "Design Directions — Khan's Poultry",
  description:
    "Compare three visual directions for the Khan's Poultry homepage.",
  robots: { index: false, follow: false },
};

export default function DirectionsPage() {
  return (
    <div className="flex-1">
      <DirectionShowcase />
    </div>
  );
}