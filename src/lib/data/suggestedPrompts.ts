import type { SuggestedPrompt } from '@/types';

/**
 * Suggested prompts displayed in the chat empty state.
 *
 * Ordering rationale:
 * 1. Lead with a business-outcome framed question — relevant to recruiters AND clients.
 * 2. Then the most tangible proof (show a real project).
 * 3. Architecture interest (technical evaluators).
 * 4. Agent-specific (differentiating expertise).
 * 5. Stack overview (quick reference).
 * 6. Meta — the portfolio itself as a proof-of-work.
 */
export const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: 'business-impact',
    label: 'Business problems solved',
    prompt: 'What business problems have you solved with AI, and what were the measurable results?',
    icon: 'TrendingUp',
  },
  {
    id: 'best-project',
    label: 'Best AI project',
    prompt: 'Tell me about your most impactful AI project in detail.',
    icon: 'Sparkles',
  },
  {
    id: 'rag-explained',
    label: 'How your RAG works',
    prompt: 'Walk me through how you architect and build RAG systems.',
    icon: 'Database',
  },
  {
    id: 'agent-architecture',
    label: 'AI agent architecture',
    prompt: 'How do you design and orchestrate multi-agent AI systems?',
    icon: 'GitMerge',
  },
  {
    id: 'tech-stack',
    label: 'Your tech stack',
    prompt: 'What technologies do you specialise in and why do you choose them?',
    icon: 'Layers',
  },
  {
    id: 'this-portfolio',
    label: 'How this site was built',
    prompt: 'How does the AI assistant on this portfolio actually work?',
    icon: 'Code2',
  },
];
