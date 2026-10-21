"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/projects";

function Watermark({ value, className }: { value: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-0 max-w-full font-display text-[5rem] font-bold uppercase leading-none tracking-[-0.08em] text-muted md:text-[8rem] lg:text-[12rem] ${className ?? ""}`}
    >
      {value}
    </span>
  );
}

type ProjectHeroProps = {
  project: Project;
  labels: { year: string; role: string; format: string; formatValue: string };
};

export function ProjectHero({ project, labels }: ProjectHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 767px)");

    const apply = () => {
      if (motion.matches || narrow.matches) {
        node.style.opacity = "1";
        node.style.transform = "none";
        return;
      }

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      const scale = 1 + Math.min(1, progress / 0.2) * 0.08;
      const opacity = 1 + Math.min(1, progress / 0.22) * (0.2 - 1);
      node.style.opacity = opacity.toFixed(3);
      node.style.transform = `scale(${scale.toFixed(4)})`;
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    motion.addEventListener("change", apply);
    narrow.addEventListener("change", apply);
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      motion.removeEventListener("change", apply);
      narrow.removeEventListener("change", apply);
    };
  }, []);

  return (
    <div className="overflow-x-clip">
      <section
        ref={sectionRef}
        className="relative overflow-hidden border-b border-border"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="mx-auto grid min-w-0 max-w-frame gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="relative min-w-0">
            <Watermark value={project.number} />
            <div className="relative z-10 min-w-0 max-w-5xl space-y-6 pt-16 md:pt-24">
              <span className="text-xs uppercase tracking-[0.25em] text-accent md:text-sm">{project.category}</span>
              <h1 className="kinetic-hero max-w-full font-display font-bold uppercase text-foreground">{project.title}</h1>
              <p className="max-w-2xl text-lg leading-tight text-muted-foreground md:text-2xl">{project.summary}</p>
            </div>
          </div>
          <div className="grid min-w-0 gap-px self-end bg-border">
            {[
              [labels.year, project.year],
              [labels.role, project.role],
              [labels.format, labels.formatValue],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0 bg-background p-6">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
                <div className="mt-3 break-words text-2xl font-medium text-foreground">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
