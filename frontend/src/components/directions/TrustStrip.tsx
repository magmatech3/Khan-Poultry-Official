const FACTS = [
  { label: "Halal certified", detail: "Trusted certification" },
  { label: "8 counters", detail: "Across Trinidad" },
  { label: "Since 1990", detail: "35+ years serving" },
  { label: "Fresh daily", detail: "Cut & seasoned in-house" },
];

export default function TrustStrip() {
  return (
    <section className="bg-leaf py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.label} className="flex flex-col items-center text-center">
              <dt className="font-display text-xl font-bold uppercase tracking-[0.08em] text-white md:text-2xl">
                {f.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-white/80">
                {f.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}