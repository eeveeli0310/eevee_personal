"use client";

import { useEffect } from "react";

const RECEDE_SCALE = 0.9;
const RECEDE_SHADE = 0.55;

export function StackMotion() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const apply = () => {
      raf = 0;
      const hero = document.querySelector<HTMLElement>("[data-stack='hero']");
      const sig = document.querySelector<HTMLElement>("[data-stack='sig']");
      const intro = document.querySelector<HTMLElement>("[data-stack='intro']");
      const sigWrap = document.querySelector<HTMLElement>("[data-signature-scroll]");
      const pairs: { el: HTMLElement; next: HTMLElement }[] = [];
      if (hero && sigWrap) pairs.push({ el: hero, next: sigWrap });
      if (sig && intro) pairs.push({ el: sig, next: intro });
      const view = window.innerHeight || 1;
      const allow = desktop.matches && !reduce.matches;
      for (const { el, next } of pairs) {
        const inner = el.querySelector<HTMLElement>("[data-inner]");
        const shade = el.querySelector<HTMLElement>("[data-shade]");
        if (!inner || !shade) continue;
        if (!allow) {
          inner.style.transform = "";
          shade.style.opacity = "0";
          inner.style.visibility = "";
          continue;
        }
        const p = Math.min(1, Math.max(0, 1 - next.getBoundingClientRect().top / view));
        inner.style.transform = p > 0 ? `scale(${1 - (1 - RECEDE_SCALE) * p})` : "";
        shade.style.opacity = String(RECEDE_SHADE * p);
        inner.style.visibility = p >= 1 ? "hidden" : "visible";
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
