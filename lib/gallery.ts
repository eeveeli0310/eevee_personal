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
      photo("5vw", "14vh", "15vw", "30vh", { zh: "SHENZHEN, 2025", en: "SHENZHEN, 2025" }),
      photo("24vw", "46vh", "13vw", "22vh", { zh: "地点, 年份", en: "[Place], [X]" }),
      photo("40vw", "56vh", "20vw", "34vh", { zh: "SYDNEY, 2024", en: "SYDNEY, 2024" }, "/img/face.jpg"),
      photo("63vw", "40vh", "12vw", "20vh", { zh: "地点, 年份", en: "[Place], [X]" }),
      photo("80vw", "12vh", "15vw", "36vh"),
      photo("78vw", "60vh", "16vw", "30vh"),
      photo("4vw", "58vh", "14vw", "26vh"),
      photo("61vw", "68vh", "12vw", "22vh"),
    ],
  },
  {
    cards: [
      photo("6vw", "18vh", "16vw", "28vh"),
      photo("28vw", "52vh", "18vw", "30vh"),
      photo("52vw", "14vh", "14vw", "24vh"),
      photo("70vw", "42vh", "18vw", "32vh"),
      story("30vw", "16vh", "22vw"),
    ],
  },
  {
    cards: [
      photo("8vw", "36vh", "20vw", "32vh"),
      photo("40vw", "14vh", "15vw", "26vh"),
      photo("64vw", "46vh", "22vw", "30vh"),
      story("36vw", "48vh", "24vw"),
      story("74vw", "16vh", "18vw"),
    ],
  },
  {
    cards: [
      photo("10vw", "20vh", "18vw", "34vh"),
      photo("38vw", "40vh", "16vw", "28vh"),
      photo("62vw", "18vh", "20vw", "32vh"),
      story("34vw", "14vh", "26vw"),
    ],
  },
];
