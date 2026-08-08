import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'ai-lead-qualification',
    title: 'AI Lead Qualification & Sales Automation',
    tagline: 'Event-driven WhatsApp-to-CRM pipeline with LLM intent classification',
    description:
      'An end-to-end lead intake system triggered by WhatsApp webhooks. It classifies intent, extracts structured entities, validates each lead, and syncs qualified records to the CRM without manual sorting.',
    details: [
      'Receives multilingual lead messages through WhatsApp webhooks',
      'Classifies intent and extracts names, products, locations, and buying signals',
      'Validates required fields before sending qualified leads to the CRM',
      'Routes incomplete or ambiguous messages into an exception path',
    ],
    decisions: [
      'Used event-driven webhooks instead of scheduled polling',
      'Required structured LLM output before allowing CRM writes',
      'Separated classification, validation, and sync into recoverable workflow stages',
    ],
    learningOutcomes: [
      'Designing reliable LLM output contracts',
      'Handling retries and invalid webhook payloads',
      'Keeping automation observable across external services',
    ],
    outcome: 'Replaced manual lead sorting so the sales team can focus on qualified conversations and closing.',
    architectureHighlight: 'n8n · WhatsApp Webhooks · LLM intent classification · REST CRM sync',
    tags: ['n8n', 'JavaScript', 'WhatsApp API', 'LLM', 'CRM', 'Webhooks'],
    category: 'Automation',
    featured: true,
    links: {},
  },
  {
    id: 'business-ops-automation',
    title: 'Business Operations Automation Platform',
    tagline: 'MIS reporting automation saving 150–200 hours per month',
    description:
      'A scheduled operations platform that validates, transforms, and synchronises MIS datasets between spreadsheets and reporting systems.',
    details: [
      'Collects scheduled MIS files from source systems',
      'Checks required fields, formats, duplicate records, and business rules',
      'Transforms accepted records into the reporting schema',
      'Separates failed rows for review without blocking the complete batch',
    ],
    decisions: [
      'Kept validation rules outside the upload step for easier maintenance',
      'Designed exception handling at row and batch level',
      'Used idempotent sync logic to prevent duplicate reporting records',
    ],
    learningOutcomes: [
      'Designing resilient scheduled workflows',
      'Building validation pipelines for messy operational data',
      'Making failures visible without stopping valid work',
    ],
    outcome: 'Saved 150–200 hours per month previously spent on manual entry, cleanup, and report preparation.',
    architectureHighlight: 'n8n · Cron Jobs · REST APIs · validation pipelines',
    tags: ['n8n', 'Cron Jobs', 'REST APIs', 'Data Automation', 'MIS'],
    category: 'Automation',
    featured: true,
    links: {},
  },
  {
    id: 'enterprise-rag-assistant',
    title: 'Enterprise AI Knowledge Assistant',
    tagline: 'Self-hosted multilingual RAG pipeline — responses under 5 seconds',
    description:
      'A private retrieval service that indexes internal documents and streams grounded multilingual answers from a self-hosted language model.',
    details: [
      'Chunks and indexes internal documents in FAISS',
      'Retrieves relevant passages before every generated answer',
      'Streams multilingual responses with source context',
      'Runs the language model locally through Ollama',
    ],
    decisions: [
      'Selected self-hosting to keep sensitive documents inside the network',
      'Used FAISS for a lightweight local vector index',
      'Separated retrieval, prompting, and streaming behind a FastAPI service',
    ],
    learningOutcomes: [
      'Balancing chunk size, retrieval depth, and latency',
      'Serving local models reliably with constrained hardware',
      'Grounding multilingual answers without external model APIs',
    ],
    outcome: 'Delivered multilingual internal Q&A in under five seconds with no external model API dependency.',
    architectureHighlight: 'Python · LangChain · FAISS · Qwen2.5 (Ollama) · FastAPI · streaming',
    tags: ['Python', 'LangChain', 'FAISS', 'RAG', 'Ollama', 'FastAPI', 'Self-hosted'],
    category: 'RAG',
    featured: true,
    links: {},
  },
  {
    id: 'whatsapp-business-platform',
    title: 'WhatsApp Business Operations Platform',
    tagline: 'Multi-agent platform with role-based routing and real-time dashboards',
    description:
      'A shared operations workspace that routes WhatsApp conversations between AI agents, support, and sales while preserving conversation state.',
    details: [
      'Routes incoming conversations by role, intent, and escalation state',
      'Maintains context across AI and human handoffs',
      'Provides shared dashboards for support and sales teams',
      'Escalates complex conversations without losing message history',
    ],
    decisions: [
      'Used explicit routing rules around agent decisions',
      'Stored conversation state independently from the dashboard',
      'Designed human takeover as a first-class workflow',
    ],
    learningOutcomes: [
      'Coordinating state across multiple agents',
      'Designing safe human-in-the-loop handoffs',
      'Keeping real-time interfaces aligned with backend events',
    ],
    outcome: 'Automated roughly 80% of common customer queries while giving support and sales one shared view.',
    architectureHighlight: 'Node.js · React · multi-agent routing · persistent state · real-time dashboards',
    tags: ['Node.js', 'React', 'Multi-agent', 'WhatsApp', 'Real-time'],
    category: 'Agent',
    featured: true,
    links: {},
  },
  {
    id: 'product-intelligence-platform',
    title: 'AI Product Intelligence Platform',
    tagline: 'Distributed crawling pipeline — 85% research effort eliminated',
    description:
      'A distributed collection pipeline that crawls product sources, normalises inconsistent data, and prepares structured competitive research.',
    details: [
      'Distributes crawling jobs across Playwright workers',
      'Normalises product records from inconsistent source pages',
      'Caches repeated requests and resumes interrupted jobs',
      'Outputs structured data ready for comparison and scoring',
    ],
    decisions: [
      'Used a Bull queue to control concurrency and retries',
      'Added Redis caching to reduce duplicate collection work',
      'Separated crawling from normalisation and scoring',
    ],
    learningOutcomes: [
      'Operating distributed browser workers',
      'Managing retries, rate limits, and partial failures',
      'Turning inconsistent web data into comparable records',
    ],
    outcome: 'Reduced manual competitive-research effort by about 85%, leaving the team to focus on analysis.',
    architectureHighlight: 'Playwright · Node.js · Bull Queue · Redis · distributed workers',
    tags: ['Playwright', 'Node.js', 'Bull Queue', 'Redis', 'Web Scraping'],
    category: 'Automation',
    featured: false,
    links: {},
  },
];

export const featuredProjects = projects.filter((project) => project.featured);