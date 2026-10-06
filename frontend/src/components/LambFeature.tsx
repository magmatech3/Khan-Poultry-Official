import { WHATSAPP_LINK } from "@/lib/data";
import { withBasePath } from "@/lib/base-path";

export default function LambFeature() {
  const waHref = `${WHATSAPP_LINK}?text=${encodeURIComponent(
    "Hi, I'd like to order lamb."
  )}`;
  return (
    <section
      id="lamb"
      className="lamb-section relative overflow-hidden bg-wood-deep"
    >
      <div className="lamb-media absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src={withBasePath("/videos/lamb.mp4")}
          poster={withBasePath("/images/products/lamb-chops.webp")}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Behind the scenes of Khan's Poultry lamb"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-white md:text-6xl">
            Cut, trimmed and
            <span className="text-leaf-light"> ready to roast.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/90">
            Chops, racks, legs and roasts — halal lamb trimmed on the counter
            and priced per pound. Order it cut the way your recipe needs.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="press rounded-full bg-leaf px-8 py-4 text-base font-semibold text-white shadow-[0_16px_40px_-14px_rgba(59,108,47,0.5)] transition-colors hover:bg-leaf-light"
            >
              Order lamb
            </a>
            <a
              href="/menu?category=specialty-meats"
              className="press rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              See prices
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}