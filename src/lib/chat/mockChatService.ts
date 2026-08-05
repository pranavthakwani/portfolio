'use client';

import type { IChatService, ChatMessage, ChatServiceOptions } from '@/types';

/* ─── Mock RAG Responses ──────────────────────────────────────────────
   Grounded in Pranav Thakwani's real resume, projects, and experience.

   To connect real backend:
     1. Create src/lib/chat/apiChatService.ts
     2. Implement IChatService calling your /api/chat SSE route
     3. Replace the import in useChat.ts (single line change)
   ──────────────────────────────────────────────────────────────────── */

interface MockResponse {
  patterns: RegExp[];
  response: string;
}

const KNOWLEDGE_BASE: MockResponse[] = [
  // ── Who / Intro ────────────────────────────────────────────────────
  {
    patterns: [/who are you/i, /introduce yourself/i, /about you/i, /tell me about pranav/i, /who is pranav/i],
    response: `Hi! I'm the AI assistant built on Pranav Thakwani's portfolio.

**Pranav** is an AI Automation Engineer based in Ahmedabad, India. He currently works as a Junior Software Developer (AI & Automation) at Tech Grind Pvt. Ltd., where he owns the full AI/automation workstream.

His focus areas:
- **Workflow Automation** — n8n pipelines, WhatsApp integrations, event-driven systems
- **RAG & LLM** — self-hosted retrieval pipelines (FAISS + LangChain + Ollama)
- **Multi-agent systems** — role-based conversation routing, persistent state
- **Business automation** — replacing manual processes with measurable outcomes

He's currently open to both **full-time roles** and **freelance/consulting projects**. The AI assistant you're using right now is built on the same stack he uses daily.

What would you like to know?`,
  },

  // ── Business Impact ─────────────────────────────────────────────────
  {
    patterns: [/business problem/i, /business impact/i, /results/i, /outcome/i, /measur/i, /roi/i, /save/i, /hours/i],
    response: `Here are Pranav's measurable results:

| Project | Problem | Result |
|---|---|---|
| Business Ops Automation | Manual MIS reporting and data entry | **150–200 hrs/month saved** |
| AI Product Research | Manual product data collection | **~85% research effort eliminated** |
| WhatsApp Support Bot | Manual customer query handling | **80% of queries automated** |
| Enterprise RAG | Internal Q&A with no centralised knowledge | **Multilingual responses under 5 seconds** |

The pattern: he starts from the *operational cost* — time, effort, error rate — not a technology wish list. The question he asks first is always "what does this automate and by exactly how much?"`,
  },

  // ── RAG / LLM Architecture ──────────────────────────────────────────
  {
    patterns: [/rag/i, /retrieval/i, /knowledge base/i, /vector/i, /embedding/i, /faiss/i, /ollama/i, /langchain/i],
    response: `Pranav built a self-hosted RAG pipeline at Tech Grind using:

\`\`\`
User Query
    │
    ▼
FastAPI retrieval service (Python)
    │
    ├── LangChain orchestration
    ├── FAISS vector index (chunked documents)
    ├── Qwen2.5 via Ollama (self-hosted LLM)
    └── Streaming multilingual response + source attribution
\`\`\`

**Key design decisions:**
- **Self-hosted** — eliminates external API costs and latency, keeps data private
- **FAISS** for vector search — lightweight, fast, no infra overhead
- **Qwen2.5** — strong multilingual performance for the customer base
- **Streaming** — responses start immediately while the model continues generating

**Result:** Internal Q&A with multilingual responses consistently under 5 seconds, with zero external API dependency in production.

He's used both FAISS (self-hosted) and cloud vector stores depending on the project's infra constraints.`,
  },

  // ── n8n / Automation ────────────────────────────────────────────────
  {
    patterns: [/n8n/i, /automat/i, /workflow/i, /pipeline/i, /cron/i, /webhook/i],
    response: `n8n is Pranav's primary tool for complex workflow orchestration. Here's how he approaches automation projects:

**His process:**
1. Map the current manual process step-by-step — time each step
2. Identify decision points that *feel* hard to automate but usually aren't
3. Build the happy path first (90% case)
4. Design failure modes explicitly — what happens when an API is down?
5. Add human-in-the-loop only for genuine exceptions

**What he's built with n8n:**

**Lead Qualification Pipeline:**
WhatsApp webhook → LLM intent classification → entity extraction → CRM REST API sync
→ Result: 100% of manual lead sorting eliminated

**MIS Reporting Automation:**
Cron-triggered → data validation + transformation → spreadsheet-to-reporting-system sync
→ Result: 150–200 hours/month saved from data entry

His rule: build for reliability, not cleverness. The most maintainable automation is the one that's easiest to debug at 2am.`,
  },

  // ── WhatsApp / Multi-agent ──────────────────────────────────────────
  {
    patterns: [/whatsapp/i, /multi.agent/i, /agent/i, /chatbot/i, /routing/i, /conversation/i],
    response: `Pranav has built two production WhatsApp systems:

**1. WhatsApp Business Operations Platform** (Tech Grind)
A multi-agent platform with:
- Persistent conversation state across sessions
- Role-based routing — support vs. sales teams each own their conversation type
- Real-time dashboards for team visibility into all active conversations
- Automated handling of 80% of incoming queries

**2. WhatsApp Customer Support Bot** (RedSand Technology)
Integrated into existing support workflows:
- Automated ~80% of customer queries without escalation
- Connected to product knowledge base for accurate responses

**Architecture pattern for multi-agent routing:**

\`\`\`
Incoming message
      │
      ▼
Intent classifier (LLM)
      │
  ┌───┴───┐
  ▼       ▼
Support  Sales
agent    agent
  │       │
  └───┬───┘
      ▼
Persistent state + real-time dashboard
\`\`\`

The key insight: most "chatbot" problems are really *routing* problems. Get classification right and the rest is plumbing.`,
  },

  // ── Projects ────────────────────────────────────────────────────────
  {
    patterns: [/project/i, /portfolio/i, /built/i, /work.*on/i, /best project/i, /most proud/i],
    response: `Here are Pranav's key projects:

**AI Lead Qualification & Sales Automation** *(active)*
Event-driven WhatsApp → LLM intent classification → CRM sync. Replaced 100% of manual lead sorting.
Stack: n8n · JavaScript · WhatsApp API · LLM

**Business Operations Automation**
MIS reporting pipeline with validation and exception handling.
Result: 150–200 hours/month saved.
Stack: n8n · Cron Jobs · REST APIs

**Enterprise AI Knowledge Assistant**
Self-hosted RAG pipeline with FAISS + Qwen2.5 via Ollama.
Result: Multilingual Q&A under 5 seconds, zero external API dependency.
Stack: Python · LangChain · FAISS · FastAPI

**WhatsApp Business Operations Platform**
Multi-agent platform with role-based routing and real-time dashboards.
Result: 80% of customer queries automated.
Stack: Node.js · React

**AI Product Intelligence Platform**
Distributed crawling with Bull queue + Redis worker pools.
Result: ~85% reduction in manual research effort.
Stack: Playwright · Node.js · Bull Queue · Redis

**This portfolio** — the AI you're talking to right now.`,
  },

  // ── Experience / Background ─────────────────────────────────────────
  {
    patterns: [/experience/i, /background/i, /career/i, /history/i, /where.*work/i, /company/i, /job/i],
    response: `Pranav's career so far:

**Junior Software Developer — AI & Automation**
Tech Grind Pvt. Ltd. · Ahmedabad, India · Jul 2025 – Present
Owns the entire AI and automation workstream. Key outcomes:
- Event-driven lead intake (WhatsApp + CRM)
- 150–200 hrs/month saved from MIS automation
- Self-hosted RAG pipeline (multilingual, <5 sec)
- Multi-agent WhatsApp platform with role-based routing
- ~85% reduction in product research effort

**Full-Stack SDE Intern**
RedSand Technology · Dubai, UAE (Remote) · Feb–May 2025
- Frontend: salary analysis + property inspection dashboards with role-based access
- Automated ~80% of customer queries via WhatsApp chatbot
- LinkedIn data enrichment pipeline for sales team

**Web Developer Intern**
BasketHunt Pvt. Ltd. · Gurugram (Remote) · Jul–Sep 2023
- 15% operational efficiency improvement via Zoho + Odoo integration

**Education:** B.Tech Computer Science, Marwadi University (2021–2025)
**Certification:** Product Management with Agentic AI, IIT Patna (Jun 2025 – Mar 2026)`,
  },

  // ── Tech Stack ──────────────────────────────────────────────────────
  {
    patterns: [/tech/i, /stack/i, /technolog/i, /language/i, /framework/i, /tool/i, /skill/i],
    response: `Pranav's core stack:

**AI & LLM**
LangChain · FAISS · Ollama (Qwen2.5) · Prompt Engineering · Function Calling · Conversation Memory · LLMOps

**Automation**
n8n · Cron Jobs · Webhooks · Redis · Bull Queue · Playwright

**Backend**
Node.js · FastAPI · Python · Flask · Express.js · REST APIs · JWT Auth

**Frontend**
React.js · Next.js · Tailwind CSS · Framer Motion

**DevOps**
Docker · Git · GitHub Actions · Linux/SSH

He picks tools based on production constraints — reliability, maintainability, and operational cost — not hype.`,
  },

  // ── Contact / Hire ──────────────────────────────────────────────────
  {
    patterns: [/contact/i, /hire/i, /available/i, /work together/i, /reach/i, /email/i, /connect/i, /freelanc/i, /rate/i, /consult/i],
    response: `Pranav is **open to work** — both full-time roles and freelance/consulting projects.

**Reach him directly:**
- **Email:** pranavthakwani@gmail.com
- **LinkedIn:** linkedin.com/in/pranavthakwani
- **GitHub:** github.com/pranavthakwani

**What he's looking for:**
- AI/automation engineering roles (full-time or contract)
- Freelance projects: workflow automation, RAG pipelines, WhatsApp integrations, LLM applications
- Consulting on business process automation

**He's a great fit if you need:**
- Something manual automated with measurable time savings
- A WhatsApp AI system (chatbot, lead intake, support routing)
- A self-hosted RAG knowledge base for your team
- An AI layer added to an existing product

**Not a fit for:** Pure frontend/design roles, non-technical project management, or projects with no automation/AI component.

→ Best first step: email him at pranavthakwani@gmail.com with a quick description of what you need.`,
  },

  // ── This Portfolio ──────────────────────────────────────────────────
  {
    patterns: [/this (portfolio|website|site)/i, /how.*ai.*work/i, /how.*assistant.*work/i, /how.*built/i, /this chat/i],
    response: `This portfolio is itself an AI system — the proof of Pranav's work, not just a description.

**How the AI assistant works:**

\`\`\`
Your message
     │
     ▼
ChatService (abstraction layer)
     │
     ├── [Current] MockChatService
     │   Pattern-matches queries → streams grounded responses
     │
     └── [Production] ApiChatService (single import change)
           → POST /api/chat → SSE streaming
           → Real RAG: embed → FAISS retrieval → Qwen2.5/Claude
     │
     ▼
Streamed tokens → UI renders progressively
\`\`\`

**Design decisions:**
- **ChatService abstraction** — UI knows nothing about the backend. Swapping mock→real is one line in \`useChat.ts\`
- **Strictly grounded** — only answers from the knowledge base; falls back honestly when it doesn't know
- **No welcome autoplay** — empty state with suggested prompts respects user intent

**Built with:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Plus Jakarta Sans + Caveat

The site itself is Pranav's most visible portfolio piece — you're interacting with it, not reading about it.`,
  },
];

// ─── Fallback ────────────────────────────────────────────────────────
const FALLBACK_RESPONSE = `I don't have specific information about that in my knowledge base.

I can answer questions about:
- **Pranav's projects** — automation pipelines, RAG systems, WhatsApp platforms
- **Business outcomes** — measurable results from his work (hours saved, % automated)
- **Technical stack** — n8n, LangChain, FAISS, Node.js, FastAPI, etc.
- **Experience** — Tech Grind, RedSand Technology, BasketHunt
- **Availability** — open to roles and freelance projects
- **Contact** — how to reach him

Try rephrasing your question around one of those topics.`;

// ─── Streaming helper ────────────────────────────────────────────────
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function streamText(
  text: string,
  onToken: (token: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const words = text.split(' ');
  let buffer = '';

  for (let i = 0; i < words.length; i++) {
    if (signal?.aborted) break;
    const word = words[i] ?? '';
    buffer += (i === 0 ? '' : ' ') + word;

    if ((i + 1) % 2 === 0 || i === words.length - 1) {
      onToken(buffer);
      buffer = '';
      const delay = word.endsWith('.') || word.endsWith('?') || word.endsWith('!')
        ? 80 + Math.random() * 60
        : 18 + Math.random() * 22;
      await sleep(delay);
    }
  }
  if (buffer) onToken(buffer);
}

// ─── MockChatService ─────────────────────────────────────────────────
export class MockChatService implements IChatService {
  private abortController: AbortController | null = null;

  async send(messages: ChatMessage[], options: ChatServiceOptions): Promise<void> {
    this.abortController = new AbortController();
    const { signal } = this.abortController;

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUserMessage) return;

    const query = lastUserMessage.content.toLowerCase();

    await sleep(400 + Math.random() * 300);
    if (signal.aborted) return;

    const match = KNOWLEDGE_BASE.find((entry) =>
      entry.patterns.some((pattern) => pattern.test(query))
    );

    const responseText = match?.response ?? FALLBACK_RESPONSE;
    let fullText = '';

    try {
      await streamText(
        responseText,
        (token) => {
          if (signal.aborted) return;
          fullText += token;
          options.onToken(token);
        },
        signal
      );

      if (!signal.aborted) {
        options.onComplete(fullText);
      }
    } catch (err) {
      if (!signal.aborted) {
        options.onError(err instanceof Error ? err : new Error('Unknown error'));
      }
    }
  }

  abort(): void {
    this.abortController?.abort();
  }
}

export const mockChatService = new MockChatService();
