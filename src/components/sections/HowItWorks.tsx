'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Search, CheckCircle, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { UnderlineAccent } from '@/components/ui/AccentMark';

const STEPS = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'You ask anything',
    description:
      'Type any question about my projects, experience, architecture decisions, or approach. No keyword tricks needed — ask the way you\'d ask a person.',
    color: 'purple',
  },
  {
    icon: Search,
    number: '02',
    title: 'Semantic retrieval',
    description:
      'Your question is embedded and matched against my knowledge base — project case studies, architecture notes, experience records, and writing — using hybrid BM25 + dense vector search.',
    color: 'teal',
  },
  {
    icon: CheckCircle,
    number: '03',
    title: 'Grounded answer',
    description:
      'A response generated strictly from retrieved content. If the information isn\'t in my knowledge base, the assistant says so — no hallucination, no generic fill.',
    color: 'amber',
  },
] as const;

const colorMap = {
  purple: { bg: 'bg-purple-50', icon: 'text-purple-500', border: 'border-purple-100', num: 'text-purple-300' },
  teal:   { bg: 'bg-teal-50',   icon: 'text-teal-500',   border: 'border-teal-100',   num: 'text-teal-300' },
  amber:  { bg: 'bg-amber-50',  icon: 'text-amber-500',  border: 'border-amber-100',  num: 'text-amber-300' },
};

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 bg-white section-divider">
      <Container>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-purple-500">
            <span className="h-px w-5 bg-purple-400 rounded-full" />
            Under the hood
            <span className="h-px w-5 bg-purple-400 rounded-full" />
          </span>
          <h2 className="text-display-md font-bold text-ink-900 leading-tight tracking-tight">
            Not a scripted chatbot.{' '}
            <UnderlineAccent color="teal">A real RAG system.</UnderlineAccent>
          </h2>
          <p className="mt-4 text-base text-ink-500 max-w-lg mx-auto leading-relaxed">
            The AI assistant running on this page is the same architecture I ship for clients.
            Here&apos;s how it works.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const colors = colorMap[step.color];

            return (
              <motion.div key={step.number} variants={stepVariants} className="relative">
                {/* Connector arrow — only between cards */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 lg:-right-5 top-8 z-10 items-center justify-center w-8 h-8">
                    <ArrowRight size={14} className="text-ink-200" />
                  </div>
                )}

                <div
                  className={`h-full flex flex-col p-6 rounded-2xl border ${colors.border} ${colors.bg}`}
                >
                  {/* Step number */}
                  <span className={`font-accent text-4xl font-bold ${colors.num} mb-4 leading-none`}>
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white shadow-soft mb-4`}>
                    <Icon size={16} className={colors.icon} />
                  </div>

                  {/* Content */}
                  <h3 className="text-sm font-semibold text-ink-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-ink-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Architecture note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-ink-400 leading-relaxed max-w-md mx-auto">
            The chat service is built as an abstraction layer — the mock responses shown here
            simulate RAG behaviour. The{' '}
            <code className="bg-paper-200 px-1 py-0.5 rounded text-ink-600 text-[10px] font-mono">
              ChatService
            </code>{' '}
            interface in{' '}
            <code className="bg-paper-200 px-1 py-0.5 rounded text-ink-600 text-[10px] font-mono">
              /lib/chat/
            </code>{' '}
            makes swapping in a real backend a single import change.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
