"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Eyebrow, Reveal } from "./Reveal";

const ITEMS = [
  {
    q: "How fast is \"real-time\", exactly?",
    a: "Median ingest-to-dashboard latency is 12ms. In practice: an event fired in your product is on your screen before the user's next click.",
  },
  {
    q: "Do I need a data team to use Pulse?",
    a: "No. Funnels, cohorts, and alerts are built by pointing and clicking. If you do have a data team, they get a full SQL layer and a warehouse export.",
  },
  {
    q: "What happens when I hit my event limit?",
    a: "Nothing breaks. We keep ingesting for 48 hours, notify you, and let you decide — upgrade or sample. We never silently drop your data.",
  },
  {
    q: "Is Pulse GDPR-compliant?",
    a: "Yes. EU data residency, cookieless tracking by default, one-click data deletion per user, and a signed DPA on every plan — including the free one.",
  },
  {
    q: "Can I migrate from another analytics tool?",
    a: "Our importer handles historical data from the major platforms and maps event names automatically. Most teams switch in one afternoon.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="mb-12">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Questions, answered
          </h2>
        </Reveal>

        <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
                >
                  <span className={`text-base md:text-lg transition-colors duration-200 ${isOpen ? "text-ink" : "text-ink/70"}`}>
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 font-mono text-xl text-cyan"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-[15px] leading-relaxed text-mute">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
