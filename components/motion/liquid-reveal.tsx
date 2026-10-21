"use client";

import { useEffect, useRef } from "react";

const RADIUS = 143;
const BASE_DECAY = 0.016;
const IDLE_CLEAR = 120;
const WIPE_MS = 4600;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function LiquidReveal({ baseSrc, revealSrc, alt }: { baseSrc: string; revealSrc: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const wide = window.matchMedia("(min-width: 900px)");
    const reveal = new Image();
    reveal.src = revealSrc;
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d");
    if (!offCtx) return;

    let cssW = 1;
    let cssH = 1;
    let dpr = 1;
    let raf = 0;
    let alive = true;
    let last: { x: number; y: number } | null = null;
    let idle = 0;
    let cleared = true;
    const queue: { x: number; y: number }[] = [];
    let wipeStart = 0;
    let wipeOn = false;
    let wipeDone = false;
    let prevWipe: { x: number; y: number } | null = null;
    let mode: "off" | "pointer" | "wipe" = "off";

    const modeOf = () => {
      if (reduce) return "off" as const;
      if (fine.matches && wide.matches) return "pointer" as const;
      return "wipe" as const;
    };

    const fit = () => {
      const rect = wrap.getBoundingClientRect();
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      off.width = canvas.width;
      off.height = canvas.height;
      paintCover();
    };

    const paintCover = () => {
      if (!reveal.complete || !reveal.naturalWidth) return;
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.clearRect(0, 0, cssW, cssH);
      const ir = reveal.naturalWidth / reveal.naturalHeight;
      const cr = cssW / cssH;
      let dw: number;
      let dh: number;
      let dx: number;
      let dy: number;
      if (ir > cr) {
        dh = cssH;
        dw = cssH * ir;
        dx = (cssW - dw) / 2;
        dy = 0;
      } else {
        dw = cssW;
        dh = cssW / ir;
        dx = 0;
        dy = (cssH - dh) / 2;
      }
      offCtx.drawImage(reveal, dx, dy, dw, dh);
    };

    const stamp = (x: number, y: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, RADIUS);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.55, "rgba(255,255,255,0.82)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
      ctx.fill();
    };

    const composite = (decay: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (decay > 0) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = `rgba(0,0,0,${decay})`;
        ctx.fillRect(0, 0, cssW, cssH);
      }
      if (queue.length) {
        ctx.globalCompositeOperation = "source-over";
        for (const point of queue) stamp(point.x, point.y);
        queue.length = 0;
      }
      ctx.globalCompositeOperation = "source-in";
      ctx.drawImage(off, 0, 0, cssW, cssH);
      ctx.globalCompositeOperation = "source-over";
    };

    const enqueue = (x: number, y: number) => {
      if (!last) {
        queue.push({ x, y });
        last = { x, y };
        return;
      }
      const dist = Math.hypot(x - last.x, y - last.y);
      const step = RADIUS * 0.3;
      const n = Math.min(60, Math.max(1, Math.ceil(dist / Math.max(step, 0.001))));
      for (let i = 1; i <= n; i += 1) {
        const t = i / n;
        queue.push({ x: last.x + (x - last.x) * t, y: last.y + (y - last.y) * t });
      }
      last = { x, y };
    };

    const show = () => wrap.classList.add("is-shown");
    const arm = () => {
      show();
      mode = modeOf();
      if (mode === "wipe" && !wipeDone && !wipeOn) {
        wipeOn = true;
        wipeStart = performance.now();
        prevWipe = null;
      }
    };

    if (window.__eeveeReady) arm();
    else window.addEventListener("eevee:ready", arm, { once: true });

    const onMove = (event: PointerEvent) => {
      if (mode !== "pointer") return;
      const rect = wrap.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < -RADIUS || y < -RADIUS || x > cssW + RADIUS || y > cssH + RADIUS) {
        last = null;
        return;
      }
      enqueue(x, y);
    };

    const frame = (now: number) => {
      if (!alive) return;
      if (mode === "pointer") {
        const hasNew = queue.length > 0;
        if (hasNew) {
          idle = 0;
          cleared = false;
        } else if (!cleared) idle += 1;
        if (!cleared) {
          if (!hasNew && idle >= IDLE_CLEAR) {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.globalCompositeOperation = "source-over";
            ctx.clearRect(0, 0, cssW, cssH);
            cleared = true;
          } else {
            const decay = hasNew ? BASE_DECAY : Math.min(0.28, BASE_DECAY * (1 + idle / 8));
            composite(decay);
          }
        }
      } else if (mode === "wipe" && wipeOn && !wipeDone) {
        const t = Math.min(1, (now - wipeStart) / WIPE_MS);
        const u = easeInOutCubic(t);
        const x = cssW * (0.16 + 0.68 * u);
        const y = cssH * (0.34 + Math.sin(u * Math.PI) * 0.07);
        if (!prevWipe) queue.push({ x, y });
        else {
          const dist = Math.hypot(x - prevWipe.x, y - prevWipe.y);
          const step = RADIUS * 0.3;
          const n = Math.min(60, Math.max(1, Math.ceil(dist / Math.max(step, 0.001))));
          for (let i = 1; i <= n; i += 1) {
            const k = i / n;
            queue.push({ x: prevWipe.x + (x - prevWipe.x) * k, y: prevWipe.y + (y - prevWipe.y) * k });
          }
        }
        prevWipe = { x, y };
        composite(0);
        if (t >= 1) {
          wipeDone = true;
          wipeOn = false;
        }
      }
      raf = requestAnimationFrame(frame);
    };

    fit();
    reveal.addEventListener("load", paintCover);
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("eevee:ready", arm);
    };
  }, [revealSrc]);

  return (
    <div className="hero-figure is-waiting" ref={wrapRef}>
      <img src={baseSrc} alt={alt} />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
