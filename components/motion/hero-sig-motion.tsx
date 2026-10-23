"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { paintSignatureAmounts, pathsOf, revealSignature } from "@/components/motion/signature-motion";
import { signatureNameAmount } from "@/lib/signature-stroke";

const SHRINK_END = 0.68;
/** Resting size is a bit under a full-bleed cover. One scale still eases down to 1. */
const EXPANDED = 0.82;
const DRAW_START = 0.58;
/** Viewport-heights of upward travel spent drawing #underline, after the pin lets go. Linear, so the slash is still mid-stroke when the intro copy reaches the bottom edge. */
const UNDERLINE_TRAVEL = 0.5;

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
    const track = document.querySelector<HTMLElement>("[data-pin-track]");
    const card = track?.querySelector<HTMLElement>("[data-hero-card]");
    const color = track?.querySelector<HTMLElement>("[data-hero-color]");
    const kicker = track?.querySelector<HTMLElement>("[data-sig-kicker]");
    const chrome = track?.querySelector<HTMLElement>("[data-hero-meta]");
    const svg = track?.querySelector<SVGElement>(".sig-draw");
    if (!track || !card || !color || !kicker || !svg) return;

    const paths = pathsOf(svg);
    if (paths.length < 2) return;
    const lengths = paths.map((path) => path.getTotalLength());
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    const viewport = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const coarse = w < 900 || window.matchMedia("(pointer: coarse)").matches;
      if (!coarse || w !== vw || Math.abs(h - vh) / Math.max(vh, 1) > 0.25) {
        vw = w;
        vh = h;
      }
      return { w: vw, h: vh };
    };

    const coverScale = () => {
      const w = card.offsetWidth || 1;
      const h = card.offsetHeight || 1;
      const view = viewport();
      return Math.max(view.w / w, view.h / h) * 1.01;
    };

    const paint = (name: number, underline: number) => {
      paintSignatureAmounts(paths, lengths, [name, underline]);
      revealSignature(svg, name > 0 || underline > 0);
    };

    const applyFrom = (pinProgress: number, underlineProgress: number) => {
      const shrink = span(pinProgress, 0, SHRINK_END);
      const cover = coverScale();
      const expanded = Math.max(1, cover * EXPANDED);
      const scale = expanded + (1 - expanded) * shrink;
      card.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`;
      color.style.opacity = String(1 - span(pinProgress, 0.16, 0.74));
      kicker.style.opacity = String(span(pinProgress, 0.52, 0.7));
      if (chrome) chrome.style.opacity = String(1 - span(pinProgress, 0, 0.12));
      const name = signatureNameAmount((pinProgress - DRAW_START) / (1 - DRAW_START));
      const underline = pinProgress >= 1 ? Math.min(1, Math.max(0, underlineProgress)) : 0;
      paint(name, underline);
    };

    if (reduce) {
      card.style.transform = "translate3d(-50%, -50%, 0) scale(1)";
      color.style.opacity = "0";
      kicker.style.opacity = "1";
      if (chrome) chrome.style.opacity = "0";
      paint(1, 1);
      return () => {
        revealSignature(svg, false);
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      let pinProgress = 0;
      let underlineProgress = 0;
      const sync = () => applyFrom(pinProgress, underlineProgress);
      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onRefresh: (self) => {
          pinProgress = self.progress;
          sync();
        },
        onUpdate: (self) => {
          pinProgress = self.progress;
          sync();
        },
      });
      ScrollTrigger.create({
        trigger: track,
        start: "bottom bottom",
        end: () => `+=${Math.round(viewport().h * UNDERLINE_TRAVEL)}`,
        scrub: true,
        onRefresh: (self) => {
          underlineProgress = self.progress;
          sync();
        },
        onUpdate: (self) => {
          underlineProgress = self.progress;
          sync();
        },
      });
      sync();
    });
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const coarse = w < 900 || window.matchMedia("(pointer: coarse)").matches;
      if (coarse && w === vw && Math.abs(h - vh) / Math.max(vh, 1) <= 0.25) return;
      vw = w;
      vh = h;
      ScrollTrigger.refresh();
    };
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
