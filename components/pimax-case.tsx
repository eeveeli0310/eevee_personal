import Link from "next/link";
import { RollText } from "@/components/roll-text";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

const copy = {
  zh: {
    kicker: "案例 · 2026.10",
    title: "Pimax 全球新品发布",
    titleAccent: "全球新品",
    titleRest: "发布",
    role: "全球 YouTube 发布 · 2026年10月",
    roleLine: "角色：核心项目负责人 · 创意方向、脚本与产品信息",
    chips: ["30 分钟成片", "YOUTUBE", "全球发布"],
    stats: [
      { value: "3.5万", label: "首周 YouTube 播放" },
      { value: "1,200+", label: "首周产品预售" },
      { value: "1,000+", label: "首周新增订阅" },
    ],
    briefTitle: "项目背景",
    briefLead: "一条面向全球的 YouTube 新品发布片，把产品讲清楚，并在首周交出结果。",
    briefBody: "Pimax 全球新品发布。我是核心项目负责人，统筹创意方向、脚本、关键产品信息，以及整场发布的推进。",
    approachTitle: "怎么做",
    approach: [
      "统筹创意方向、脚本、关键产品信息，以及发布执行。",
      "协调产品与研发、摄制团队、3D 设计师和外部机构，把前期、拍摄和后期的资源对齐。",
      "把关拍摄、剪辑、调色和全球 YouTube 发布，交付一条 30 分钟的新品发布片，并跟踪上线后的表现。",
    ],
    caps: ["产品主画面", "现场", "细节"],
    outcomeTitle: "结果",
    outcomeLead: "上线后第一周。",
    metrics: [
      { value: "3.5万", label: "YouTube 播放" },
      { value: "1,000+", label: "新增订阅" },
      { value: "1,200+", label: "产品预售" },
      { value: "RMB 200万+", label: "发布归因收入" },
    ],
    back: "回到首页",
  },
  en: {
    kicker: "CASE STUDY · OCT 2026",
    title: "Pimax global product launch",
    titleAccent: "global",
    titleRest: " product launch",
    role: "Global YouTube launch · October 2026",
    roleLine: "Role: core project lead · creative direction, script, and product messaging",
    chips: ["30 MIN FILM", "YOUTUBE", "GLOBAL LAUNCH"],
    stats: [
      { value: "35K", label: "YouTube views, week 1" },
      { value: "1,200+", label: "Pre-orders, week 1" },
      { value: "1,000+", label: "New subscribers, week 1" },
    ],
    briefTitle: "The brief",
    briefLead: "A global YouTube launch film that carries the product — and a first week with numbers on it.",
    briefBody:
      "Pimax global new product launch. I was a core project lead, across creative direction, the script, key product messaging, and the launch as a whole.",
    approachTitle: "Approach",
    approach: [
      "Owned creative direction, the script, key product messaging, and how the launch ran.",
      "Coordinated product and R&D, production crews, 3D designers, and external agencies, from pre-production through filming and post.",
      "Oversaw filming, the edit, color, and global YouTube publishing — a 30-minute launch film, then the performance after it went live.",
    ],
    caps: ["PRODUCT HERO", "ON SET", "DETAIL PASS"],
    outcomeTitle: "Outcome",
    outcomeLead: "The first week after publish.",
    metrics: [
      { value: "35K", label: "YouTube views" },
      { value: "1,000+", label: "New subscribers" },
      { value: "1,200+", label: "Product pre-orders" },
      { value: "RMB 2M+", label: "Launch-attributed revenue" },
    ],
    back: "Back to home",
  },
} as const;

const stills = [
  { src: "/phase2/headset_hero.jpg", tall: true },
  { src: "/phase2/vr.jpg", tall: false },
  { src: "/phase2/headset_alt.jpg", tall: false },
];

export function PimaxCase({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const home = localePath(locale);
  return (
    <article className="pimax">
      <section className="pimax-hero" data-surface="dark">
        <div className="pimax-hero-bg" role="img" aria-label={t.title} />
        <div className="pimax-hero-fade" />
        <div className="pimax-hero-inner">
          <p className="pimax-kicker">{t.kicker}</p>
          <h1 className="bd">
            Pimax <span className="sf">{t.titleAccent}</span>{t.titleRest}
          </h1>
          <p className="pimax-role">
            {t.role}
            <br />
            {t.roleLine}
          </p>
          <div className="pimax-chips">
            {t.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>
      </section>
      <div className="pimax-rest" data-surface="light">
      <div className="pimax-stats">
        {t.stats.map((item) => (
          <div className="pimax-stat" key={item.label}>
            <b className="sf">{item.value}</b>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <section className="pimax-block">
        <h2 className="bd">
          {locale === "zh" ? "项目" : "The "}
          <span className="sf">{locale === "zh" ? "背景" : "brief"}</span>
        </h2>
        <p className="pimax-lead sf">{t.briefLead}</p>
        <p className="pimax-prose">{t.briefBody}</p>
      </section>
      <section className="pimax-block">
        <h2 className="bd">{t.approachTitle}</h2>
        <ul className="pimax-list">
          {t.approach.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="pimax-gallery">
          {stills.map((still, index) => (
            <figure key={still.src} className={still.tall ? "tall" : undefined}>
              <img src={still.src} alt="" />
              <figcaption>{t.caps[index]}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      </div>
      <section className="pimax-outcome" data-surface="dark">
        <h2 className="bd">{t.outcomeTitle}</h2>
        <p className="pimax-prose">{t.outcomeLead}</p>
        <div className="pimax-metrics">
          {t.metrics.map((item) => (
            <div key={item.label}>
              <b className="sf">{item.value}</b>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <Link className="pimax-back" href={home}>
          <RollText>← {t.back}</RollText>
        </Link>
      </section>
    </article>
  );
}
