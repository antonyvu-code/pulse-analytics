import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden py-28 md:py-40">
      {/* strongest glow on the page — the closing beat */}
      <div aria-hidden className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[480px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo/30 blur-[130px]" />
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[260px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[-0.03em] leading-[1.02] text-ink">
            Put your finger
            <br />
            on the{" "}
            <span className="bg-gradient-to-r from-indigo to-cyan bg-clip-text text-transparent">pulse.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-lg text-mute">
            Free for 1M events a month. No credit card, no sales call — live in
            minutes.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <MagneticButton href="#" className="px-10 py-4 text-base">
            Start free trial
            <span aria-hidden>→</span>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
