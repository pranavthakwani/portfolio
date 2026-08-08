/**
 * Portfolio — main page assembly.
 *
 * Section order (trust ladder):
 *   1. Hero          — human intro + animated photo (who is this person?)
 *   2. ChatSection   — live AI assistant (the real proof of work; curiosity triggered by hero)
 *   3. Projects      — concrete track record with business outcomes
 *   4. Experience    — sustained professional discipline
 *   5. Skills        — tools chosen for reasons
 *   6. About         — the person behind the engineer
 *   7. Contact       — low-friction next action (convert to client/employer)
 */

import { FloatingNav } from '@/components/layout/FloatingNav';
import { SocialRail } from '@/components/layout/SocialRail';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/hero/Hero';
import { ChatSection } from '@/components/sections/ChatSection';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <FloatingNav />
      <SocialRail />

      <main>
        {/* 1. Hero — human intro + animated photo */}
        <Hero />

        {/* 2. Chat — live AI assistant */}
        <ChatSection />

        {/* 3. Projects — production evidence */}
        <Projects />

        {/* 5. Experience — career trajectory */}
        <Experience />

        {/* 6. Skills — tools with rationale */}
        <Skills />

        {/* 7. About — the person */}
        <About />

        {/* 8. Contact — frictionless next action */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
