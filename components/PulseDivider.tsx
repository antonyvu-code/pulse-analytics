"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Signature element: the EKG pulse line.
 * A full-width heartbeat waveform that draws itself when scrolled into view,
 * with a glowing beat at its spike. Used sparingly between major sections.
 */
export function PulseDivider() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="relative mx-auto max-w-6xl px-6 py-2">
      <svg
        viewBox="0 0 1200 80"
        fill="none"
        className="w-full h-10 md:h-14 overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pulse-grad" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#6366F1" stopOpacity="0" />
            <stop offset="0.35" stopColor="#6366F1" />
            <stop offset="0.55" stopColor="#22D3EE" />
            <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 40 H420 L450 40 L470 12 L495 68 L515 26 L535 40 H1200"
          stroke="url(#pulse-grad)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {/* the beat: glowing dot at the spike */}
        <motion.circle
          cx="495"
          cy="68"
          r="3"
          fill="#22D3EE"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 0.4, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: reduce ? 0 : 1.1, duration: 1.2 }}
          style={{ filter: "drop-shadow(0 0 6px #22D3EE)" }}
        />
      </svg>
    </div>
  );
}
