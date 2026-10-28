import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type Props = {
  as?: "p" | "div" | "h2" | "h3" | "span";
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

/** Fades and lifts its content into place once, when it scrolls into view. */
export function Reveal({ as = "div", children, delay = 0, y = 22, className, amount = 0.35, ...rest }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as ElementType;
  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduce ? 0.4 : 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
