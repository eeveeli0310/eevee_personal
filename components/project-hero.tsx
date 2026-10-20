"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/projects";

function Watermark({ value, className }: { value: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute font-display text-[6rem] font-bold uppercase leading-none tracking-[-0.08em] text-muted md:text-[8rem] lg:text-[12rem] ${className ?? ""}`}
    >
      {value}
    </span>
  );
}

export function ProjectHero({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (media.matches) {
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
    media.addEventListener("change", apply);
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      media.removeEventListener("change", apply);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border"
      style={{ opacity: 1, transform: "none" }}
    >
      <div className="mx-auto grid max-w-frame gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="relative">
          <Watermark value={project.number} className="-left-1 top-0 text-[5rem] md:text-[8rem] lg:text-[12rem]" />
          <div className="relative z-10 max-w-5xl space-y-6 pt-16 md:pt-24">
            <span className="text-xs uppercase tracking-[0.25em] text-accent md:text-sm">{project.category}</span>
            <h1 className="kinetic-hero font-display font-bold uppercase text-foreground">{project.title}</h1>
            <p className="max-w-2xl text-lg leading-tight text-muted-foreground md:text-2xl">{project.summary}</p>
          </div>
        </div>
        <div className="grid gap-px self-end bg-border">
          {[
            ["Year", project.year],
            ["Role", project.role],
            ["Format", "Visual Story Page"],
          ].map(([label, value]) => (
            <div key={label} className="bg-background p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
              <div className="mt-3 text-2xl font-medium text-foreground">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
