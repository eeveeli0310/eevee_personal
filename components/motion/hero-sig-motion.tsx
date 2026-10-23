"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { paintSignatureAmounts, pathsOf, revealSignature } from "@/components/motion/signature-motion";
import { signatureNameAmount } from "@/lib/signature-stroke";

const SHRINK_END = 0.68;
const DRAW_START = 0.58;
/** Settled plate scale. 1 is the full-viewport cream plate; the portrait lives inside it and scales with it. */
const SETTLED = 0.42;
/** Viewport-heights of upward travel spent drawing #underline, after the pin lets go. Linear, so the slash is still mid-stroke when the intro copy reaches the bottom edge. */
const UNDERLINE_TRAVEL = 0.5;
const CREAM = [243, 242, 236];
/** Settled plate and field. Eve's swatch #464B3E. */
const OLIVE = [70, 75, 62];
/** Logo ink. The field color itself never snaps — only which mark reads on it. */
const MARK_ON_LIGHT = [30, 32, 26];
const MARK_ON_DARK = [232, 230, 220];

function channelLinear(c: number) {
  const x = c / 255;
  return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}

function luminance(rgb: number[]) {
  return 0.2126 * channelLinear(rgb[0]) + 0.7152 * channelLinear(rgb[1]) + 0.0722 * channelLinear(rgb[2]);
}

function contrast(a: number[], b: number[]) {
  const hi = Math.max(luminance(a), luminance(b));
  const lo = Math.min(luminance(a), luminance(b));
  return (hi + 0.05) / (lo + 0.05);
}

/** Same eased `t` that scales the plate. 0 = cream, 1 = olive, linear in between. */
function fieldRgb(t: number): [number, number, number] {
  const x = Math.min(1, Math.max(0, t));
  return [
    Math.round(CREAM[0] + (OLIVE[0] - CREAM[0]) * x),
    Math.round(CREAM[1] + (OLIVE[1] - CREAM[1]) * x),
    Math.round(CREAM[2] + (OLIVE[2] - CREAM[2]) * x),
  ];
}

function fieldColor(t: number) {
  const [r, g, b] = fieldRgb(t);
  return `rgb(${r}, ${g}, ${b})`;
}

function fieldSurface(t: number): "light" | "dark" {
  const rgb = fieldRgb(t);
  return contrast(rgb, MARK_ON_DARK) > contrast(rgb, MARK_ON_LIGHT) ? "dark" : "light";
}

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
    const plate = track?.querySelector<HTMLElement>("[data-hero-plate]");
    const field = track?.querySelector<HTMLElement>("[data-hero-field]");
    const color = track?.querySelector<HTMLElement>("[data-hero-color]");
    const kicker = track?.querySelector<HTMLElement>("[data-sig-kicker]");
    const chrome = track?.querySelector<HTMLElement>("[data-hero-meta]");
    const svg = track?.querySelector<SVGElement>(".sig-draw");
    if (!track || !plate || !field || !color || !kicker || !svg) return;

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

    const paintPlate = (shrink: number) => {
      const scale = 1 + (SETTLED - 1) * shrink;
      const color = fieldColor(shrink);
      const surface = fieldSurface(shrink);
      plate.style.transform = `scale(${scale})`;
      plate.style.backgroundColor = color;
      plate.dataset.surface = surface;
      field.style.backgroundColor = color;
      field.dataset.surface = surface;
      if (shrink >= 1) plate.setAttribute("data-hero-settled", "");
      else plate.removeAttribute("data-hero-settled");
    };

    const resetPlate = () => {
      plate.style.transform = "";
      plate.style.backgroundColor = "";
      plate.dataset.surface = "light";
      plate.removeAttribute("data-hero-settled");
      field.style.backgroundColor = "";
      field.dataset.surface = "light";
    };

    const paint = (name: number, underline: number) => {
      paintSignatureAmounts(paths, lengths, [name, underline]);
      revealSignature(svg, name > 0 || underline > 0);
    };

    const applyFrom = (pinProgress: number, underlineProgress: number) => {
      const shrink = span(pinProgress, 0, SHRINK_END);
      paintPlate(shrink);
      color.style.opacity = String(1 - span(pinProgress, 0.16, 0.74));
      kicker.style.opacity = String(span(pinProgress, 0.52, 0.7));
      if (chrome) chrome.style.opacity = String(1 - span(pinProgress, 0, 0.12));
      const name = signatureNameAmount((pinProgress - DRAW_START) / (1 - DRAW_START));
      const underline = pinProgress >= 1 ? Math.min(1, Math.max(0, underlineProgress)) : 0;
      paint(name, underline);
    };

    if (reduce) {
      paintPlate(1);
      color.style.opacity = "0";
      kicker.style.opacity = "1";
      if (chrome) chrome.style.opacity = "0";
      paint(1, 1);
      return () => {
        resetPlate();
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
      resetPlate();
      color.style.opacity = "";
      kicker.style.opacity = "";
      if (chrome) chrome.style.opacity = "";
      revealSignature(svg, false);
    };
  }, [pathname]);

  return null;
}
