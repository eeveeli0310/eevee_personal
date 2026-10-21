import fs from "node:fs";
import path from "node:path";
import { caseStubs, caseUi } from "@/lib/content";
import { dictionary, type Locale } from "@/lib/i18n";
import { launchVideoPath } from "@/lib/projects";

function publishedFilm() {
  const file = path.join(process.cwd(), "public", launchVideoPath);
  return fs.existsSync(file) ? launchVideoPath : null;
}

export const caseSlugs = ["launch-content", "account-community", "kol-paid", "aigc-efficiency"] as const;

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
  const project = dictionary[locale].project;
  const ui = caseUi[locale];
  const launch: CaseStudy = {
    slug: "launch-content",
    number: "01",
    title: project.title,
    summary: project.summary,
    year: "2026",
    role: project.role,
    background: project.challenge,
    team: ui.teamUnknown,
    strategy: project.approach,
    execution: locale === "zh" ? "公开的交付是这条发布会影片。更细的执行记录尚未写入。" : "The published deliverable is the launch film. A fuller execution record is not written yet.",
    results: `${project.outcome} ${ui.resultsUnknown}`,
    stakeholders: ui.stakeholdersUnknown,
    poster: "/placeholders/pimax-poster.svg",
    video: publishedFilm(),
  };

  const stubs = caseStubs[locale].map((stub) => ({
    slug: stub.slug,
    number: stub.number,
    title: stub.title,
    summary: stub.summary,
    year: "[X]",
    role: "[X]",
    background: ui.stub,
    team: ui.teamUnknown,
    strategy: "[X]",
    execution: "[X]",
    results: ui.resultsUnknown,
    stakeholders: ui.stakeholdersUnknown,
    poster: null,
    video: null,
  }));

  return [launch, ...stubs];
}

export function getCase(locale: Locale, slug: string) {
  return getCases(locale).find((item) => item.slug === slug);
}
