import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'ai-lead-qualification',
    title: 'AI Lead Qualification & Sales Automation',
    tagline: 'Event-driven WhatsApp-to-CRM pipeline with LLM intent classification',
    description:
      'Implemented an end-to-end lead intake system triggered by WhatsApp webhooks. Incoming messages are classified for intent using an LLM, key entities are extracted via structured prompting, and qualified leads are synced to the CRM through REST API calls — all without manual sorting.',
    outcome: 'Replaced 100% of manual lead sorting. Sales team focuses on closing, not triaging.',
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
      'Built a scheduled automation platform using Cron jobs and REST APIs to validate, transform, and sync MIS datasets between source spreadsheets and reporting systems. Includes exception handling and validation rules that catch data quality issues before they reach reports.',
    outcome: 'Saved 150–200 hours per month of manual data entry and report preparation.',
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
      'Built a FastAPI retrieval service on LangChain and FAISS implementing document chunking, vector indexing, and a self-hosted retrieval pipeline using Qwen2.5 via Ollama. The system streams multilingual responses with source attribution, cutting reliance on external APIs entirely.',
    outcome: 'Multilingual internal Q&A under 5 seconds. Zero external API dependency in production.',
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
      'Architected a multi-agent WhatsApp operations platform with persistent conversation state, role-based routing between support and sales agents, and real-time dashboards for team visibility. Automated 80% of customer queries, leaving only complex cases for humans.',
    outcome: '80% of customer queries handled automatically. Support and sales share a single view.',
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
      'Developed a distributed crawling pipeline using Playwright, a Bull job queue, and Redis to parallelise data collection and normalise product data across worker pools. The system automated the entire product research workflow, freeing the team to focus on analysis rather than collection.',
    outcome: '~85% reduction in manual research effort across the product team.',
    architectureHighlight: 'Playwright · Node.js · Bull Queue · Redis · distributed workers',
    tags: ['Playwright', 'Node.js', 'Bull Queue', 'Redis', 'Web Scraping'],
    category: 'Automation',
    featured: false,
    links: {},
  },
  {
    id: 'this-portfolio',
    title: 'This Portfolio',
    tagline: 'Live AI assistant as proof of work — not a description of it',
    description:
      "The website you're on right now. A Next.js application with a streaming AI assistant built on a ChatService abstraction layer that can swap mock responses for a real RAG backend with a single import change. The site itself is the demonstration.",
    outcome: "You're using it right now. Ask the assistant anything about my work.",
    architectureHighlight: 'Next.js 14 App Router · Framer Motion · ChatService abstraction · streaming',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', 'RAG', 'Tailwind CSS'],
    category: 'Portfolio',
    featured: false,
    links: {
      github: 'https://github.com/pranavthakwani/portfolio',
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
