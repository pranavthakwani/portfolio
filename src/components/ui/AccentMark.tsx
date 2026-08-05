'use client';

import { cn } from '@/lib/utils/cn';

/* ─── AccentMark ──────────────────────────────────────────────────────
   Hand-drawn SVG accent marks inspired by Odoo's editorial style.
   Used sparingly on 1-2 words per heading to add personality.

   Available marks:
   - UnderlineAccent — wavy underline stroke (amber/teal/purple)
   - HighlightAccent — irregular highlight behind text (amber)
   - CircleAccent    — hand-drawn oval around text (teal/purple)
   ──────────────────────────────────────────────────────────────── */

type AccentColor = 'amber' | 'teal' | 'purple';

const colorClasses: Record<AccentColor, string> = {
  amber:  'text-amber-500',
  teal:   'text-teal-500',
  purple: 'text-purple-500',
};

const fillClasses: Record<AccentColor, string> = {
  amber:  'fill-amber-400/20',
  teal:   'fill-teal-400/20',
  purple: 'fill-purple-400/15',
};

/* ── Wavy underline under the word ─────────────────────────────────── */
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
        className={cn('absolute -bottom-1 left-0 w-full overflow-visible pointer-events-none', colorClasses[color])}
        viewBox="0 0 200 10"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M2,6 C28,2 55,9 80,6 C105,3 130,9 158,6 C175,4 188,7 198,6"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/* ── Orange marker-highlight behind the word ────────────────────────── */
export function HighlightAccent({
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
      {/* Highlight box sits behind the text */}
      <svg
        aria-hidden="true"
        className={cn(
          'absolute inset-y-0 -left-1.5 -right-1.5 top-1 pointer-events-none',
          fillClasses[color],
          colorClasses[color]
        )}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M4,8 C18,-4 82,2 96,6 C100,40 98,75 96,92 C80,100 18,96 4,92 C0,70 1,35 4,8" />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

/* ── Irregular circle around the word ──────────────────────────────── */
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
          'absolute -inset-2 pointer-events-none overflow-visible',
          colorClasses[color]
        )}
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        fill="none"
      >
        <ellipse
          cx="50" cy="25" rx="48" ry="22"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="1 0"
          style={{ paintOrder: 'stroke' }}
        />
        {/* Add slight warp using a path instead of pure ellipse for hand-drawn feel */}
        <path
          d="M4,22 C6,5 35,-3 55,2 C75,7 97,14 97,26 C97,38 78,50 52,50 C26,50 2,42 4,28"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}

/* ── Curved arrow (connects sections or annotates) ──────────────────── */
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
      className={cn('pointer-events-none', colorClasses[color], className)}
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
