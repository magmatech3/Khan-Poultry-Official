import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RECIPES, getRecipe } from "@/lib/recipes";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return RECIPES.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return {};
  return {
    title: `${recipe.title} | Khan's Poultry & Meats`,
    description: recipe.excerpt,
  };
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  const others = RECIPES.filter((r) => r.slug !== recipe.slug).slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-4xl px-5 pt-10 md:px-8 md:pt-16">
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-flame"
        >
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
            <path d="M19 12H5" />
            <path d="m11 18-6-6 6-6" />
          </svg>
          All recipes
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-flame-pale px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-flame">
            {recipe.category}
          </span>
          <span className="text-sm font-medium text-ink-soft">
            {recipe.date} · {recipe.readTime}
          </span>
        </div>

        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
          {recipe.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">
          {recipe.intro}
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 pt-10 md:px-8 md:pt-14">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-wood-deep">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            priority
            sizes="(min-width: 896px) 56rem, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.35fr] md:gap-14">
          <div className="rounded-3xl bg-cream-light p-7 md:p-9">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Ingredients
            </h2>
            <ul className="mt-6 space-y-3.5">
              {recipe.ingredients.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-snug">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-flame" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Method
            </h2>
            <ol className="mt-6 space-y-6">
              {recipe.instructions.map((step, i) => (
                <li key={step} className="flex gap-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper text-sm font-bold text-flame ring-1 ring-line">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-[15px] leading-relaxed text-ink">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {recipe.note && (
          <p className="mt-14 rounded-2xl border border-line bg-paper px-5 py-4 text-sm font-medium text-ink-soft">
            * {recipe.note}.
          </p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
        <div className="border-t border-line pt-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              More from the kitchen
            </h2>
            <Link
              href="/recipes"
              className="text-sm font-semibold text-ink-soft transition-colors hover:text-flame"
            >
              View all →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((r) => (
              <Link
                key={r.slug}
                href={`/recipes/${r.slug}`}
                className="group rounded-2xl border border-line bg-paper transition-colors hover:border-flame"
              >
                <span className="relative block h-36 w-full overflow-hidden rounded-t-2xl bg-wood-deep">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="(min-width: 896px) 22rem, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </span>
                <div className="p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                  {r.category} · {r.readTime}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-wood">
                  {r.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {r.excerpt}
                </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}