"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Fake live metric that ticks upward — sells the "real-time" promise. */
function useTicker(base: number, step: number, ms: number) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const id = setInterval(
      () => setV((p) => p + Math.floor(Math.random() * step)),
      ms
    );
    return () => clearInterval(id);
  }, [step, ms]);
  return v;
}

const EVENTS = [
  { name: "checkout_completed", who: "user_8231", tone: "text-cyan" },
  { name: "signup", who: "user_9114", tone: "text-indigo" },
  { name: "plan_upgraded", who: "user_2047", tone: "text-cyan" },
  { name: "feature_used · export", who: "user_5580", tone: "text-mute" },
  { name: "invite_sent", who: "user_1362", tone: "text-indigo" },
];

export function DashboardMockup() {
  const reduce = useReducedMotion();
  const events = useTicker(84210, 14, 900);
  const users = useTicker(1327, 3, 1400);
  const [rowSeed, setRowSeed] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setRowSeed((s) => s + 1), 2200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="glass relative rounded-2xl p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
      {/* window chrome */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          {["bg-white/15", "bg-white/15", "bg-white/15"].map((c, i) => (
            <span key={i} className={`h-2.5 w-2.5 rounded-full ${c}`} />
          ))}
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-cyan">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          Live
        </span>
      </div>

      {/* headline metrics — mono, tabular */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">Events / min</p>
          <p className="mt-1 font-mono text-2xl tabular-nums text-ink">{events.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">Active now</p>
          <p className="mt-1 font-mono text-2xl tabular-nums text-cyan">{users.toLocaleString()}</p>
        </div>
      </div>

      {/* self-drawing area chart */}
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">Conversions · last hour</p>
        <svg viewBox="0 0 320 90" className="w-full" aria-hidden>
          <defs>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#6366F1" stopOpacity="0.35" />
              <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="chart-stroke" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 70 C30 62, 45 48, 70 50 S 115 66, 140 56 S 185 24, 210 30 S 260 44, 285 28 S 310 14, 320 12"
            fill="none"
            stroke="url(#chart-stroke)"
            strokeWidth="2"
            initial={reduce ? undefined : { pathLength: 0 }}
            animate={reduce ? undefined : { pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.path
            d="M0 70 C30 62, 45 48, 70 50 S 115 66, 140 56 S 185 24, 210 30 S 260 44, 285 28 S 310 14, 320 12 L320 90 L0 90 Z"
            fill="url(#chart-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: reduce ? 0 : 2 }}
          />
          <motion.circle
            r="3.5"
            cx="320"
            cy="12"
            fill="#22D3EE"
            style={{ filter: "drop-shadow(0 0 6px #22D3EE)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 2.4 }}
          />
        </svg>
      </div>

      {/* live event stream */}
      <div className="mt-3 space-y-1.5 overflow-hidden">
        {EVENTS.map((e, i) => {
          const isNew = !reduce && i === rowSeed % EVENTS.length;
          return (
            <motion.div
              key={e.name}
              animate={isNew ? { backgroundColor: ["rgba(34,211,238,0.10)", "rgba(255,255,255,0.02)"] } : undefined}
              transition={{ duration: 1.6 }}
              className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2 font-mono text-[11px]"
            >
              <span className={e.tone}>{e.name}</span>
              <span className="text-mute/80">{e.who}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
