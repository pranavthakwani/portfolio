'use client';

import { cn } from '@/lib/utils/cn';

/* ─── AccentMark ──────────────────────────────────────────────────────
   Hand-drawn SVG accent marks — bold, confident, Odoo-style editorial.
   Big strokes. Real colour. Not shy.

   Exports:
   - UnderlineAccent  — thick marker underline sweep
   - HighlightAccent  — vivid highlighter block behind text
   - CircleAccent     — bold hand-drawn oval around text
   - ArrowAccent      — curved directional arrow doodle
   - DoodleArrow      — standalone squiggly arrow (decorative element)
   - StarBurst        — small ✦ starburst accent (inline decoration)
──────────────────────────────────────────────────────────────────── */

type AccentColor = 'amber' | 'teal' | 'purple';

const strokeColors: Record<AccentColor, string> = {
  amber:  '#F59E0B',
  teal:   '#10B981',
  purple: '#3B82F6',
};

const highlightFill: Record<AccentColor, string> = {
  amber:  'rgba(251,191,36,0.62)',   // golden marker — very visible
  teal:   'rgba(52,211,153,0.55)',   // fresh green
  purple: 'rgba(96,165,250,0.52)',   // blue
};

/* ── Thick marker underline — single confident sweep ───────────────── */
export function UnderlineAccent({
  children,
  color = 'amber',
  className,
}: {
  children: React.ReactNode;
  color?: AccentColor;
  className?: string;
}) {
  const stroke = strokeColors[color];
  return (
    <span className={cn('relative inline-block', className)}>
      {children}
      <svg
        aria-hidden="true"
        className="absolute -bottom-2 left-0 w-full pointer-events-none overflow-visible"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Main thick sweep */}
        <path
          d="M1,10 C45,3 110,12 199,7"
          stroke={stroke}
          strokeWidth="5.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Second pass — marker layering weight */}
        <path
          d="M3,11 C50,5 115,12 197,8"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.35"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/* ── Vivid highlighter block behind text ────────────────────────────── */
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
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ top: '4%', left: '-4%', width: '108%', height: '92%' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Main body — slightly organic shape */}
        <path
          d="M0,15 C20,8 80,14 100,12 L100,80 C80,86 20,82 0,78 Z"
          fill={fill}
        />
        {/* Second offset pass — real marker layering */}
        <path
          d="M2,25 C22,19 78,24 98,22 L96,72 C76,78 24,74 4,70 Z"
          fill={fill}
          opacity="0.45"
        />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

/* ── Bold hand-drawn circle around text ─────────────────────────────── */
export function CircleAccent({
  children,
  color = 'teal',
  className,
}: {
  children: React.ReactNode;
  color?: AccentColor;
  className?: string;
}) {
  const stroke = strokeColors[color];
  return (
    <span className={cn('relative inline-block px-2', className)}>
      <svg
        aria-hidden="true"
        className="absolute pointer-events-none overflow-visible"
        style={{ inset: '-8px' }}
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M5,22 C7,5 40,-4 58,2 C75,7 98,16 96,28 C94,40 74,52 50,52 C26,52 3,44 5,28"
          stroke={stroke}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

/* ── Curved arrow ────────────────────────────────────────────────────── */
export function ArrowAccent({
  className,
  direction = 'down',
  color = 'amber',
}: {
  className?: string;
  direction?: 'down' | 'right' | 'down-right';
  color?: AccentColor;
}) {
  const stroke = strokeColors[color];
  const paths: Record<typeof direction, string> = {
    'down':       'M10,4 C10,20 6,35 2,48 M2,48 L8,38 M2,48 L12,40',
    'right':      'M4,10 C20,10 35,6 48,2 M48,2 L38,8 M48,2 L40,12',
    'down-right': 'M4,4 C12,18 28,28 44,40 M44,40 L34,36 M44,40 L38,30',
  };
  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
      viewBox="0 0 50 50"
      fill="none"
      stroke={stroke}
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d={paths[direction]} />
    </svg>
  );
}

/* ── Standalone squiggly doodle arrow — big decorative element ──────── */
export function DoodleArrow({
  className,
  color = 'amber',
  direction = 'down-right',
}: {
  className?: string;
  color?: AccentColor;
  direction?: 'down-right' | 'right' | 'down';
}) {
  const stroke = strokeColors[color];
  const configs = {
    'down-right': {
      viewBox: '0 0 60 60',
      path: 'M6,6 C10,18 22,28 36,40 C40,44 44,48 50,52',
      arrow: 'M50,52 L40,46 M50,52 L44,42',
    },
    'right': {
      viewBox: '0 0 70 30',
      path: 'M4,15 C16,10 32,8 48,14 C52,16 56,18 62,14',
      arrow: 'M62,14 L54,8 M62,14 L54,20',
    },
    'down': {
      viewBox: '0 0 30 70',
      path: 'M15,4 C10,16 8,34 14,52 C16,57 18,61 14,66',
      arrow: 'M14,66 L8,56 M14,66 L20,56',
    },
  };
  const c = configs[direction];
  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
      viewBox={c.viewBox}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={c.path} stroke={stroke} strokeWidth="3" />
      <path d={c.arrow} stroke={stroke} strokeWidth="2.5" />
    </svg>
  );
}

/* ── Small starburst ✦ — inline sparkle decoration ─────────────────── */
export function StarBurst({
  className,
  color = 'amber',
  size = 16,
}: {
  className?: string;
  color?: AccentColor;
  size?: number;
}) {
  const fill = strokeColors[color];
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn('inline-block pointer-events-none', className)}
    >
      {/* 4-point star */}
      <path
        d="M12,2 L13.5,10 L22,12 L13.5,14 L12,22 L10.5,14 L2,12 L10.5,10 Z"
        fill={fill}
      />
    </svg>
  );
}
