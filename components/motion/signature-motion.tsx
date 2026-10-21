"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SIGNATURE_DRAW } from "@/lib/signature";

export function SignatureMotion() {
  useEffect(() => {
    const path = document.querySelector<SVGPathElement>("[data-signature='draw']");
    const trigger = document.querySelector<HTMLElement>("[data-signature-scroll]");
    if (!path || !trigger) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 900px)");
    if (reduce) {
      path.style.strokeDashoffset = "0";
      return;
    }

    const playOnce = () => {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          path.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1)";
          path.style.strokeDashoffset = "0";
          io.disconnect();
        },
        { threshold: 0.35 },
      );
      io.observe(trigger);
      return () => io.disconnect();
    };

    if (!desktop.matches) return playOnce();

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        path,
        { strokeDashoffset: SIGNATURE_DRAW },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return null;
}
