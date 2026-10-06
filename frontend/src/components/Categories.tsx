import Image from "next/image";

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
    label: "Specialty Meats",
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

export default function Categories() {
  return (
    <section className="bg-cream-light py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {CATES.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              data-reveal-scale
              data-delay={i * 0.06}
              className="group relative overflow-hidden rounded-2xl bg-wood-deep shadow-[0_18px_40px_-24px_rgba(44,23,17,0.35)] ring-1 ring-wood/10"
            >
              <div className="relative aspect-[4/3] md:aspect-[16/9]">
                <Image
                  src={c.img}
                  alt={c.label}
                  width={1200}
                  height={900}
                  sizes="(min-width: 1280px) 33vw, (min-width: 896px) 25vw, 50vw"
                  className="h-full w-full object-cover opacity-85 transition-[transform,opacity] duration-700 group-hover:scale-[1.06] group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent transition-opacity duration-300 group-hover:from-leaf-dark/90"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 md:p-4">
                <div>
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-leaf-light">
                    {c.tag}
                  </p>
                  <span className="block font-display text-lg font-bold tracking-tight text-white md:text-xl lg:text-2xl">
                    {c.label}
                  </span>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-[transform,background-color,border-color] duration-300 group-hover:scale-110 group-hover:border-leaf group-hover:bg-leaf">
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