"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition-shadow placeholder:text-ink-soft/50 focus:border-flame focus:shadow-[0_0_0_3px_rgba(255,102,20,0.15)]";

export default function ShareRecipeForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const details = [
      `Name: ${data.get("name")}`,
      `Contact number: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      "",
      "Recipe:",
      data.get("recipe"),
    ].join("\n");
    setSent(true);
    window.location.href = `mailto:info@khanspoultry.com?subject=${encodeURIComponent(
      `Recipe submission — ${data.get("title")}`
    )}&body=${encodeURIComponent(details)}`;
  }

  return (
    <section id="share" className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
      <div className="grid overflow-hidden rounded-3xl border border-line lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col justify-between bg-cream-light px-6 py-12 md:px-12 md:py-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-flame">
              Share with us
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Share your recipe{" "}
              <span className="text-wood">with us!</span>
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-soft">
              Got a family favourite or a new twist on a classic? Send it our
              way and it could feature right here on the page.
            </p>
          </div>
          <p className="mt-12 text-sm font-bold uppercase tracking-[0.16em] text-wood">
            From your kitchen to ours
          </p>
        </div>

        <div className="bg-paper px-6 py-12 md:px-12 md:py-16">
          <form
            onSubmit={onSubmit}
            className="mx-auto max-w-md"
            aria-label="Share your recipe"
          >
            <div className="grid gap-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                  Name <span className="text-flame">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
                  Contact number <span className="text-flame">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                  Email <span className="text-flame">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-semibold">
                  Recipe title <span className="text-flame">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="recipe" className="mb-2 block text-sm font-semibold">
                  Recipe <span className="text-flame">*</span>
                </label>
                <textarea
                  id="recipe"
                  name="recipe"
                  rows={6}
                  required
                  placeholder="Ingredients, method, and any tips…"
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sent}
              className="mt-8 w-full rounded-full bg-flame px-8 py-4 text-base font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-flame-soft active:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sent ? "Opening your mail app…" : "Share Your Recipe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}