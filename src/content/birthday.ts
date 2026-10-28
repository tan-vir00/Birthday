/**
 * All words and images on the page live here. Edit this file to change the content;
 * the components only handle layout and motion.
 */
import photoSrc from "../assets/rifa-memory.webp";
import backdropSrc from "../assets/rifa-backdrop.webp";
import portraitSrc from "../assets/rifa-portrait.webp";
import forestSrc from "../assets/rifa-forest.webp";
import kinSrc from "../assets/rifa-kin.webp";
import lakeSrc from "../assets/rifa-lake.webp";
import waterSrc from "../assets/lake-water.webp";

/** A photograph and where Rifa sits in it (percent from left / top), so crops keep her in view. */
export type Shape = "circle" | "capsule" | "arch";
export type Picture = {
  src: string; width: number; height: number; alt: string;
  focus: { x: number; y: number };
  /** Frame used where the photo appears beside a line of text. */
  shape?: Shape;
};

const portrait: Picture = {
  src: portraitSrc, width: 800, height: 1067, focus: { x: 46, y: 34 }, shape: "circle",
  alt: "A black-and-white portrait of Rifa laughing, wearing a sari and long jhumka earrings.",
};
const forest: Picture = {
  src: forestSrc, width: 840, height: 1120, focus: { x: 62, y: 60 }, shape: "capsule",
  alt: "Rifa smiling, standing barefoot in a shallow forest stream among ferns and palm fronds.",
};
const kin: Picture = {
  src: kinSrc, width: 800, height: 1224, focus: { x: 40, y: 70 }, shape: "arch",
  alt: "Rifa in a grey hijab and blue sari, smiling at night beside a hand-painted “23 Years of KIN” banner.",
};
const lake: Picture = {
  src: lakeSrc, width: 960, height: 1280, focus: { x: 60, y: 40 },
  alt: "Rifa on a boat, smiling into the sun, a pink flower tucked into her lilac hijab, blue-green water behind her.",
};

export const birthday = {
  firstName: "Rifa",
  fullName: "Esrat Jahan Rifa",

  photo: {
    /** The uploaded photograph at full width, stored as WebP so the single HTML file stays small.
     *  The untouched original is kept in photo-original/rifa-memory.jpeg. */
    src: photoSrc,
    /** A tiny copy of the same photograph, blurred on screen to tint the background. */
    backdrop: backdropSrc,
    width: 1512,
    height: 2016,
    alt: "Rifa in a flowing pale-blue outfit, mid-twirl on a green lawn beside a still pond, with tall trees and a misty sky behind her.",
    /** Where Rifa stands in the frame (percent from left, percent from top). Keeps her in view on every screen. */
    focus: { x: 48, y: 60 },
  },

  opening: {
    pause: "A little pause in the world…",
    title: "Today is all about you, Rifa.",
    scrollHint: "Keep scrolling",
  },

  photoCaption: {
    lead: "Some moments hold a beauty that words can barely describe.",
    follow: "May the year ahead bring you many more moments worth remembering.",
  },

  /** Each line can carry one photograph; every photograph appears only once on the page. */
  littleThings: [
    { text: "Rifa, may you always find beauty in the little things." },
    {
      text: "In quiet mornings, unexpected laughter, familiar places, and conversations that make time pass without notice.",
      picture: portrait,
    },
    {
      text: "May you discover new places, meet wonderful people, and collect memories that grow more precious with time.",
      picture: forest,
    },
    { text: "And may the ordinary days turn out to be some of your happiest ones.", picture: kin },
  ] as { text: string; picture?: Picture }[],

  letter: {
    heading: "A few wishes for your new chapter",
    salutation: "Dear Rifa,",
    paragraphs: [
      "May this new year of your life bring you closer to the things that make you feel happy, hopeful, and excited about tomorrow.",
      "May the dreams you’ve been carrying find their way toward reality. May new opportunities arrive when you least expect them, and may you always have the courage to explore the paths that feel right for you.",
      "I hope you experience the kind of happiness that doesn’t need a special occasion. The kind found in a peaceful morning, a beautiful sunset, an unexpected adventure, or a simple day that turns out better than expected.",
      "May you grow into an even more confident version of yourself, without losing the little things that make you who you are.",
      "When life gets complicated, may you find clarity. When things take longer than expected, may you find patience. And when something beautiful happens, may you have the time to stop and truly enjoy it.",
      "May the coming year be filled with genuine laughter, meaningful experiences, good health, new discoveries, and people who bring positivity into your life.",
      "May you travel to places you’ve always wanted to see, learn things that surprise you, and experience moments that remind you how much there is still to look forward to.",
      "Above all, may you find peace in your own journey. There is no perfect timeline for life, and no need to have every answer today.",
      "Here’s to another year of growing, discovering, laughing, and living a little more fully.",
    ],
    closing: ["May this be a beautiful chapter in your story."],
    coda: "Here’s to all the beautiful things still waiting to happen.",
  },

  wish: {
    prompt: "A little wish for the year ahead",
    button: "Reveal your wish",
    text: "May something unexpectedly wonderful find its way into your life this year. Something that makes you smile without a reason, fills an ordinary day with excitement, and becomes a memory you will always be glad to have.",
    after: "May life surprise you in the kindest ways.",
    /** Water from the lake photograph, used as a faint texture behind the wish. */
    water: waterSrc,
  },

  finale: {
    name: "Esrat Jahan Rifa",
    heading: "Happy Birthday, Rifa.",
    lines: [
      "May your days be brighter, your dreams feel closer, and your world be filled with beautiful surprises.",
      "May the year ahead bring you countless reasons to smile, places worth discovering, memories worth keeping, and happiness in the moments that matter most.",
    ],
    closing: "Here’s to you, Rifa. Today and all the beautiful days ahead.",
    photo: lake,
  },
} as const;

export type Birthday = typeof birthday;
