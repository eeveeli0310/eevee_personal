"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FG_START = 0.22;
const FG_SPAN = 0.22;

function foreground(p: number) {
  return Math.min(1, Math.max(0, (p - FG_START) / FG_SPAN));
}

/** Background follows scroll 0→1. Type flips a little earlier so it never matches the field. */
function setProgress(section: HTMLElement, p: number) {
  const clamped = Math.min(1, Math.max(0, p));
  section.style.setProperty("--wall-p", clamped.toFixed(4));
  section.style.setProperty("--wall-fg", foreground(clamped).toFixed(4));
  const header = document.querySelector<HTMLElement>("[data-bar]");
  if (!header) return;
  const rect = section.getBoundingClientRect();
  const onWall = rect.top <= 40 && rect.bottom > 40;
  if (!onWall) return;
  header.dataset.wallMix = "1";
  header.style.setProperty("--wall-p", clamped.toFixed(4));
  header.style.setProperty("--wall-fg", foreground(clamped).toFixed(4));
  header.dataset.theme = clamped >= 0.4 ? "light" : "dark";
}

/** Pins the photo wall and scrubs the track sideways. Mobile and reduced motion swipe instead. */
export function WallScroll() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>("[data-wall]");
    const track = section?.querySelector<HTMLElement>("[data-wall-track]");
    const viewport = section?.querySelector<HTMLElement>("[data-wall-viewport]");
    if (!section || !track || !viewport) return;

    const desktop = window.matchMedia("(min-width: 900px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ctx: gsap.Context | null = null;

    const onSwipe = () => {
      if (desktop.matches && !reduce.matches) return;
      const max = viewport.scrollWidth - viewport.clientWidth;
      setProgress(section, max > 0 ? viewport.scrollLeft / max : 0);
    };

    const build = () => {
      ctx?.revert();
      ctx = null;
      gsap.set(track, { clearProps: "transform" });
      setProgress(section, 0);
      if (!desktop.matches || reduce.matches) {
        onSwipe();
        return;
      }

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
            onUpdate: (self) => setProgress(section, self.progress),
          },
        });
      }, section);
    };

    build();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    viewport.addEventListener("scroll", onSwipe, { passive: true });
    desktop.addEventListener("change", build);
    reduce.addEventListener("change", build);

    return () => {
      window.removeEventListener("load", refresh);
      viewport.removeEventListener("scroll", onSwipe);
      desktop.removeEventListener("change", build);
      reduce.removeEventListener("change", build);
      ctx?.revert();
    };
  }, []);

  return null;
}
