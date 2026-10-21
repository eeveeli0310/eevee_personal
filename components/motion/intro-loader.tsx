"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LogoEl26 } from "@/components/logo-el26";

const SEEN = "eevee-loader-seen";
const DURATION = 1300;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function finishLoader() {
  sessionStorage.setItem(SEEN, "1");
  document.documentElement.classList.remove("is-loading");
  window.__eeveeLenis?.start();
  window.__eeveeReady = true;
  window.dispatchEvent(new Event("eevee:ready"));
}

export function IntroLoader({ label }: { label: string }) {
  const [phase, setPhase] = useState<"off" | "run" | "leave">("run");
  const [count, setCount] = useState(0);
  const settled = useRef(false);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SEEN) === "1";
    if (reduce || seen) {
      setPhase("off");
      if (!window.__eeveeReady) finishLoader();
    }
  }, []);

  useEffect(() => {
    if (phase !== "run") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SEEN) === "1";
    if (reduce || seen) return;
    document.documentElement.classList.add("is-loading");
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setCount(Math.round(easeInOutCubic(t) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else {
        setCount(100);
        setPhase("leave");
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== "leave") return;
    const node = document.getElementById("intro-loader");
    if (!node) return;
    const done = () => {
      if (settled.current) return;
      settled.current = true;
      finishLoader();
      setPhase("off");
    };
    const onEnd = (event: TransitionEvent) => {
      if (event.propertyName === "transform") done();
    };
    node.addEventListener("transitionend", onEnd);
    const backup = window.setTimeout(done, 900);
    return () => {
      node.removeEventListener("transitionend", onEnd);
      window.clearTimeout(backup);
    };
  }, [phase]);

  if (phase === "off") return null;

  return (
    <div id="intro-loader" className={phase === "leave" ? "loader is-leave" : "loader"} role="status" aria-label={label}>
      <LogoEl26 className="loader-logo" />
      <div className="loader-count">{String(count).padStart(3, "0")}</div>
      <div className="loader-bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </div>
  );
}
