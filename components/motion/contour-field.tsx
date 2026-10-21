"use client";

import { useEffect, useRef } from "react";

const LINE_SCALE = 3.8;
const LINE_COUNT = 2.5;
const WAVE_AMOUNT = 0.37;
const WAVE_SPEED = 1.66;

function field(x: number, y: number, t: number) {
  let f = Math.sin(x * 1.0 + t * 0.6) * 0.5;
  f += Math.sin(y * 0.85 - t * 0.45) * 0.45;
  f += Math.sin((x + y) * 0.65 + t * 0.35) * 0.35;
  f += Math.sin((x - y) * 0.95 - t * 0.55) * 0.25;
  return f * 0.5 + 0.5;
}

export function ContourField({
  tone = "light",
  anchor = "local",
  seamWith,
}: {
  tone?: "light" | "dark" | "pale" | "progress";
  /** Page coordinates keep lines continuous across adjacent sections. */
  anchor?: "local" | "page";
  /** Lock this field so its bottom edge meets the top of `seamWith` in page space. */
  seamWith?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    let running = true;
    let visible = true;
    let raf = 0;
    const start = performance.now();
    let last = 0;

    const draw = (now: number) => {
      const rect = parent.getBoundingClientRect();
      const cssW = Math.max(1, rect.width);
      const cssH = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(cssW * dpr);
      const h = Math.round(cssH * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const mobile = mobileQuery.matches;
      const cells = mobile ? 36 : 64;
      const cols = cssW >= cssH ? cells : Math.max(8, Math.round((cells * cssW) / cssH));
      const rows = Math.max(8, Math.round((cols * cssH) / cssW));
      const stepX = w / cols;
      const stepY = h / rows;
      const aspect = w / h;
      const speed = mobile ? WAVE_SPEED * 0.55 : WAVE_SPEED;
      const epoch = anchor === "page" ? ((window.__eeveeContourEpoch ??= start)) : start;
      const t = reduce ? 0.8 : ((now - epoch) / 1000) * speed;
      const next = seamWith ? document.querySelector(seamWith) : null;
      const pageTop = next
        ? next.getBoundingClientRect().top + window.scrollY - cssH
        : anchor === "page"
          ? rect.top + window.scrollY
          : 0;
      const pageLeft = anchor === "page" || next ? rect.left + window.scrollX : 0;
      const values = new Float32Array((cols + 1) * (rows + 1));
      for (let j = 0; j <= rows; j += 1) {
        for (let i = 0; i <= cols; i += 1) {
          const nx = anchor === "page" ? (pageLeft + (i / cols) * cssW) / 120 : ((i / cols) * 2 - 1) * aspect * LINE_SCALE;
          const ny = anchor === "page" ? (pageTop + (j / rows) * cssH) / 120 : ((j / rows) * 2 - 1) * LINE_SCALE;
          const qx = nx + Math.sin(ny * 0.8 + t * 0.7) * WAVE_AMOUNT;
          const qy = ny + Math.cos(nx * 0.7 - t * 0.6) * WAVE_AMOUNT;
          values[j * (cols + 1) + i] = field(qx, qy, t) * LINE_COUNT;
        }
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      if (tone === "progress") {
        const fg = Math.min(1, Math.max(0, Number(getComputedStyle(parent).getPropertyValue("--wall-fg")) || 0));
        const r = Math.round(243 + (40 - 243) * fg);
        const g = Math.round(242 + (44 - 242) * fg);
        const b = Math.round(236 + (32 - 236) * fg);
        ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.globalAlpha = 0.22 + fg * 0.2;
      } else {
        ctx.strokeStyle = tone === "dark" ? "#F3F2EC" : tone === "pale" ? "#B7B5AA" : "#282C20";
        ctx.globalAlpha = tone === "dark" ? 0.2 : tone === "pale" ? 0.9 : 0.2;
      }
      ctx.lineWidth = 1;
      for (let level = 0.5; level < LINE_COUNT; level += 1) {
        for (let j = 0; j < rows; j += 1) {
          for (let i = 0; i < cols; i += 1) {
            const a = values[j * (cols + 1) + i];
            const b = values[j * (cols + 1) + i + 1];
            const c = values[(j + 1) * (cols + 1) + i + 1];
            const d = values[(j + 1) * (cols + 1) + i];
            const index = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
            if (index === 0 || index === 15) continue;
            const x0 = i * stepX;
            const y0 = j * stepY;
            const top: [number, number] = [x0 + stepX * ((level - a) / (b - a || 1)), y0];
            const right: [number, number] = [x0 + stepX, y0 + stepY * ((level - b) / (c - b || 1))];
            const bottom: [number, number] = [x0 + stepX * ((level - d) / (c - d || 1)), y0 + stepY];
            const left: [number, number] = [x0, y0 + stepY * ((level - a) / (d - a || 1))];
            const seg = (p: [number, number], q: [number, number]) => {
              ctx.moveTo(p[0], p[1]);
              ctx.lineTo(q[0], q[1]);
            };
            switch (index) {
              case 1:
              case 14:
                seg(left, bottom);
                break;
              case 2:
              case 13:
                seg(bottom, right);
                break;
              case 3:
              case 12:
                seg(left, right);
                break;
              case 4:
              case 11:
                seg(top, right);
                break;
              case 6:
              case 9:
                seg(top, bottom);
                break;
              case 7:
              case 8:
                seg(left, top);
                break;
              case 5:
                seg(left, top);
                seg(bottom, right);
                break;
              case 10:
                seg(left, bottom);
                seg(top, right);
                break;
              default:
                break;
            }
          }
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      if (!running) return;
      const interval = mobileQuery.matches ? 48 : 24;
      if (visible && (reduce || now - last >= interval)) {
        last = now;
        draw(now);
        if (reduce) return;
      }
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
    });
    io.observe(parent);
    raf = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [tone, anchor, seamWith]);

  return <canvas ref={ref} className="contour" aria-hidden="true" />;
}
