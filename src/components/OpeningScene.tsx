import { motion, useReducedMotion } from "framer-motion";
import type { Birthday } from "../content/birthday";
import { WordReveal } from "./WordReveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function OpeningScene({ content }: { content: Birthday["opening"] }) {
  const reduce = useReducedMotion();
  const fade = (delay: number, y = 18) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: delay * 0.3 } }
      : {
          initial: { opacity: 0, y, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 1.6, delay, ease },
        };

  return (
    <section
      aria-labelledby="opening-title"
      className="full-screen relative isolate flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--color-mist) 0%, #eaf2f3 55%, var(--color-sky) 100%)" }}
    >
      {/* Soft mist shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="mist-a absolute -left-[20%] top-[8%] h-[55vmax] w-[55vmax] rounded-full bg-[#cfe4ea] opacity-60 blur-[90px]" />
        <div className="mist-b absolute -right-[25%] bottom-[-10%] h-[60vmax] w-[60vmax] rounded-full bg-white opacity-80 blur-[100px]" />
      </div>

      <div className="gutter mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-24">
        <motion.p {...fade(0.3)} className="font-display text-[clamp(1.35rem,3.6vw,2rem)] italic text-ink">
          {content.pause}
        </motion.p>
        <WordReveal
          as="h1"
          id="opening-title"
          onMount
          delay={1.5}
          stagger={0.14}
          text={content.title}
          className="mt-5 max-w-[14ch] font-display text-[clamp(2.9rem,10vw,6.75rem)] leading-[1.02] tracking-[-0.01em] text-forest"
        />
      </div>

      <motion.a
        href="#moment"
        {...fade(3.2, 0)}
        className="gutter mx-auto mb-[max(28px,env(safe-area-inset-bottom,0px))] flex flex-col items-center gap-1 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ink no-underline"
      >
        <span>{content.scrollHint}</span>
        <span aria-hidden className="hint-arrow text-base">↓</span>
      </motion.a>
    </section>
  );
}
