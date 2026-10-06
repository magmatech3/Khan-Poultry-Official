import Image from "next/image";
import { PHONE_LINK, WHATSAPP_LINK } from "@/lib/data";

export default function Cta() {
  const waHref = `${WHATSAPP_LINK}?text=${encodeURIComponent(
    "Hi, I'd like to place an order."
  )}`;
  return (
    <section className="cta-section relative overflow-hidden">
      <div className="cta-bg absolute inset-0">
        <Image
          src="/images/cta-seasoned.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-wood-deep/85" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-24 text-center md:py-32">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-soft">
          Wholesale &amp; retail — every day
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.02em] text-white md:text-6xl">
          Ready for tonight&apos;s table?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream">
          Call us, message us, or walk into any of our counters. We&apos;ll
          have it cut, seasoned and bagged before you finish your greeting.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="press rounded-full bg-leaf px-8 py-4 text-base font-semibold text-white shadow-[0_16px_40px_-14px_rgba(59,108,47,0.5)] transition-colors hover:bg-leaf-light"
          >
            Order on WhatsApp
          </a>
          <a
            href={PHONE_LINK}
            className="press rounded-full border-2 border-white/40 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-wood"
          >
            Call 344-CHIK
          </a>
        </div>
      </div>
    </section>
  );
}