'use client';

import { cn } from '@/lib/utils/cn';

/* ─── AccentMark ──────────────────────────────────────────────────────
   Hand-drawn SVG accent marks inspired by Odoo's editorial style.
   Drawn with confidence — single strokes, like a marker swipe.

   Available marks:
   - UnderlineAccent  — confident single-sweep marker underline
   - HighlightAccent  — thick semi-transparent marker highlight behind text
   - CircleAccent     — hand-drawn oval around text
   - ArrowAccent      — curved directional arrow
   ──────────────────────────────────────────────────────────────────── */

type AccentColor = 'amber' | 'teal' | 'purple';

const strokeClasses: Record<AccentColor, string> = {
  amber:  'text-amber-500',
  teal:   'text-teal-500',
  purple: 'text-purple-500',
};

const highlightFill: Record<AccentColor, string> = {
  amber:  'rgba(251,146,60,0.32)',   // orange-400 at 32% — warm highlighter
  teal:   'rgba(52,211,153,0.28)',   // emerald-400 at 28%
  purple: 'rgba(129,140,248,0.25)', // indigo-400 at 25%
};

/* ── Confident marker underline — single smooth sweep ───────────────── */
export function UnderlineAccent({
  children,
  color = 'amber',
  className,
}: {
  children: React.ReactNode;
  color?: AccentColor;
  className?: string;
}) {
  return (
    <span className={cn('relative inline-block', className)}>
      {children}
      <svg
        aria-hidden="true"
        className={cn(
          'absolute -bottom-1.5 left-0 w-full pointer-events-none overflow-visible',
          strokeClasses[color]
        )}
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Single confident marker sweep — not wavy, not broken */}
        <path
          d="M2,9 C50,3 110,11 198,6"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Subtle second layer for marker weight feel */}
        <path
          d="M3,10 C55,5 115,11 197,7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/* ── Marker highlighter behind text — thick, slightly organic ───────── */
export function HighlightAccent({
  children,
  color = 'amber',
  className,
}: {
  children: React.ReactNode;
  color?: AccentColor;
  className?: string;
}) {
  const fill = highlightFill[color];

  return (
    <span className={cn('relative inline-block', className)}>
      {/* Highlighter goes behind the text */}
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: '5%',
          left: '-3%',
          width: '106%',
          height: '90%',
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* First pass — main body of the highlighter swipe */}
        <path
          d="M0,18 C22,12 78,16 100,14 L100,78 C78,82 22,80 0,76 Z"
          fill={fill}
        />
        {/* Second pass — slightly offset for real marker layering feel */}
        <path
          d="M2,28 C25,23 75,26 98,24 L97,68 C74,72 26,70 3,66 Z"
          fill={fill}
          opacity="0.5"
        />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

/* ── Hand-drawn circle around text ─────────────────────────────────── */
export function CircleAccent({
  children,
  color = 'teal',
  className,
}: {
  children: React.ReactNode;
  color?: AccentColor;
  className?: string;
}) {
  return (
    <span className={cn('relative inline-block px-1', className)}>
      <svg
        aria-hidden="true"
        className={cn(
          'absolute pointer-events-none overflow-visible',
          strokeClasses[color]
        )}
        style={{ inset: '-6px' }}
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M6,22 C8,6 38,-2 55,2 C72,6 96,14 96,26 C96,38 76,50 52,50 C28,50 4,42 6,28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

/* ── Curved arrow ───────────────────────────────────────────────────── */
export function ArrowAccent({
  className,
  direction = 'down',
  color = 'amber',
}: {
  className?: string;
  direction?: 'down' | 'right' | 'down-right';
  color?: AccentColor;
}) {
  const paths: Record<typeof direction, string> = {
    'down':       'M10,4 C10,20 6,35 2,48 M2,48 L8,38 M2,48 L12,40',
    'right':      'M4,10 C20,10 35,6 48,2 M48,2 L38,8 M48,2 L40,12',
    'down-right': 'M4,4 C12,18 28,28 44,40 M44,40 L34,36 M44,40 L38,30',
  };

  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none', strokeClasses[color], className)}
      viewBox="0 0 50 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d={paths[direction]} />
    </svg>
  );
}
