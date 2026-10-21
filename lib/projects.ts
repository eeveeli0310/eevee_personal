import { dictionary, type Locale } from "@/lib/i18n";

export type ProjectMedia =
  | {
      type: "embed";
      src: string;
      alt: string;
      caption: string;
      ratio: "wide" | "landscape" | "portrait" | "square";
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption: string;
      ratio: "wide" | "landscape" | "portrait" | "square";
    };

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
  number: string;
  category: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  media: ProjectMedia[];
  marquee: string[];
  description: string;
};

export const projectSlugs = ["pimax-micro-oled-launch-event-video"] as const;

const youtubeEmbed = "https://www.youtube.com/embed/HoxcrOl8T9Y";

export function getProjects(locale: Locale): Project[] {
  const copy = dictionary[locale].project;

  return [
    {
      slug: projectSlugs[0],
      title: copy.title,
      year: "2026",
      role: copy.role,
      summary: copy.summary,
      tags: copy.tags,
      number: "01",
      category: copy.category,
      challenge: copy.challenge,
      approach: copy.approach,
      outcome: copy.outcome,
      metrics: copy.metrics,
      marquee: copy.marquee,
      description: copy.description,
      media: [
        {
          type: "embed",
          src: youtubeEmbed,
          alt: copy.alts.hero,
          caption: copy.captions.hero,
          ratio: "wide",
        },
        {
          type: "image",
          src: "/poster-02.svg",
          alt: copy.alts.flow,
          caption: copy.captions.flow,
          ratio: "wide",
        },
        {
          type: "image",
          src: "/poster-03.svg",
          alt: copy.alts.outcome,
          caption: copy.captions.outcome,
          ratio: "landscape",
        },
      ],
    },
  ];
}

export function getProject(locale: Locale, slug: string) {
  return getProjects(locale).find((project) => project.slug === slug);
}
