"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Pins the photo wall and scrubs the track sideways. Mobile and reduced motion swipe instead. */
export function WallScroll() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>("[data-wall]");
    const track = section?.querySelector<HTMLElement>("[data-wall-track]");
    if (!section || !track) return;

    const desktop = window.matchMedia("(min-width: 900px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ctx: gsap.Context | null = null;

    const build = () => {
      ctx?.revert();
      ctx = null;
      gsap.set(track, { clearProps: "transform" });
      if (!desktop.matches || reduce.matches) return;

      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - section.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: true,
            start: "top top",
            end: () => "+=" + Math.max(1, track.scrollWidth - section.clientWidth),
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }, section);
    };

    build();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    desktop.addEventListener("change", build);
    reduce.addEventListener("change", build);

    return () => {
      window.removeEventListener("load", refresh);
      desktop.removeEventListener("change", build);
      reduce.removeEventListener("change", build);
      ctx?.revert();
    };
  }, []);

  return null;
}
