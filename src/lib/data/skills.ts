import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-llm',
    name: 'AI & LLM',
    description: 'Building on top of language models at the systems level — RAG, agents, and production LLM pipelines.',
    skills: [
      { name: 'LangChain',              level: 'expert',     note: 'Primary orchestration framework for RAG and agent pipelines' },
      { name: 'RAG Architecture',       level: 'expert',     note: 'Vector indexing, chunking, hybrid retrieval, hallucination guardrails' },
      { name: 'FAISS',                  level: 'expert',     note: 'Go-to for self-hosted vector search' },
      { name: 'Ollama',                 level: 'expert',     note: 'Self-hosted LLM serving — Qwen2.5, Llama, Mistral' },
      { name: 'Prompt Engineering',     level: 'expert',     note: 'Intent classification, structured extraction, grounding' },
      { name: 'Function / Tool Calling',level: 'expert' },
      { name: 'Conversation Memory',    level: 'expert',     note: 'Persistent state across multi-turn agent conversations' },
      { name: 'LLMOps',                 level: 'proficient', note: 'Evaluation, observability, model versioning' },
    ],
  },
  {
    id: 'automation',
    name: 'Workflow Automation',
    description: 'Replacing manual steps with durable, event-driven pipelines.',
    skills: [
      { name: 'n8n',         level: 'expert',     note: 'Primary tool for complex multi-system workflow orchestration' },
      { name: 'Cron Jobs',   level: 'expert',     note: 'Scheduled pipelines for MIS reporting and batch processing' },
      { name: 'Webhooks',    level: 'expert',     note: 'WhatsApp, CRM, and third-party event triggers' },
      { name: 'Redis',       level: 'proficient', note: 'Job queues, caching, and session state' },
      { name: 'Bull Queue',  level: 'proficient', note: 'Node.js job queue for distributed worker pools' },
      { name: 'Playwright',  level: 'proficient', note: 'Headless browser automation for crawling pipelines' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Engineering',
    description: 'The API layer that makes AI systems production-ready.',
    skills: [
      { name: 'Node.js',    level: 'expert' },
      { name: 'FastAPI',    level: 'expert',     note: 'Primary Python API server for AI/retrieval services' },
      { name: 'Python',     level: 'expert' },
      { name: 'Flask',      level: 'proficient' },
      { name: 'Express.js', level: 'proficient' },
      { name: 'REST APIs',  level: 'expert',     note: 'Design, auth (JWT), versioning, and integration' },
      { name: 'JWT Auth',   level: 'proficient' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Enough to ship polished, interactive products end-to-end.',
    skills: [
      { name: 'React.js',      level: 'proficient' },
      { name: 'Next.js',       level: 'proficient', note: 'App Router, Server Components, streaming' },
      { name: 'Tailwind CSS',  level: 'expert' },
      { name: 'Framer Motion', level: 'proficient' },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Infrastructure',
    description: 'Deployment, containerisation, and keeping things running.',
    skills: [
      { name: 'Docker',       level: 'expert',     note: 'Compose for local dev; containers for production AI services' },
      { name: 'Git',          level: 'expert' },
      { name: 'GitHub Actions', level: 'proficient' },
      { name: 'Linux / SSH',  level: 'proficient' },
    ],
  },
];
