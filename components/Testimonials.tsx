"use client";

import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import type { KeyboardEvent } from "react";
import { useRef } from "react";
import { Eyebrow, Reveal } from "./Reveal";

const QUOTES = [
  {
    quote:
      "We killed our Tuesday metrics meeting. Everyone just watches the same live board now — arguments end in seconds instead of sprints.",
    name: "Mara Chen",
    role: "Head of Product, Nortide",
  },
  {
    quote:
      "Pulse caught a checkout bug 40 minutes before our first support ticket. That one alert paid for the year.",
    name: "Diego Ferrer",
    role: "CTO, Kavara",
  },
  {
    quote:
      "I stopped writing SQL for product questions entirely. Our PMs self-serve, and my data team finally builds models again.",
    name: "Priya Nair",
    role: "Data Lead, Loopway",
  },
  {
    quote:
      "The funnel view found a drop-off we'd been blind to for months. Fixing it moved activation up nine points.",
    name: "Tomás Lindqvist",
    role: "Founder, Statfox",
  },
  {
    quote:
      "Setup genuinely took one morning. By lunch the whole company was watching launch-day traffic together.",
    name: "Amaka Obi",
    role: "VP Engineering, Brightline",
  },
];

export function Testimonials() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const reduce = useReducedMotion();

  /* Keyboard equivalent of dragging: arrow keys pan the track one card at a time. */
  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (!wrap.current || !track.current) return;
    e.preventDefault();
    const minX = Math.min(0, wrap.current.clientWidth - track.current.scrollWidth);
    const step = 404; // card width + gap
    const target = Math.max(minX, Math.min(0, x.get() + (e.key === "ArrowLeft" ? step : -step)));
    if (reduce) x.set(target);
    else animate(x, target, { type: "spring", stiffness: 200, damping: 28 });
  }

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-4 max-w-2xl">
          <Eyebrow>Loved by product teams</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Teams feel the difference
          </h2>
        </Reveal>
        <Reveal>
          <p className="mb-12 font-mono text-xs text-mute/80 tracking-wide">
            ← drag or use arrow keys to explore
          </p>
        </Reveal>
      </div>

      <div ref={wrap} className="mx-auto max-w-6xl px-6">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={wrap}
          dragElastic={0.08}
          style={{ x }}
          tabIndex={0}
          role="group"
          aria-label="Customer testimonials — use left and right arrow keys to browse"
          onKeyDown={onKeyDown}
          className="flex w-max cursor-grab gap-6 active:cursor-grabbing rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
        >
          {QUOTES.map((q) => (
            <motion.figure
              key={q.name}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
              className="glass w-[320px] md:w-[380px] shrink-0 select-none rounded-2xl p-7 hover:border-white/[0.16] transition-colors duration-300"
            >
              <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden className="mb-5">
                <path d="M0 20V10.8C0 4.9 3.6 1 10 0l1.2 3.3C7.5 4.4 5.8 6.4 5.6 9H11v11H0Zm15 0V10.8C15 4.9 18.6 1 25 0l1 3.3c-3.7 1.1-5.4 3.1-5.6 5.7H26v11H15Z" fill="url(#q-g)" />
                <defs>
                  <linearGradient id="q-g" x1="0" y1="0" x2="26" y2="20">
                    <stop stopColor="#6366F1" />
                    <stop offset="1" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>
              <blockquote className="text-[15px] leading-relaxed text-ink/90">{q.quote}</blockquote>
              <figcaption className="mt-6">
                <p className="text-sm font-medium text-ink">{q.name}</p>
                <p className="font-mono text-xs text-mute/85">{q.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
