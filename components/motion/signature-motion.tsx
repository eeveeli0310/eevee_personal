"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SIGNATURE_LETTER_DRAW, SIGNATURE_SLASH_DRAW } from "@/lib/signature-draw";

export function SignatureMotion() {
  useEffect(() => {
    const letters = document.querySelector<SVGPathElement>("[data-signature='letters']");
    const slash = document.querySelector<SVGPathElement>("[data-signature='slash']");
    const trigger = document.querySelector<HTMLElement>("[data-signature-scroll]");
    if (!letters || !slash || !trigger) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 900px)");
    if (reduce) {
      letters.style.strokeDashoffset = "0";
      slash.style.strokeDashoffset = "0";
      return;
    }

    if (!desktop.matches) {
      let timer = 0;
      let slashShown = false;
      const showSlash = () => {
        if (slashShown) return;
        slashShown = true;
        slash.style.transition = "stroke-dashoffset 0.45s cubic-bezier(.22,1,.36,1)";
        slash.style.strokeDashoffset = "0";
      };
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          letters.style.transition = "stroke-dashoffset 1.35s cubic-bezier(.22,1,.36,1)";
          letters.style.strokeDashoffset = "0";
          letters.addEventListener("transitionend", showSlash, { once: true });
          timer = window.setTimeout(showSlash, 1500);
          io.disconnect();
        },
        { threshold: 0.35 },
      );
      io.observe(trigger);
      return () => {
        io.disconnect();
        window.clearTimeout(timer);
        letters.removeEventListener("transitionend", showSlash);
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      timeline.fromTo(
        letters,
        { strokeDashoffset: SIGNATURE_LETTER_DRAW },
        { strokeDashoffset: 0, ease: "none", duration: 0.82 },
      );
      timeline.fromTo(
        slash,
        { strokeDashoffset: SIGNATURE_SLASH_DRAW },
        { strokeDashoffset: 0, ease: "none", duration: 0.18 },
      );
    });
    return () => ctx.revert();
  }, []);

  return null;
}
