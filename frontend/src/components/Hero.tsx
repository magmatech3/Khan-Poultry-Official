import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-section relative pt-6 overflow-hidden bg-cream-light md:pt-10"
      aria-label="Fresh halal poultry, meat and seafood"
    >
      <Image
        src="/images/Hero%20bg.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="hero-media pointer-events-none object-contain z-20 scale-[0.84] translate-x-[14%] -translate-y-[8%]"
      />
      <div className="hero-content relative z-10">
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-12">
          <div className="max-w-2xl">
            <Image
              src="/images/KHAN'S%20LOGO.png"
              alt="Khan's Poultry & Meats"
              width={120}
              height={120}
              priority
              className="hero-fade mb-6 h-16 w-16 object-contain drop-shadow-[0_2px_8px_rgba(42,30,22,0.12)] md:h-20 md:w-20"
            />

            <h1 className="font-display text-[2.75rem] font-bold leading-[0.98] tracking-[-0.04em] text-ink sm:text-[4rem] md:text-[4.25rem] xl:text-[4.75rem]">
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block">
                  <span className="text-leaf">Fresh Halal</span>
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block">Poultry, Meat &amp; Seafood</span>
              </span>
              <span className="block overflow-hidden pb-3">
                <span className="hero-line block">in Trinidad.</span>
              </span>
            </h1>

            <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/menu"
                className="press inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-leaf px-8 py-4 text-base font-semibold text-white shadow-[0_18px_42px_-16px_rgba(59,108,47,0.55)] hover:bg-leaf-dark"
              >
                Shop Now
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>
              <Link
                href="/menu"
                className="press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-leaf/35 bg-transparent px-8 py-4 text-base font-semibold text-leaf hover:border-leaf hover:bg-leaf hover:text-white"
              >
                View Menu
              </Link>
            </div>

            <ul className="hero-fade mt-8 flex flex-wrap gap-x-6 gap-y-4 border-t border-leaf/15 pt-5">
              <li className="flex min-w-[160px] items-center gap-3 rounded-2xl bg-paper/70 p-3 shadow-[0_12px_24px_-18px_rgba(42,30,22,0.25)] sm:min-w-[180px]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-leaf">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <span>
                  <strong className="block text-base font-bold leading-tight text-ink">7 Locations</strong>
                  <span className="block text-sm font-medium leading-snug text-ink-soft">Across Trinidad</span>
                </span>
              </li>
              <li className="flex min-w-[160px] items-center gap-3 rounded-2xl bg-paper/70 p-3 shadow-[0_12px_24px_-18px_rgba(42,30,22,0.25)] sm:min-w-[180px]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-leaf">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
                    <path d="M5 19c3-5 6-8 10-10" />
                  </svg>
                </span>
                <span>
                  <strong className="block text-base font-bold leading-tight text-ink">Fresh Daily</strong>
                  <span className="block text-sm font-medium leading-snug text-ink-soft">Prepared every day</span>
                </span>
              </li>
              <li className="flex min-w-[160px] items-center gap-3 rounded-2xl bg-paper/70 p-3 shadow-[0_12px_24px_-18px_rgba(42,30,22,0.25)] sm:min-w-[180px]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-leaf">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <span>
                  <strong className="block text-base font-bold leading-tight text-ink">100% Halal</strong>
                  <span className="block text-sm font-medium leading-snug text-ink-soft">Certified Halal</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
