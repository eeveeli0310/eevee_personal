export type WallPhoto = {
  x: string;
  y: string;
  w: string;
  h: string;
  src?: string;
  caption: { zh: string; en: string };
};

/** Positions from the home-page mock. Captions are sample labels and are easy to replace. */
export const wallDesktop: WallPhoto[] = [
  { x: "5vw", y: "14vh", w: "15vw", h: "30vh", caption: { zh: "SHENZHEN, 2025", en: "SHENZHEN, 2025" } },
  { x: "24vw", y: "46vh", w: "13vw", h: "22vh", caption: { zh: "地点, 年份", en: "[Place], [X]" } },
  { x: "40vw", y: "56vh", w: "20vw", h: "34vh", src: "/img/face.jpg", caption: { zh: "SYDNEY, 2024", en: "SYDNEY, 2024" } },
  { x: "63vw", y: "40vh", w: "12vw", h: "20vh", caption: { zh: "地点, 年份", en: "[Place], [X]" } },
  { x: "80vw", y: "12vh", w: "15vw", h: "36vh", caption: { zh: "地点, 年份", en: "[Place], [X]" } },
  { x: "78vw", y: "60vh", w: "16vw", h: "30vh", caption: { zh: "地点, 年份", en: "[Place], [X]" } },
  { x: "4vw", y: "58vh", w: "14vw", h: "26vh", caption: { zh: "地点, 年份", en: "[Place], [X]" } },
  { x: "61vw", y: "68vh", w: "12vw", h: "22vh", caption: { zh: "地点, 年份", en: "[Place], [X]" } },
];

export const wallMobile: WallPhoto[] = [
  { x: "4vw", y: "30vh", w: "40vw", h: "16vh", caption: { zh: "SHENZHEN, 2025", en: "SHENZHEN, 2025" } },
  { x: "52vw", y: "28vh", w: "44vw", h: "14vh", caption: { zh: "地点, 年份", en: "[Place], [X]" } },
  { x: "8vw", y: "51vh", w: "38vw", h: "20vh", src: "/img/face.jpg", caption: { zh: "SYDNEY, 2024", en: "SYDNEY, 2024" } },
  { x: "52vw", y: "47vh", w: "40vw", h: "22vh", caption: { zh: "地点, 年份", en: "[Place], [X]" } },
  { x: "22vw", y: "77vh", w: "52vw", h: "14vh", caption: { zh: "地点, 年份", en: "[Place], [X]" } },
];
