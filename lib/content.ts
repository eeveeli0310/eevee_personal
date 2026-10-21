import type { Locale } from "@/lib/i18n";

export type TypeToken = { text: string; accent?: boolean };

export type StatItem = {
  id: string;
  /** Real figure, when Eve has one. Until then the site shows `text` and does not count. */
  value: number | null;
  text: string;
  label: string;
};

const introZh: TypeToken[] = [
  { text: "内容与品牌运营", accent: true },
  { text: "。我是 " },
  { text: "Eevee", accent: true },
  { text: "，一个 " },
  { text: "UNSW", accent: true },
  { text: " Simulation & Immersive Tech", accent: true },
  { text: " 专业硕士毕业的" },
  { text: "创作者", accent: true },
  { text: " / 高级" },
  { text: "内容", accent: true },
  { text: "&", accent: true },
  { text: "品牌运营", accent: true },
  { text: "。用" },
  { text: "内容", accent: true },
  { text: "与" },
  { text: "数据", accent: true },
  { text: "，为科技品牌做海外增长。" },
];

const introEn: TypeToken[] = [
  { text: "Content", accent: true },
  { text: " & " },
  { text: "Brand", accent: true },
  { text: " Operator. ", accent: true },
  { text: "I'm " },
  { text: "Eevee", accent: true },
  { text: ", a " },
  { text: "creator", accent: true },
  { text: " and senior " },
  { text: "content", accent: true },
  { text: " & " },
  { text: "brand", accent: true },
  { text: " operator with a master's in " },
  { text: "Simulation", accent: true },
  { text: " & " },
  { text: "Immersive", accent: true },
  { text: " Technology", accent: true },
  { text: " from " },
  { text: "UNSW", accent: true },
  { text: ". I grow global " },
  { text: "communities", accent: true },
  { text: " for " },
  { text: "tech", accent: true },
  { text: " " },
  { text: "brands", accent: true },
  { text: " — through " },
  { text: "content", accent: true },
  { text: ", " },
  { text: "data", accent: true },
  { text: ", and " },
  { text: "AIGC", accent: true },
  { text: "." },
];

export const homeCopy = {
  zh: {
    headerCta: "合作",
    noteLabel: "来自 Eevee",
    handWord: "See",
    workSerif: "作品",
    lifeSerif: "生活",
    workWord: "WORK",
    lifeWord: "LIFE",
    workBody: "案例、数据，以及我带来的增长。",
    lifeBody: "球场、赛场和 AIGC 实验室。",
    intro: introZh,
    photoQuoteLead: "Life is a performance art",
    photoQuoteSub: "人生是一场表演艺术",
    stats: [
      { id: "followers", value: null, text: "[X万]", label: "海外粉丝增长" },
      { id: "launches", value: null, text: "[X]", label: "场发布会" },
      { id: "platforms", value: null, text: "[X]", label: "个平台矩阵" },
      { id: "engagement", value: null, text: "[X%]", label: "互动率提升" },
    ] as StatItem[],
    pagesLabel: "页面",
    followLabel: "关注",
    home: "首页",
    life: "生活",
    socials: ["Instagram", "LinkedIn", "小红书", "X"],
    socialNote: "链接尚未写入",
    brandsLabel: "品牌与平台",
    brands: ["[Brand]", "[Platform]", "Pimax", "[Channel]", "[Tool]", "[Studio]"],
    emailLabel: "邮箱",
    email: "[email]",
    copyright: "© 2026 Eevee Li",
    loaderLabel: "正在进入 Eevee Li 的站点",
    portraitAltVr: "占位图：Eevee 佩戴 VR 头显的半身像",
    portraitAltClear: "占位图：同一构图，未佩戴头显",
    photoAlt: "照片占位",
    place: "[地点]",
    year: "[X]",
  },
  en: {
    headerCta: "Enquiries",
    noteLabel: "Note from Eevee",
    handWord: "See",
    workSerif: "Cases",
    lifeSerif: "Days",
    workWord: "WORK",
    lifeWord: "LIFE",
    workBody: "Cases, data, and the growth behind them.",
    lifeBody: "Courts, esports, and my AIGC lab.",
    intro: introEn,
    photoQuoteLead: "Life is a performance art",
    photoQuoteSub: "人生是一场表演艺术",
    stats: [
      { id: "followers", value: null, text: "[X]", label: "Overseas follower growth" },
      { id: "launches", value: null, text: "[X]", label: "Launch events" },
      { id: "platforms", value: null, text: "[X]", label: "Platform matrix" },
      { id: "engagement", value: null, text: "[X%]", label: "Engagement lift" },
    ] as StatItem[],
    pagesLabel: "Pages",
    followLabel: "Follow",
    home: "Home",
    life: "Life",
    socials: ["Instagram", "LinkedIn", "Xiaohongshu", "X"],
    socialNote: "Link not added yet",
    brandsLabel: "Brands and platforms",
    brands: ["[Brand]", "[Platform]", "Pimax", "[Channel]", "[Tool]", "[Studio]"],
    emailLabel: "Email",
    email: "[email]",
    copyright: "© 2026 Eevee Li",
    loaderLabel: "Opening Eevee Li's site",
    portraitAltVr: "Placeholder: half-body portrait of Eevee wearing a VR headset",
    portraitAltClear: "Placeholder: the same framing without the headset",
    photoAlt: "Photo placeholder",
    place: "[Place]",
    year: "[X]",
  },
} as const;

export type HomeCopy = (typeof homeCopy)[Locale];

export const workCopy = {
  zh: {
    metaTitle: "作品",
    metaDescription: "Eevee Li 的作品索引。目前公开的发布内容是 Pimax Micro-OLED 发布会视频。其余案例仍是结构占位。",
    eyebrow: "作品",
    title: "案例、数据，以及我带来的增长。",
    body: "四条线：发布内容、账号与社群、KOL 与付费、AIGC 提效。除已公开的发布会影片外，细节仍是 [X]。",
    timelineLabel: "经历",
    timeline: [
      {
        year: "[X]",
        animateYear: false,
        title: "UNSW Simulation & Immersive Technology 硕士",
        body: "毕业年份尚未写入。",
        href: null as string | null,
      },
      {
        year: "2026",
        animateYear: true,
        title: "Pimax Micro-OLED 发布会视频",
        body: "内容与设计。",
        href: "/work/launch-content",
      },
    ],
  },
  en: {
    metaTitle: "Work",
    metaDescription:
      "Selected work by Eevee Li. The published launch film is the Pimax Micro-OLED video. The other cases are still stubs.",
    eyebrow: "Work",
    title: "Cases, data, and the growth behind them.",
    body: "Four lines: launch content, account and community, KOL and paid, AIGC efficiency. Beyond the published launch film, the detail is still [X].",
    timelineLabel: "Experience",
    timeline: [
      {
        year: "[X]",
        animateYear: false,
        title: "UNSW master's, Simulation & Immersive Technology",
        body: "Graduation year not added yet.",
        href: null as string | null,
      },
      {
        year: "2026",
        animateYear: true,
        title: "Pimax Micro-OLED launch film",
        body: "Content and design.",
        href: "/work/launch-content",
      },
    ],
  },
} as const;

export const caseUi = {
  zh: {
    background: "背景",
    role: "角色与团队",
    strategy: "策略",
    execution: "执行",
    results: "结果",
    stakeholders: "团队与相关方",
    dataSlot: "数据截图占位",
    back: "全部作品",
    posterCaption: "影片海报占位。视频文件放上之后会在这里自托管播放，不使用外链。",
    stub: "这一页是案例结构占位。背景、角色、策略、执行和结果还没有写入。",
    teamUnknown: "团队与分工：[X]",
    stakeholdersUnknown: "相关方：[X]",
    resultsUnknown: "可公开的数据：[X]",
  },
  en: {
    background: "Background",
    role: "Role and team",
    strategy: "Strategy",
    execution: "Execution",
    results: "Results",
    stakeholders: "Team and stakeholders",
    dataSlot: "Data screenshot placeholder",
    back: "All work",
    posterCaption: "Poster placeholder. When the video file is added it plays from this site, not from an external embed.",
    stub: "This page is a case-study stub. Background, role, strategy, execution, and results are not written yet.",
    teamUnknown: "Team and split of work: [X]",
    stakeholdersUnknown: "Stakeholders: [X]",
    resultsUnknown: "Figures cleared to share: [X]",
  },
} as const;

export const caseStubs = {
  zh: [
    {
      slug: "account-community",
      number: "02",
      title: "账号与社群运营",
      summary: "账号与社群运营的案例结构。具体品牌、周期和数据尚未写入。",
    },
    {
      slug: "kol-paid",
      number: "03",
      title: "KOL 与付费",
      summary: "达人与付费投放的案例结构。具体合作与花费尚未写入。",
    },
    {
      slug: "aigc-efficiency",
      number: "04",
      title: "AIGC 提效",
      summary: "AIGC 提效的案例结构。流程、工具和节省的时间尚未写入。",
    },
  ],
  en: [
    {
      slug: "account-community",
      number: "02",
      title: "Account and community",
      summary: "A case stub for account and community operations. Brand, timeline, and figures are not written yet.",
    },
    {
      slug: "kol-paid",
      number: "03",
      title: "KOL and paid",
      summary: "A case stub for creator and paid work. Partners and spend are not written yet.",
    },
    {
      slug: "aigc-efficiency",
      number: "04",
      title: "AIGC efficiency",
      summary: "A case stub for AIGC efficiency. The workflow, tools, and time saved are not written yet.",
    },
  ],
} as const;

export const lifeCopy = {
  zh: {
    metaTitle: "生活",
    metaDescription: "Eevee 的球场、赛场和 AIGC 实验室。篮球、网球、电竞和工作流的具体记录尚未写入。",
    eyebrow: "生活",
    title: "球场、赛场和 AIGC 实验室。",
    body: "篮球、网球、电竞，以及一套还在整理的 AIGC 工作流。具体场次和步骤尚未写入。",
    sections: [
      { id: "basketball", title: "篮球", body: "记录尚未写入。", image: "/placeholders/life-basketball.svg" },
      { id: "tennis", title: "网球", body: "记录尚未写入。", image: "/placeholders/life-tennis.svg" },
      { id: "esports", title: "电竞", body: "记录尚未写入。", image: "/placeholders/life-esports.svg" },
      { id: "aigc", title: "AIGC 工作流", body: "步骤与工具尚未写入。", image: "/placeholders/life-aigc.svg" },
    ],
  },
  en: {
    metaTitle: "Life",
    metaDescription: "Courts, esports, and Eevee's AIGC lab. Specific sessions and workflow steps are not written yet.",
    eyebrow: "Life",
    title: "Courts, esports, and my AIGC lab.",
    body: "Basketball, tennis, esports, and an AIGC workflow still being written down. Sessions and steps are not on the page yet.",
    sections: [
      { id: "basketball", title: "Basketball", body: "Notes are not written yet.", image: "/placeholders/life-basketball.svg" },
      { id: "tennis", title: "Tennis", body: "Notes are not written yet.", image: "/placeholders/life-tennis.svg" },
      { id: "esports", title: "Esports", body: "Notes are not written yet.", image: "/placeholders/life-esports.svg" },
      { id: "aigc", title: "AIGC workflow", body: "Steps and tools are not written yet.", image: "/placeholders/life-aigc.svg" },
    ],
  },
} as const;

export const portraitSlots = {
  heroBase: "/placeholders/hero-vr.svg",
  heroReveal: "/placeholders/hero-clear.svg",
  card: "/placeholders/card-portrait.svg",
  cutoutLeft: "/placeholders/cutout-left.svg",
  cutoutRight: "/placeholders/cutout-right.svg",
  footer: "/placeholders/footer-figure.svg",
} as const;

export type PhotoSlot = {
  id: string;
  src: string;
  /** Desktop placement, percentages of the wall. */
  x: string;
  y: string;
  w: string;
};

/** Scattered wall. Captions come from the locale copy so no city or year is invented. */
export const photoSlots: PhotoSlot[] = [
  { id: "p1", src: "/placeholders/photo-01.svg", x: "4%", y: "8%", w: "14rem" },
  { id: "p2", src: "/placeholders/photo-02.svg", x: "28%", y: "18%", w: "18rem" },
  { id: "p3", src: "/placeholders/photo-03.svg", x: "62%", y: "6%", w: "13rem" },
  { id: "p4", src: "/placeholders/photo-04.svg", x: "8%", y: "52%", w: "16rem" },
  { id: "p5", src: "/placeholders/photo-05.svg", x: "40%", y: "56%", w: "20rem" },
  { id: "p6", src: "/placeholders/photo-06.svg", x: "72%", y: "46%", w: "14rem" },
];
