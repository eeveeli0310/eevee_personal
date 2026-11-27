"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

function isWorkIndex(pathname: string) {
  return /^\/(en|zh)\/work\/?$/.test(pathname);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const nativeSnap = isWorkIndex(pathname);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 900px)");
    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;

    const armScroll = () => {
      gsap.registerPlugin(ScrollTrigger);
      // Ignore the mobile URL bar's vertical resize so pinned sections don't jump.
      ScrollTrigger.config({ ignoreMobileResize: true });
      if (!desktop.matches && !reduce.matches) {
        ScrollTrigger.normalizeScroll({
          allowNestedScroll: true,
          lockAxis: true,
          type: "touch,wheel,pointer",
        });
      } else if (ScrollTrigger.normalizeScroll()) {
        ScrollTrigger.normalizeScroll(false);
      }
    };

    const setup = () => {
      // The Work index uses native scroll-snap. Lenis swallows the wheel and snap never locks.
      if (nativeSnap) {
        gsap.registerPlugin(ScrollTrigger);
        if (ScrollTrigger.normalizeScroll()) ScrollTrigger.normalizeScroll(false);
        return;
      }
      armScroll();
      if (lenis || reduce.matches || !desktop.matches) return;
      lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.09 });
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
  }, [nativeSnap]);

  return children;
}

declare global {
  interface Window {
    __eeveeLenis?: { stop: () => void; start: () => void } | null;
    __eeveeReady?: boolean;
    __eeveeContourEpoch?: number;
  }
}
