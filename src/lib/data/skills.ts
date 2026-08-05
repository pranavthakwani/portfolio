import type { SkillCategory } from '@/types';

/**
 * Skills — organised by category so the UI can render grouped tag sets.
 * The 'note' field on individual skills is optional — use it to show
 * judgment ("why this tool") rather than just listing names.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-core',
    name: 'AI & LLM Systems',
    description: 'The core of my work — building on top of language models at the systems level.',
    skills: [
      { name: 'RAG Architecture',      level: 'expert',     note: 'Hybrid retrieval, re-ranking, hallucination guardrails' },
      { name: 'LangChain',             level: 'expert' },
      { name: 'LangGraph',             level: 'expert',     note: 'Preferred for stateful multi-agent orchestration' },
      { name: 'OpenAI API',            level: 'expert' },
      { name: 'Anthropic Claude API',  level: 'expert' },
      { name: 'Prompt Engineering',    level: 'expert' },
      { name: 'LLM Fine-tuning',       level: 'proficient', note: 'LoRA / QLoRA on Llama and Mistral variants' },
      { name: 'Embeddings & Semantic Search', level: 'expert' },
      { name: 'Model Context Protocol (MCP)', level: 'expert', note: 'Server + client authoring' },
    ],
  },
  {
    id: 'automation',
    name: 'Workflow Automation',
    description: 'Connecting systems, removing manual steps, and building durable pipelines.',
    skills: [
      { name: 'n8n',        level: 'expert',     note: 'Go-to for complex workflow orchestration' },
      { name: 'Make',       level: 'proficient' },
      { name: 'Zapier',     level: 'proficient' },
      { name: 'Airflow',    level: 'familiar' },
      { name: 'Celery',     level: 'proficient' },
      { name: 'Redis Queues', level: 'proficient' },
    ],
  },
  {
    id: 'vector-data',
    name: 'Vector Databases & Data',
    description: 'The storage and retrieval layer under every RAG system I build.',
    skills: [
      { name: 'Pinecone',  level: 'expert' },
      { name: 'Qdrant',    level: 'expert',     note: 'Preferred for self-hosted production workloads' },
      { name: 'Weaviate',  level: 'proficient' },
      { name: 'pgvector',  level: 'proficient' },
      { name: 'PostgreSQL', level: 'expert' },
      { name: 'Redis',     level: 'expert' },
      { name: 'MongoDB',   level: 'proficient' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Engineering',
    description: 'The plumbing that makes AI systems production-ready.',
    skills: [
      { name: 'Python',    level: 'expert' },
      { name: 'FastAPI',   level: 'expert' },
      { name: 'TypeScript', level: 'expert' },
      { name: 'Node.js',   level: 'expert' },
      { name: 'REST API Design', level: 'expert' },
      { name: 'WebSockets / SSE', level: 'proficient', note: 'Streaming LLM responses to the client' },
    ],
  },
  {
    id: 'infra',
    name: 'Infrastructure & DevOps',
    description: 'Deployment and observability for AI services.',
    skills: [
      { name: 'Docker',      level: 'expert' },
      { name: 'AWS (EC2, S3, Lambda)', level: 'proficient' },
      { name: 'GitHub Actions', level: 'proficient' },
      { name: 'Nginx',       level: 'proficient' },
      { name: 'Prometheus + Grafana', level: 'familiar', note: 'LLM observability dashboards' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Enough to ship polished, interactive products end-to-end.',
    skills: [
      { name: 'Next.js',        level: 'proficient' },
      { name: 'React',          level: 'proficient' },
      { name: 'Tailwind CSS',   level: 'proficient' },
      { name: 'Framer Motion',  level: 'proficient' },
    ],
  },
];
