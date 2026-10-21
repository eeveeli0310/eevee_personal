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
      metaDescription: "目前公开的项目是 Pimax Micro-OLED 发布会视频，工作包括内容制作和视觉设计。",
      eyebrow: "项目经历",
      title: "从策略、画面到执行的项目经历",
      body: "目前公开的项目是 Pimax Micro-OLED 发布会视频，工作包括内容制作和视觉设计。其他合作会在可以分享时补上。",
    },
    portfolio: {
      metaTitle: "作品集",
      metaDescription: "Eevee Li 的精选作品从 Pimax Micro-OLED 发布会视频开始。更多项目会补在这里。",
      eyebrow: "作品集",
      title: "为发布会、战役和视觉共鸣准备的作品集",
      body: "精选作品从 Pimax Micro-OLED 发布会视频开始。更多战役、影片和图像作品会补在这一页。",
    },
    notFound: {
      metaTitle: "页面不存在",
      metaDescription: "这个页面不在 Eevee Li 的网站上。",
      heading: "这个页面不在这里",
      body: "链接可能过期了。回到首页看 Eevee Li 的精选作品。",
    },
    project: {
      title: "Pimax Micro-OLED 发布会视频",
      role: "内容与设计",
      summary: "一条发布会影片，用来呈现 Pimax Micro-OLED：强度更高，叙事节奏更强，场合感更明确。",
      tags: ["发布会", "视频内容", "视觉叙事"],
      category: "精选发布项目",
      challenge:
        "需要一条发布会素材，同时说清技术创新和现场的兴奋，并且让更广的国际观众也能看懂。",
      approach:
        "我把这条片子当成一场有安排的揭晓，用节奏、对比和可控的推进，让 Micro-OLED 的时刻有更清晰的情绪弧线，也更像一部片子。",
      outcome: "成片既是产品叙事，也是发布会的一场声明，让发布更有记忆点，视觉标志也更清楚。",
      description:
        "Eevee Li 的 Pimax Micro-OLED 发布会视频案例。以节奏、对比和发布会现场的气氛组织的产品揭晓。",
      metrics: [
        { label: "形式", value: "发布会视频" },
        { label: "焦点", value: "Micro-OLED" },
        { label: "角色", value: "内容 / 设计" },
      ],
      marquee: ["精选发布项目", "发布会", "视频内容", "视觉叙事", "内容与设计", "2026"],
      captions: {
        hero: "为 Pimax Micro-OLED 发布会制作的主影片。",
        flow: "辅助画面保留页面的图形强度，主素材负责把叙事带出来。",
        outcome: "发布会配色里的一张图形帧，用来代替影片静帧。",
      },
      alts: {
        hero: "Pimax Micro-OLED 发布会视频",
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
        "Published project work currently includes the Pimax Micro-OLED launch event video, covering content and visual design.",
      eyebrow: "Project experience",
      title: "Project experience framed through strategy, image, and execution",
      body: "Published project work currently includes the Pimax Micro-OLED launch event video, covering content and visual design. Notes on other collaborations will be added when they are ready to share.",
    },
    portfolio: {
      metaTitle: "Portfolio",
      metaDescription:
        "Selected work by Eevee Li starts with the Pimax Micro-OLED launch event video. More campaigns and motion pieces will be added here.",
      eyebrow: "Portfolio",
      title: "A portfolio built for campaigns, launches, and visual resonance",
      body: "Selected work starts with the Pimax Micro-OLED launch event video. More campaigns, films, and image-led pieces will be added to this page.",
    },
    notFound: {
      metaTitle: "Page not found",
      metaDescription: "This page is not on Eevee Li's site.",
      heading: "This page is not here.",
      body: "The link may be out of date. Head back to the homepage to see Eevee Li's selected work.",
    },
    project: {
      title: "Pimax Micro-OLED Launch Event Video",
      role: "Content and design",
      summary:
        "A launch film shaped to frame Pimax Micro-OLED with greater intensity, stronger narrative pacing, and a more distinct sense of occasion.",
      tags: ["Launch event", "Video content", "Visual storytelling"],
      category: "Featured launch project",
      challenge:
        "The brief called for a launch asset that could communicate technical innovation and event-scale excitement simultaneously, without losing clarity for a broad international audience.",
      approach:
        "I treated the film as a staged reveal, using pacing, contrast, and controlled build-up to give the Micro-OLED moment a sharper emotional arc and a more cinematic identity.",
      outcome:
        "The result functions as both a product narrative and an event statement, giving the launch a more memorable atmosphere and a clearer visual signature.",
      description:
        "Case study of the Pimax Micro-OLED launch event video by Eevee Li. A staged product reveal built around pacing, contrast, and event-scale atmosphere.",
      metrics: [
        { label: "Format", value: "Event video" },
        { label: "Focus", value: "Micro-OLED" },
        { label: "Role", value: "Content / design" },
      ],
      marquee: ["Featured launch project", "Launch event", "Video content", "Visual storytelling", "Content and design", "2026"],
      captions: {
        hero: "Hero film produced for the Pimax Micro-OLED launch event.",
        flow: "Supporting frames preserve the graphic intensity of the page while the hero asset leads the narrative.",
        outcome: "A graphic frame in the launch palette, in place of a still from the film.",
      },
      alts: {
        hero: "Pimax Micro-OLED Launch Event Video",
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
