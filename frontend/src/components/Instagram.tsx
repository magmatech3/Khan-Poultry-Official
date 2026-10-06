import Image from "next/image";
import { INSTAGRAM_URL } from "@/lib/data";

const POSTS = [
  {
    src: "/images/social/ig_DdHHDfLHHr2.jpg",
    alt: "Fresh cuts from the Khan's Poultry counter",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/social/ig_DdXHKY6yO4L.jpg",
    alt: "Today's selection at the Khan's counter",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/social/ig_DdRPb73lhdt.jpg",
    alt: "Fresh poultry ready for the weekend",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/social/ig_DadjXl2qx1U.jpg",
    alt: "Khan's Poultry & Meats — fresh every day",
    aspect: "aspect-square",
  },
  {
    src: "/images/social/ig_DdZ1Qe6gWW-.jpg",
    alt: "What's roasting at Khan's today",
    aspect: "aspect-square",
  },
  {
    src: "/images/social/ig_DaQbFcrDyTW.jpg",
    alt: "Halal certified, cut fresh to order",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/social/ig_Da0iLH5RxWr.jpg",
    alt: "The daily catch at Khan's seafood counter",
    aspect: "aspect-square",
  },
  {
    src: "/images/social/ig_DaiIZA4qhzL.jpg",
    alt: "Family favourites from all 8 stores",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/social/ig_DbBxqZ5yMiB.jpg",
    alt: "Stocked, fresh and ready for you",
    aspect: "aspect-square",
  },
];

export default function Instagram() {
  return (
    <section id="instagram" className="bg-cream-light">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-bold tracking-[-0.02em] md:text-6xl">
              Fresh out of the store,
              <span className="text-flame"> onto your feed.</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              New cuts, today&apos;s catch, and what&apos;s roasting —
              follow the daily story from all 8 counters.
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            @khans_poultry
          </a>
        </div>

        <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {POSTS.map((post, i) => (
            <a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal-scale
              className="group relative block overflow-hidden rounded-2xl bg-wood-deep"
              aria-label={`View this on Instagram: ${post.alt}`}
            >
              <div className={`relative ${post.aspect}`}>
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 translate-y-2 text-white opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-bold">@khans_poultry</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}