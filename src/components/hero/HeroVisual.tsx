'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Bot } from 'lucide-react';
import { profile } from '@/lib/data/profile';

/* ── Floating metric cards that appear around the photo ─────────────── */
const METRICS = [
  {
    id: 'hours',
    icon: CheckCircle,
    iconClass: 'text-teal-500',
    value: '150+ hrs/mo',
    label: 'saved from automation',
    // top-left, floats up/down
    style: { top: '-1.25rem', left: '-3.5rem' } as React.CSSProperties,
    animate: { y: [-5, 5, -5] },
    transition: { duration: 4.5, repeat: Infinity as number, ease: 'easeInOut' as const },
    delay: 0.5,
  },
  {
    id: 'effort',
    icon: Zap,
    iconClass: 'text-amber-500',
    value: '85% effort',
    label: 'automated away',
    // bottom-right, floats down/up
    style: { bottom: '-1rem', right: '-2.75rem' } as React.CSSProperties,
    animate: { y: [5, -5, 5] },
    transition: { duration: 3.8, repeat: Infinity as number, ease: 'easeInOut' as const },
    delay: 0.7,
  },
  {
    id: 'queries',
    icon: Bot,
    iconClass: 'text-purple-500',
    value: '80% queries',
    label: 'AI-handled',
    // mid-right, floats right/left
    style: { top: '42%', right: '-3rem' } as React.CSSProperties,
    animate: { x: [3, -3, 3] },
    transition: { duration: 5, repeat: Infinity as number, ease: 'easeInOut' as const },
    delay: 0.9,
  },
] as const;

/* ── Tech stack pills ────────────────────────────────────────────────── */
const TECH = ['n8n', 'LangChain', 'FastAPI', 'FAISS'];

export function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center py-10 lg:py-16">

      {/* Ambient glow blobs behind everything */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-8 -right-8 w-72 h-72 bg-purple-400/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute -bottom-8 -left-8 w-64 h-64 bg-teal-400/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-1/2 left-1/3 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Photo frame + decorative rings */}
      <div className="relative overflow-visible">

        {/* Slow-spinning dashed orbit rings */}
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-6 rounded-full border border-dashed border-purple-200/40 pointer-events-none"
        />
        <motion.div
          aria-hidden="true"
          animate={{ rotate: -360 }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-12 rounded-full border border-dashed border-teal-200/30 pointer-events-none"
        />

        {/* Main photo container */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">

          {/* Outer glow halo */}
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-[2.25rem] bg-gradient-to-br from-purple-300/30 via-transparent to-teal-300/25 blur-sm pointer-events-none"
          />

          {/* Photo card */}
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/70 shadow-soft-xl">

            {/* Gradient placeholder — always visible; photo overlays when present */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-paper-100 to-teal-50" />

            {/* Subtle pattern for when no photo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 25% 25%, rgba(79,70,229,1) 0%, transparent 55%), radial-gradient(circle at 78% 78%, rgba(16,185,129,1) 0%, transparent 55%)',
              }}
            />

            {/* Initials fallback — centred, large, light */}
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
              <span className="font-extrabold text-7xl text-purple-200/60 font-sans leading-none">
                PT
              </span>
            </div>

            {/* Actual photo */}
            <Image
              src={profile.photo}
              alt={`${profile.name} — ${profile.title}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
              priority
              onError={(e) => {
                // Hide broken img; gradient + initials show through
                (e.target as HTMLImageElement).style.opacity = '0';
              }}
            />
          </div>

          {/* Floating metric cards */}
          {METRICS.map(({ id, icon: Icon, iconClass, value, label, style, animate, transition, delay }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1, ...animate } as object}
              transition={{
                opacity: { delay, duration: 0.45 },
                scale:   { delay, duration: 0.45, type: 'spring', stiffness: 260, damping: 22 },
                ...transition,
              }}
              className="absolute glass-card px-3 py-2.5 rounded-2xl cursor-default"
              style={style}
            >
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Icon size={13} className={iconClass} />
                <div>
                  <p className="text-[11px] font-bold text-ink-900 leading-none mb-0.5">{value}</p>
                  <p className="text-[9px] text-ink-400 leading-none">{label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack pill row — centred below photo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5"
        >
          {TECH.map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-semibold bg-white/80 backdrop-blur-sm text-ink-500 px-2 py-1 rounded-lg border border-ink-100 shadow-soft whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
