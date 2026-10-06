"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";



function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const inputClass = "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition-shadow placeholder:text-ink-soft/50 focus:border-flame focus:shadow-[0_0_0_3px_rgba(255,102,20,0.15)]";

const FACTS = ["Since 1990", "8 counters islandwide", "100% halal"];

const CATEGORIES = [
  { value: "quality", label: "Food Quality" },
  { value: "service", label: "Service" },
  { value: "cleanliness", label: "Cleanliness" },
  { value: "value", label: "Value for Money" },
  { value: "other", label: "Other" },
];

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [needRating, setNeedRating] = useState(false);
  const [category, setCategory] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      setNeedRating(true);
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <section className="relative min-h-[calc(80dvh-4rem)] overflow-hidden bg-white">
      <div className="absolute inset-0 bg-white" aria-hidden></div>
      <div className="absolute inset-0 bg-white opacity-5" aria-hidden></div>

      <div className="relative mx-auto grid min-h-[calc(80dvh-4rem)] max-w-7xl lg:grid-cols-2">
        {/* Pitch panel - full height beige background */}
        <div className="relative flex flex-col bg-cream-light lg:rounded-none">
          <div className="relative flex flex-col justify-between h-full z-10 p-4 md:p-8">
            <div className="flex items-center justify-between">
              <Image
                src="/images/KHAN'S%20LOGO.png"
                alt="Khan's Poultry & Meats logo"
                width={160}
                height={160}
                className="w-28 md:w-36"
                priority
              />
              </div>

            <div className="flex-1 flex flex-col justify-center">
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                We&apos;re hungry for{" "}
                <span className="text-flame">your thoughts.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
                From the counter to your kitchen. Tell us how it landed. We read
                every word, and we&apos;re always sharpening up.
              </p>
            </div>

            {/* Contact shortcuts */}
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="tel:+18686251000"
                className="flex items-center gap-3 rounded-2xl border border-line bg-paper/50 p-4 transition-[border-color,background-color] hover:border-flame/50 hover:bg-paper"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-flame/10 text-flame">
                  <PhoneIcon />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-wood">Call Us</p>
                  <p className="font-semibold text-ink">+1 868 625 1000</p>
                </div>
              </a>
              <a
                href="https://wa.me/18686251000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-line bg-paper/50 p-4 transition-[border-color,background-color] hover:border-leaf/50 hover:bg-paper"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-leaf/10 text-leaf">
                  <WhatsAppIcon />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-wood">WhatsApp</p>
                  <p className="font-semibold text-ink">Chat with us</p>
                </div>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-8">
              {FACTS.map((fact) => (
                <span key={fact} className="text-sm font-bold uppercase tracking-[0.16em] text-wood">
                  {fact}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="relative flex flex-col justify-center py-12 md:py-10 lg:py-8 px-6 md:px-10 lg:px-12 bg-white">

          <div className="relative mx-auto max-w-md">
            {/* Success state */}
            <div className="flex flex-col items-center py-10 text-center" style={{ display: sent ? "flex" : "none" }}>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-leaf text-white">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight">Thank you!</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">Your feedback landed in our inbox. We read every word.</p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="mx-auto max-w-md" aria-label="Send us your feedback" style={{ display: sent ? "none" : "block" }}>
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-semibold">First Name</label>
                    <input id="firstName" name="firstName" autoComplete="given-name" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-semibold">Last Name</label>
                    <input id="lastName" name="lastName" autoComplete="family-name" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email <span className="text-flame">*</span></label>
                    <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold">Phone</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="mb-2 block text-sm font-semibold">Category <span className="text-flame">*</span></label>
                  <select id="category" name="category" required className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <p className="text-sm font-semibold">Rate Us <span className="text-flame">*</span></p>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const value = i + 1;
                    const active = value <= (hover || rating);
                    return (
                      <svg
                        key={value}
                        width="34"
                        height="34"
                        viewBox="0 0 24 24"
                        fill={active ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.6"
                        onClick={() => {
                          setRating(value);
                          setNeedRating(false);
                        }}
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(0)}
                        className={`cursor-pointer rounded-lg p-1 transition-[transform,color] hover:scale-110 active:scale-95 ${active ? "text-flame" : "text-ink-soft/40"}`}
                        role="radio"
                        aria-checked={rating === value}
                        aria-label={`Rate ${value} out of 5`}
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    );
                  })}
                </div>
                {needRating && (
                  <p className="mt-2 h-5 text-sm font-medium text-danger" aria-live="polite">
                    Please select a rating to continue.
                  </p>
                )}

                <div className="mt-4 border-t border-line pt-4">
                  <label htmlFor="message" className="block text-sm font-semibold">Tell us more</label>
                  <p className="mb-3 mt-1 text-sm text-ink-soft">How can we improve?</p>
                  <textarea id="message" name="message" rows={5} className={inputClass + " resize-y"} />
                </div>

                {error && (
                  <p className="mt-6 text-center text-sm font-medium text-danger" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sent}
                  className="mt-8 w-full rounded-full bg-flame px-8 py-4 text-base font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-flame-soft active:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sent ? "Sending…" : "Send Feedback"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}