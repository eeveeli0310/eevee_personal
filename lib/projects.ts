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

export const projects: Project[] = [
  {
    slug: "pimax-micro-oled-launch-event-video",
    title: "Pimax Micro-OLED Launch Event Video",
    year: "2026",
    role: "Content Creator / Designer",
    summary:
      "A launch film shaped to frame Pimax Micro-OLED with greater intensity, stronger narrative pacing, and a more distinct sense of occasion.",
    tags: ["Launch Event", "Video Content", "Visual Storytelling"],
    number: "01",
    category: "Featured Launch Project",
    challenge:
      "The brief called for a launch asset that could communicate technical innovation and event-scale excitement simultaneously, without losing clarity for a broad international audience.",
    approach:
      "I treated the film as a staged reveal, using pacing, contrast, and controlled build-up to give the Micro-OLED moment a sharper emotional arc and a more cinematic identity.",
    outcome:
      "The result functions as both a product narrative and an event statement, giving the launch a more memorable atmosphere and a clearer visual signature.",
    metrics: [
      { label: "Format", value: "Event Video" },
      { label: "Focus", value: "Micro-OLED" },
      { label: "Role", value: "Content / Design" },
    ],
    media: [
      {
        type: "embed",
        src: "https://www.youtube.com/embed/HoxcrOl8T9Y",
        alt: "Pimax Micro-OLED Launch Event Video",
        caption: "Hero film produced for the Pimax Micro-OLED launch event.",
        ratio: "wide",
      },
      {
        type: "image",
        src: "/poster-02.svg",
        alt: "Graphic poster reading Poster Flow, Media First, Text Second, Grid in Motion",
        caption:
          "Supporting frames preserve the graphic intensity of the page while the hero asset leads the narrative.",
        ratio: "wide",
      },
      {
        type: "image",
        src: "/poster-03.svg",
        alt: "Graphic poster reading Outcome, Challenge, and Approach",
        caption: "A graphic frame in the launch palette, in place of a still from the film.",
        ratio: "landscape",
      },
    ],
    marquee: [
      "Featured Launch Project",
      "Launch Event",
      "Video Content",
      "Visual Storytelling",
      "Content Creator / Designer",
      "2026",
    ],
    description:
      "Case study of the Pimax Micro-OLED launch event video by Eevee Li, content creator and designer. A staged product reveal built around pacing, contrast, and event-scale atmosphere.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
