import Image from "next/image";

const PARTNERS = [
  { name: "Gasparillo", src: "/images/partners/gasparillo.avif" },
  { name: "Raw Fitness", src: "/images/partners/raw-fitness.avif" },
  { name: "Eden", src: "/images/partners/eden.avif" },
  { name: "Energy Limited", src: "/images/partners/energy-limited.avif" },
];

export default function Partners() {
  return (
    <section id="partners" className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-display text-3xl font-bold tracking-tight md:text-5xl">
            Supplying kitchens{" "}
            <span className="text-wood">across Trinidad.</span>
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">
            From neighbourhood favourites to fitness-focused kitchens — proud to
            be the supplier behind their counters.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="group flex h-24 items-center justify-center rounded-2xl border border-line bg-paper px-6 py-4 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-flame hover:shadow-[0_12px_32px_rgba(255,102,20,0.12)] md:h-32"
            >
              <div className="relative h-full w-full">
                <Image
                  src={p.src}
                  alt={`${p.name} — Khan's partner`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}