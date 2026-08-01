"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { MouseEvent } from "react";
import { useRef } from "react";
import { MagneticButton } from "./MagneticButton";
import { DashboardMockup } from "./DashboardMockup";

export function Hero() {
  const reduce = useReducedMotion();
  const zone = useRef<HTMLDivElement>(null);

  // normalized cursor position -0.5..0.5 → gentle 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 20 });

  function onMove(e: MouseEvent) {
    if (reduce || !zone.current) return;
    const r = zone.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
        };

  return (
    <section
      ref={zone}
      onMouseMove={onMove}
      className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28"
    >
      {/* ambient glow + grid */}
      <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div aria-hidden className="absolute -top-40 left-1/2 -translate-x-1/2 h-[560px] w-[900px] rounded-full bg-indigo/25 blur-[140px]" />
      <div aria-hidden className="absolute top-24 right-[-10%] h-[380px] w-[380px] rounded-full bg-cyan/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.p
            {...enter(0)}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] tracking-[0.18em] uppercase text-mute"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Live · Real-time product analytics
          </motion.p>

          <motion.h1
            {...enter(0.08)}
            className="font-display font-semibold tracking-[-0.03em] leading-[0.98] text-ink text-[clamp(3rem,7vw,6rem)]"
          >
            Your product
            <br />
            has a{" "}
            <span className="bg-gradient-to-r from-indigo via-[#8B5CF6] to-cyan bg-clip-text text-transparent">
              pulse.
            </span>
          </motion.h1>

          <motion.p {...enter(0.16)} className="mt-6 max-w-md text-lg leading-relaxed text-mute">
            Pulse streams every click, signup, and error into answers you can
            act on — in under a second. No SQL, no waiting for tomorrow&apos;s
            dashboard.
          </motion.p>

          <motion.div {...enter(0.24)} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href="#cta">
              Start free trial
              <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton href="#features" variant="ghost">
              See it live
            </MagneticButton>
          </motion.div>

          <motion.p {...enter(0.32)} className="mt-8 font-mono text-xs text-mute/85 tracking-wide">
            Backed by Northstar Ventures · Trusted by 4,800+ product teams
          </motion.p>
        </div>

        {/* 3D-tilted dashboard — illustrative demo, hidden from assistive tech */}
        <div aria-hidden style={{ perspective: 1400 }} className="relative hidden sm:block">
          <motion.div
            {...enter(0.2)}
            style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
