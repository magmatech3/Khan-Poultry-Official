"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { STATS } from "@/lib/data";

function CountUp({ value }: { value: string }) {
  const match = useMemo(() => value.match(/^([\d.]+)(.*)$/), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(match ? "0" : value);

  useLayoutEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;
    let done = false;
    let tween: gsap.core.Tween | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done) return;
        done = true;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setText(value);
          io.disconnect();
          return;
        }
        const target = parseFloat(match[1]);
        const obj = { n: 0 };
        tween = gsap.to(obj, {
          n: target,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () =>
            setText(
              `${Number.isInteger(target) ? Math.round(obj.n) : obj.n.toFixed(1)}${
                match[2]
              }`
            ),
        });
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      tween?.kill();
    };
  }, [match, value]);

  return <span ref={ref}>{text}</span>;
}

export default function Stats() {
  return (
    <section className="bg-cream-light py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              className="group relative flex flex-col border-l-2 border-leaf pl-5"
              data-delay={i * 0.08}
            >
              <dt className="order-2 mt-2 text-sm font-medium text-ink-soft transition-colors group-hover:text-ink">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-5xl font-bold leading-none tracking-[-0.02em] text-leaf md:text-6xl">
                <span className="bg-gradient-to-b from-leaf to-leaf-dark bg-clip-text text-transparent">
                  <CountUp value={stat.value} />
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}