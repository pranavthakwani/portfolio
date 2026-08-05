import type { ExperienceItem } from '@/types';

export const experience: ExperienceItem[] = [
  {
    id: 'exp-techgrind',
    role: 'Junior Software Developer — AI & Automation',
    company: 'Tech Grind Pvt. Ltd.',
    companyType: 'AI & software product company · Ahmedabad, On-site',
    period: 'Jul 2025 – Present',
    current: true,
    summary:
      'Own the full AI and automation workstream — from event-driven lead intake across WhatsApp and CRM to self-hosted RAG pipelines serving multilingual customers. Every system I ship here has a measurable time-saved or effort-reduced outcome.',
    highlights: [
      'Replaced manual lead sorting with an event-driven WhatsApp-to-CRM workflow using LLM intent classification',
      'Automated MIS reporting with validation and exception handling — saving 150–200 hours per month',
      'Built a multi-agent WhatsApp platform with role-based conversation routing for support and sales',
      'Deployed a self-hosted RAG pipeline (Qwen2.5 via Ollama) keeping multilingual response times under 5 seconds',
      'Led a product-research automation effort that cut manual research effort by ~85%',
    ],
    tags: ['n8n', 'LangChain', 'FAISS', 'Ollama', 'Node.js', 'FastAPI', 'RAG', 'WhatsApp API'],
  },
  {
    id: 'exp-redsand',
    role: 'Full-Stack SDE Intern',
    company: 'RedSand Technology',
    companyType: 'Tech company · Dubai, UAE — Remote',
    period: 'Feb 2025 – May 2025',
    current: false,
    summary:
      'Delivered frontend features for salary analysis and property inspection dashboards, shipped a WhatsApp chatbot that automated 80% of customer support queries, and built a LinkedIn data enrichment pipeline for the sales team.',
    highlights: [
      'Owned frontend delivery for salary analysis and property inspection dashboards with role-based access control',
      'Automated ~80% of customer queries by building a WhatsApp chatbot integrated into existing support workflows',
      'Built a data enrichment pipeline that turned raw LinkedIn data into structured company and contact insights',
    ],
    tags: ['React', 'Node.js', 'WhatsApp API', 'Data Enrichment', 'Dashboard'],
  },
  {
    id: 'exp-baskethunt',
    role: 'Web Developer Intern',
    company: 'BasketHunt Pvt. Ltd.',
    companyType: 'E-commerce startup · Gurugram — Remote',
    period: 'Jul 2023 – Sep 2023',
    current: false,
    summary:
      'Improved operational efficiency by integrating Zoho and Odoo, and managed user provisioning through Google Admin.',
    highlights: [
      'Improved operational efficiency by 15% by integrating Zoho and Odoo',
      'Managed user provisioning and access control through Google Admin',
    ],
    tags: ['Zoho', 'Odoo', 'Google Admin', 'Integration', 'Web Development'],
  },
];
