import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useState, type CSSProperties } from "react";
import type { Birthday } from "../content/birthday";

type Props = { wish: Birthday["wish"] };
const ease = [0.22, 1, 0.36, 1] as const;

export function HiddenWish({ wish }: Props) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  // Move keyboard and screen-reader focus to the wish once it appears.
  const revealed = useCallback((el: HTMLDivElement | null) => el?.focus({ preventScroll: true }), []);

  return (
    <section aria-labelledby="wish-title" className="full-screen relative isolate flex items-center overflow-hidden">
      {/* Lake water from one of the photographs, softened behind the scene */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <img src={wish.water} alt="" className="h-full w-full scale-110 object-cover opacity-45 blur-[3px]" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, var(--color-paper) 0%, rgba(220,235,240,0.82) 30%, rgba(220,235,240,0.78) 70%, var(--color-mist) 100%)" }}
      />

      {/* Reflections on the water (leaves and fabric drift over the whole page) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {[18, 52, 80].map((left, i) => (
          <span
            key={left}
            className="ripple absolute bottom-[14%] h-10 w-40 rounded-[50%] border border-cyan"
            style={{ left: `${left}%`, "--delay": `${i * 2.3}s` } as CSSProperties}
          />
        ))}
      </div>

      <div className="gutter mx-auto flex w-full max-w-2xl flex-col items-center py-24 text-center">
        <h2 id="wish-title" className="font-display text-[clamp(2rem,5.4vw,3.2rem)] italic leading-tight text-forest">
          {wish.prompt}
        </h2>

        <div className="mt-10 min-h-[12rem] w-full" aria-live="polite">
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.div key="button" exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.35 } }}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls="wish-text"
                  onClick={() => setOpen(true)}
                  className="inline-flex min-h-12 items-center gap-3 rounded-full border border-forest/25 bg-mist/75 px-7 py-3 text-[0.95rem] font-medium tracking-wide text-forest shadow-[0_10px_30px_-12px_rgba(23,63,53,0.35)] backdrop-blur-md transition-colors hover:bg-forest hover:text-mist focus-visible:bg-forest focus-visible:text-mist"
                >
                  <span aria-hidden className="twinkle h-1.5 w-1.5 rounded-full bg-gold" style={{ "--o": "1", "--d": "2.6s" } as CSSProperties} />
                  {wish.button}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="wish"
                id="wish-text"
                ref={revealed}
                tabIndex={-1}
                className="mx-auto flex max-w-xl flex-col gap-8 outline-none"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: reduce ? 0.4 : 1.4, ease }}
              >
                <p className="font-display text-[clamp(1.45rem,3.6vw,2rem)] leading-[1.35] text-forest">{wish.text}</p>
                <motion.p
                  className="text-[1.05rem] font-medium tracking-wide text-ink"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: reduce ? 0.2 : 1.6 }}
                >
                  {wish.after}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
