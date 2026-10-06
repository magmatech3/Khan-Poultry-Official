"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Showcase from "@/components/Showcase";
import LambFeature from "@/components/LambFeature";
import MartOverview from "@/components/MartOverview";
import Instagram from "@/components/Instagram";
import Locations from "@/components/Locations";
import Cta from "@/components/Cta";
import HeroA from "./HeroA";
import HeroB from "./HeroB";
import TrustStrip from "./TrustStrip";

type Dir = "a" | "b" | "c";

const TABS: { id: Dir; label: string; sub: string; recommended?: boolean }[] = [
  { id: "a", label: "A · Fresh Counter", sub: "Clean & modern" },
  { id: "b", label: "B · Heritage Butcher", sub: "Warm & craft" },
  { id: "c", label: "C · Bold Fresh", sub: "Balanced & recommended", recommended: true },
];

function DirectionA() {
  return (
    <>
      <HeroA />
      <Marquee />
      <Stats />
      <Showcase />
      <TrustStrip />
      <Locations />
      <Instagram />
      <Cta />
    </>
  );
}

function DirectionB() {
  return (
    <>
      <HeroB />
      <TrustStrip />
      <Showcase />
      <MartOverview />
      <Locations />
      <Instagram />
      <Cta />
    </>
  );
}

function DirectionC() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Showcase />
      <LambFeature />
      <MartOverview />
      <TrustStrip />
      <Locations />
      <Instagram />
      <Cta />
    </>
  );
}

export default function DirectionShowcase() {
  const [dir, setDir] = useState<Dir>("c");

  const wrapperClass =
    dir === "a" ? "dir-a" : dir === "b" ? "dir-b" : "dir-c";

  return (
    <div>
      <div className="sticky top-16 z-30 border-b border-line bg-paper/95 backdrop-blur-xl md:top-[72px]">
        <div className="mx-auto flex max-w-7xl items-stretch justify-center gap-1 px-4 py-2.5 sm:px-5">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setDir(t.id)}
              aria-pressed={dir === t.id}
              className={`press relative flex flex-col items-start rounded-xl px-4 py-2 text-left transition-colors sm:px-5 ${
                dir === t.id
                  ? "bg-leaf text-white"
                  : "text-ink-soft hover:bg-cream-light hover:text-ink"
              }`}
            >
              <span
                className={`text-[13px] font-bold leading-tight sm:text-sm ${
                  dir === t.id ? "text-white" : "text-ink"
                }`}
              >
                {t.label}
                {t.recommended && (
                  <span
                    className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                      dir === t.id ? "bg-white text-leaf" : "bg-flame text-white"
                    }`}
                  >
                    Pick
                  </span>
                )}
              </span>
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.08em] ${
                  dir === t.id ? "text-white/80" : "text-ink-soft"
                }`}
              >
                {t.sub}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={wrapperClass}>
        {dir === "a" && <DirectionA />}
        {dir === "b" && <DirectionB />}
        {dir === "c" && <DirectionC />}
      </div>
    </div>
  );
}