import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/base-path";

const CATES = [
  {
    label: "Poultry",
    href: "/menu?category=poultry-fresh",
    img: withBasePath("/images/products/whole-chicken.webp"),
  },
  {
    label: "Seasoned",
    href: "/menu?category=poultry-seasoned",
    img: withBasePath("/images/products/seasoned-chicken.webp"),
  },
  {
    label: "Specialty Meats",
    href: "/menu?category=specialty-meats",
    img: withBasePath("/images/products/lamb-chops.webp"),
  },
  {
    label: "Seafood",
    href: "/menu?category=seafood",
    img: withBasePath("/images/products/salmon.webp"),
  },
];

export default function HeroB() {
  return (
    <section className="relative overflow-hidden bg-wood-deep">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src={withBasePath("/videos/mart-overview.mp4")}
          poster={withBasePath("/images/hero-butcher.webp")}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-wood-deep/85" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-wood-deep via-wood-deep/40 to-wood-deep/70" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-paper/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cream backdrop-blur-md">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-leaf-light" aria-hidden />
            Serving Trinidad since 1990
          </span>
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <h1 className="font-display text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.02em] text-white sm:text-[4rem] md:text-[4.5rem] xl:text-[5.25rem]">
            Fresh halal poultry, meat &amp; seafood —
            <em className="text-flame-pale not-italic"> cut with care.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/90 md:text-xl">
            Premium quality, carefully sourced and freshly prepared every day.
            Your trusted halal butcher in Trinidad since 1990.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu"
              className="press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-flame px-9 py-4 text-base font-semibold text-white shadow-[0_18px_42px_-14px_rgba(184,67,30,0.6)] hover:bg-flame-soft"
            >
              View the menu
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
              href="/about"
              className="press inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/40 px-9 py-4 text-base font-semibold text-white hover:border-white hover:bg-white hover:text-wood"
            >
              Our story
            </Link>
          </div>
        </div>

        <p className="mt-12 text-center text-xs font-bold uppercase tracking-[0.22em] text-cream/70">
          What&apos;s on the counter
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {CATES.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              data-reveal-scale
              data-delay={i * 0.07}
              className="group relative overflow-hidden rounded-xl border border-white/15 bg-wood-deep/60 backdrop-blur-md transition-colors duration-300 hover:border-flame/50"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={c.img}
                  alt={c.label}
                  width={900}
                  height={900}
                  sizes="(min-width: 1280px) 25vw, (min-width: 896px) 33vw, 50vw"
                  className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.06]"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wood-deep/95 to-transparent p-4">
                <p className="font-display text-base font-semibold text-white md:text-lg">
                  {c.label}
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.16em] text-flame-pale">
                  View
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}