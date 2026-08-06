'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils/cn';

// Each item gets its own vibrant highlighter colour — Odoo-style personality
const NAV_ITEMS = [
  { label: 'Home',       id: 'home',       hl: 'rgba(251,191,36,0.65)'  },  // amber
  { label: 'Chat',       id: 'chat',       hl: 'rgba(96,165,250,0.60)'  },  // blue
  { label: 'Projects',   id: 'projects',   hl: 'rgba(52,211,153,0.60)'  },  // green
  { label: 'Experience', id: 'experience', hl: 'rgba(251,191,36,0.65)'  },  // amber
  { label: 'Skills',     id: 'skills',     hl: 'rgba(249,115,22,0.55)'  },  // orange
  { label: 'About',      id: 'about',      hl: 'rgba(167,139,250,0.65)' },  // purple
  { label: 'Contact',    id: 'contact',    hl: 'rgba(52,211,153,0.60)'  },  // green
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── Desktop floating nav (left side, glass morphism) ──────────────── */
function DesktopNav({ activeId }: { activeId: string }) {
  return (
    <nav
      aria-label="Page sections"
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3.5 px-3 py-2"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;

        return (
          <motion.button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="relative group flex items-center gap-3 text-left py-0.5 cursor-pointer transition-all duration-300 ease-out"
            whileHover="hovered"
            animate={isActive ? 'active' : 'idle'}
          >
            {/* Indicator dot — uses each item's own colour */}
            <motion.span
              className="block shrink-0 rounded-full"
              style={{ background: item.hl.replace(/[\d.]+\)$/, '1)') }}
              variants={{
                idle:    { width: 4,  height: 4,  opacity: 0.25 },
                active:  { width: 7,  height: 7,  opacity: 1    },
                hovered: { width: 6,  height: 6,  opacity: 0.7  },
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Label — highlighter sweeps left→right on active */}
            <motion.span
              className="relative font-semibold leading-none tracking-[-0.01em] select-none px-1"
              variants={{
                idle:    { opacity: 0.7,  fontSize: '0.78rem',  x: 0, color: '#334155' },
                active:  { opacity: 1,    fontSize: '0.875rem', x: 2, color: '#0F172A' },
                hovered: { opacity: 1,    fontSize: '0.85rem',  x: 2, color: '#1E293B' },
              }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {/* Vibrant per-item highlighter */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0, opacity: 0 }}
                    style={{ originX: 0, background: item.hl }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="absolute inset-0 -mx-1 -my-0.5 rounded pointer-events-none"
                    aria-hidden
                  />
                )}
              </AnimatePresence>
              <span className="relative">{item.label}</span>
            </motion.span>
          </motion.button>
        );
      })}
    </nav>
  );
}

/* ── Mobile nav (bottom-right floating button + frosted glass panel) ── */
function MobileNav({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="fixed bottom-6 right-6 z-50 lg:hidden flex items-center justify-center w-12 h-12 rounded-full glass-card text-ink-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={18} />
            </motion.span>
          ) : (
            <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Menu size={18} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Overlay panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink-950/30 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              key="panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-64 glass-panel flex flex-col justify-center px-8 gap-1 lg:hidden"
              aria-label="Mobile navigation"
            >
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.12em] text-ink-300">
                Navigate
              </p>
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeId === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25, ease: 'easeOut' }}
                    onClick={() => { scrollTo(item.id); setOpen(false); }}
                    className={cn(
                      'text-left py-2.5 text-lg font-medium transition-colors duration-150',
                      isActive ? 'text-ink-900' : 'text-ink-400 hover:text-ink-700'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="ml-2 text-amber-500">·</span>
                    )}
                  </motion.button>
                );
              })}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function FloatingNav() {
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <>
      <DesktopNav activeId={activeId} />
      <MobileNav activeId={activeId} />
    </>
  );
}
