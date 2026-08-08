'use client';

import { motion } from 'framer-motion';
import { SuggestedPrompts } from './SuggestedPrompts';

interface EmptyStateProps {
  onPromptSelect: (prompt: string) => void;
}

/**
 * Empty state for the chat panel.
 *
 * Design decisions:
 * - No automatic welcome message (per explicit requirement)
 * - Clear disclosure: "AI trained on Pranav's portfolio" — honest framing
 * - Suggested prompts ordered by audience relevance (business-first, then technical)
 * - Visual warmth before the grid to signal "this is intentional", not broken
 */
export function EmptyState({ onPromptSelect }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex h-full flex-col justify-center gap-5 px-1 py-2"
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-1 px-4">
        <span aria-hidden="true" className="font-accent text-3xl font-bold text-teal-600 -rotate-6">ask away</span>
        <p className="text-sm font-semibold text-ink-700 leading-relaxed max-w-[330px]">
          Pick a question below, or type your own.
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-2">
        <div className="flex-1 h-px bg-ink-100" />
        <span className="font-accent text-base font-bold text-ink-600 shrink-0 -rotate-2">
          Try one of these
        </span>
        <div className="flex-1 h-px bg-ink-100" />
      </div>

      {/* Suggested prompts */}
      <SuggestedPrompts onSelect={onPromptSelect} />
    </motion.div>
  );
}
