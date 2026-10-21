"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SIGNATURE_TOTAL_S, signatureFractions } from "@/lib/signature-stroke";

export function pathsOf(svg: SVGElement) {
  return [...svg.querySelectorAll<SVGPathElement>("[data-signature-path]")];
}

/** Dash gap is longer than the stroke so a short length measurement cannot repeat as a second dash. */
export function paintSignatureAmounts(paths: SVGPathElement[], lengths: number[], amounts: number[]) {
  paths.forEach((path, index) => {
    const length = lengths[index] || 0;
    const drawn = amounts[index] ?? 0;
    path.style.transition = "none";
    if (length <= 0) {
      path.style.visibility = "hidden";
      return;
    }
    path.setAttribute("pathLength", String(length));
    path.style.strokeDasharray = `${length} ${length + 100}`;
    path.style.strokeDashoffset = `${length * (1 - Math.min(1, Math.max(0, drawn)))}`;
    path.style.visibility = drawn <= 0 ? "hidden" : "visible";
  });
}

export function paintSignature(paths: SVGPathElement[], lengths: number[], progress: number) {
  paintSignatureAmounts(paths, lengths, signatureFractions(progress));
}

export function revealSignature(svg: SVGElement, on: boolean) {
  svg.classList.toggle("is-inking", on);
}

export function SignatureMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 900px)");
    const svgs = [...document.querySelectorAll<SVGElement>(".sig-stroke")];

    const finish = (svg: SVGElement) => {
      const paths = pathsOf(svg);
      paintSignature(paths, paths.map((path) => path.getTotalLength()), 1);
      paths.forEach((path) => {
        path.style.visibility = "visible";
      });
      revealSignature(svg, true);
    };

    if (reduce) {
      svgs.forEach(finish);
      return () => svgs.forEach((svg) => svg.classList.remove("is-inking"));
    }

    const cleanups: Array<() => void> = [];

    for (const svg of svgs) {
      const paths = pathsOf(svg);
      if (paths.length < 2 || svg.closest("[data-hero-sig]")) continue;
      const lengths = paths.map((path) => path.getTotalLength());
      paintSignature(paths, lengths, 0);
      revealSignature(svg, false);
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
              paintSignature(paths, lengths, self.progress);
              revealSignature(svg, self.progress > 0);
            },
          });
        });
        cleanups.push(() => ctx.revert());
        continue;
      }

      let raf = 0;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          io.disconnect();
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min(1, (now - start) / (SIGNATURE_TOTAL_S * 1000));
          paintSignature(paths, lengths, progress);
          revealSignature(svg, progress > 0);
            if (progress < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        },
        { threshold: 0.4 },
      );
      io.observe(svg);
      cleanups.push(() => {
        io.disconnect();
        cancelAnimationFrame(raf);
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
      svgs.forEach((svg) => svg.classList.remove("is-inking"));
    };
  }, [pathname]);

  return null;
}
