'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp, Sparkles, Database, GitMerge, Layers, Code2, LucideIcon
} from 'lucide-react';
import { suggestedPrompts } from '@/lib/data/suggestedPrompts';
import { cn } from '@/lib/utils/cn';

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Sparkles,
  Database,
  GitMerge,
  Layers,
  Code2,
};

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1"
    >
      {suggestedPrompts.map((prompt) => {
        const Icon = iconMap[prompt.icon] ?? Sparkles;

        return (
          <motion.button
            key={prompt.id}
            variants={cardVariants}
            whileHover={{ y: -2, boxShadow: '0 6px 18px rgba(26,25,25,0.08)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(prompt.prompt)}
            className={cn(
              'group flex items-start gap-3 text-left p-3.5 rounded-xl',
              'border border-ink-100 bg-white hover:border-purple-200',
              'transition-colors duration-200 cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300'
            )}
          >
            {/* Icon */}
            <span className="shrink-0 mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg bg-paper-200 group-hover:bg-purple-50 transition-colors duration-200">
              <Icon size={13} className="text-ink-400 group-hover:text-purple-500 transition-colors duration-200" />
            </span>

            {/* Label */}
            <span>
              <span className="block text-xs font-semibold text-ink-700 group-hover:text-ink-900 leading-snug mb-0.5 transition-colors duration-200">
                {prompt.label}
              </span>
              <span className="block text-[11px] text-ink-400 group-hover:text-ink-500 leading-relaxed transition-colors duration-200 line-clamp-2">
                {prompt.prompt}
              </span>
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
