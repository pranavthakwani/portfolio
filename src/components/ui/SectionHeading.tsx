'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;           // Small label above the heading
  heading: React.ReactNode;   // Main heading (can include AccentMark components)
  subheading?: string;        // Optional descriptive paragraph
  align?: 'left' | 'center';
  className?: string;
  animationDelay?: number;
}

/**
 * Consistent section heading component used across all page sections.
 * Accepts AccentMark components inside `heading` for handwritten accents.
 *
 * Example:
 *   <SectionHeading
 *     eyebrow="My Work"
 *     heading={<>Projects that <UnderlineAccent>actually shipped</UnderlineAccent></>}
 *     subheading="Production systems, not side projects."
 *   />
 */
export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  className,
  animationDelay = 0,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: animationDelay }}
      className={cn(
        'flex flex-col',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-purple-700">
          {/* Bold coloured line — more visible than a hairline */}
          <span className="h-[3px] w-7 bg-amber-400 rounded-full" />
          {eyebrow}
          <span className="h-[3px] w-4 bg-teal-400 rounded-full opacity-60" />
        </span>
      )}

      <h2
        className={cn(
          'font-accent text-display-md font-bold text-ink-900 leading-[1.1] tracking-tight',
          align === 'center' ? 'max-w-2xl' : 'max-w-xl'
        )}
      >
        {heading}
      </h2>

      {subheading && (
        <p
          className={cn(
            'mt-4 text-base text-ink-700 leading-relaxed',
            align === 'center' ? 'max-w-xl' : 'max-w-lg'
          )}
        >
          {subheading}
        </p>
      )}
    </motion.div>
  );
}
