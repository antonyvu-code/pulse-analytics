"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";

/**
 * Magnetic CTA: the button leans toward the cursor within its hover zone.
 * Pure transform — no layout shift, GPU-composited.
 */
export function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  function onMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";
  const styles =
    variant === "primary"
      ? "text-white bg-gradient-to-r from-[#4F46E5] to-[#0E7490] shadow-[0_0_24px_-6px_rgba(99,102,241,0.7)] hover:shadow-[0_0_44px_-4px_rgba(34,211,238,0.65)]"
      : "text-ink border border-white/12 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}
