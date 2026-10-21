"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { paintSignature, pathsOf, revealSignature } from "@/components/motion/signature-motion";

const SHRINK_END = 0.62;
const DRAW_START = 0.56;

function ease(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 2 * x * x : 1 - ((-2 * x + 2) ** 2) / 2;
}

function span(progress: number, start: number, end: number) {
  return ease((progress - start) / (end - start));
}

export function HeroSigMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const wrap = document.querySelector<HTMLElement>("[data-hero-sig]");
    const card = wrap?.querySelector<HTMLElement>("[data-hero-card]");
    const color = wrap?.querySelector<HTMLElement>("[data-hero-color]");
    const kicker = wrap?.querySelector<HTMLElement>("[data-sig-kicker]");
    const chrome = wrap?.querySelector<HTMLElement>("[data-hero-meta]");
    const svg = wrap?.querySelector<SVGElement>(".sig-draw");
    if (!wrap || !card || !color || !kicker || !svg) return;

    const paths = pathsOf(svg);
    if (paths.length < 2) return;
    const lengths = paths.map((path) => path.getTotalLength());
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const coverScale = () => {
      const w = card.offsetWidth || 1;
      const h = card.offsetHeight || 1;
      return Math.max(window.innerWidth / w, window.innerHeight / h) * 1.01;
    };

    const apply = (progress: number) => {
      const shrink = span(progress, 0, SHRINK_END);
      const cover = coverScale();
      const scale = cover + (1 - cover) * shrink;
      card.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`;
      color.style.opacity = String(1 - span(progress, 0.16, 0.7));
      kicker.style.opacity = String(span(progress, 0.5, 0.66));
      if (chrome) chrome.style.opacity = String(1 - span(progress, 0, 0.12));
      const drawn = Math.min(1, Math.max(0, (progress - DRAW_START) / (1 - DRAW_START)));
      paintSignature(paths, lengths, drawn);
      revealSignature(svg, drawn > 0);
    };

    if (reduce) {
      card.style.transform = "translate3d(-50%, -50%, 0) scale(1)";
      color.style.opacity = "0";
      kicker.style.opacity = "1";
      if (chrome) chrome.style.opacity = "0";
      paintSignature(paths, lengths, 1);
      revealSignature(svg, true);
      return () => {
        revealSignature(svg, false);
      };
    }

    apply(0);
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onRefresh: (self) => apply(self.progress),
        onUpdate: (self) => apply(self.progress),
      });
    });
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      card.style.transform = "";
      color.style.opacity = "";
      kicker.style.opacity = "";
      if (chrome) chrome.style.opacity = "";
      revealSignature(svg, false);
    };
  }, [pathname]);

  return null;
}
