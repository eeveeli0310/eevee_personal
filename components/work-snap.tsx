"use client";

import { useEffect } from "react";

/** Viewport snap for the Work index only. The live footer is not a snap target. */
export function WorkSnap() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("is-work-snap");
    const last = document.querySelector<HTMLElement>(".work-screen:last-of-type");

    const onScroll = () => {
      if (!last) return;
      const top = last.getBoundingClientRect().top;
      // Mandatory snap would pin the tall live footer back to the last screen.
      // Once the internships screen has actually left, drop snap so the footer scrolls freely.
      if (top < -48) root.classList.add("is-work-past");
      else if (top > -4) root.classList.remove("is-work-past");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      root.classList.remove("is-work-snap", "is-work-past");
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
