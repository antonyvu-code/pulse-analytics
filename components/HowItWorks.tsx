import { Eyebrow, Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Drop in the snippet",
    body: "Two lines of code, or one of 40+ SDKs. Events start flowing before your coffee cools.",
    code: "npm i @pulse/web",
  },
  {
    n: "02",
    title: "Watch it stream",
    body: "Every click, signup, and error appears live. Pulse auto-names events so nothing needs a spec.",
    code: "pulse.track(event)",
  },
  {
    n: "03",
    title: "Ask anything",
    body: "Build funnels, cohorts, and alerts by pointing at what you care about. Answers in under a second.",
    code: "→ insight, live",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16 max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Live in minutes, not quarters
          </h2>
        </Reveal>

        {/* horizontal timeline on desktop, vertical on mobile */}
        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden
            className="absolute hidden md:block top-5 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-indigo/60 via-cyan/60 to-indigo/60"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12} className="relative">
              <div className="relative z-10 mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-surface font-mono text-xs text-cyan">
                {s.n}
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-mute">{s.body}</p>
              <p className="mt-4 inline-block rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 font-mono text-xs text-cyan/90">
                {s.code}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
