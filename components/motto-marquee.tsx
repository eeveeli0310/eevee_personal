"use client";

import { useEffect, useRef, useState } from "react";

/* One phrase used to cross the screen in 92s / 8 (English) and 104s / 8 (Chinese). */
const PHRASE_SECONDS = { en: 11.5, zh: 13 } as const;

export function MottoMarquee({ text, variant }: { text: string; variant: "en" | "zh" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ count: 2, width: 0 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    const fit = () => {
      const probe = root.querySelector<HTMLElement>("[data-mq-probe]");
      if (!probe) return;
      const width = probe.getBoundingClientRect().width;
      const view = root.clientWidth;
      if (width < 8 || view < 8) return;
      const count = Math.ceil(view / width) + 2;
      setBox((prev) => (prev.count === count && Math.abs(prev.width - width) < 0.5 ? prev : { count, width }));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    schedule();
    document.fonts?.ready.then(schedule).catch(() => {});
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [text]);

  const ready = box.width > 0;
  const seconds = PHRASE_SECONDS[variant];

  return (
    <div ref={rootRef} className={variant === "en" ? "mq mq1 sf" : "mq mq2 bd"} aria-hidden="true">
      <div className={ready ? "mq-row is-set" : "mq-row"}>
        <span className="mq-strut" data-mq-probe>
          {text}
        </span>
        {Array.from({ length: ready ? box.count : 0 }, (_, index) => (
          <span
            className="mq-piece"
            key={index}
            style={{ left: `${index * box.width}px`, animationDuration: `${seconds}s` }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
