'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

/* ─── Chess Knight SVG ───────────────────────────────────────────────
   Proper horse-head chess knight on a 2×2 chess.com-style checkerboard.
   Hand-crafted path — horse faces left, white mane stripe + eye detail.
──────────────────────────────────────────────────────────────────── */
function KnightIcon({ size = 52 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Chess knight"
    >
      <defs>
        <clipPath id="kClip">
          <rect width="100" height="100" rx="20" />
        </clipPath>
      </defs>

      {/* Checkerboard — tan/brown chess.com palette */}
      <g clipPath="url(#kClip)">
        <rect width="100" height="100" fill="#B88C5C" />
        <rect x="0"  y="0"  width="50" height="50" fill="#D4B896" />
        <rect x="50" y="50" width="50" height="50" fill="#D4B896" />
      </g>

      {/* ── Knight silhouette ── */}
      <g clipPath="url(#kClip)">

        {/* Pedestal base */}
        <rect x="16" y="76" width="62" height="16" rx="5" fill="#1C1C1C" />

        {/* Main body — horse head facing left */}
        <path
          fill="#1C1C1C"
          d="
            M 24,76
            L 64,76
            C 64,68 67,60 68,52
            C 74,47 78,40 75,32
            C 77,25 75,16 70,12
            C 73,7  71,2  67,2
            L 62,8
            C 58,5  52,4  46,6
            C 40,8  36,14 37,21
            C 31,22 27,27 27,33
            C 24,38 24,44 28,49
            C 27,55 27,62 29,69
            L 24,69
            Z
          "
        />

        {/* White mane stripe — back of neck (horse's right side) */}
        <path
          fill="white"
          d="
            M 67,2
            C 71,2  73,7  70,12
            C 75,16 77,25 75,32
            C 77,37 75,42 73,47
            C 70,42 68,36 68,28
            C 68,20 68,11 67,6
            Z
          "
        />

        {/* Eye */}
        <ellipse cx="51" cy="19" rx="4" ry="3.5" fill="white" />

        {/* Nostril */}
        <circle cx="34" cy="35" r="2.5" fill="white" />

        {/* Inner ear shadow — subtle depth */}
        <path
          fill="rgba(0,0,0,0.25)"
          d="M 64,3 C 62,6 60,10 61,14 C 63,11 65,7 66,4 Z"
        />
      </g>
    </svg>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export function ChessKnight() {
  const [open, setOpen] = useState(false);

  return (
    // Bottom-right corner, desktop only (mobile nav is also bottom-right)
    <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className="block rounded-[18px] shadow-soft-md hover:shadow-soft-lg transition-shadow duration-200 cursor-pointer"
        aria-label="Let's play chess"
        title="Let's play chess"
      >
        <KnightIcon size={52} />
      </motion.button>

      {/* Popover — opens above the button */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 6 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{   opacity: 0, scale: 0.88, y: 6  }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-16 right-0 w-56 glass-card rounded-2xl p-4 shadow-soft-lg"
          >
            {/* Dismiss on outside click */}
            <div
              className="fixed inset-0 -z-10"
              onClick={() => setOpen(false)}
            />

            <p className="text-xs font-semibold text-ink-800 mb-1">
              ♟ Let&apos;s play chess!
            </p>
            <p className="text-[11px] text-ink-500 mb-3 leading-relaxed">
              I play on Chess.com. Challenge me to a game — knight&apos;s move always.
            </p>
            <a
              href="https://www.chess.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-purple-600 hover:text-purple-800 transition-colors"
            >
              Open Chess.com
              <ExternalLink size={10} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
