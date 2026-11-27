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
      { id: "launches", value: 5, text: "5", label: "场路演·活动" },
      { id: "platforms", value: 20, text: "20+", label: "个平台矩阵" },
      { id: "engagement", value: 15, text: "+15%", label: "播放量提升" },
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
    portraitAltVr: "Eevee Li",
    portraitAltClear: "Eevee Li",
    photoAlt: "",
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
      { id: "launches", value: 5, text: "5", label: "Roadshows & events" },
      { id: "platforms", value: 20, text: "20+", label: "Platform matrix" },
      { id: "engagement", value: 15, text: "+15%", label: "Play lift" },
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
    portraitAltVr: "Eevee Li",
    portraitAltClear: "Eevee Li",
    photoAlt: "",
    place: "[Place]",
    year: "[X]",
  },
} as const;

export type HomeCopy = (typeof homeCopy)[Locale];

type WorkFigure = { value: string; label: string };
type WorkStream = { id: string; index: string; title: string; figures: WorkFigure[]; note: string | null };
type WorkStint = { title: string; org: string; body: string };

type WorkPageCopy = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  headline: { before: string; accent: string; after: string };
  proofLabel: string;
  proof: WorkFigure[];
  featured: {
    kicker: string;
    title: { before: string; accent: string; after: string };
    role: string;
    outcomesLabel: string;
    outcomes: WorkFigure[];
  };
  role: {
    kicker: string;
    title: { before: string; accent: string };
    dates: string;
    streams: WorkStream[];
  };
  related: { title: string; stints: WorkStint[] };
};

export const workCopy: Record<Locale, WorkPageCopy> = {
  zh: {
    metaTitle: "作品",
    metaDescription: "案例、数据，以及我带来的增长。Pimax 高级内容运营。",
    kicker: "作品",
    headline: { before: "案例、数据，以及我带来的", accent: "增长", after: "。" },
    proofLabel: "当前角色已确认的数字",
    proof: [
      { value: "50+", label: "10 万粉以上创作者" },
      { value: "300+", label: "视频与视觉内容" },
      { value: "20+", label: "社媒账号矩阵" },
      { value: "80%", label: "视频制作效率提升" },
    ],
    featured: {
      kicker: "重点项目 · 2026 年 10 月",
      title: { before: "Pimax ", accent: "全球", after: "新品发布会" },
      role: "核心项目负责人 · 30 分钟发布会成片",
      outcomesLabel: "首周结果",
      outcomes: [
        { value: "35K", label: "首周 YouTube 播放" },
        { value: "1,000+", label: "首周新增订阅" },
        { value: "1,200+", label: "首周产品预购" },
        { value: "200万+", label: "首周发布会归因收入（人民币）" },
      ],
    },
    role: {
      kicker: "Pimax",
      title: { before: "高级内容运营 — ", accent: "三条主线" },
      dates: "2025 年 7 月至今",
      streams: [
        {
          id: "creators",
          index: "01",
          title: "创作者拓展与合作管理",
          figures: [
            { value: "50+", label: "10 万粉以上创作者" },
            { value: "100+", label: "促成视频" },
            { value: "50+", label: "与官方账号共创" },
            { value: "100+", label: "创作者内容" },
          ],
          note: "Tie Dou（粉丝 1000 万+）— 访谈与产品评测，跨平台播放 100 万+。",
        },
        {
          id: "content",
          index: "02",
          title: "内容运营与增长",
          figures: [
            { value: "20+", label: "社媒账号" },
            { value: "300+", label: "视频与视觉内容" },
            { value: "~25%", label: "YouTube 年订阅增长" },
            { value: "+15%", label: "视频平均播放提升" },
            { value: "5%→20%", label: "爆款内容占比" },
            { value: "80%", label: "制作效率提升" },
          ],
          note: null,
        },
        {
          id: "ugc",
          index: "03",
          title: "UGC 活动与线下活动运营",
          figures: [
            { value: "5", label: "路演，覆盖上海、深圳等城市" },
            { value: "10+", label: "路演后落地的创作者合作" },
          ],
          note: null,
        },
      ],
    },
    related: {
      title: "相关经历",
      stints: [
        {
          title: "生活方式内容策划实习",
          org: "GQ China",
          body: "支持小红书内容运营。",
        },
        {
          title: "云平台运营实习",
          org: "China Telecom",
          body: "校园管理项目；宣传海报与折页。",
        },
      ],
    },
  },
  en: {
    metaTitle: "Work",
    metaDescription: "Work by Eevee Li — Senior Content Operator at Pimax.",
    kicker: "Work",
    headline: { before: "Cases, data, and the ", accent: "growth", after: " behind them." },
    proofLabel: "Cleared figures from the current role",
    proof: [
      { value: "50+", label: "Creators with 100K+ followers" },
      { value: "300+", label: "Video and visual pieces" },
      { value: "20+", label: "Social accounts in the matrix" },
      { value: "80%", label: "Higher video production efficiency" },
    ],
    featured: {
      kicker: "Featured case · October 2026",
      title: { before: "Pimax ", accent: "Global", after: " New Product Launch" },
      role: "Core project lead · 30′ launch film",
      outcomesLabel: "Week-one outcomes",
      outcomes: [
        { value: "35K", label: "YouTube views in the first week" },
        { value: "1,000+", label: "New subscribers in the first week" },
        { value: "1,200+", label: "Product pre-orders in the first week" },
        { value: "RMB 2M+", label: "Launch-attributed revenue in the first week" },
      ],
    },
    role: {
      kicker: "Pimax",
      title: { before: "Senior Content Operator — ", accent: "three workstreams" },
      dates: "July 2025 – Present",
      streams: [
        {
          id: "creators",
          index: "01",
          title: "Creator acquisition & partnership management",
          figures: [
            { value: "50+", label: "Creators, 100K+ followers" },
            { value: "100+", label: "Videos facilitated" },
            { value: "50+", label: "Official co-creations" },
            { value: "100+", label: "Pieces of creator content" },
          ],
          note: "Tie Dou (10M+ followers) — interview and product review, 1M+ cross-platform views.",
        },
        {
          id: "content",
          index: "02",
          title: "Content operations & growth",
          figures: [
            { value: "20+", label: "Social accounts" },
            { value: "300+", label: "Video and visual pieces" },
            { value: "~25%", label: "Annual YouTube subscriber growth" },
            { value: "+15%", label: "Average video views" },
            { value: "5%→20%", label: "Viral content rate" },
            { value: "80%", label: "Higher production efficiency" },
          ],
          note: null,
        },
        {
          id: "ugc",
          index: "03",
          title: "UGC campaigns & offline event operations",
          figures: [
            { value: "5", label: "Roadshows in Shanghai, Shenzhen, and other cities" },
            { value: "10+", label: "Creator partnerships that followed" },
          ],
          note: null,
        },
      ],
    },
    related: {
      title: "Related experience",
      stints: [
        {
          title: "Lifestyle Content Planning Intern",
          org: "GQ China",
          body: "Supported Rednote content operations.",
        },
        {
          title: "Cloud Platform Operations Intern",
          org: "China Telecom",
          body: "Campus management project; promotional posters and leaflets.",
        },
      ],
    },
  },
};

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
      summary: "图文与视频内容 200+。自然流量百万播放短视频 2 条。",
      strategy: "图文与视频内容 200+。自然流量百万播放短视频 2 条。",
      execution: "单条视频涨粉 160+。YouTube 主号同比约 +25%。",
      results: "爆款占比从 5% 到 20%。",
    },
    {
      slug: "kol-paid",
      number: "03",
      title: "KOL 与付费",
      summary: "10 万粉以上创作者 30+。KOL 脚本支持做出 10+ 条视频。",
      strategy: "10 万粉以上创作者 30+。",
      execution: "KOL 脚本支持，做出 10+ 条视频。",
      results: "创作者合作 1000 万+，百万播放，并售出 3 台高端头显。",
    },
    {
      slug: "aigc-efficiency",
      number: "04",
      title: "AIGC 提效",
      summary: "AIGC 工作流把制作时间减少约 80%。",
      strategy: "[X]",
      execution: "[X]",
      results: "制作时间约 −80%。",
    },
  ],
  en: [
    {
      slug: "account-community",
      number: "02",
      title: "Account and community",
      summary: "200+ video and graphic pieces. Two organic million-view shorts.",
      strategy: "200+ video and graphic pieces. Two organic million-view shorts.",
      execution: "160+ followers from a single video. YouTube about +25% year over year.",
      results: "Viral share from 5% to 20%.",
    },
    {
      slug: "kol-paid",
      number: "03",
      title: "KOL and paid",
      summary: "30+ creators with at least 100k followers. KOL scripts for 10+ videos.",
      strategy: "30+ creators with at least 100k followers.",
      execution: "KOL scripts led to 10+ videos.",
      results: "A 10M+ collaboration led to million plays and 3 headset sales.",
    },
    {
      slug: "aigc-efficiency",
      number: "04",
      title: "AIGC efficiency",
      summary: "An AIGC workflow cut production time by about 80%.",
      strategy: "[X]",
      execution: "[X]",
      results: "Production time about −80%.",
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
