import fs from "node:fs";
import path from "node:path";
import { workCases } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { launchVideoPath } from "@/lib/projects";

function publishedFilm() {
  const file = path.join(process.cwd(), "public", launchVideoPath);
  return fs.existsSync(file) ? launchVideoPath : null;
}

export const caseSlugs = ["launch-content", "creator-partnerships", "content-operations", "ugc-events"] as const;

export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  background: string;
  team: string;
  strategy: string;
  execution: string;
  results: string;
  stakeholders: string;
  poster: string | null;
  video: string | null;
};

export function getCases(locale: Locale): CaseStudy[] {
  const film = publishedFilm();
  return workCases[locale].map((item) => ({
    ...item,
    poster: item.slug === "launch-content" ? "/placeholders/pimax-poster.svg" : null,
    video: item.slug === "launch-content" ? film : null,
  }));
}

export function getCase(locale: Locale, slug: string) {
  const key = slug === "pimax-launch" ? "launch-content" : slug;
  return getCases(locale).find((item) => item.slug === key);
}
