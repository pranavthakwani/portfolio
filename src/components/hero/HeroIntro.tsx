'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { HighlightAccent, UnderlineAccent, DoodleArrow } from '@/components/ui/AccentMark';
import { Button } from '@/components/ui/Button';

const AUTOMATIONS = [
  { before: 'Manual lead sorting', after: '1,000+ leads/month automated' },
  { before: '8-hour MIS reports', after: '150+ hrs saved every month' },
  { before: 'Customer reply queue', after: '80% of queries AI-handled' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function HeroIntro({
  automated,
  showAutomationToggle,
  onAutomationChange,
}: {
  automated: boolean;
  showAutomationToggle: boolean;
  onAutomationChange: (automated: boolean) => void;
}) {
  return (
    <motion.div
      variants={container}
      initial={false}
      animate="show"
      className="flex flex-col justify-center h-full"
    >

      {/* Main heading — handwritten Caveat font */}
      <motion.div variants={item} className="relative pt-5">
        <h1
          className="font-accent text-5xl sm:text-7xl lg:text-8xl font-bold text-ink-900 leading-[1.05] mb-5"
          style={{ letterSpacing: '-0.01em' }}
        >
          Hi, I&apos;m{' '}
          <UnderlineAccent color="amber">
            Pranav
          </UnderlineAccent>
          .
        </h1>
        <span aria-hidden="true" className="hero-brush-stack absolute -top-1 left-32 hidden sm:block" />

        <div className="mb-6">
          <p className="text-lg sm:text-xl font-bold text-ink-900 leading-tight">
            {profile.title}
          </p>
          <p className="mt-1 text-sm font-semibold text-ink-600">
            {profile.location}
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-400">
            <span aria-hidden="true" className="mr-1 text-teal-500">&bull;</span>
            Open to Remote &amp; Relocation
          </p>
        </div>

        <p className="text-lg sm:text-xl font-semibold text-ink-700 leading-relaxed mb-7 max-w-lg">
          I build AI systems that{' '}
          <HighlightAccent color="amber">eliminate</HighlightAccent>
          {' '}the work nobody wants to do.
        </p>
      </motion.div>

      {/* ── Creative element: animated automation showcase ─────────────
           Inspired by Odoo's "Imagine without Odoo" toggle.
           Shows what Pranav has actually automated — before → after.
      ───────────────────────────────────────────────────────────────── */}
      <motion.div variants={item} className="mb-8 max-w-lg">
        <div className="mb-4 flex h-10 items-center justify-between gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-500">
            What I&apos;ve eliminated
          </p>
          <AnimatePresence>
            {showAutomationToggle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.75, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                className="relative shrink-0 origin-center"
              >
                <span aria-hidden="true" className="toggle-bloom">
                  {Array.from({ length: 7 }, (_, index) => <i key={index} />)}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-label="Show automated transformation"
                  aria-checked={automated}
                  onClick={() => onAutomationChange(!automated)}
                  className={`relative z-10 inline-flex h-11 w-[156px] items-center gap-2.5 rounded-full border-2 px-2 text-[11px] font-extrabold shadow-[3px_3px_0_#22c55e] transition-[background-color,color] focus-visible:outline-none focus-visible:shadow-[5px_5px_0_#22c55e] ${automated ? 'border-teal-700 bg-teal-50 text-teal-800' : 'border-ink-900 bg-white/95 text-ink-800'}`}
                >
                  <span
                    className={`relative flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors ${automated ? 'justify-end bg-teal-600' : 'justify-start bg-ink-900'}`}
                  >
                    <motion.span
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                      className="block h-4 w-4 shrink-0 rounded-full bg-white shadow-sm"
                    />
                  </span>
                  <span className="min-w-0 flex-1 text-center font-accent text-[15px] font-bold leading-none tracking-normal">
                    {automated ? 'Automated' : 'Manual'}
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-2.5">
          {AUTOMATIONS.map(({ before, after }, i) => (
            <motion.div
              key={before}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 group"
            >
              <span className="flex w-4 justify-center font-accent text-sm font-bold text-amber-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <ArrowRight size={11} className={automated ? 'text-teal-500 shrink-0' : 'text-ink-300 shrink-0'} />
              <motion.span
                key={automated ? after : before}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={automated ? 'text-xs font-bold text-teal-700' : 'text-xs font-medium text-ink-500'}
              >
                {automated ? after : before}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* CTA buttons */}
      <motion.div variants={item} className="relative flex flex-wrap items-center gap-3 mb-8">
        {/* Doodle arrow pointing at the primary CTA — hand-drawn feel */}
        <DoodleArrow
          direction="right"
          color="purple"
          className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 opacity-60 hidden sm:block"
        />
        <a
          href={'mailto:' + profile.email + '?subject=Let%27s%20work%20together'}
          className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-cta-blue transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
        >
          <Mail size={16} />
          <span>Let&apos;s Work Together</span>
        </a>
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Ask My AI
        </Button>
      </motion.div>



      {/* Scroll cue */}
      <motion.button
        variants={item}
        onClick={() => {
          document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-2 text-xs font-medium text-ink-500 hover:text-ink-700 transition-colors duration-200 cursor-pointer group w-fit"
      >
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex items-center justify-center w-7 h-7 rounded-full border border-ink-100 group-hover:border-ink-300 transition-colors"
        >
          <ArrowDown size={12} />
        </motion.span>
        scroll to chat with my AI
      </motion.button>

    </motion.div>
  );
}
