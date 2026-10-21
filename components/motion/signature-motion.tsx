"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SIG_SHARE = 0.85;
const SIG_MS = 3200;
const PAUSE_MS = 150;
const UNDERLINE_MS = 400;

function pathsOf(svg: SVGElement) {
  return [...svg.querySelectorAll<SVGPathElement>("[data-signature-path]")];
}

function park(paths: SVGPathElement[], lengths: number[]) {
  paths.forEach((path, index) => {
    const length = lengths[index] || 0;
    path.style.transition = "none";
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  });
}

/** Sig takes the first 85% of progress. The underline takes the rest. */
function paint(paths: SVGPathElement[], lengths: number[], progress: number) {
  const amounts = [Math.min(1, Math.max(0, progress / SIG_SHARE)), Math.min(1, Math.max(0, (progress - SIG_SHARE) / (1 - SIG_SHARE)))];
  paths.forEach((path, index) => {
    const length = lengths[index] || 0;
    const drawn = amounts[index] ?? (progress >= 1 ? 1 : 0);
    path.style.transition = "none";
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length * (1 - drawn)}`;
  });
}

function reveal(svg: SVGElement, on: boolean) {
  svg.classList.toggle("is-inking", on);
}

export function SignatureMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 900px)");
    const svgs = [...document.querySelectorAll<SVGElement>(".sig-stroke")];
    const timers: number[] = [];

    const finish = (svg: SVGElement) => {
      const paths = pathsOf(svg);
      paths.forEach((path) => {
        path.style.transition = "none";
        path.style.strokeDashoffset = "0";
      });
      reveal(svg, true);
    };

    if (reduce) {
      svgs.forEach(finish);
      return () => svgs.forEach((svg) => svg.classList.remove("is-inking"));
    }

    const cleanups: Array<() => void> = [];

    for (const svg of svgs) {
      const paths = pathsOf(svg);
      if (paths.length < 2) continue;
      const lengths = paths.map((path) => path.getTotalLength());
      park(paths, lengths);
      reveal(svg, false);
      const scroll = svg.dataset.signatureMode === "scroll" && desktop.matches;
      const trigger = svg.closest<HTMLElement>("[data-signature-scroll]");

      if (scroll && trigger) {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              paint(paths, lengths, self.progress);
              reveal(svg, self.progress > 0);
            },
          });
        });
        cleanups.push(() => ctx.revert());
        continue;
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          io.disconnect();
          reveal(svg, true);
          const [sig, underline] = paths;
          sig.style.transition = `stroke-dashoffset ${SIG_MS}ms linear`;
          sig.style.strokeDashoffset = "0";
          timers.push(
            window.setTimeout(() => {
              underline.style.transition = `stroke-dashoffset ${UNDERLINE_MS}ms linear`;
              underline.style.strokeDashoffset = "0";
            }, SIG_MS + PAUSE_MS),
          );
        },
        { threshold: 0.4 },
      );
      io.observe(svg);
      cleanups.push(() => io.disconnect());
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      cleanups.forEach((fn) => fn());
      svgs.forEach((svg) => svg.classList.remove("is-inking"));
    };
  }, [pathname]);

  return null;
}
