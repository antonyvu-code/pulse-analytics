"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Eyebrow, Reveal } from "./Reveal";

/** Price that morphs between values via spring — no re-mount, digits glide. */
function MorphNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 160, damping: 22 });
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);
  const display = useTransform(spring, (v) => `$${Math.round(v)}`);
  return <motion.span className="tabular-nums">{display}</motion.span>;
}

const TIERS = [
  {
    name: "Starter",
    monthly: 0,
    yearly: 0,
    tagline: "For side projects finding their pulse",
    features: ["1M events / month", "3 seats", "7-day retention", "Community support"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Growth",
    monthly: 49,
    yearly: 39,
    tagline: "For teams shipping every week",
    features: [
      "25M events / month",
      "Unlimited seats",
      "12-month retention",
      "Anomaly alerts",
      "Slack & email support",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Scale",
    monthly: 199,
    yearly: 159,
    tagline: "For products with serious traffic",
    features: [
      "Unlimited events",
      "SSO & audit logs",
      "Custom retention",
      "Dedicated engineer",
      "99.99% SLA",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Start free. Scale when it matters.
          </h2>
        </Reveal>

        <Reveal className="mb-12">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1">
            {(["Monthly", "Yearly"] as const).map((label) => {
              const active = (label === "Yearly") === yearly;
              return (
                <button
                  key={label}
                  onClick={() => setYearly(label === "Yearly")}
                  className={`relative rounded-full px-5 py-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                    active ? "text-ink" : "text-mute hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/10"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                  <span className="relative">
                    {label}
                    {label === "Yearly" && <span className="ml-1.5 font-mono text-[10px] text-cyan">−20%</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1.5 ${
                  t.featured
                    ? "border border-indigo/40 bg-surface shadow-[0_0_70px_-18px_rgba(99,102,241,0.55)]"
                    : "glass"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#0E7490] px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-ink">{t.name}</h3>
                <p className="mt-1 text-sm text-mute">{t.tagline}</p>
                <p className="mt-6 font-mono text-5xl font-medium text-ink">
                  <MorphNumber value={yearly ? t.yearly : t.monthly} />
                  <span className="text-base text-mute/70"> /mo</span>
                </p>
                <p className="mt-1 font-mono text-[11px] text-mute/80">
                  {yearly ? "billed yearly" : "billed monthly"}
                </p>
                <ul className="mt-7 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0">
                        <path d="M3 8.5 6.5 12 13 4.5" stroke="#22D3EE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan ${
                    t.featured
                      ? "bg-gradient-to-r from-[#4F46E5] to-[#0E7490] text-white hover:shadow-[0_0_36px_-6px_rgba(34,211,238,0.6)]"
                      : "border border-white/12 bg-white/[0.03] text-ink hover:bg-white/[0.08]"
                  }`}
                >
                  {t.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
