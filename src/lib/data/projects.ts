import type { Project } from '@/types';

/**
 * Portfolio projects — replace with your real work.
 * Structure your projects to lead with business outcome, not tech stack.
 * The AI assistant references this data when answering project questions.
 */
export const projects: Project[] = [
  {
    id: 'enterprise-rag',
    title: 'Enterprise RAG Knowledge Base',
    tagline: 'Multi-source retrieval system for a SaaS support team',
    description:
      'Designed and deployed a production RAG pipeline that indexes internal documentation, Confluence wikis, Slack threads, and Zendesk tickets. The system answers support queries using a hybrid BM25 + semantic search strategy with automatic re-ranking and hallucination guardrails.',
    outcome: '40% reduction in Tier-1 support tickets; average resolution time down from 18 min to 4 min.',
    architectureHighlight: 'Hybrid BM25 + dense retrieval · Cohere re-ranking · LangChain + FastAPI backend',
    tags: ['RAG', 'LangChain', 'FastAPI', 'Pinecone', 'Python', 'OpenAI'],
    category: 'RAG',
    featured: true,
    links: {
      caseStudy: '#',
    },
  },
  {
    id: 'agent-invoice-automation',
    title: 'AI Agent Invoice Processing Pipeline',
    tagline: 'Autonomous multi-agent system for finance automation',
    description:
      'Built a LangGraph-orchestrated multi-agent workflow that extracts structured data from unstructured invoices (PDF, scan, email), validates against ERP records, flags anomalies, and routes exceptions to a human-in-the-loop review queue. Agents include a document parser, a validation agent, an anomaly detector, and an audit logger.',
    outcome: 'Processes 2,000+ invoices/day with 98.7% accuracy. Reduced manual processing effort by 85%.',
    architectureHighlight: 'LangGraph state machine · tool-calling agents · human-in-the-loop checkpoints',
    tags: ['LangGraph', 'Multi-agent', 'FastAPI', 'Python', 'PostgreSQL', 'OCR'],
    category: 'Agent',
    featured: true,
    links: {
      caseStudy: '#',
    },
  },
  {
    id: 'mcp-crm-integration',
    title: 'LLM–CRM MCP Server',
    tagline: 'Model Context Protocol server bridging Claude and Salesforce',
    description:
      'Developed an MCP server that exposes Salesforce data, workflows, and SOQL queries as structured tools consumable by Claude. Sales reps can ask natural-language questions about their pipeline, trigger follow-up sequences, and get AI-generated deal summaries — all from within their existing chat interface.',
    outcome: 'Adopted by a 150-person sales team. Deal summary generation time: from 25 min manual to 45 sec AI.',
    architectureHighlight: 'MCP protocol · Salesforce REST API · Claude tool-use · OAuth 2.0',
    tags: ['MCP', 'Claude', 'Salesforce', 'TypeScript', 'Node.js', 'OAuth'],
    category: 'Integration',
    featured: true,
    links: {
      caseStudy: '#',
    },
  },
  {
    id: 'document-intelligence',
    title: 'Document Intelligence Platform',
    tagline: 'PDF extraction, classification and intelligent routing',
    description:
      'End-to-end pipeline that ingests documents from email, S3, and FTP; classifies document type and urgency; extracts structured data using a combination of layout-aware models and LLM prompting; and routes outputs to the correct downstream system with full audit trail.',
    outcome: 'Automated 92% of previously manual document handling for a legal services firm.',
    architectureHighlight: 'Layout-aware extraction · LLM classification · n8n orchestration · Redis queue',
    tags: ['Python', 'n8n', 'OpenAI', 'AWS S3', 'Redis', 'FastAPI'],
    category: 'Automation',
    featured: false,
    links: {
      caseStudy: '#',
    },
  },
  {
    id: 'this-portfolio',
    title: 'This Portfolio',
    tagline: 'Production-grade RAG portfolio — the proof is the product',
    description:
      'The website you\'re on right now. A Next.js application featuring a live RAG-powered AI assistant that answers questions about my work, architecture, and experience using a strictly grounded knowledge base. Built to demonstrate, not describe, my AI engineering capabilities.',
    outcome: 'You\'re using it right now. Ask the assistant anything.',
    architectureHighlight: 'Next.js App Router · Framer Motion · ChatService abstraction · streaming responses',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', 'RAG', 'Tailwind CSS'],
    category: 'Portfolio',
    featured: false,
    links: {
      github: 'https://github.com/pranav/portfolio', // ← replace
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
