/**
 * Portfolio — main page assembly.
 *
 * Architecture:
 * - This page is a Server Component that renders Client Component sections.
 * - Each section is independently animated and lazily measured by Framer Motion
 *   via whileInView, so no section animates until it enters the viewport.
 * - The FloatingNav reads scroll position on the client and shows the active section.
 *
 * Section order (trust ladder):
 *   1. Hero          — immediate interactive proof (AI assistant)
 *   2. HowItWorks    — architecture transparency (turns "cool trick" into "verified engineering")
 *   3. Projects      — concrete track record with business outcomes
 *   4. Experience    — sustained professional discipline, not a hobby
 *   5. Skills        — tools chosen for reasons, not buzzword bingo
 *   6. About         — humanisation (competence gets shortlisted; likability gets hired)
 *   7. Contact       — payoff: easy, low-friction next action
 */

import { FloatingNav } from '@/components/layout/FloatingNav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/hero/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      {/* Fixed floating navigation — active section via scroll detection */}
      <FloatingNav />

      <main>
        {/* 1. Hero — split layout: human intro + live AI assistant */}
        <Hero />

        {/* 2. How It Works — architectural transparency, builds trust after demo */}
        <HowItWorks />

        {/* 3. Projects — production evidence with business outcomes */}
        <Projects />

        {/* 4. Experience — career trajectory */}
        <Experience />

        {/* 5. Skills — tools with rationale */}
        <Skills />

        {/* 6. About — the person, not just the engineer */}
        <About />

        {/* 7. Contact — frictionless next action */}
        <Contact />
      </main>

      {/* Footer — sole dark section; deliberate contrast anchor */}
      <Footer />
    </>
  );
}
