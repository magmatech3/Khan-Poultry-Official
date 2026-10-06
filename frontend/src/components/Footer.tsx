import Image from "next/image";
import Link from "next/link";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHONE_LINK,
  WHATSAPP_LINK,
} from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-wood text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image
              src="/images/Khan's%20White.png"
              alt="Khan's Poultry & Meats"
              width={160}
              height={61}
              className="w-40"
              loading="lazy"
            />
            <p className="mt-5 max-w-sm leading-relaxed text-cream/90">
              Quality poultry, meat and seafood since 1990 — halal certified
              and fresh every day across 8 stores in Trinidad.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Khan's Poultry on Facebook"
                className="press flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-flame hover:bg-flame"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Khan's Poultry on Instagram"
                className="press flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-flame hover:bg-flame"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-flame-pale">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-cream/90">
              <li>
                <Link href="/menu" className="transition-colors hover:text-white">Menu</Link>
              </li>
              <li>
                <Link href="/#cuts" className="transition-colors hover:text-white">Our Cuts</Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-white">About Us</Link>
              </li>
              <li>
                <Link href="/#locations" className="transition-colors hover:text-white">Locations</Link>
              </li>
              <li>
                <Link href="/#reviews" className="transition-colors hover:text-white">Reviews</Link>
              </li>
              <li>
                <Link href="/#instagram" className="transition-colors hover:text-white">Instagram</Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">Contact Us</Link>
              </li>
              <li>
                <a href="https://Blinkskytrinidad.com/khanspoultry-giftcard" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Gift Cards</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-flame-pale">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-3 text-cream/90">
              <li>
                <a href={PHONE_LINK} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  344-CHIK (2445)
                </a>
              </li>
              <li>
                <a href={`mailto:info@khanspoultry.com`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  info@khanspoultry.com
                </a>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/15 pt-8 md:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/images/HALAL%20ICON.png"
              alt="Halal certified badge"
              width={34}
              height={34}
              className="h-9 w-9"
              loading="lazy"
            />
            <span className="text-sm font-semibold text-cream/90">
              Halal certified
            </span>
          </div>
          <p className="text-sm text-cream/70">
            © {year} Khan&apos;s Poultry &amp; Meats Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}