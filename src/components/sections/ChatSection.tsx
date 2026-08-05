'use client';

import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { ChatPanel } from '@/components/chat/ChatPanel';

/**
 * ChatSection — the second "screen" after the hero.
 * Houses the live AI assistant in a properly framed, full-section context.
 * Positioned between Hero and HowItWorks in the trust ladder.
 */
export function ChatSection() {
  return (
    <SectionWrapper id="chat" background="paper" withDivider>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-10"
      >
        {/* Eyebrow */}
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-purple-500">
          <span className="h-px w-5 bg-purple-400 rounded-full" />
          AI Assistant
          <span className="h-px w-5 bg-purple-400 rounded-full" />
        </span>

        <h2 className="text-display-md font-bold text-ink-900 tracking-tight leading-[1.15] mb-4">
          Ask me <span className="text-amber-500">anything</span> about my work
        </h2>

        <p className="text-base text-ink-500 max-w-xl mx-auto leading-relaxed">
          I&apos;m trained on Pranav&apos;s real projects, experience, and technical decisions.
          Not a generic chatbot — every answer comes from his actual knowledge base.
        </p>

        {/* Capability pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {['Projects & outcomes', 'Architecture decisions', 'Availability & rates', 'Tech stack', 'How this AI works'].map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-500 bg-white border border-ink-100 px-3 py-1.5 rounded-full shadow-soft"
            >
              <Sparkles size={9} className="text-purple-400" />
              {topic}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Chat panel */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="max-w-3xl mx-auto h-[580px] lg:h-[640px]"
      >
        <ChatPanel />
      </motion.div>

      {/* Footnote */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center text-[11px] text-ink-300 mt-5 flex items-center justify-center gap-1.5"
      >
        <Bot size={11} />
        AI assistant — answers grounded in Pranav&apos;s actual work, not generated content
      </motion.p>

    </SectionWrapper>
  );
}
