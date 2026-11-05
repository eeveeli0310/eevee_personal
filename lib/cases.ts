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
    team:
      locale === "zh"
        ? "协同产品、研发、摄制团队、3D 设计师与外部设计。"
        : "Coordinated product, R&D, production crew, 3D designer, and external design.",
    strategy: project.approach,
    execution:
      locale === "zh" ? "更细的执行记录尚未写入。" : "A fuller execution record is not written yet.",
    results:
      locale === "zh"
        ? "约30分钟成片；YouTube 播放约3.5万；一周新增订阅938；预售超1,200台。"
        : "~30-min film; ~35k YouTube views; +938 subs in one week; 1,200+ pre-orders.",
    stakeholders: ui.stakeholdersUnknown,
    poster: "/placeholders/pimax-poster.svg",
    video: publishedFilm(),
  };

  const stubs = caseStubs[locale].map((stub) => ({
    slug: stub.slug,
    number: stub.number,
    title: stub.title,
    summary: stub.summary,
    year: "2025",
    role: locale === "zh" ? "海外社媒内容策划与运营" : "Overseas social content planning & ops",
    background: "[X]",
    team: ui.teamUnknown,
    strategy: stub.strategy,
    execution: stub.execution,
    results: stub.results,
    stakeholders: ui.stakeholdersUnknown,
    poster: null,
    video: null,
  }));

  return [launch, ...stubs];
}

export function getCase(locale: Locale, slug: string) {
  const key = slug === "pimax-launch" ? "launch-content" : slug;
  return getCases(locale).find((item) => item.slug === key);
}
