"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function RevealEngine() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 900px)").matches;
    const roots = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduce) {
      roots.forEach((root) => root.classList.add("is-shown"));
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      roots.forEach((root) => {
        const lines = root.dataset.reveal === "lines";
        const targets = root.querySelectorAll(lines ? "[data-line-inner]" : "[data-word-inner]");
        if (!targets.length) return;
        gsap.to(targets, {
          yPercent: 0,
          y: 0,
          opacity: 1,
          duration: desktop ? 0.9 : 0.4,
          ease: easeOutCubic,
          stagger: desktop ? (lines ? 0.11 : 0.05) : 0.02,
          scrollTrigger: { trigger: root, start: "top 86%", once: true },
          onComplete() {
            targets.forEach((node) => {
              if (node instanceof HTMLElement) node.style.opacity = "1";
            });
            root.classList.add("is-shown");
          },
        });
      });
    });
    return () => ctx.revert();
  }, [pathname]);

  return null;
}
