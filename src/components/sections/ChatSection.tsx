'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Search, CheckCircle } from 'lucide-react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { UnderlineAccent } from '@/components/ui/AccentMark';
import { ChatPanel } from '@/components/chat/ChatPanel';

const STEPS = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Intent-aware routing',
    description:
      'GPT-4.1 nano reads your question with recent conversation context, resolves typos and follow-ups, then returns a structured intent and search query.',
    iconClass: 'text-purple-500',
    numClass: 'text-purple-300',
  },
  {
    icon: Search,
    number: '02',
    title: 'Filtered retrieval',
    description:
      'The query is embedded with text-embedding-3-small and searched in Qdrant. Category filters, document priority, recency, and similarity reranking select resume-backed evidence.',
    iconClass: 'text-teal-500',
    numClass: 'text-teal-300',
  },
  {
    icon: CheckCircle,
    number: '03',
    title: 'Grounded response',
    description:
      'GPT-4o mini streams an answer from the selected context and adds source citations. If the portfolio has no supporting information, it says so instead of guessing.',
    iconClass: 'text-orange-500',
    numClass: 'text-orange-300',
  },
] as const;

export function ChatSection() {
  return (
    <SectionWrapper id="chat" background="paper" withDivider>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-purple-600">
            <span className="h-px w-5 rounded-full bg-purple-400" />
            How this assistant works
            <span className="h-px w-5 rounded-full bg-purple-400" />
          </span>

          <h2 className="mb-10 font-accent text-display-md font-bold leading-tight text-ink-900">
            Built for <UnderlineAccent color="teal">accurate answers.</UnderlineAccent>
          </h2>

          <div className="flex flex-col gap-8">
            {STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                  className="group flex items-start gap-5"
                >
                  <div className="flex shrink-0 flex-col items-center">
                    <span className={`font-accent text-3xl font-bold leading-none ${step.numClass}`}>
                      {step.number}
                    </span>
                    {index < STEPS.length - 1 && (
                      <div className="mt-2 min-h-[2.5rem] h-full w-px bg-ink-100" />
                    )}
                  </div>

                  <div className="pb-2">
                    <div className="mb-1.5 flex items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-soft">
                        <Icon size={13} className={step.iconClass} />
                      </div>
                      <h3 className="text-sm font-semibold text-ink-900">{step.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-ink-500">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex flex-col lg:sticky lg:top-20"
        >
          <div className="h-[650px] lg:h-[680px]">
            <ChatPanel />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
