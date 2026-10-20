"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type MarqueeBandProps = {
  items: readonly string[];
  speed?: number;
  variant?: "fast" | "slow";
  ariaLabel: string;
  className?: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function MarqueeBand({
  items,
  speed = 80,
  variant = "fast",
  ariaLabel,
  className,
}: MarqueeBandProps) {
  const reduced = usePrefersReducedMotion();
  const typeSize =
    variant === "fast" ? "text-2xl md:text-4xl lg:text-5xl" : "text-xl md:text-3xl lg:text-4xl";
  const duration = `${Math.max(18, Math.round(2200 / speed))}s`;

  const sequence = (copy: string) =>
    Array.from({ length: 4 }, (_, loop) =>
      items.map((item) => (
        <span
          key={`${copy}-${loop}-${item}`}
          className={cn("mx-4 inline-flex shrink-0 items-center gap-4 whitespace-nowrap md:mx-6", typeSize)}
        >
          <span>{item}</span>
          <span className="text-muted" aria-hidden="true">
            /
          </span>
        </span>
      )),
    );

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={cn("overflow-hidden border-y-2 border-background bg-accent py-4", className)}
    >
      {reduced ? (
        <ul className="flex flex-wrap items-center gap-x-2 gap-y-3 px-4 font-display font-bold uppercase tracking-[-0.05em] text-accent-foreground md:px-8">
          {items.map((item) => (
            <li key={item} className={cn("inline-flex items-center gap-4", typeSize)}>
              <span>{item}</span>
              <span className="text-muted" aria-hidden="true">
                /
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p className="sr-only">{items.join(", ")}</p>
          <div
            className="marquee-track flex w-max font-display font-bold uppercase tracking-[-0.05em] text-accent-foreground"
            style={{ animationDuration: duration }}
            aria-hidden="true"
          >
            <div className="flex shrink-0">{sequence("a")}</div>
            <div className="flex shrink-0">{sequence("b")}</div>
          </div>
        </>
      )}
    </div>
  );
}
