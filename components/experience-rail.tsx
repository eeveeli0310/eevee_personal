"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { RollText } from "@/components/roll-text";

type Item = {
  year: string;
  animateYear: boolean;
  title: string;
  body: string;
  href: string | null;
};

export function ExperienceRail({ items, label }: { items: Item[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const line = root.querySelector<HTMLElement>("[data-rail]");
    const onScroll = () => {
      if (!line) return;
      const rect = root.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const total = rect.height + view;
      const passed = view - rect.top;
      const p = Math.min(1, Math.max(0, passed / total));
      line.style.transform = `scaleY(${reduce ? 1 : p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const letters = root.querySelectorAll<HTMLElement>("[data-letter]");
    if (reduce) {
      letters.forEach((letter) => {
        letter.style.opacity = "1";
        letter.style.transform = "none";
      });
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const nodes = entry.target.querySelectorAll<HTMLElement>("[data-letter]");
            nodes.forEach((letter, index) => {
              window.setTimeout(() => {
                letter.style.opacity = "1";
                letter.style.transform = "none";
              }, index * 70);
            });
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.6 },
      );
      root.querySelectorAll("[data-year]").forEach((node) => io.observe(node));
      return () => {
        window.removeEventListener("scroll", onScroll);
        io.disconnect();
      };
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <div className="rail" ref={ref} aria-label={label}>
      <div className="rail-line" aria-hidden="true">
        <span data-rail style={{ transform: "scaleY(0)" }} />
      </div>
      {items.map((item) => {
        const year = item.animateYear ? item.year.split("") : [item.year];
        const title = item.href ? (
          <Link href={item.href}>
            <RollText>{item.title}</RollText>
          </Link>
        ) : (
          item.title
        );
        return (
          <article className="rail-item" key={item.title}>
            <div className="rail-year" data-year={item.animateYear ? "1" : "0"}>
              {year.map((char, index) => (
                <i
                  key={`${char}-${index}`}
                  data-letter={item.animateYear ? "1" : undefined}
                  style={item.animateYear ? { opacity: 0, transform: "translateY(0.4em)", transition: "0.45s ease" } : undefined}
                >
                  {char}
                </i>
              ))}
            </div>
            <h2 className="bd">{title}</h2>
            <p>{item.body}</p>
          </article>
        );
      })}
    </div>
  );
}
