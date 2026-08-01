"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

/* Fictional customers — styled wordmarks, honest placeholder for a concept project. */
const LOGOS = [
  { name: "Nortide", cls: "font-display font-bold tracking-tight" },
  { name: "kavara", cls: "font-mono lowercase tracking-widest" },
  { name: "LOOPWAY", cls: "font-sans font-light tracking-[0.3em]" },
  { name: "Statfox", cls: "font-display italic font-medium" },
  { name: "Brightline", cls: "font-sans font-semibold tracking-tight" },
  { name: "OAKFORM", cls: "font-mono font-bold tracking-[0.2em]" },
  { name: "Vessel", cls: "font-display font-semibold" },
  { name: "helio.", cls: "font-sans font-bold lowercase" },
];

export function LogoCloud() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="py-14">
      <Reveal>
        <p className="mb-8 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-mute/85">
          Powering product decisions at
          <button
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? "Play logo animation" : "Pause logo animation"}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-mute hover:text-ink hover:border-white/25 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            {paused ? (
              <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor" aria-hidden>
                <path d="M0 0l8 5-8 5V0z" />
              </svg>
            ) : (
              <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor" aria-hidden>
                <rect width="3" height="10" rx="0.75" />
                <rect x="5" width="3" height="10" rx="0.75" />
              </svg>
            )}
          </button>
        </p>
      </Reveal>
      <div className="marquee-mask group overflow-hidden">
        <div
          className="animate-marquee flex w-max items-center gap-16 pr-16 group-hover:[animation-play-state:paused]"
          style={paused ? { animationPlayState: "paused" } : undefined}
        >
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <span
              key={i}
              aria-hidden={i >= LOGOS.length}
              className={`text-xl text-mute/50 hover:text-mute transition-colors duration-300 whitespace-nowrap ${l.cls}`}
            >
              {l.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
