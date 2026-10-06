import Image from "next/image";
import { FAVORITE_CUTS, WHATSAPP_LINK } from "@/lib/data";
import { withBasePath } from "@/lib/base-path";

const [poultry, seasoned, seafood] = FAVORITE_CUTS;

function OrderLink({
  note,
  className = "",
  dark = false,
}: {
  note: string;
  className?: string;
  dark?: boolean;
}) {
  const href = `${WHATSAPP_LINK}?text=${encodeURIComponent(
    `Hi, ${note}.`
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`press group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${className} ${
        dark
          ? "bg-leaf text-white hover:bg-leaf-light"
          : "bg-leaf text-white hover:bg-leaf-light"
      }`}
    >
      Order now
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform group-hover:translate-x-0.5"
        aria-hidden
      >
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    </a>
  );
}

function SplitRow({
  cut,
  flip,
  index,
  video,
  poster,
}: {
  cut: (typeof poultry);
  flip?: boolean;
  index: number;
  video?: string;
  poster?: string;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div
        className={`relative overflow-hidden rounded-[2rem] bg-wood-deep shadow-[0_30px_70px_-40px_rgba(28,17,11,0.5)] will-change-transform ${
          flip ? "lg:order-2" : ""
        }`}
        data-reveal-scale
        data-tilt="5"
      >
        <div className="relative aspect-[16/11]">
          {video ? (
            <video
              className="h-full w-full object-cover"
              src={withBasePath(video)}
              poster={poster ? withBasePath(poster) : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={cut.alt}
            />
          ) : (
            <Image
              src={cut.image}
              alt={cut.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.04]"
            />
          )}
        </div>
        <span className="absolute left-5 top-5 rounded-full bg-paper/95 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-sm backdrop-blur-md">
          {cut.price}
        </span>
        <span className="absolute right-5 top-5 font-display text-6xl font-bold leading-none text-white/90 md:text-8xl" aria-hidden>
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div data-reveal className={flip ? "lg:order-1" : ""}>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-flame">
          {cut.tagline}
        </p>
        <h3 className="font-display text-3xl font-bold tracking-[-0.015em] md:text-5xl">
          {cut.name}
        </h3>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
          {cut.description}
        </p>
        <OrderLink note={cut.orderNote} className="mt-8" />
      </div>
    </div>
  );
}

export default function Showcase() {
  return (
    <section id="cuts" className="bg-paper-soft py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf">
            Behind the counter
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-0.02em] md:text-6xl">
            The cuts our customers
            <span className="text-wood"> keep coming back for.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-20">
          <SplitRow
            cut={poultry}
            index={1}
            video="/videos/rotisserie-behind-scenes.mp4"
            poster={poultry.image}
          />
          <SplitRow cut={seasoned} flip index={2} />
        </div>

        {/* Full-width seafood feature — breaks the alternating rhythm */}
        <div className="relative mt-20 overflow-hidden rounded-[2rem] md:mt-28">
          <div className="cta-bg absolute inset-0" data-reveal-scale>
            <Image
              src={seafood.image}
              alt={seafood.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-wood-deep/95 via-wood/60 to-wood/10"
            aria-hidden
          />
          <div className="relative flex min-h-[420px] flex-col justify-end p-7 text-white md:min-h-[540px] md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-flame-pale">
              {seafood.tagline}
            </p>
            <h3 className="mt-2 font-display text-4xl font-bold tracking-[-0.02em] md:text-6xl">
              {seafood.name}
            </h3>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-cream">
              {seafood.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <OrderLink note={seafood.orderNote} />
              <span className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold">
                From {seafood.price.replace("From ", "")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}