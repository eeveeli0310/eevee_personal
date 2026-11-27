export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localePath(locale: Locale, path = "/") {
  if (path === "/" || path === "") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}

export function staticLocaleParams() {
  return locales.map((locale) => ({ locale }));
}

const roleLine = "出海社媒运营 / 增长 · Overseas Social Media & Growth Operator";
const mottoLead = "Life is a performance art";
const mottoSub = "人生是一场表演艺术";

export type Dictionary = {
  meta: { title: string; description: string; shareAlt: string };
  skip: string;
  nav: { label: string; menu: string; work: string; about: string; resume: string; contact: string };
  localeSwitch: { label: string; zh: string; en: string };
  roleLine: string;
  mottoLead: string;
  mottoSub: string;
  heroLead: string;
  actions: {
    resume: string;
    enquiry: string;
    backHome: string;
    viewWork: string;
    viewPimax: string;
  };
  locationLabel: string;
  locationValue: string;
  practiceLabel: string;
  practiceValue: string;
  practiceNote: string;
  marqueeLabel: string;
  marquee: string[];
  work: { eyebrow: string; title: string; body: string };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    tags: string[];
    facts: { value: string; label: string }[];
  };
  resume: {
    eyebrow: string;
    title: string;
    body: string;
    zhFile: string;
    enFile: string;
    comingSoon: string;
  };
  contact: { eyebrow: string; lines: [string, string]; emailLabel: string; wechatLabel: string };
  learning: { metaTitle: string; metaDescription: string; eyebrow: string; title: string; body: string };
  projectsPage: { metaTitle: string; metaDescription: string; eyebrow: string; title: string; body: string };
  portfolio: { metaTitle: string; metaDescription: string; eyebrow: string; title: string; body: string };
  notFound: { metaTitle: string; metaDescription: string; heading: string; body: string };
  project: {
    title: string;
    role: string;
    summary: string;
    tags: string[];
    category: string;
    challenge: string;
    approach: string;
    outcome: string;
    description: string;
    metrics: { label: string; value: string }[];
    marquee: string[];
    captions: { hero: string; flow: string; outcome: string };
    alts: { hero: string; flow: string; outcome: string };
    gallery: { eyebrow: string; title: string; body: string };
    metaLabels: { year: string; role: string; format: string; formatValue: string };
    columns: { challenge: string; approach: string; outcome: string };
    marqueeLabel: string;
  };
};

export const dictionary: Record<Locale, Dictionary> = {
  zh: {
    meta: {
      title: "Eevee Li｜内容与品牌运营 Content & Brand Operator",
      description: "Eevee Li，内容与品牌运营。用内容与数据，为科技品牌做海外增长。",
      shareAlt: "Eevee Li｜内容与品牌运营 Content & Brand Operator",
    },
    skip: "跳到主要内容",
    nav: { label: "页面导航", menu: "菜单", work: "作品", about: "关于", resume: "简历", contact: "联系" },
    localeSwitch: { label: "语言", zh: "中文", en: "EN" },
    roleLine,
    mottoLead,
    mottoSub,
    heroLead: "用内容与数据，为科技品牌做海外增长。",
    actions: {
      resume: "下载简历",
      enquiry: "合作联系",
      backHome: "返回首页",
      viewWork: "查看作品",
      viewPimax: "查看 Pimax 影片",
    },
    locationLabel: "所在",
    locationValue: "上海",
    practiceLabel: "方向",
    practiceValue: "社媒 / 增长",
    practiceNote: "视觉设计为辅",
    marqueeLabel: "滚动的实践方向",
    marquee: ["出海内容", "社媒运营", "增长", "视觉设计", "发布会叙事", "海外受众"],
    work: {
      eyebrow: "精选项目",
      title: "用发布会的节奏、画面和叙事完成的作品",
      body: "每个项目同时处理表达和场面：信息、气氛和观众的感受放在一起。",
    },
    about: {
      eyebrow: "关于",
      title: "创作者 / 高级内容&品牌运营",
      body: "我是 Eevee，一个 UNSW Simulation & Immersive Tech 专业硕士毕业的创作者 / 高级内容&品牌运营。",
      tags: ["#科技", "#体育", "#时尚", "#音乐", "#摄影"],
      facts: [
        { value: "上海", label: "所在" },
        { value: "UNSW", label: "Simulation & Immersive Tech 硕士" },
        { value: "社媒 / 增长", label: "视觉设计为辅" },
      ],
    },
    resume: {
      eyebrow: "简历",
      title: "中文简历与英文简历",
      body: "两份 PDF 会放在这里。文件还没放上来时，对应的一项标为即将上线，不会链到 404。",
      zhFile: "中文简历",
      enFile: "英文简历",
      comingSoon: "即将上线",
    },
    contact: {
      eyebrow: "联系",
      lines: ["保持有趣", "保持酷"],
      emailLabel: "邮箱",
      wechatLabel: "微信",
    },
    learning: {
      metaTitle: "学习经历",
      metaDescription: "Eevee 毕业于 UNSW 悉尼，Simulation & Immersive Tech 专业硕士。更完整的学业记录会在准备好后补上。",
      eyebrow: "学习经历",
      title: "全球语境里的学习，支撑现在的内容实践",
      body: "Eevee 毕业于 UNSW 悉尼，Simulation & Immersive Tech 专业硕士。这段学习支撑现在的海外内容与增长实践。更完整的学业记录会在准备好之后补上。",
    },
    projectsPage: {
      metaTitle: "项目经历",
      metaDescription: "Pimax 高级内容运营期间的作品：全球新品发布、创作者合作、内容运营与增长、UGC 与线下活动。",
      eyebrow: "项目经历",
      title: "从策略、画面到执行的项目经历",
      body: "作品包括全球新品发布、创作者合作、内容运营与增长，以及 UGC 与线下活动。",
    },
    portfolio: {
      metaTitle: "作品集",
      metaDescription: "Eevee Li 的精选作品从 Pimax 全球新品发布开始，并包括创作者合作、内容运营和线下活动。",
      eyebrow: "作品集",
      title: "为发布会、战役和视觉共鸣准备的作品集",
      body: "精选作品从 Pimax 全球新品发布开始，并包括创作者合作、内容运营与增长、UGC 与线下活动。",
    },
    notFound: {
      metaTitle: "页面不存在",
      metaDescription: "这个页面不在 Eevee Li 的网站上。",
      heading: "这个页面不在这里",
      body: "链接可能过期了。回到首页看 Eevee Li 的精选作品。",
    },
    project: {
      title: "Pimax 全球新品发布",
      role: "核心项目负责人",
      summary:
        "一条 30 分钟的全球 YouTube 发布片。首周播放 3.5 万，新增订阅 1,000+，产品预售 1,200+，归因收入 RMB 200万+。",
      tags: ["全球发布", "YouTube", "内容制作"],
      category: "重点项目",
      challenge: "Pimax 需要一条面向全球的 YouTube 新品发布片，把创意方向、脚本和关键产品信息一次讲清楚。",
      approach:
        "我作为核心项目负责人，统筹创意方向、脚本、产品信息和整场发布，并协调产品与研发、摄制团队、3D 设计师和外部机构。",
      outcome:
        "交付 30 分钟发布片，完成拍摄、剪辑、调色和全球 YouTube 上线。首周播放 3.5 万，新增订阅 1,000+，产品预售 1,200+，归因收入 RMB 200万+。",
      description: "Eevee Li 在 Pimax 全球新品发布中担任核心项目负责人，交付一条 30 分钟的 YouTube 发布片。",
      metrics: [
        { label: "形式", value: "YouTube 发布片" },
        { label: "片长", value: "30 分钟" },
        { label: "YouTube 播放", value: "3.5万" },
        { label: "首周新增订阅", value: "1,000+" },
        { label: "产品预售", value: "1,200+" },
        { label: "首周归因收入", value: "RMB 200万+" },
        { label: "角色", value: "核心项目负责人" },
      ],
      marquee: ["重点项目", "全球发布", "YouTube", "内容制作", "核心项目负责人", "2026"],
      captions: {
        hero: "为 Pimax 全球新品发布制作的主影片。",
        flow: "辅助画面保留页面的图形强度，主素材负责把叙事带出来。",
        outcome: "发布会配色里的一张图形帧，用来代替影片静帧。",
      },
      alts: {
        hero: "Pimax 全球新品发布",
        flow: "图形海报，文字为 Poster Flow、Media First、Text Second、Grid in Motion",
        outcome: "图形海报，文字为 Outcome、Challenge 和 Approach",
      },
      gallery: {
        eyebrow: "画面流程",
        title: "表演、产品和气氛收在同一条视觉序列里",
        body: "页面先给出主素材，再用更紧的编辑节奏说明意图、方法和视觉结果。",
      },
      metaLabels: { year: "年份", role: "角色", format: "形式", formatValue: "视觉故事页" },
      columns: { challenge: "挑战", approach: "方法", outcome: "结果" },
      marqueeLabel: "滚动的项目信息",
    },
  },
  en: {
    meta: {
      title: "Eevee Li｜内容与品牌运营 Content & Brand Operator",
      description:
        "Eevee Li, content and brand operator. I grow global communities for tech brands — through content, data, and AIGC.",
      shareAlt: "Eevee Li｜Content & Brand Operator",
    },
    skip: "Skip to main content",
    nav: { label: "Primary", menu: "Menu", work: "Work", about: "About", resume: "Resume", contact: "Contact" },
    localeSwitch: { label: "Language", zh: "中文", en: "EN" },
    roleLine,
    mottoLead,
    mottoSub,
    heroLead: "I grow global communities for tech brands — through content, data, and AIGC.",
    actions: {
      resume: "Resume",
      enquiry: "Business enquiries",
      backHome: "Back home",
      viewWork: "View selected work",
      viewPimax: "View the Pimax film",
    },
    locationLabel: "Based in",
    locationValue: "Shanghai",
    practiceLabel: "Practice",
    practiceValue: "Social / Growth",
    practiceNote: "Design supports the content",
    marqueeLabel: "Scrolling list of practice areas",
    marquee: ["Overseas content", "Social operations", "Growth", "Visual design", "Launch storytelling", "Global audience"],
    work: {
      eyebrow: "Featured projects",
      title: "Selected work shaped through launch energy, image, and narrative control",
      body: "Each project is approached as both communication and staging, where message, atmosphere, and audience perception are composed together.",
    },
    about: {
      eyebrow: "About",
      title: "Creator / senior content & brand operator",
      body: "I'm Eevee, a creator and senior content & brand operator with a master's in Simulation & Immersive Technology from UNSW.",
      tags: ["#Tech", "#Sports", "#Fashion", "#Music", "#Photography"],
      facts: [
        { value: "Shanghai", label: "Based in" },
        { value: "UNSW", label: "Simulation & Immersive Technology" },
        { value: "Social / Growth", label: "Design supports the content" },
      ],
    },
    resume: {
      eyebrow: "Resume",
      title: "Chinese and English resumes",
      body: "Both PDFs will live here. Until a file is added, that download is marked coming soon and does not link to a 404.",
      zhFile: "Chinese resume",
      enFile: "English resume",
      comingSoon: "Coming soon",
    },
    contact: {
      eyebrow: "Contact",
      lines: ["STAY FUN", "STAY COOL"],
      emailLabel: "Email",
      wechatLabel: "WeChat",
    },
    learning: {
      metaTitle: "Learning experience",
      metaDescription:
        "Eevee graduated from UNSW Sydney with a master's in Simulation & Immersive Technology. A longer account of that academic path will be added when it is ready.",
      eyebrow: "Learning experience",
      title: "Learning shaped by global context and creative discipline",
      body: "Eevee graduated from UNSW Sydney with a master's in Simulation & Immersive Technology. That study sits behind the current practice in overseas content and growth. A longer account of the academic path will be added here.",
    },
    projectsPage: {
      metaTitle: "Project experience",
      metaDescription:
        "Work from Eevee's time as Senior Content Operator at Pimax: global product launch, creator partnerships, content operations and growth, and UGC and offline events.",
      eyebrow: "Project experience",
      title: "Project experience framed through strategy, image, and execution",
      body: "The work covers a global product launch, creator partnerships, content operations and growth, and UGC and offline events.",
    },
    portfolio: {
      metaTitle: "Portfolio",
      metaDescription:
        "Selected work by Eevee Li starts with the Pimax global product launch, and includes creator partnerships, content operations, and offline events.",
      eyebrow: "Portfolio",
      title: "A portfolio built for campaigns, launches, and visual resonance",
      body: "Selected work starts with the Pimax global product launch, and includes creator partnerships, content operations and growth, and UGC and offline events.",
    },
    notFound: {
      metaTitle: "Page not found",
      metaDescription: "This page is not on Eevee Li's site.",
      heading: "This page is not here.",
      body: "The link may be out of date. Head back to the homepage to see Eevee Li's selected work.",
    },
    project: {
      title: "Pimax global product launch",
      role: "Core project lead",
      summary:
        "A 30-minute global YouTube launch film. First week: 35K views, 1,000+ new subscribers, 1,200+ product pre-orders, and RMB 2M+ in launch-attributed revenue.",
      tags: ["Global launch", "YouTube", "Content production"],
      category: "Key project",
      challenge:
        "Pimax needed a global YouTube film for a new product launch, with the creative direction, script, and product message held in one line.",
      approach:
        "As a core project lead I owned creative direction, the script, key product messaging, and launch execution, and coordinated product and R&D, production crews, 3D designers, and external agencies.",
      outcome:
        "A 30-minute launch film, through filming, the edit, color, and global YouTube publishing. First week: 35K views, 1,000+ new subscribers, 1,200+ product pre-orders, and RMB 2M+ in launch-attributed revenue.",
      description:
        "Case study of the Pimax global product launch by Eevee Li, core project lead on a 30-minute YouTube launch film.",
      metrics: [
        { label: "Format", value: "YouTube launch film" },
        { label: "Runtime", value: "30 min" },
        { label: "YouTube views", value: "35K" },
        { label: "New subscribers", value: "1,000+" },
        { label: "Pre-orders", value: "1,200+" },
        { label: "Attributed revenue", value: "RMB 2M+" },
        { label: "Role", value: "Core project lead" },
      ],
      marquee: ["Key project", "Global launch", "YouTube", "Content production", "Core project lead", "2026"],
      captions: {
        hero: "Hero film produced for the Pimax global product launch.",
        flow: "Supporting frames preserve the graphic intensity of the page while the hero asset leads the narrative.",
        outcome: "A graphic frame in the launch palette, in place of a still from the film.",
      },
      alts: {
        hero: "Pimax global product launch",
        flow: "Graphic poster reading Poster Flow, Media First, Text Second, Grid in Motion",
        outcome: "Graphic poster reading Outcome, Challenge, and Approach",
      },
      gallery: {
        eyebrow: "Gallery flow",
        title: "Performance, product, and atmosphere held in one visual sequence",
        body: "The page opens with the hero asset, then moves through a tighter editorial rhythm to frame intention, method, and visual outcome.",
      },
      metaLabels: { year: "Year", role: "Role", format: "Format", formatValue: "Visual story page" },
      columns: { challenge: "Challenge", approach: "Approach", outcome: "Outcome" },
      marqueeLabel: "Scrolling project details",
    },
  },
};
