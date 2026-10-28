import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Birthday } from "../content/birthday";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { WordReveal } from "./WordReveal";

type Props = { photo: Birthday["photo"]; caption: Birthday["photoCaption"] };

export function PhotoRevealScene({ photo, caption }: Props) {
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  // 0 → 0.62: a soft window around Rifa opens to the full frame (≈66vmax reaches every corner).
  // 0.62 → 1: the image rests and drifts gently.
  const radius = useTransform(scrollYProgress, [0, 0.12, 0.62], [9, 15, 70], { ease: (t) => t * t * (3 - 2 * t) });
  const window_ = useTransform(radius, (r) =>
    r >= 69
      ? "linear-gradient(#000, #000)"
      : `radial-gradient(circle at ${photo.focus.x}% ${photo.focus.y}%, #000 ${r}vmax, rgba(0,0,0,0) ${r + 10 + r * 0.1}vmax)`,
  );
  // Top and bottom edges always melt into the page colour, so the photograph merges with the site.
  const feather = "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 13%, #000 80%, rgba(0,0,0,0) 100%)";
  const mask = useTransform(window_, (w) => `${w}, ${feather}`);
  const scale = useTransform(scrollYProgress, [0, 0.62], [1.14, 1]);
  const drift = useTransform(scrollYProgress, [0.55, 1], ["0%", "-2.5%"]);
  // The mist turns into the landscape while the window opens, then settles back to the page colour.
  const landscape = useTransform(scrollYProgress, [0.04, 0.3, 0.55, 0.75], [0, 1, 1, 0]);
  const ground = useTransform(scrollYProgress, [0, 0.3, 0.55, 0.75], ["#dcebf0", "#a9bfae", "#a9bfae", "#dcebf0"]);

  const captionBlock = (
    <div className="gutter mx-auto flex max-w-3xl flex-col gap-8 py-[clamp(5rem,16svh,9rem)] text-center">
      <WordReveal text={caption.lead} className="font-display text-[clamp(1.85rem,5.2vw,3.25rem)] leading-[1.15] text-forest" />
      <Reveal as="p" delay={0.35} className="mx-auto max-w-[34ch] text-[clamp(1rem,2.2vw,1.2rem)] leading-relaxed text-ink">
        {caption.follow}
      </Reveal>
    </div>
  );

  if (reduce) {
    return (
      <section id="moment" aria-label="A moment in time" className="bg-sky">
        <div className="screen relative overflow-hidden">
          <Photo
            photo={photo}
            className="h-full w-full"
            eager
            style={{
              maskImage: "linear-gradient(180deg, transparent 0%, #000 13%, #000 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 13%, #000 80%, transparent 100%)",
            }}
          />
        </div>
        {captionBlock}
      </section>
    );
  }

  return (
    <section id="moment" aria-label="A moment in time" style={{ background: "linear-gradient(180deg, var(--color-sky) 0%, var(--color-sky) 60%, var(--color-mist) 100%)" }}>
      <div ref={track} className="reveal-track relative">
        <motion.div className="screen sticky top-0 overflow-hidden" style={{ backgroundColor: ground }}>
          {/* The surrounding mist gives way to the landscape itself: a heavily softened copy of the photograph. */}
          <motion.div aria-hidden className="absolute inset-0" style={{ opacity: landscape }}>
            <img
              src={photo.backdrop}
              alt=""
              className="h-full w-full scale-125 object-cover blur-[38px] saturate-[1.05]"
              style={{ objectPosition: `${photo.focus.x}% ${photo.focus.y}%` }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
              scale,
              maskImage: mask,
              WebkitMaskImage: mask,
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          >
            <motion.div className="absolute inset-x-0 -top-[3%] h-[106%]" style={{ y: drift }}>
              <Photo photo={photo} className="h-full w-full" eager />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {captionBlock}
    </section>
  );
}
