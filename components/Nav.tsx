"use client";

import { useEffect, useState } from "react";
import { PulseLogo } from "./PulseLogo";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-void/70 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
        <a href="#" className="flex items-center gap-2.5 text-ink font-display font-semibold tracking-tight">
          <PulseLogo />
          Pulse
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="inline-block py-2 text-sm text-mute hover:text-ink transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#cta"
          className="rounded-full bg-white/[0.06] border border-white/10 px-5 py-2 text-sm text-ink hover:bg-white/[0.12] hover:border-white/20 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          Start free
        </a>
      </nav>
    </header>
  );
}
