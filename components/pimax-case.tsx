import Link from "next/link";
import { RollText } from "@/components/roll-text";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

const copy = {
  zh: {
    kicker: "案例 · 2025",
    title: "Pimax 新品全球发布会",
    titleAccent: "新品",
    role: "荷兰拍摄 · YouTube 发布",
    roleLine: "角色：内容策划与运营 / 呈现方案与制作推进",
    chips: ["约 30 分钟成片", "YOUTUBE", "硬件发布"],
    stats: [
      { value: "3.5万", label: "YouTube 播放" },
      { value: "1200+", label: "台预售" },
      { value: "+938", label: "首周新增订阅" },
    ],
    briefTitle: "项目背景",
    briefLead: "为一场面向全球的新品发布，做出有质感的 YouTube 主片，并把注意力转成预售。",
    briefBody: "需要一条能与海外硬件品牌同台的主片：产品叙事清晰、双语呈现、现场感强，而不是 PPT 录屏。",
    approachTitle: "怎么做",
    approach: [
      "负责整体呈现方案与落地：协调拍摄场地、摄制团队、3D 与外部设计，并协同产品 / 研发推进脚本、拍摄与后期。",
      "完成约 30 分钟全球新品发布会视频，并按海外信息流习惯打磨封面、标题与章节结构。",
      "与海外账号矩阵（20+）联动分发，让主片在主频道之外继续发酵。",
    ],
    caps: ["产品主画面", "现场", "细节"],
    outcomeTitle: "结果",
    outcomeLead: "发布窗口真实数据。",
    metrics: [
      { value: "~3.5万", label: "发布会视频 YouTube 播放量约 3.5 万" },
      { value: "1200+", label: "预售周期内完成超过 1,200 台预订" },
      { value: "+938", label: "发布后一周频道新增订阅 938" },
      { value: "~30′", label: "约 30 分钟主片完整交付" },
    ],
    back: "回到首页",
  },
  en: {
    kicker: "CASE STUDY · 2025",
    title: "Pimax global product launch",
    titleAccent: "global",
    role: "Netherlands shoot · YouTube premiere",
    roleLine: "Role: content strategy, presentation design & production lead",
    chips: ["~30 MIN FILM", "YOUTUBE", "HARDWARE LAUNCH"],
    stats: [
      { value: "3.5万", label: "YouTube views" },
      { value: "1200+", label: "units pre-ordered" },
      { value: "+938", label: "subs in week 1" },
    ],
    briefTitle: "The brief",
    briefLead: "Ship a global-facing launch film that feels premium on YouTube — and convert attention into pre-orders.",
    briefBody:
      "Pimax needed a flagship reveal that could stand next to overseas hardware brands: clear product story, bilingual delivery, and a shoot that looked like a real event — not a slideshow of slides.",
    approachTitle: "Approach",
    approach: [
      "Owned the end-to-end presentation plan — venue, camera crew, 3D / external design partners, and hand-offs with product and R&D on script and shot list.",
      "Built a ~30-minute global launch film for YouTube, with packaging tuned for overseas feed behavior (thumb, title, chaptering).",
      "Paired the premiere with the wider overseas matrix (20+ accounts) so the film had distribution beyond the main channel.",
    ],
    caps: ["PRODUCT HERO", "ON SET", "DETAIL PASS"],
    outcomeTitle: "Outcome",
    outcomeLead: "Real numbers from the launch window.",
    metrics: [
      { value: "~3.5万", label: "YouTube views on the launch film" },
      { value: "1200+", label: "headsets pre-ordered in the pre-sale cycle" },
      { value: "+938", label: "new channel subscribers in the first week after publish" },
      { value: "~30′", label: "flagship film delivered end-to-end" },
    ],
    back: "Back to home",
  },
} as const;

const stills = [
  { src: "/phase2/headset-hero-sm.jpg", tall: true },
  { src: "/phase2/vr-sm.jpg", tall: false },
  { src: "/phase2/headset-alt-sm.jpg", tall: false },
];

export function PimaxCase({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const home = localePath(locale);
  return (
    <article className="pimax">
      <section className="pimax-hero">
        <div className="pimax-hero-bg" role="img" aria-label={t.title} />
        <div className="pimax-hero-fade" />
        <div className="pimax-hero-inner">
          <p className="pimax-kicker">{t.kicker}</p>
          <h1 className="bd">
            Pimax <span className="sf">{t.titleAccent}</span> {locale === "zh" ? "全球发布会" : "product launch"}
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
      <section className="pimax-outcome">
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
