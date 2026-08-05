'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { HeroIntro } from './HeroIntro';
import { ChatPanel } from '@/components/chat/ChatPanel';

/**
 * Hero — the most important section of the portfolio.
 *
 * Layout:
 * - Desktop (lg+): 35/65 split — HeroIntro left, ChatPanel right
 * - Mobile:        Stack — HeroIntro first (human context), ChatPanel below
 *
 * The HeroIntro establishes human context before the AI chat is presented.
 * This is intentional: on mobile especially, an immediate chatbox without
 * human context risks reading as a generic lead-gen widget.
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Subtle background gradient — not a blob, just a very gentle warmth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 65% 50%, rgba(102,84,163,0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 15% 30%, rgba(47,156,142,0.03) 0%, transparent 60%)',
        }}
      />

      <Container className="flex-1 flex flex-col">
        {/* Main split layout */}
        <div className="flex-1 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 pt-20 pb-16 lg:py-0">

          {/* ── Left column — human intro (35%) ───────────── */}
          <motion.div
            className="w-full lg:w-[35%] shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            <HeroIntro />
          </motion.div>

          {/* ── Divider line (desktop only) ──────────────── */}
          <div
            aria-hidden="true"
            className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-ink-200 to-transparent shrink-0"
          />

          {/* ── Right column — live AI assistant (65%) ────── */}
          <motion.div
            className="w-full lg:flex-1 min-h-[520px] lg:min-h-[640px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <ChatPanel />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
