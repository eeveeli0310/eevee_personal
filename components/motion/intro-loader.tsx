"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoEl26Draw } from "@/components/logo-el26";

function motionTiming() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 640px)").matches;
  const loop = reduce ? 480 : mobile ? 1200 : 1600;
  // Dismiss at 84% of a round: E, L, and 26 are in, the glint has crossed,
  // and the 88–100% loop fade has not started. Matches loader/index.html.
  const play = reduce ? 480 : Math.round(loop * 0.84);
  return {
    reduce,
    loop,
    play,
    exit: reduce ? 400 : mobile ? 500 : 700,
  };
}

function waitForMark(startedAt: number) {
  const { reduce, loop, play } = motionTiming();
  const elapsed = performance.now() - startedAt;
  if (reduce) return Math.max(0, play - elapsed);
  const into = ((elapsed % loop) + loop) % loop;
  if (into <= play) return play - into;
  return loop - into + play;
}

export function IntroLoader({ label }: { label: string }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"run" | "leave" | "off">("run");
  const [fromRoute, setFromRoute] = useState(false);
  const pathnameRef = useRef(pathname);
  const phaseRef = useRef(phase);
  const started = useRef(0);
  const timers = useRef<number[]>([]);
  phaseRef.current = phase;

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  };

  useEffect(() => {
    started.current = performance.now();
    document.documentElement.classList.add("is-loading");
    const id = window.setTimeout(() => setPhase("leave"), motionTiming().play);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const cover = () => {
      clearTimers();
      started.current = performance.now();
      phaseRef.current = "run";
      setFromRoute(true);
      setPhase("run");
      document.documentElement.classList.add("is-covering");
      window.__eeveeLenis?.stop();
      later(() => {
        if (phaseRef.current === "run") setPhase("leave");
      }, 8000);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      cover();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (pathnameRef.current === pathname) return;
    pathnameRef.current = pathname;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    if (phaseRef.current === "off") {
      started.current = performance.now();
      phaseRef.current = "run";
      setFromRoute(true);
      setPhase("run");
      document.documentElement.classList.add("is-covering");
      window.__eeveeLenis?.stop();
    }
    const wait = waitForMark(started.current);
    const id = window.setTimeout(() => setPhase("leave"), wait);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    if (phase !== "leave") return;
    const node = document.getElementById("intro-loader");
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      document.documentElement.classList.remove("is-loading", "is-covering");
      window.__eeveeLenis?.start();
      if (!window.__eeveeReady) {
        window.__eeveeReady = true;
        window.dispatchEvent(new Event("eevee:ready"));
      }
      setPhase("off");
    };
    const onEnd = (event: TransitionEvent) => {
      if (event.target !== node) return;
      if (event.propertyName !== "transform" && event.propertyName !== "opacity") return;
      done();
    };
    node?.addEventListener("transitionend", onEnd);
    const backup = window.setTimeout(done, motionTiming().exit + 280);
    return () => {
      node?.removeEventListener("transitionend", onEnd);
      window.clearTimeout(backup);
    };
  }, [phase]);

  if (phase === "off") return null;

  const className = phase === "leave" ? "loader is-done" : fromRoute ? "loader is-route" : "loader";

  return (
    <div id="intro-loader" className={className} role="status" aria-label={label}>
      <LogoEl26Draw />
    </div>
  );
}
