import { motion, useScroll, useSpring } from "framer-motion";

/** Thin progress line at the top edge of the screen. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <motion.div
        className="h-[2px] origin-left"
        style={{ scaleX, background: "linear-gradient(90deg, var(--color-cyan), var(--color-gold))" }}
      />
    </div>
  );
}
