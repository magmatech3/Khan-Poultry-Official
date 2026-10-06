import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/base-path";

const CATES = [
  {
    label: "Poultry",
    tag: "Fresh & whole",
    href: "/menu?category=poultry-fresh",
    img: "/images/products/whole-chicken.webp",
  },
  {
    label: "Seasoned",
    tag: "Marinated in-house",
    href: "/menu?category=poultry-seasoned",
    img: "/images/products/seasoned-chicken.webp",
  },
  {
    label: "Specialty",
    tag: "Beef, lamb & more",
    href: "/menu?category=specialty-meats",
    img: "/images/products/lamb-chops.webp",
  },
  {
    label: "Seafood",
    tag: "Fresh every day",
    href: "/menu?category=seafood",
    img: "/images/products/salmon.webp",
  },
];

export default function HeroA() {
  return (
    <section className="relative overflow-hidden bg-cream-light">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-leaf">
              Fresh halal poultry · beef · lamb · seafood
            </p>

            <h1 className="font-display text-[2.75rem] font-extrabold leading-[1.0] tracking-[-0.045em] text-ink sm:text-[4rem] md:text-[4.5rem] xl:text-[5rem]">
              Fresh from the counter,
              <span className="block text-leaf">to your table today.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft md:text-xl">
              Premium quality, carefully sourced and freshly prepared every
              day. Your trusted halal butcher in Trinidad, since 1990.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/menu"
                className="press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-leaf px-8 py-4 text-base font-semibold text-white shadow-[0_18px_42px_-16px_rgba(46,125,50,0.5)] hover:bg-leaf-dark"
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
                href="/contact"
                className="press inline-flex items-center justify-center whitespace-nowrap rounded-full border border-leaf/35 bg-transparent px-8 py-4 text-base font-semibold text-leaf hover:border-leaf hover:bg-leaf hover:text-white"
              >
                Visit a store
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -right-4 -top-4 hidden h-full w-full rounded-[2.5rem] bg-leaf/10 md:block"
              />
              <div className="hero-media relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-line bg-paper shadow-[0_28px_60px_-32px_rgba(26,37,48,0.25)]">
                <video
                  className="hero-video h-full w-full object-cover"
                  src={withBasePath("/videos/shop-aesthetic.mp4")}
                  poster={withBasePath("/images/hero-butcher.webp")}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                />
                <span className="hero-chip absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-paper/90 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-ink backdrop-blur-md">
                  <span className="live-dot h-2 w-2 rounded-full bg-leaf" aria-hidden />
                  Fresh daily
                </span>
                <div className="hero-chip absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl border border-line bg-paper/95 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="font-display text-lg font-bold text-ink">
                      Prepared daily across Trinidad
                    </p>
                    <p className="text-xs font-medium text-ink-soft">
                      8 stores · wholesale &amp; retail
                    </p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-11 grid grid-cols-2 gap-3 md:grid-cols-4">
          {CATES.map((c) => (
            <a
              key={c.label}
              href={c.href}
              data-reveal-scale
              className="group relative overflow-hidden rounded-2xl border border-line bg-paper transition-[border-color,box-shadow] duration-300 hover:border-leaf/40 hover:shadow-[0_16px_36px_-24px_rgba(26,37,48,0.3)]"
            >
              <div className="relative aspect-[4/3] md:aspect-[16/9]">
                <Image
                  src={c.img}
                  alt={c.label}
                  width={1200}
                  height={900}
                  sizes="(min-width: 1280px) 33vw, (min-width: 896px) 25vw, 50vw"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 md:p-4">
                <div className="rounded-full bg-paper/95 px-3.5 py-1.5 backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-leaf">
                    {c.tag}
                  </p>
                  <span className="block font-display text-lg font-bold tracking-tight text-ink">
                    {c.label}
                  </span>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf text-white transition-transform duration-300 group-hover:scale-110">
                  <svg
                    width="14"
                    height="14"
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
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}