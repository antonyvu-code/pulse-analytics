import { PulseLogo } from "./PulseLogo";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2.5 text-ink font-display font-semibold">
          <PulseLogo size={22} />
          Pulse
        </div>
        <p className="font-mono text-[11px] tracking-wide text-mute/80">
          © 2026 Pulse Analytics · Concept project — not a real product
        </p>
        <div className="flex gap-4 text-sm text-mute">
          <a href="#features" className="inline-block py-2 px-1 hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">Features</a>
          <a href="#pricing" className="inline-block py-2 px-1 hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">Pricing</a>
          <a href="#cta" className="inline-block py-2 px-1 hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan">Start free</a>
        </div>
      </div>
    </footer>
  );
}
