import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoCloud } from "@/components/LogoCloud";
import { Features } from "@/components/Features";
import { Stats } from "@/components/Stats";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { PulseDivider } from "@/components/PulseDivider";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-5 focus:py-2.5 focus:text-sm focus:text-ink focus:outline-2 focus:outline-cyan"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <LogoCloud />
        <PulseDivider />
        <Features />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <PulseDivider />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
