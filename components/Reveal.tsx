"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-reveal wrapper: fade-up 24px, once, restrained.
 * Respects prefers-reduced-motion (renders static).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

/** Mono uppercase eyebrow label — the "data vernacular" of Pulse. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-cyan mb-4 flex items-center gap-2">
      <span className="inline-block h-px w-6 bg-gradient-to-r from-indigo to-cyan" />
      {children}
    </p>
  );
}
