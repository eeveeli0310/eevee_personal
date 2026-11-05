"use client";

import { useEffect, useRef, useState } from "react";

type Item = { text: string; label: string; value: number | null };

export function StatsBand({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(() => items.map((item) => item.text));

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (items.every((item) => item.value == null)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const render = (progress: number) => {
      setShown(
        items.map((item) =>
          item.value == null || progress >= 1 ? item.text : String(Math.round(progress * item.value)),
        ),
      );
    };
    if (reduce) {
      render(1);
      return;
    }
    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const end = view / 2 - rect.height / 2;
      const denom = view - end;
      const progress = denom === 0 ? 1 : Math.min(1, Math.max(0, (view - rect.top) / denom));
      render(progress);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <div className="band" ref={ref}>
      {items.map((item, index) => (
        <span key={item.label}>
          <b>{shown[index]}</b>
          {item.label}
        </span>
      ))}
    </div>
  );
}
