import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  id?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  onMount?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Reveals a line word by word: each word rises out of a soft blur. Screen readers get the whole line at once. */
export function WordReveal({ text, as = "p", className, id, delay = 0, stagger = 0.085, onMount }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = onMount
    ? { initial: "hidden", animate: "shown" }
    : { initial: "hidden", whileInView: "shown", viewport: { once: true, amount: 0.6 } };

  return (
    <Tag id={id} className={className} aria-label={text} {...trigger} transition={{ staggerChildren: reduce ? 0 : stagger, delayChildren: delay }}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-visible">
          <motion.span
            className="inline-block"
            variants={
              reduce
                ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.5 } } }
                : {
                    hidden: { opacity: 0, y: "0.45em", filter: "blur(10px)" },
                    shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.05, ease } },
                  }
            }
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
