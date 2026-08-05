import type { ExperienceItem } from '@/types';

/**
 * Career history — replace with your real experience.
 * Write highlights as concrete outcomes, not job-description-style duties.
 */
export const experience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Senior AI Automation Engineer',
    company: '[Current Company]', // ← replace
    companyType: 'Enterprise AI consultancy',
    period: '2024 – Present',
    current: true,
    summary:
      'Lead engineer on all AI/LLM integration and automation workstreams. Own the end-to-end architecture of production RAG systems and multi-agent pipelines for enterprise clients across SaaS, finance, and legal sectors.',
    highlights: [
      'Architected and shipped 3 production RAG systems now serving 10k+ daily queries',
      'Built the LangGraph invoice automation pipeline — 85% manual effort reduction',
      'Introduced MCP-based tool integrations; reduced CRM time-to-insight from 25 min to 45 sec',
      'Established internal AI engineering standards and code review practices',
    ],
    tags: ['RAG', 'LangGraph', 'MCP', 'LLM', 'FastAPI', 'Python'],
  },
  {
    id: 'exp-2',
    role: 'LLM Integration Specialist',
    company: '[Previous Company]', // ← replace
    companyType: 'Series B SaaS startup',
    period: '2022 – 2024',
    current: false,
    summary:
      'Built the company\'s first AI layer on top of an existing SaaS product — including a customer-facing chatbot, internal knowledge base, and automated customer onboarding pipeline.',
    highlights: [
      'Reduced onboarding time from 5 days to same-day with an AI-guided setup workflow',
      'Deployed a support RAG system handling 60% of Tier-1 tickets without human intervention',
      'Integrated OpenAI function-calling with our REST API; shipped to production in 6 weeks',
      'Grew from 0 to 3 AI engineers by scoping and hiring the initial team',
    ],
    tags: ['OpenAI', 'LangChain', 'Node.js', 'TypeScript', 'PostgreSQL', 'n8n'],
  },
  {
    id: 'exp-3',
    role: 'Backend Engineer',
    company: '[Earlier Company]', // ← replace
    companyType: 'Product startup',
    period: '2020 – 2022',
    current: false,
    summary:
      'Backend engineer on a data-heavy consumer product. Responsible for API design, performance optimisation, and early exploration of ML features.',
    highlights: [
      'Reduced core API p99 latency by 60% through query optimisation and caching strategy',
      'Built the first recommendation engine using collaborative filtering (scikit-learn)',
      'Migrated monolith to service-oriented architecture; zero-downtime cutover',
    ],
    tags: ['Python', 'FastAPI', 'Redis', 'PostgreSQL', 'Docker', 'scikit-learn'],
  },
];
