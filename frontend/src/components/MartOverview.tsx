import Link from "next/link";
import { withBasePath } from "@/lib/base-path";

export default function MartOverview() {
  return (
    <section id="mart" className="bg-wood-deep py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5" data-reveal>
            <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl">
              A mart built
              <span className="text-flame"> around fresh.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/90">
              Whole chickens from the farm, cut on the spot, seasoned in-house
              and on ice before noon. One pass down the counter is all it takes.
            </p>
            <Link
              href="/about"
              className="press mt-8 inline-flex items-center gap-2 rounded-full border-2 border-cream/20 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-leaf hover:bg-leaf hover:text-white"
            >
              Our story
              <svg
                width="15"
                height="15"
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
          </div>

          <div className="lg:col-span-7" data-reveal-scale>
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_36px_80px_-40px_rgba(28,17,11,0.55)]">
              <video
                className="aspect-[16/10] w-full object-cover"
                src={withBasePath("/videos/mart-overview.mp4")}
                poster={withBasePath("/images/hero-butcher.jpg")}
                controls
                loop
                playsInline
                preload="metadata"
                aria-label="Overview tour of a Khan's Poultry mart"
              />
              <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-paper/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink backdrop-blur-md">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch the tour
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}