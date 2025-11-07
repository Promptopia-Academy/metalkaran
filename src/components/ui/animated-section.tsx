"use client";

import * as React from "react";
import { motion, Variants } from "motion/react";
import { cn } from "@/lib/utils";

export type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** Duration in seconds of the animation */
  duration?: number;
  /** Whether the animation should only run once when in view */
  once?: boolean;
  /** Motion variant shortcut */
  variant?: "fade" | "up" | "down" | "left" | "right" | "scale";
};

const makeVariants = (variant: AnimatedSectionProps["variant"]): Variants => {
  switch (variant) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      };
    case "down":
      return {
        hidden: { opacity: 0, y: -24 },
        show: { opacity: 1, y: 0 },
      };
    case "left":
      return {
        hidden: { opacity: 0, x: 24 },
        show: { opacity: 1, x: 0 },
      };
    case "right":
      return {
        hidden: { opacity: 0, x: -24 },
        show: { opacity: 1, x: 0 },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1 },
      };
    case "up":
    default:
      return {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      };
  }
};

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
  variant = "up",
}: AnimatedSectionProps) {
  const variants = React.useMemo(() => makeVariants(variant), [variant]);

  return (
    <motion.section
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
