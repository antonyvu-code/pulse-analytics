"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  { value: 2.4, decimals: 1, suffix: "B", label: "events processed daily" },
  { value: 12, decimals: 0, suffix: "ms", label: "median ingest latency" },
  { value: 99.99, decimals: 2, suffix: "%", label: "uptime, last 12 months" },
  { value: 4800, decimals: 0, suffix: "+", label: "product teams on Pulse" },
];

export function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nums = gsap.utils.toArray<HTMLElement>(".stat-num");

      nums.forEach((el, i) => {
        const { value, decimals, suffix } = STATS[i];
        const format = (n: number) =>
          n.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) + suffix;

        if (reduce) {
          el.textContent = format(value);
          return;
        }

        const counter = { n: 0 };
        gsap.to(counter, {
          n: value,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => (el.textContent = format(counter.n)),
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative py-20 md:py-24">
      <div aria-hidden className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[300px] bg-indigo/[0.07] blur-[100px]" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="stat-num font-mono text-4xl md:text-5xl font-medium tabular-nums bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">
              0{s.suffix}
            </p>
            <p className="mt-2 text-sm text-mute">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
