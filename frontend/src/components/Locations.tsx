import Image from "next/image";
import { LOCATIONS } from "@/lib/data";

export default function Locations({
  className = "bg-cream-light",
}: {
  className?: string;
}) {
  return (
    <section id="locations" className={className}>
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-10 max-w-2xl md:mb-12">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            Never far from a<br className="hidden md:block" /> fresh cut.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LOCATIONS.map((loc, i) => (
            <div
              key={loc.name}
              data-reveal
              data-delay={(i % 4) * 0.07}
              className="group flex flex-col rounded-2xl border border-line bg-paper p-6 transition-colors duration-300 hover:border-leaf/40 hover:bg-paper-soft"
            >
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-cream-light">
                <Image
                  src={loc.image}
                  alt={`${loc.name} location`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              {i === 5 && (
                <span className="mb-3 w-fit rounded-full bg-flame px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                  Newest
                </span>
              )}
              <h3 className="font-display text-xl font-bold leading-tight">
                {loc.name}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-ink-soft">
                {loc.area}
              </p>

              <a
                href={loc.phoneHref}
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-leaf px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-leaf-light"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {loc.phone}
              </a>

              <details className="mt-auto pt-5 group-open:pt-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-wood [&::-webkit-details-marker]:hidden">
                  Opening hours
                  <svg
                    className="transition-transform duration-300 group-open:rotate-45"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <dl className="mt-4 space-y-1.5 border-t border-line pt-4">
                  {loc.hours.map(([day, time]) => (
                    <div
                      key={day}
                      className="flex items-baseline justify-between gap-3 text-sm"
                    >
                      <dt className="font-medium text-ink-soft">{day}</dt>
                      <dd className="text-right font-semibold text-ink">
                        {time}
                      </dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    loc.mapQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-flame hover:text-flame-soft"
                >
                  Get directions
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
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </a>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}