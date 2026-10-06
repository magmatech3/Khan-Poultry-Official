"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Single client boundary for all page motion.
 * Sections opt in via data attributes — no motion code scattered per component.
 * Everything collapses to static when prefers-reduced-motion is set (content is
 * visible by default; GSAP only hides things it is about to animate).
 */
export default function PageMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.utils.toArray<HTMLElement>(".hero-line").forEach((line) => {
        gsap.fromTo(
          line,
          { yPercent: 115 },
          { yPercent: 0, duration: 1, ease: "power4.out", delay: 0.1 }
        );
      });
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.45,
        }
      );

      // Hero background parallax on scroll away
      const hero = el.querySelector(".hero-section");
      if (hero) {
        gsap.to(".hero-section", {
          backgroundPosition: "50% 60%",
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Lamb video slow drift for depth
      const lamb = el.querySelector(".lamb-section");
      if (lamb) {
        gsap.fromTo(
          lamb.querySelector(".lamb-media"),
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: lamb,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: Number(item.dataset.delay || 0),
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          }
        );
      });

      gsap.utils
        .toArray<HTMLElement>("[data-reveal-scale]")
        .forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, scale: 0.94, y: 16 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 90%", once: true },
            }
          );
        });

      // CTA background parallax
      const cta = el.querySelector(".cta-section");
      if (cta) {
        gsap.fromTo(
          cta.querySelector(".cta-bg"),
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: cta,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // 3D tilt on hover
      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((card) => {
        const strength = Number(card.dataset.tilt || 8);
        const inner = card.querySelector(".tilt-inner") as HTMLElement | null;
        const set = (cx: number, cy: number) => {
          const r = card.getBoundingClientRect();
          const px = (cx - r.left) / r.width - 0.5;
          const py = (cy - r.top) / r.height - 0.5;
          card.style.transform =
            `perspective(900px) rotateX(${(-py * strength).toFixed(2)}deg) ` +
            `rotateY(${(px * strength).toFixed(2)}deg)`;
          if (inner) {
            inner.style.transform = `translate3d(${(px * 8).toFixed(2)}px, ${(py * 8).toFixed(2)}px, 0)`;
          }
        };
        const reset = () => {
          card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
          if (inner) inner.style.transform = "translate3d(0,0,0)";
        };
        card.addEventListener("mousemove", (e) => set(e.clientX, e.clientY));
        card.addEventListener("mouseleave", reset);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}