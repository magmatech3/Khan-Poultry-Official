"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GIFT_CARD_URL, INSTAGRAM_URL, PHONE_LINK } from "@/lib/data";
import { useCart } from "@/components/cart/CartProvider";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About Us", href: "/about" },
  { label: "Send Feedback", href: "/feedback" },
  { label: "Contact Us", href: "/contact" },
];

const MORE_LINKS = [
  { label: "Recipes", href: "/recipes" },
  { label: "Gift Cards", href: GIFT_CARD_URL, external: true },
  { label: "Admin", href: "/admin" },
];

function CartButton({ count }: { count: number }) {
  const { setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Open order bag, ${count} item${count === 1 ? "" : "s"}`}
      className="press relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-wood/40 hover:text-wood"
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-flame px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}

export default function Navbar() {
  const { cart } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreExpanded, setMoreExpanded] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMore = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMoreOpen(true);
  };

  const hideMore = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMoreOpen(false), 150);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMoreOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Utility strip */}
      <div className="hidden bg-wood-deep text-cream/80 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-8 text-[12px] font-medium">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-leaf-light" aria-hidden />
            100% Halal certified · Trusted since 1990
          </span>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Admin
            </Link>
            <span className="h-4 w-px bg-cream/20" aria-hidden />
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @khans_poultry
            </a>
            <span className="h-4 w-px bg-cream/20" aria-hidden />
            <a href={PHONE_LINK} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call 344-CHIK
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? "border-b border-line/80 bg-paper/90 shadow-[0_2px_20px_-8px_rgba(42,30,22,0.12)]"
            : "border-b border-transparent bg-paper/60"
        } backdrop-blur-xl`}
      >
      <div className="h-[2px] bg-gradient-to-r from-leaf via-leaf-light to-leaf" aria-hidden />
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="press group flex items-center gap-2.5" aria-label="Khan's Poultry & Meats home">
          <span className="relative">
            <Image
              src="/images/KHAN'S%20LOGO.png"
              alt="Khan's Poultry & Meats logo"
              width={44}
              height={44}
              priority
              className="h-11 w-11"
            />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-paper bg-leaf-light" aria-hidden />
          </span>
          <span className="font-display text-lg font-bold leading-none tracking-tight">
            Khan&apos;s
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-leaf">
              Poultry &amp; Meats
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex xl:gap-1.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                isActive(link.href)
                  ? "text-wood"
                  : "text-ink hover:bg-cream-light hover:text-wood"
              }`}
            >
              {link.label}
              <span
                className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-leaf transition-transform duration-300 origin-left ${
                  isActive(link.href) ? "scale-x-100" : "scale-x-0"
                }`}
                style={{ transformOrigin: "left", transitionTimingFunction: "var(--ease-out-cubic)" }}
                aria-hidden
              />
            </Link>
          ))}
          <div
            ref={moreRef}
            className="relative"
            onMouseEnter={openMore}
            onMouseLeave={hideMore}
          >
            <button
              type="button"
              onClick={() => {
                if (closeTimer.current) clearTimeout(closeTimer.current);
                setMoreOpen((v) => !v);
              }}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              className="press flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-cream-light hover:text-wood"
            >
              More
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              role="menu"
              style={{ transformOrigin: "top center" }}
              className={`absolute left-1/2 top-full z-50 mt-2 w-52 -translate-x-1/2 rounded-2xl border border-line bg-paper p-2 shadow-[0_20px_50px_-20px_rgba(42,30,22,0.35)] transition-[opacity,transform] duration-200 ${
                moreOpen
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-1 scale-[0.97] opacity-0"
              }`}
              onMouseEnter={openMore}
              onMouseLeave={hideMore}
            >
              {MORE_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  role="menuitem"
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-cream-light hover:text-wood"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <CartButton count={cart?.count ?? 0} />
          <a
            href={PHONE_LINK}
            className="press rounded-full bg-leaf px-6 py-3 text-base font-bold text-white shadow-[0_12px_28px_-12px_rgba(59,108,47,0.7)] transition-all duration-200 hover:bg-leaf-light hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Order Now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="press flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-cream-light md:hidden"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h10" />
              </>
            )}
          </svg>
        </button>
      </nav>
      </header>

      {/* Mobile menu sits outside the header on purpose: the header
          backdrop-filter makes it a containing block, which would trap this
          fixed overlay inside the 64px bar instead of covering the screen. */}
      {open && (
        <div className="fixed inset-0 top-16 z-50 flex flex-col overflow-y-auto bg-paper px-6 pb-10 pt-6 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-display text-2xl font-bold tracking-tight"
              >
                <span className="mr-3 text-sm font-bold text-leaf">
                  0{i + 1}
                </span>
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setMoreExpanded((v) => !v)}
              aria-expanded={moreExpanded}
              className="flex items-center justify-between border-b border-line py-4 font-display text-2xl font-bold tracking-tight"
            >
              <span>
                <span className="mr-3 text-sm font-bold text-leaf">
                  0{NAV_LINKS.length + 1}
                </span>
                More
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 text-ink ${moreExpanded ? "rotate-180" : ""}`}
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {moreExpanded && (
              <div className="flex flex-col gap-1 border-b border-line pb-4 pt-2">
                {MORE_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="py-1.5 text-base font-medium text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="mt-auto flex flex-col gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="press rounded-full border border-line py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-cream-light hover:border-wood/40"
            >
              Follow on Instagram
            </a>
            <a
              href={PHONE_LINK}
              onClick={() => setOpen(false)}
              className="press rounded-full bg-leaf py-4 text-center text-base font-bold text-white shadow-[0_10px_24px_-10px_rgba(59,108,47,0.6)] transition-all duration-200 hover:bg-leaf-light hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Order Now — 344-CHIK
            </a>
          </div>
        </div>
      )}
    </>
  );
}