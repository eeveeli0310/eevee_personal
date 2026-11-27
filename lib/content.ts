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

export const workCopy = {
  zh: {
    metaTitle: "作品",
    metaDescription:
      "Eevee Li 在 Pimax 担任高级内容运营（2025年7月至今）。作品包括全球新品发布、创作者合作、内容运营与增长，以及 UGC 与线下活动。",
    eyebrow: "作品",
    title: "案例、数据，以及我带来的增长。",
    roleLine: "Pimax · 高级内容运营 · 2025年7月至今",
    body: "四条线：全球新品发布、创作者合作、内容运营与增长、UGC 与线下活动。",
    timelineLabel: "经历",
    timeline: [
      {
        year: "2025",
        animateYear: false,
        title: "Pimax · 高级内容运营",
        body: "2025年7月至今。创作者合作、内容运营与增长、UGC 与线下活动。",
        href: null as string | null,
      },
      {
        year: "2026",
        animateYear: true,
        title: "Pimax 全球新品发布",
        body: "2026年10月。重点项目，核心项目负责人。",
        href: "/work/launch-content",
      },
    ],
    internshipsLabel: "实习",
    internships: [
      "GQ 中国 · 生活方式内容策划实习 — 支持小红书内容运营。",
      "中国电信 · 云平台运营实习 — 参与校园管理项目的用户需求分析与应用设计优化，并设计宣传海报和折页。",
    ],
  },
  en: {
    metaTitle: "Work",
    metaDescription:
      "Eevee Li is Senior Content Operator at Pimax (Jul 2025–Present). Work covers the global product launch, creator partnerships, content operations and growth, and UGC and offline events.",
    eyebrow: "Work",
    title: "Cases, data, and the growth behind them.",
    roleLine: "Pimax · Senior Content Operator · Jul 2025–Present",
    body: "Four lines: global product launch, creator partnerships, content operations and growth, and UGC and offline events.",
    timelineLabel: "Experience",
    timeline: [
      {
        year: "2025",
        animateYear: false,
        title: "Pimax · Senior Content Operator",
        body: "Jul 2025–Present. Creator partnerships, content operations and growth, UGC and offline events.",
        href: null as string | null,
      },
      {
        year: "2026",
        animateYear: true,
        title: "Pimax global product launch",
        body: "October 2026. Key project, core project lead.",
        href: "/work/launch-content",
      },
    ],
    internshipsLabel: "Internships",
    internships: [
      "GQ China · Lifestyle Content Planning Intern — Rednote content operations.",
      "China Telecom · Cloud Platform Operations Intern — campus management requirements and application design; promotional posters and leaflets.",
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

export type WorkCaseCopy = {
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
};

export const workCases: Record<Locale, WorkCaseCopy[]> = {
  zh: [
    {
      slug: "launch-content",
      number: "01",
      title: "全球新品发布",
      summary:
        "核心项目负责人，完成一条 30 分钟的全球 YouTube 发布片。首周播放 3.5 万，新增订阅 1,000+，产品预售 1,200+，归因收入 RMB 200万+。",
      year: "2026.10",
      role: "重点项目 · 核心项目负责人",
      background:
        "Pimax 全球新品发布需要一条面向全球的 YouTube 主片。我是核心项目负责人，负责创意方向、脚本、关键产品信息，以及整场发布的推进。",
      team: "协同产品与研发、摄制团队、3D 设计师和外部机构，把前期、拍摄和后期的资源对齐。",
      strategy: "创意方向、脚本和关键产品信息一起定，再按这个信息架构把拍摄、剪辑和发布排下去。",
      execution:
        "把关拍摄、剪辑、调色和全球 YouTube 上线，交付一条 30 分钟的新品发布片，并跟踪上线后的表现。",
      results:
        "上线后第一周：YouTube 播放 3.5 万，新增订阅 1,000+，产品预售 1,200+，发布归因收入 RMB 200万+。",
      stakeholders: "产品与研发、摄制团队、3D 设计师、外部机构。",
    },
    {
      slug: "creator-partnerships",
      number: "02",
      title: "创作者合作",
      summary:
        "与 50+ 位 10 万粉以上创作者合作，覆盖游戏、模拟赛车、极限运动、体育与科技。全流程管理，策略与脚本推动 100+ 条视频；与 Tie Dou 的访谈和产品评测带来全平台 100 万+ 播放。",
      year: "2025.07–至今",
      role: "Pimax · 高级内容运营",
      background: "创作者合作从找到人对接开始，一直做到片子发出去，以及下一次还能再合作。",
      team: "负责寻找、接触、洽谈、产品寄送、内容交付和效果复盘。",
      strategy:
        "按创作者写定制内容策略，并准备多份视频脚本大纲，推动 100+ 条视频完成。持续的内容支持和复合作，用来把关系留下来。",
      execution:
        "以 3–6 个月的合作培养有潜力的 KOC，促成与官方品牌账号的 50+ 次联合创作，产出 100+ 条创作者内容，其中有多条百万播放。促成与极限运动创作者 Tie Dou（粉丝 1000 万+）的访谈和产品评测，全平台播放超过 100 万。同时也支持海外创作者合作和产品评测。",
      results:
        "10 万粉以上创作者 50+，覆盖游戏、模拟赛车、极限运动、体育与科技。策略与脚本推动 100+ 条视频。官方账号联合创作 50+，创作者内容 100+，含多条百万播放。Tie Dou 合作全平台播放 100 万+。",
      stakeholders: "创作者、官方品牌账号，以及海外评测合作。",
    },
    {
      slug: "content-operations",
      number: "03",
      title: "内容运营与增长",
      summary:
        "20+ 个社媒账号，月度内容日历，300+ 条视频与视觉内容。YouTube 年订阅增长约 25%，平均播放 +15%，爆款率从 5% 到 20%。生成式 AI 工作流把视频制作效率提升了 80%。",
      year: "2025.07–至今",
      role: "Pimax · 高级内容运营",
      background: "账号这边是同一套运营：发什么、用哪种语言，以及下一周数据说了什么。",
      team: "负责 20+ 个账号的内容策略与制作，包括 YouTube、Instagram、TikTok、Facebook、X、小红书、抖音和哔哩哔哩。",
      strategy:
        "按月排内容日历。双语视频脚本按产品卖点、竞品洞察和营销目标来写。其中有多条自然流量的百万播放视频。",
      execution:
        "每周复盘表现，用 A/B 测试调整封面、标题和内容形式，并把流量、点击率和转化带回下一轮策略。生成式 AI 接进制作流程，做成可复用的辅助工作流，减少重复劳动。",
      results:
        "视频与视觉内容 300+。YouTube 年订阅增长约 25%。平均播放量提升 15%，爆款率从 5% 到 20%。视频制作效率提升 80%。多条自然流量百万播放。",
      stakeholders: "YouTube、Instagram、TikTok、Facebook、X、小红书、抖音、哔哩哔哩。",
    },
    {
      slug: "ugc-events",
      number: "04",
      title: "UGC 与线下活动",
      summary:
        "参与上海、深圳及其他城市的五场路演，由此锁定 10+ 个后续创作者合作。把线下体验做成线上内容，并协调内部团队、合作方与供应商。",
      year: "2025.07–至今",
      role: "Pimax · 高级内容运营",
      background: "路演用来在现场见到创作者和用户，再把那一周做成频道上能发出去的内容。",
      team: "与内部团队、商业合作方和外部供应商协同，推进路演执行和项目交付。",
      strategy: "参与上海、深圳及其他城市的五场路演。现场收集反馈、判断内容机会，并由此锁定后续合作。",
      execution: "支持 UGC 战役和创作者激励计划，协调访谈、现场拍摄和后期，把线下活动体验做成线上内容。",
      results: "五场路演，城市包括上海、深圳及其他城市。由此产生的创作者合作 10+。",
      stakeholders: "内部团队、商业合作方、外部供应商，以及现场的全球创作者和用户。",
    },
  ],
  en: [
    {
      slug: "launch-content",
      number: "01",
      title: "Global product launch",
      summary:
        "Core project lead on a 30-minute global YouTube launch film. First week: 35K views, 1,000+ new subscribers, 1,200+ product pre-orders, and RMB 2M+ in launch-attributed revenue.",
      year: "Oct 2026",
      role: "Key project · Core project lead",
      background:
        "Pimax needed a global YouTube film for a new product launch. I was a core project lead: creative direction, the script, key product messaging, and the launch as a whole.",
      team: "I coordinated product and R&D, production crews, 3D designers, and external agencies across pre-production, filming, and post.",
      strategy: "Creative direction, the script, and the product message were set together, then filming, the edit, and publishing followed that line.",
      execution:
        "I oversaw filming, editing, color, and global YouTube publishing, delivered a 30-minute launch film, and watched performance after it went live.",
      results:
        "First week: 35K YouTube views, 1,000+ new subscribers, 1,200+ product pre-orders, and RMB 2M+ in launch-attributed revenue.",
      stakeholders: "Product and R&D, production crews, 3D designers, and external agencies.",
    },
    {
      slug: "creator-partnerships",
      number: "02",
      title: "Creator partnerships",
      summary:
        "50+ creators with 100K+ followers across gaming, sim racing, extreme sports, sports, and technology. Full partnership lifecycle and 100+ videos from tailored scripts, plus a Tie Dou interview and product review with 1M+ cross-platform views.",
      year: "Jul 2025–Present",
      role: "Pimax · Senior Content Operator",
      background: "Creator work runs from the first outreach to the video that ships, and then to the collaboration after that.",
      team: "I sourced creators, handled outreach and negotiations, seeded product, followed content through delivery, and read the performance.",
      strategy:
        "Each creator got a tailored plan, plus dozens of script outlines that helped 100+ videos get made. Ongoing support and repeat collaborations kept the relationships going.",
      execution:
        "High-potential KOCs stayed on 3–6-month partnerships. That led to 50+ co-creations with official brand accounts and 100+ pieces of creator content, including multiple million-view videos. An interview and product review with Tie Dou — an extreme sports creator with 10M+ followers — passed 1M cross-platform views. I also supported international creator partnerships and product review campaigns.",
      results:
        "50+ creators with 100K+ followers across gaming, sim racing, extreme sports, sports, and technology. 100+ videos from tailored scripts. 50+ co-creations with official brand accounts, 100+ creator pieces including multiple million-view videos, and 1M+ views on the Tie Dou collaboration.",
      stakeholders: "Creators, official brand accounts, and international review partners.",
    },
    {
      slug: "content-operations",
      number: "03",
      title: "Content operations & growth",
      summary:
        "20+ social accounts, monthly calendars, and 300+ video and visual pieces. About 25% annual YouTube subscriber growth, +15% average views, viral rate from 5% to 20%, and generative AI workflows that raised video production efficiency by 80%.",
      year: "Jul 2025–Present",
      role: "Pimax · Senior Content Operator",
      background: "One operating rhythm for the accounts: what goes out, in which language, and what the numbers say the following week.",
      team: "I run strategy and production across 20+ accounts — YouTube, Instagram, TikTok, Facebook, X, Rednote, Douyin, and Bilibili.",
      strategy:
        "Monthly editorial calendars, and bilingual scripts written from product USPs, competitive reads, and the marketing objective. Several of those videos reached a million organic views.",
      execution:
        "A weekly performance review, with A/B tests on thumbnails, titles, and formats. Traffic, CTR, and conversion fed the next round of decisions. Generative AI went into production as reusable workflows, so repetitive tasks took less of the week.",
      results:
        "300+ video and visual pieces. About 25% annual YouTube subscriber growth. Average views up 15%, and the viral rate from 5% to 20%. Video production efficiency up 80%. Multiple organic million-view videos.",
      stakeholders: "YouTube, Instagram, TikTok, Facebook, X, Rednote, Douyin, and Bilibili.",
    },
    {
      slug: "ugc-events",
      number: "04",
      title: "UGC & offline events",
      summary:
        "Five roadshows across Shanghai, Shenzhen, and other cities, followed by 10+ creator partnerships. Offline experiences turned into online content, with internal teams, partners, and vendors in the loop.",
      year: "Jul 2025–Present",
      role: "Pimax · Senior Content Operator",
      background: "Roadshows were a way to meet creators and users in the room, then turn that week into something the channels could publish.",
      team: "I coordinated internal teams, business partners, and external vendors around roadshow execution and delivery.",
      strategy:
        "Five roadshows, in Shanghai, Shenzhen, and other cities. On site, the work was feedback, content ideas, and the next partnership.",
      execution:
        "I supported UGC campaigns and creator incentive programs, and coordinated interviews, on-site filming, and post so an offline event had an online life.",
      results:
        "Five roadshows across Shanghai, Shenzhen, and other cities. 10+ creator partnerships came out of them.",
      stakeholders: "Internal teams, business partners, external vendors, and the creators and users at the events.",
    },
  ],
};

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
