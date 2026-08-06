'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Search, CheckCircle, Bot } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { UnderlineAccent } from '@/components/ui/AccentMark';
import { ChatPanel } from '@/components/chat/ChatPanel';

const STEPS = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'You ask anything',
    description:
      "Type any question about my projects, experience, architecture decisions, or approach. No keyword tricks — ask the way you'd ask a person.",
    iconClass: 'text-purple-500',
    numClass:  'text-purple-300',
  },
  {
    icon: Search,
    number: '02',
    title: 'Semantic retrieval',
    description:
      'Your question is embedded and matched against my knowledge base — project case studies, architecture notes, experience records — using hybrid BM25 + dense vector search.',
    iconClass: 'text-teal-500',
    numClass:  'text-teal-300',
  },
  {
    icon: CheckCircle,
    number: '03',
    title: 'Grounded answer',
    description:
      "A response generated strictly from retrieved content. If the information isn't in my knowledge base, the assistant says so — no hallucination, no generic fill.",
    iconClass: 'text-orange-500',
    numClass:  'text-orange-300',
  },
] as const;

export function ChatSection() {
  return (
    <SectionWrapper id="chat" background="paper" withDivider>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* ── Left: "Under the hood" + vertical steps ─────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-purple-600">
            <span className="h-px w-5 bg-purple-400 rounded-full" />
            Under the hood
            <span className="h-px w-5 bg-purple-400 rounded-full" />
          </span>

          {/* Heading */}
          <h2 className="font-accent text-display-md font-bold text-ink-900 leading-tight mb-3">
            Not a scripted chatbot.{' '}
            <UnderlineAccent color="teal">A real RAG system.</UnderlineAccent>
          </h2>

          <p className="text-sm text-ink-500 leading-relaxed mb-10 max-w-md">
            The AI assistant on this page is the same architecture I ship for clients.
            Ask it anything — it answers from my actual knowledge base.
          </p>

          {/* Steps — stacked vertically */}
          <div className="flex flex-col gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  className="flex gap-5 items-start group"
                >
                  {/* Number + connector */}
                  <div className="flex flex-col items-center shrink-0">
                    <span className={`font-accent text-3xl font-bold leading-none ${step.numClass}`}>
                      {step.number}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className="w-px h-full min-h-[2.5rem] mt-2 bg-ink-100" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-2">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white shadow-soft shrink-0">
                        <Icon size={13} className={step.iconClass} />
                      </div>
                      <h3 className="text-sm font-semibold text-ink-900">{step.title}</h3>
                    </div>
                    <p className="text-xs text-ink-500 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Architecture note */}
          <p className="mt-8 text-[11px] text-ink-300 leading-relaxed">
            Mock responses shown here simulate RAG behaviour.{' '}
            <code className="bg-paper-200 px-1 py-0.5 rounded text-ink-500 font-mono">ChatService</code>{' '}
            in{' '}
            <code className="bg-paper-200 px-1 py-0.5 rounded text-ink-500 font-mono">/lib/chat/</code>{' '}
            makes swapping in a real backend a single import change.
          </p>
        </motion.div>

        {/* ── Right: Chat panel ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex flex-col gap-4 lg:sticky lg:top-24"
        >
          {/* Chat label */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <span className="text-xs font-semibold text-orange-600 tracking-wide">Live AI assistant</span>
          </div>

          <div className="h-[540px] lg:h-[600px]">
            <ChatPanel />
          </div>

          <p className="text-[11px] text-ink-300 flex items-center gap-1.5">
            <Bot size={11} />
            Answers grounded in Pranav&apos;s actual work, not generated content
          </p>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
