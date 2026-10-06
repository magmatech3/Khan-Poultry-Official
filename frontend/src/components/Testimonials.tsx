"use client";

import { useRef, useState } from "react";
import { TESTIMONIALS, GOOGLE_REVIEWS_URL } from "@/lib/data";

function Stars() {
  return (
    <div className="flex gap-0.5 text-flame" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = scroller.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="bg-paper-soft py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
              Trusted at Trinidad&apos;s tables.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Stars />
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-ink-soft underline-offset-4 transition-colors hover:text-leaf hover:underline"
            >
              Rated on Google — see all reviews
            </a>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scroller}
            onScroll={update}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((t, i) => (
              <a
                key={t.name}
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                data-delay={i * 0.06}
                className="group flex min-w-[85%] snap-center flex-col rounded-3xl border border-line bg-paper p-8 shadow-[0_12px_40px_-20px_rgba(74,41,29,0.25)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-leaf/40 hover:shadow-[0_24px_60px_-28px_rgba(59,108,47,0.45)] md:min-w-[440px]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Stars />
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-ink-soft transition-colors group-hover:text-leaf"
                    aria-hidden
                  >
                    <path d="M9 19c-5 1-8-4-8-9C1 4.5 5 1 10.5 1H14a8 8 0 0 1 8 8v2a8 8 0 0 1-8 8h-2" />
                    <path d="M9 15c0-6 2.5-9.5 8-13" />
                  </svg>
                </div>
                <blockquote className="flex-1 text-lg leading-relaxed text-ink md:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf font-display text-sm font-bold text-white">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-ink-soft">{t.detail}</p>
                  </div>
                </figcaption>
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => scroll(-1)}
                disabled={!canPrev}
                aria-label="Previous reviews"
                className="press flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-wood/40 hover:text-wood disabled:cursor-not-allowed disabled:opacity-35"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                disabled={!canNext}
                aria-label="Next reviews"
                className="press flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-wood/40 hover:text-wood disabled:cursor-not-allowed disabled:opacity-35"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
          </div>
        </div>
      </div>
    </section>
  );
}