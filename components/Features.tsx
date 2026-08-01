"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eyebrow, Reveal } from "./Reveal";

/* ---------- feature visuals (animated mini-mockups) ---------- */

function StreamVisual() {
  const reduce = useReducedMotion();
  const rows = [
    ["page_view", "/pricing", "12ms"],
    ["click", "cta_start_trial", "9ms"],
    ["signup", "team_invite_flow", "14ms"],
    ["checkout_completed", "$49 · growth", "11ms"],
    ["feature_used", "funnel_builder", "8ms"],
  ];
  return (
    <div aria-hidden className="glass rounded-2xl p-4 font-mono text-[11px]">
      <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-mute">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
        ingest · streaming
      </p>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <motion.div
            key={r[1]}
            initial={reduce ? undefined : { opacity: 0, x: -16 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="grid grid-cols-[1fr_1.2fr_auto] gap-3 rounded-lg bg-white/[0.03] px-3 py-2"
          >
            <span className="text-cyan">{r[0]}</span>
            <span className="text-mute truncate">{r[1]}</span>
            <span className="text-mute/70 tabular-nums">{r[2]}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FunnelVisual() {
  const reduce = useReducedMotion();
  const steps = [
    { label: "Visited pricing", pct: 100 },
    { label: "Started trial", pct: 64 },
    { label: "Invited team", pct: 41 },
    { label: "Upgraded plan", pct: 28 },
  ];
  return (
    <div aria-hidden className="glass rounded-2xl p-5">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
        funnel · trial → paid
      </p>
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={s.label}>
            <div className="mb-1 flex justify-between font-mono text-[11px]">
              <span className="text-ink/80">{s.label}</span>
              <span className="tabular-nums text-cyan">{s.pct}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/[0.05]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo to-cyan"
                initial={reduce ? { width: `${s.pct}%` } : { width: 0 }}
                whileInView={{ width: `${s.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertVisual() {
  const reduce = useReducedMotion();
  const [fired, setFired] = useState(false);
  useEffect(() => {
    if (reduce) {
      setFired(true);
      return;
    }
    const id = setInterval(() => setFired((f) => !f), 3200);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <div aria-hidden className="glass rounded-2xl p-5">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
        alert · checkout errors
      </p>
      <svg viewBox="0 0 300 100" className="w-full" aria-hidden>
        <line x1="0" y1="30" x2="300" y2="30" stroke="#A1A1AA" strokeOpacity="0.3" strokeDasharray="4 4" />
        <text x="4" y="24" fill="#A1A1AA" fontSize="9" fontFamily="monospace">
          threshold · 2%
        </text>
        <motion.path
          d="M0 82 C40 80, 70 76, 100 74 S 160 70, 190 60 S 240 34, 265 22 S 290 14, 300 12"
          fill="none"
          stroke="#22D3EE"
          strokeWidth="2"
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <circle cx="265" cy="22" r="4" fill="#22D3EE" opacity={fired ? 1 : 0.3} style={{ filter: "drop-shadow(0 0 8px #22D3EE)" }} />
      </svg>
      <motion.div
        animate={{ opacity: fired ? 1 : 0.35, y: fired ? 0 : 4 }}
        transition={{ duration: 0.5 }}
        className="mt-3 flex items-center gap-3 rounded-xl border border-cyan/25 bg-cyan/[0.06] px-4 py-3"
      >
        <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
        <div className="font-mono text-[11px]">
          <p className="text-ink">Error rate crossed 2% on /checkout</p>
          <p className="text-mute/70">Sent to #eng-alerts · 41s ago</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- section ---------- */

const FEATURES = [
  {
    eyebrow: "Live stream",
    title: "Every event, the moment it happens",
    body: "Drop in two lines of code and watch clicks, signups, and errors arrive with sub-second latency. What your users do right now is on screen right now — not in tomorrow's batch job.",
    visual: <StreamVisual />,
  },
  {
    eyebrow: "Instant funnels",
    title: "Funnels that build themselves",
    body: "Pick a start and an end — Pulse maps every path between them and shows where people drop off. No query language, no waiting on a data team, no stale numbers.",
    visual: <FunnelVisual />,
  },
  {
    eyebrow: "Anomaly alerts",
    title: "Know before your users tweet",
    body: "Pulse learns your baselines and pings the right channel the moment a metric drifts — error spikes, conversion dips, traffic surges. You fix issues while they're still small.",
    visual: <AlertVisual />,
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-20 max-w-2xl">
          <Eyebrow>Why Pulse</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Built for the speed your product moves at
          </h2>
        </Reveal>

        <div className="space-y-24 md:space-y-32">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`grid items-center gap-10 md:gap-16 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <Eyebrow>{f.eyebrow}</Eyebrow>
                <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
                  {f.title}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-mute">{f.body}</p>
              </Reveal>
              <Reveal delay={0.15}>{f.visual}</Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
