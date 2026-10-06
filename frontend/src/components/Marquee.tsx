import Image from "next/image";
import { FAVORITE_CUTS } from "@/lib/data";

const ITEMS = [
  "100% Halal certified",
  "Fresh, every single day",
  "8 stores islandwide",
  "Wholesale & retail",
  "Trusted since 1990",
  "Cut & seasoned in-house",
];

const CUTS = [
  ...FAVORITE_CUTS,
  {
    name: "Whole Chicken",
    tagline: "The daily hero",
    description: "",
    image: "/images/products/whole-chicken-chilled.webp",
    alt: "Fresh whole chicken from Khan's Poultry",
    price: "",
    orderNote: "",
  },
];

const CUTS_ROW = [...CUTS, ...CUTS];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden bg-leaf text-cream" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-4 py-3.5 md:py-4">
        {CUTS_ROW.map((c, i) => (
          <div
            key={i}
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-paper/30 md:h-14 md:w-14"
          >
            <Image
              src={c.image}
              alt=""
              fill
              sizes="56px"
              className="object-cover"
              loading="lazy"
            />
          </div>
        ))}
        {CUTS_ROW.map((c, i) => (
          <span
            key={`t-${i}`}
            className="flex items-center gap-4 pr-0 font-display text-sm font-bold uppercase tracking-[0.18em] md:text-base"
          >
            {c.name}
            <svg
              width="9"
              height="9"
              viewBox="0 0 12 12"
              fill="currentColor"
              className="text-flame"
            >
              <circle cx="6" cy="6" r="6" />
            </svg>
          </span>
        ))}
      </div>
      <div className="border-t border-paper/15 py-4 md:py-5">
        <div className="marquee-track flex w-max items-center">
          {row.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 pr-8 font-display text-base font-bold uppercase tracking-[0.18em] md:text-lg"
            >
              {item}
              <svg
                width="9"
                height="9"
                viewBox="0 0 12 12"
                fill="currentColor"
                className="text-flame"
              >
                <circle cx="6" cy="6" r="6" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}