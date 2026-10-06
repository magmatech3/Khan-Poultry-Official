"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/base-path";

const CHANNELS = [
  {
    label: "Call us",
    value: "344-CHIK (2445)",
    hint: "Tap to dial from your phone",
    href: "tel:+18683442445",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    color: "bg-leaf/10 text-leaf",
    hoverColor: "hover:bg-leaf/20",
  },
  {
    label: "WhatsApp us",
    value: "Message 344-CHIK",
    hint: "Chat with the counter staff",
    href: "https://wa.me/18683442445?text=Hi%2C%20I%20have%20a%20question%20about%20a%20Khan%27s%20order.",
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <path d="M18 5l3 3-3 3" />
      </svg>
    ),
    color: "bg-green-100 text-green-700",
    hoverColor: "hover:bg-green-200",
  },
  {
    label: "Email us",
    value: "info@khanspoultry.com",
    hint: "Orders, wholesale and bulk enquiries",
    href: "mailto:info@khanspoultry.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: "bg-amber-100 text-amber-700",
    hoverColor: "hover:bg-amber-200",
  },
  {
    label: "Follow the story",
    value: "@khans_poultry",
    hint: "Fresh from the counter, daily",
    href: "https://www.instagram.com/khans_poultry/",
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    color: "bg-pink-100 text-pink-700",
    hoverColor: "hover:bg-pink-200",
  },
];

export default function Contact() {
  return (
      <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-light/50 via-paper to-paper py-16 md:py-24 lg:py-32">
        <div
          className="absolute inset-0 bg-repeat opacity-5"
          style={{ backgroundImage: `url(${withBasePath("/images/ec845c_f896174167cb464bab2989f8ca4a0091.svg")})` }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-leaf/10 px-4 py-1.5 text-sm font-semibold text-leaf mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 h-2 w-2 rounded-full bg-leaf animate-pulse" />
                <span className="absolute inset-0 h-2 w-2 rounded-full bg-leaf animate-pulse" style={{ animationDelay: '150ms' }} />
                <span className="absolute inset-0 h-2 w-2 rounded-full bg-leaf animate-pulse" style={{ animationDelay: '300ms' }} />
              </span>
              We&apos;re listening
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink md:text-6xl lg:text-7xl leading-[1.05]">
              Let&apos;s talk <span className="text-leaf">shop.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-ink-soft md:text-xl">
              A question about a cut, a wholesale order or a bulk quote. Call, message us or walk into any of our counters.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+18683442445"
                className="press inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-leaf px-8 py-4 text-base font-semibold text-white shadow-[0_18px_42px_-16px_rgba(59,108,47,0.55)] hover:bg-leaf-dark transition-all duration-200 hover:scale-[1.02]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call 344-CHIK
              </a>
              <a
                href="https://wa.me/18683442445?text=Hi%2C%20I%20have%20a%20question%20about%20a%20Khan%27s%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full border-2 border-leaf/30 bg-transparent px-8 py-4 text-base font-semibold text-leaf hover:bg-leaf hover:text-white hover:border-leaf transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  <path d="M18 5l3 3-3 3" />
                </svg>
                WhatsApp us
              </a>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-paper via-paper/50 to-transparent" aria-hidden />
      </section>

      {/* Contact Methods Grid */}
      <section className="py-8 md:py-12 lg:py-16 bg-paper -mt-8">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((ch, i) => (
              <a
                key={ch.label}
                href={ch.href}
                {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative flex flex-col items-center text-center p-4 md:p-6 rounded-2xl bg-paper border border-line/50 hover:border-leaf/30 hover:shadow-[0_20px_40px_-20px_rgba(42,30,22,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-leaf/40 hover:shadow-[0_24px_48px_-24px_rgba(59,108,47,0.25)]"
                data-reveal
                data-delay={i * 0.08}
              >
                <div className="relative mb-4">
                  <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${ch.color} transition-colors duration-300 group-hover:scale-110`}>
                    {ch.icon}
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute -inset-1 rounded-full border-2 border-leaf/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-leaf mb-2">
                    {ch.label}
                  </p>
                  <p className="font-display text-xl font-bold leading-tight text-ink mb-2">
                    {ch.value}
                  </p>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {ch.hint}
                  </p>
                </div>

<div className="mt-4 pt-3 border-t border-line/30">
                  <span className={`inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${ch.color} ${ch.hoverColor} group-hover:scale-[1.02]`}>
                    {ch.external ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Open
                      </>
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M5 12h14" />
                          <path d="m13 6 6 6-6 6" />
                        </svg>
                        Connect
                      </>
                    )}
                  </span>
                </div>

                {/* Decorative accent line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-leaf group-hover:w-1/2 transition-all duration-300 rounded-full" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-paper via-cream-light/50 to-cream-light/80" aria-hidden />
        <div
          className="absolute inset-0 bg-repeat opacity-5"
          style={{ backgroundImage: `url(${withBasePath("/images/ec845c_f896174167cb464bab2989f8ca4a0091.svg")})` }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-leaf/10 px-3 py-1 text-sm font-semibold text-leaf mb-4">
                Visit us
              </span>
              <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl mb-4">
                Visit any of our counters
              </h2>
              <p className="text-lg leading-relaxed text-ink-soft mb-8 max-w-lg">
                Walk into any of our 7 locations across Trinidad for the freshest cuts, friendly service, and the full Khan&apos;s experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Khan%27s+Poultry+And+Meats+Limited"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(59,108,47,0.5)] hover:bg-leaf-dark transition-all duration-200 hover:scale-[1.02]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Find nearest location
                </a>
                <a
                  href="https://wa.me/18683442445?text=Hi%2C%20I%20have%20a%20question%20about%20a%20Khan%27s%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-leaf/30 bg-transparent px-6 py-3 text-base font-semibold text-leaf hover:bg-leaf hover:text-white hover:border-leaf transition-all duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    <path d="M18 5l3 3-3 3" />
                  </svg>
                  WhatsApp us
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden bg-cream-light shadow-[0_30px_60px_-20px_rgba(42,30,22,0.25)]">
                <Image
                  src={withBasePath("/images/about-team.jpg")}
                  alt="Khan's Poultry store interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-paper/95 via-paper/50 to-transparent" aria-hidden />
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-white/90">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="font-medium">7 locations across Trinidad</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="font-medium">Mon-Sat 7am-6pm · Sun 7am-2pm</span>
</div>
          </div>
        </div>
        </div>
        </div>
        </div>
      </section>
      </div>
  );
}