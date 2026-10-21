"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 900px)");
    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;

    const setup = () => {
      if (lenis || reduce.matches || !desktop.matches) return;
      gsap.registerPlugin(ScrollTrigger);
      lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.1 });
      if (document.documentElement.classList.contains("is-loading")) lenis.stop();
      window.__eeveeLenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      ticker = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    };

    const teardown = () => {
      if (ticker) gsap.ticker.remove(ticker);
      ticker = null;
      lenis?.destroy();
      lenis = null;
      window.__eeveeLenis = null;
    };

    const onChange = () => {
      teardown();
      setup();
    };

    setup();
    desktop.addEventListener("change", onChange);
    reduce.addEventListener("change", onChange);
    return () => {
      desktop.removeEventListener("change", onChange);
      reduce.removeEventListener("change", onChange);
      teardown();
    };
  }, []);

  return children;
}

declare global {
  interface Window {
    __eeveeLenis?: { stop: () => void; start: () => void } | null;
    __eeveeReady?: boolean;
    __eeveeContourEpoch?: number;
  }
}
