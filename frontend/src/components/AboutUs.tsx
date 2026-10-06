import Image from "next/image";
import { PHONE_LINK } from "@/lib/data";
import { withBasePath } from "@/lib/base-path";

const MISSION = [
  "Represent our sector on a national forum and adhere to the regulations and legislation pertinent to the food industry of Trinidad & Tobago.",
  "Create a safe and clean environment that caters to our customers' needs.",
  "Focus on exceptional customer service, every single day.",
  "Defend and promote the interests of the meat industry in Trinidad & Tobago.",
];

const VISION = [
  "Fulfil the needs of our customers with exceptional service in a clean, modern environment.",
  "Empower our staff and uphold our social responsibilities within the company.",
  "Raise the standard of the meat industry in Trinidad and Tobago.",
  "Constantly develop and innovate our current product lines for the brand.",
];

const STATS = [
  { value: "1990", label: "Founded in Marabella" },
  { value: "8", label: "Counters islandwide" },
  { value: "70+", label: "Team members" },
  { value: "100%", label: "Certified Halal" },
];

export default function AboutUs() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-wood-deep">
        <div className="absolute inset-0" aria-hidden>
          <video
            className="h-full w-full object-cover opacity-60"
            src={withBasePath("/videos/mart-overview.mp4")}
            poster={withBasePath("/images/hero-butcher.jpg")}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-wood-deep via-wood-deep/40 to-wood-deep/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-24 md:px-8 md:pb-32 md:pt-40">
          <p data-reveal className="text-xs font-bold uppercase tracking-[0.2em] text-leaf-soft">
            Since July 1990
          </p>
          <h1
            data-reveal
            className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-white md:text-7xl"
          >
            Our story began with{" "}
            <span className="text-leaf-soft">one counter</span> in Marabella.
          </h1>
          <p
            data-reveal
            className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/90 md:text-xl"
          >
            What started as freshly plucked chicken and a personal welcome has
            grown into one of South Trinidad&apos;s leading meat processors —
            across the island, wholesale and retail.
          </p>
          <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/menu"
              className="press inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-8 py-4 text-base font-semibold text-white shadow-[0_16px_40px_-14px_rgba(59,108,47,0.6)] transition-colors hover:bg-leaf-light"
            >
              Order online
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
            </a>
            <a
              href={PHONE_LINK}
              className="press inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call 344-CHIK
            </a>
          </div>
        </div>
      </section>

      {/* Story + stats */}
      <section className="bg-cream-light">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-4 md:px-8 md:pb-24 md:pt-6">
          <div
            data-reveal
            className="mt-14 grid gap-8 border-b border-line pb-12 md:mt-20 md:grid-cols-2 md:pb-16 lg:grid-cols-3"
          >
            <p className="max-w-3xl font-display text-2xl font-semibold leading-snug text-wood md:text-4xl lg:col-span-2">
              Quality, exceptional service, and competitive prices—without
              compromise.
            </p>
            <p className="text-[17px] leading-relaxed text-ink/85">
              Khan&apos;s story began in July 1990 in the heart of Marabella,
              supported by customers across San Fernando, Claxton Bay, and nearby
              communities. We started with freshly plucked chickens and a
              commitment to personal, attentive service.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 md:mt-16 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div key={stat.label} data-reveal data-delay={i * 0.05}>
                <p className="font-display text-4xl font-bold tracking-tight text-leaf md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div
            data-reveal
            className="mt-14 grid gap-10 pt-2 md:mt-16 md:pb-4 lg:grid-cols-2 lg:gap-16"
          >
            <div className="space-y-6 text-[17px] leading-relaxed text-ink/85">
              <p>
                Today, we are one of the leading meat processors in South
                Trinidad, spanning Southern Main Road Marabella, Market Street
                Marabella and Gulf View, La Romain. We currently employ over
                seventy persons and have a clear vision for future growth.
              </p>
              <p>
                Our products include poultry, goat, lamb, beef, seafood and
                convenience products. In achieving this goal, we continuously
                cooperate with our suppliers and listen to the needs of our
                customers. We believe in serving the best meats possible, and
                it is our goal to fulfil the highest standards of quality.
              </p>
            </div>
            <figure className="relative overflow-hidden rounded-2xl">
              <div className="aspect-video w-full relative">
                <Image
                  src={withBasePath("/images/products/whole-chicken.webp")}
                  alt="Fresh poultry at Khan's counter"
                  fill
                  className="object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* Shop Meat showcase */}
      <section className="relative overflow-hidden bg-ink">
        <div className="relative mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10 lg:py-12">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-leaf-soft">
              Meet Khan&apos;s
            </p>
            <h2
              data-reveal
              className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-5xl"
            >
              In our own words.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
              Hear straight from the team — what&apos;s behind the counter, what
              we sell and what has kept us going since 1990.
            </p>
          </div>

          <div data-reveal-scale className="relative mt-8">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
              <video
                className="aspect-[16/9] w-full object-cover"
                src={withBasePath("/videos/About Us Video.mp4")}
                poster={withBasePath("/images/hero-butcher.jpg")}
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <span className="absolute left-5 top-5 rounded-full bg-ink/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                Khan&apos;s Poultry &amp; Meats
              </span>
            </div>
            <p className="mx-auto mt-4 max-w-5xl text-sm font-medium uppercase tracking-[0.14em] text-cream/60">
              — Jaäen Khan, Director
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-6 lg:grid-cols-12">
            <div
              data-reveal
              className="rounded-[2rem] bg-wood p-8 text-cream md:p-12 lg:col-span-7"
            >
              <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                Our Mission
              </h3>
              <ol className="mt-8 space-y-7">
                {MISSION.map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-display text-3xl font-bold leading-none text-leaf-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-0.5 text-lg leading-relaxed">{item}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div
              data-reveal
              data-delay={0.08}
              className="rounded-[2rem] border border-line bg-cream-light p-8 md:p-12 lg:col-span-5"
            >
              <h3 className="font-display text-2xl font-bold md:text-3xl">
                Our Vision
              </h3>
              <ol className="mt-8 space-y-7">
                {VISION.map((item, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-display text-3xl font-bold leading-none text-leaf">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-0.5 text-lg leading-relaxed text-ink-soft">
                      {item}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}