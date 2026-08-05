'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/utils/cn';

const NAV_ITEMS = [
  { label: 'Home',       id: 'home' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills',     id: 'skills' },
  { label: 'About',      id: 'about' },
  { label: 'Contact',    id: 'contact' },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ── Desktop floating nav (left side) ──────────────────────────────── */
function DesktopNav({ activeId }: { activeId: string }) {
  return (
    <nav
      aria-label="Page sections"
      className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-1"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;

        return (
          <motion.button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={cn(
              'relative group flex items-center gap-3 text-left py-1 cursor-pointer',
              'transition-all duration-300 ease-out'
            )}
            whileHover="hovered"
            animate={isActive ? 'active' : 'idle'}
          >
            {/* Indicator dot */}
            <motion.span
              className="block shrink-0 rounded-full bg-purple-500"
              variants={{
                idle:    { width: 4, height: 4, opacity: 0.3 },
                active:  { width: 6, height: 6, opacity: 1 },
                hovered: { width: 6, height: 6, opacity: 0.7 },
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Label */}
            <motion.span
              className="font-medium text-ink-400 leading-none tracking-[-0.01em] select-none"
              variants={{
                idle:    { opacity: 0.45, fontSize: '0.8125rem', x: 0, color: '#7E7E90' },
                active:  { opacity: 1,    fontSize: '0.875rem',  x: 2,  color: '#1A1919' },
                hovered: { opacity: 0.85, fontSize: '0.875rem',  x: 2,  color: '#1A1919' },
              }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {item.label}
            </motion.span>

            {/* Active underline (hand-drawn feel via SVG) */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  style={{ originX: 0 }}
                  className="absolute bottom-0 left-7 right-0 pointer-events-none"
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <svg viewBox="0 0 80 4" className="w-full" preserveAspectRatio="none" fill="none">
                    <path
                      d="M1,2.5 C15,1 35,3.5 55,2 C65,1.5 72,3 79,2.5"
                      stroke="#E07B39"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </nav>
  );
}

/* ── Mobile nav (bottom-right floating button + overlay) ───────────── */
function MobileNav({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="fixed bottom-6 right-6 z-50 lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-soft-lg border border-ink-100 text-ink-700"
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
              className="fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              key="panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-64 bg-white shadow-soft-xl flex flex-col justify-center px-8 gap-1 lg:hidden"
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

/* ── Combined nav export ────────────────────────────────────────────── */
export function FloatingNav() {
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <>
      <DesktopNav activeId={activeId} />
      <MobileNav activeId={activeId} />
    </>
  );
}
