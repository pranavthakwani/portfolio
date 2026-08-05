'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
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
      className="flex flex-col gap-6 px-2 py-4"
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 px-4 pt-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-100 to-teal-100 shadow-soft">
          <Sparkles size={18} className="text-purple-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-900 mb-1">
            Pranav&apos;s AI Assistant
          </h3>
          <p className="text-[11px] text-ink-400 leading-relaxed max-w-[240px]">
            I&apos;m an AI trained on Pranav&apos;s projects, experience, and writing.
            Ask me anything — I&apos;ll answer from his actual work, not generic responses.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-2">
        <div className="flex-1 h-px bg-ink-100" />
        <span className="text-[10px] font-medium text-ink-300 uppercase tracking-wider shrink-0">
          Start with a question
        </span>
        <div className="flex-1 h-px bg-ink-100" />
      </div>

      {/* Suggested prompts */}
      <SuggestedPrompts onSelect={onPromptSelect} />
    </motion.div>
  );
}
