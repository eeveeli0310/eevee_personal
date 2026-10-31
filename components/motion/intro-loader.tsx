"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoEl26Draw } from "@/components/logo-el26";

function motionTiming() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 640px)").matches;
  const loop = reduce ? 480 : mobile ? 1200 : 1600;
  // 84% is the last beat before the loop fade. Dismiss only after a full cycle
  // has already played, and only on that visible beat.
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
  let beat = play;
  while (beat < Math.max(elapsed, loop)) beat += loop;
  return Math.max(0, beat - elapsed);
}

export function IntroLoader({ label }: { label: string }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"run" | "leave" | "off">("run");
  const [fromRoute, setFromRoute] = useState(false);
  const [count, setCount] = useState(0);
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
    if (phase !== "run") return;
    const { reduce, loop } = motionTiming();
    if (reduce) {
      setCount(100);
      return;
    }
    let frame = 0;
    const tick = (now: number) => {
      const start = started.current || now;
      const next = Math.min(100, ((now - start) / loop) * 100);
      setCount(Math.round(next));
      if (next < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, pathname]);

  useEffect(() => {
    started.current = performance.now();
    document.documentElement.classList.add("is-loading");
    const id = window.setTimeout(() => {
      if (phaseRef.current === "run") setPhase("leave");
    }, waitForMark(started.current));
    timers.current.push(id);
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

  const className = phase === "leave" ? "el26-loader loader is-done" : fromRoute ? "el26-loader loader is-route" : "el26-loader loader";

  return (
    <div id="intro-loader" className={className} role="status" aria-label={label}>
      <LogoEl26Draw />
      <div className="counter" aria-hidden="true">
        {String(count).padStart(3, "0")}
      </div>
    </div>
  );
}

export function EL26Loader(props: { label: string }) {
  return <IntroLoader {...props} />;
}

/** Suspense fallback. The layout loader owns the full-cycle exit. */
export function EL26LoaderPanel({ label }: { label: string }) {
  return (
    <div className="el26-loader loader is-suspense" role="status" aria-label={label}>
      <LogoEl26Draw />
    </div>
  );
}
