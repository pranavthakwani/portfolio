'use client';

import { useState, useEffect } from 'react';

/**
 * Scroll-based active section detection.
 * Returns the id of whichever section is currently nearest the top
 * of the viewport (with a 120px offset to trigger slightly early).
 *
 * More reliable than IntersectionObserver for variable-height sections
 * because it tracks the last section whose top has been scrolled past.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const OFFSET = 120; // px — trigger before the section top hits the viewport top

    const handleScroll = () => {
      const scrollY = window.scrollY;

      const offsets = sectionIds.map((id) => ({
        id,
        top: document.getElementById(id)?.getBoundingClientRect().top ?? Infinity,
      }));

      // The active section is the last one whose top is at or above the offset
      const passing = offsets.filter(({ top }) => top <= OFFSET);
      const active = passing.at(-1);

      if (active) setActiveId(active.id);
    };

    // Set initial active section
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeId;
}
