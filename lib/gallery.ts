export type WallCaption = { zh: string; en: string };

export type WallPhoto = {
  type: "photo";
  x: string;
  y: string;
  w: string;
  h: string;
  src?: string;
  caption: WallCaption;
};

export type WallStory = {
  type: "story";
  x: string;
  y: string;
  w: string;
  title: WallCaption;
  body: WallCaption;
};

export type WallCard = WallPhoto | WallStory;

export type WallScene = {
  /** Opening frame keeps the quote and signature. */
  quote?: boolean;
  cards: WallCard[];
};

const pending: WallCaption = { zh: "[X]", en: "[X]" };
const storyTitle: WallCaption = { zh: "故事", en: "Story" };

function photo(x: string, y: string, w: string, h: string, caption: WallCaption = pending, src?: string): WallPhoto {
  return { type: "photo", x, y, w, h, caption, src };
}

function story(x: string, y: string, w: string): WallStory {
  return { type: "story", x, y, w, title: storyTitle, body: pending };
}

/**
 * Each scene is one viewport of the horizontal track.
 * The first scene matches the approved scatter. Later scenes are placeholders only.
 */
export const wallScenes: WallScene[] = [
  {
    quote: true,
    cards: [
      photo("5vw", "14svh", "15vw", "30svh", { zh: "SHENZHEN, 2025", en: "SHENZHEN, 2025" }),
      photo("24vw", "46svh", "13vw", "22svh", { zh: "地点, 年份", en: "[Place], [X]" }),
      photo("40vw", "56svh", "20vw", "34svh", { zh: "SYDNEY, 2024", en: "SYDNEY, 2024" }, "/img/face.jpg"),
      photo("63vw", "40svh", "12vw", "20svh", { zh: "地点, 年份", en: "[Place], [X]" }),
      photo("80vw", "12svh", "15vw", "36svh"),
      photo("78vw", "60svh", "16vw", "30svh"),
      photo("4vw", "58svh", "14vw", "26svh"),
      photo("61vw", "68svh", "12vw", "22svh"),
    ],
  },
  {
    cards: [
      photo("6vw", "18svh", "16vw", "28svh"),
      photo("28vw", "52svh", "18vw", "30svh"),
      photo("52vw", "14svh", "14vw", "24svh"),
      photo("70vw", "42svh", "18vw", "32svh"),
      story("30vw", "16svh", "22vw"),
    ],
  },
  {
    cards: [
      photo("8vw", "36svh", "20vw", "32svh"),
      photo("40vw", "14svh", "15vw", "26svh"),
      photo("64vw", "46svh", "22vw", "30svh"),
      story("36vw", "48svh", "24vw"),
      story("74vw", "16svh", "18vw"),
    ],
  },
  {
    cards: [
      photo("10vw", "20svh", "18vw", "34svh"),
      photo("38vw", "40svh", "16vw", "28svh"),
      photo("62vw", "18svh", "20vw", "32svh"),
      story("34vw", "14svh", "26vw"),
    ],
  },
];
