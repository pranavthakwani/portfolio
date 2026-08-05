'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Github, Linkedin, FileText, Mail } from 'lucide-react';
import { profile } from '@/lib/data/profile';
import { UnderlineAccent } from '@/components/ui/AccentMark';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

const socialIcons = [
  { href: profile.social.github,   Icon: Github,   label: 'GitHub' },
  { href: profile.social.linkedin, Icon: Linkedin, label: 'LinkedIn' },
  { href: profile.social.resume,   Icon: FileText, label: 'Resume' },
].filter((s): s is typeof s & { href: string } => !!s.href);

/* ── What Pranav automates — the Odoo-style creative reveal ───────── */
const AUTOMATIONS = [
  { before: 'Manual lead sorting',    after: '1,000+ leads/month automated' },
  { before: '8-hour MIS reports',     after: '150+ hrs saved every month'   },
  { before: 'Customer reply queue',   after: '80% of queries AI-handled'    },
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

export function HeroIntro() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col justify-center h-full"
    >

      {/* Availability badge */}
      <motion.div variants={item} className="flex items-center gap-2 mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
        </span>
        <span className="text-xs font-semibold text-teal-600 tracking-wide">
          {profile.availabilityNote}
        </span>
      </motion.div>

      {/* Main heading — handwritten Caveat font */}
      <motion.div variants={item}>
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

        <p className="text-lg sm:text-xl font-semibold text-ink-700 leading-relaxed mb-2 max-w-lg">
          I build AI systems that{' '}
          <span className="text-amber-500 font-bold">eliminate</span>
          {' '}the work nobody wants to do.
        </p>
        <p className="text-sm text-ink-400 leading-relaxed mb-7 max-w-md">
          {profile.bio[0]}
        </p>
      </motion.div>

      {/* ── Creative element: animated automation showcase ─────────────
           Inspired by Odoo's "Imagine without Odoo" toggle.
           Shows what Pranav has actually automated — before → after.
      ───────────────────────────────────────────────────────────────── */}
      <motion.div variants={item} className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-300 mb-3">
          What I&apos;ve eliminated
        </p>
        <div className="flex flex-col gap-2.5">
          {AUTOMATIONS.map(({ before, after }, i) => (
            <motion.div
              key={before}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 group"
            >
              {/* Crossed-out "before" */}
              <span className="relative text-xs text-ink-300 font-medium">
                {before}
                {/* Strike-through line that draws left to right */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.05 + i * 0.18, duration: 0.35, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                  className="absolute top-1/2 left-0 right-0 h-px bg-ink-300 -translate-y-px"
                />
              </span>

              <ArrowRight size={10} className="text-teal-400 shrink-0" />

              {/* "After" result */}
              <span className="text-xs font-bold text-teal-600">{after}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA buttons */}
      <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-8">
        <Button
          variant="primary"
          size="lg"
          icon={<Mail size={16} />}
          className="bg-amber-500 hover:bg-amber-600 shadow-cta text-white"
          onClick={() => {
            window.location.href = `mailto:${profile.email}?subject=Let%27s%20work%20together`;
          }}
        >
          Let&apos;s Work Together
        </Button>
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

      {/* Social links */}
      <motion.div variants={item} className="flex items-center gap-2.5 mb-10">
        {socialIcons.map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target={label !== 'Resume' ? '_blank' : undefined}
            rel="noopener noreferrer"
            download={label === 'Resume' ? true : undefined}
            aria-label={label}
            className={cn(
              'flex items-center justify-center w-9 h-9 rounded-xl border border-ink-200',
              'text-ink-400 hover:text-ink-800 hover:border-ink-300 hover:shadow-soft',
              'bg-white/70 backdrop-blur-sm transition-all duration-200'
            )}
          >
            <Icon size={15} />
          </a>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        variants={item}
        onClick={() => {
          document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-2 text-xs font-medium text-ink-300 hover:text-ink-600 transition-colors duration-200 cursor-pointer group w-fit"
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
