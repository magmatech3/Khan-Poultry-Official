import Link from "next/link";
import Image from "next/image";
import { RECIPES } from "@/lib/recipes";
import ShareRecipeForm from "@/components/ShareRecipeForm";

export default function RecipesPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-5 pt-10 md:px-8 md:pt-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-leaf">
            Cook with us
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-7xl">
            From the counter,{" "}
            <span className="text-leaf">into your kitchen.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            Nine tried-and-true recipes using the best cuts from our counters.
            Tap any one for the full dish — ingredients, steps and all.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="divide-y divide-line border-t border-line border-b border-line">
          {RECIPES.map((recipe, i) => (
            <Link
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              className="group grid items-center gap-x-8 gap-y-2 py-7 md:grid-cols-[4.5rem_12rem_1fr_auto] md:py-9"
            >
              <span className="font-display text-sm font-bold text-leaf md:text-base">
                0{i + 1}
              </span>
              <span className="relative mt-2 hidden h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-wood-deep md:mt-0 md:block">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  sizes="128px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                  {recipe.category} · {recipe.date} · {recipe.readTime}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-leaf md:text-3xl">
                  {recipe.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
                  {recipe.excerpt}
                </p>
              </div>
              <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-[transform,background-color,border-color,color] duration-200 group-hover:border-leaf group-hover:bg-leaf group-hover:text-white group-active:scale-90 md:flex">
                <svg
                  width="18"
                  height="18"
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
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ShareRecipeForm />
    </>
  );
}