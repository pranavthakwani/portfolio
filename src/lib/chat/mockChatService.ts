'use client';

import type { IChatService, ChatMessage, ChatServiceOptions } from '@/types';

/* ─── Mock RAG Responses ──────────────────────────────────────────────
   These simulate what a real RAG backend would return — grounded in the
   portfolio knowledge base, with markdown formatting, code blocks,
   and structured data where appropriate.

   To connect your real backend:
     1. Create src/lib/chat/apiChatService.ts
     2. Implement IChatService by calling your /api/chat route (SSE or fetch)
     3. Replace the import in useChat.ts

   Responses here intentionally use specific details from the data files
   so the conversation feels grounded, not generic.
   ──────────────────────────────────────────────────────────────────── */

interface MockResponse {
  patterns: RegExp[];
  response: string;
}

const KNOWLEDGE_BASE: MockResponse[] = [
  // ── Who / Intro ────────────────────────────────────────────────────
  {
    patterns: [/who are you/i, /introduce yourself/i, /about you/i, /tell me about pranav/i],
    response: `Hi! I'm the AI assistant built on Pranav's portfolio.

**Pranav** is an AI Automation Engineer based in India, specialising in:

- **RAG systems** — multi-source knowledge bases with hybrid retrieval
- **AI Agents** — LangGraph-orchestrated multi-agent pipelines
- **MCP Servers** — Model Context Protocol integrations for enterprise tools
- **Workflow Automation** — n8n, Celery, and custom orchestration pipelines
- **LLM Integrations** — OpenAI, Claude, and open-source model deployments

His focus is on *production-grade* systems that solve real business problems — not demos or experiments. Every project he ships starts with a quantified business outcome and ends with a measured result.

He's currently **open to senior AI engineering roles and consulting engagements**.

What would you like to know more about?`,
  },

  // ── Business Impact ─────────────────────────────────────────────────
  {
    patterns: [/business problem/i, /business impact/i, /results/i, /outcome/i, /measur/i, /roi/i],
    response: `Here are three examples of measurable business outcomes Pranav has delivered:

| Project | Problem | Result |
|---|---|---|
| Enterprise RAG | Support team spending 18 min/ticket on knowledge lookup | **40% ticket reduction**, avg resolution down to 4 min |
| Invoice Automation | 2,000 invoices/day processed manually with high error rate | **85% manual effort eliminated**, 98.7% accuracy |
| MCP–CRM Integration | Sales reps spending 25 min writing deal summaries | **45-second AI summaries**, adopted by 150-person team |

The common thread: Pranav starts from the *operational cost*, not a technology wish-list. The question he always asks first is "what does this automate and by how much?"

Want me to go deeper on any of these?`,
  },

  // ── RAG Architecture ────────────────────────────────────────────────
  {
    patterns: [/rag/i, /retrieval/i, /knowledge base/i, /vector/i, /embedding/i],
    response: `Pranav builds RAG systems with several layers of reliability baked in. Here's the architecture he uses for production deployments:

\`\`\`
User Query
    │
    ▼
┌─────────────────────────┐
│   Query Understanding   │  ← Query rewriting, HyDE, intent detection
└───────────┬─────────────┘
            │
    ┌───────┴────────┐
    ▼                ▼
BM25 Search    Dense Search   ← Hybrid retrieval (both sparse + semantic)
    │                │
    └───────┬────────┘
            ▼
    ┌───────────────┐
    │  Re-ranking   │  ← Cohere or cross-encoder re-ranker
    └───────┬───────┘
            ▼
    ┌───────────────┐
    │  LLM Generate │  ← Grounded strictly on retrieved chunks
    └───────┬───────┘
            ▼
     Structured Response
     + Source citations
\`\`\`

**Key design decisions:**
- **Hybrid BM25 + dense retrieval** — neither alone is good enough; dense misses exact keyword matches, sparse misses semantic equivalence
- **Re-ranking step** — retrieval recall ≠ precision; a cross-encoder re-ranks candidates before generation
- **Hallucination guardrail** — system prompt explicitly instructs the model to respond "I don't have that information" rather than infer

He's deployed this pattern on **Qdrant** (self-hosted) and **Pinecone** (managed), depending on client infra preferences.

Want details on any specific step?`,
  },

  // ── AI Agents / Multi-agent ─────────────────────────────────────────
  {
    patterns: [/agent/i, /multi.agent/i, /langgraph/i, /autonomous/i, /orchestrat/i],
    response: `Pranav's go-to for multi-agent systems is **LangGraph** — and here's why he chose it over plain LangChain or custom orchestration:

**Why LangGraph:**
- Explicit state machine model — you can *see* the workflow, reason about it, and debug it
- Native support for human-in-the-loop checkpoints (critical for anything touching finance or legal)
- Persistent state across agent steps without bolting on a database yourself

**His invoice processing agent architecture:**

\`\`\`python
# Simplified LangGraph state machine
from langgraph.graph import StateGraph

graph = StateGraph(InvoiceState)

graph.add_node("extract",   document_parser_agent)
graph.add_node("validate",  erp_validation_agent)
graph.add_node("anomaly",   anomaly_detection_agent)
graph.add_node("route",     routing_agent)

# Conditional edge — human review if anomaly detected
graph.add_conditional_edges(
    "anomaly",
    lambda state: "human_review" if state.flagged else "route"
)
\`\`\`

**Design principles he applies:**
1. Each agent has a **single, narrow responsibility** — no god agents
2. Every tool call is **logged and auditable**
3. **Failure modes are explicit** — the graph handles errors as first-class states, not exceptions
4. Human checkpoints are **built in by default** for high-stakes outputs

He's currently running agents that process 2,000+ invoices/day in production with 98.7% accuracy.`,
  },

  // ── MCP Servers ─────────────────────────────────────────────────────
  {
    patterns: [/mcp/i, /model context protocol/i, /tool/i, /salesforce/i],
    response: `Pranav has built several **MCP (Model Context Protocol) servers** — these expose existing enterprise tools as structured tools consumable by Claude or other LLMs.

**What he built for a SaaS sales team:**

An MCP server that wraps Salesforce CRM, exposing:
- \`get_pipeline_summary(rep_id)\` — pulls all open deals with stage, value, probability
- \`query_deals(soql)\` — runs safe, sandboxed SOQL queries
- \`create_follow_up(deal_id, message)\` — triggers automated Salesforce tasks
- \`generate_deal_brief(deal_id)\` — structured data → Claude → formatted summary

**Architecture:**

\`\`\`
Claude (tool_use)
      │  JSON tool call
      ▼
MCP Server (Node.js/TypeScript)
  ├── Auth: OAuth 2.0 token refresh
  ├── Salesforce REST API client
  ├── Input schema validation (Zod)
  └── Response formatting → MCP ToolResult
\`\`\`

**Result:** 150-person sales team reduced deal summary creation from 25 min manual effort to 45-second AI generation.

The key insight: MCP makes LLMs *aware* of enterprise data without ever building a chatbot UI — the CRM itself becomes the interface.`,
  },

  // ── Best/Favourite Project ──────────────────────────────────────────
  {
    patterns: [/best project/i, /favourite project/i, /most proud/i, /favourite work/i, /impressive/i, /best work/i],
    response: `The project Pranav is most proud of is the **Enterprise RAG Knowledge Base** — not because it was the most technically complex, but because it had the clearest before/after.

**The problem:** A SaaS support team of 12 people spending an average of 18 minutes per ticket searching scattered internal docs, Confluence pages, Slack threads, and Zendesk history.

**What he built:**
- A multi-source ingestion pipeline that syncs Confluence, Slack, and Zendesk every 15 minutes
- Hybrid BM25 + semantic retrieval with Cohere re-ranking
- A FastAPI backend with a streaming response endpoint
- An internal chat UI that shows cited sources inline

**The result:** 40% fewer tickets reached the support team at all (self-service deflection). For those that did, average resolution time dropped from 18 minutes to 4 minutes.

**What made it hard:** The *retrieval quality*, not the generation. Getting hybrid search tuned so that keyword-heavy technical questions and semantic paraphrase questions both returned the right chunk was a 3-week iteration process.

**What he'd do differently:** Earlier investment in a query evaluation dataset — manual "golden set" retrieval benchmarking before tuning saves weeks of guesswork.`,
  },

  // ── Tech Stack ──────────────────────────────────────────────────────
  {
    patterns: [/tech/i, /stack/i, /technolog/i, /tool/i, /language/i, /framework/i, /specialise/i],
    response: `Here's Pranav's core stack, organised by layer:

**AI / LLM**
- LangChain, LangGraph — orchestration
- OpenAI API, Anthropic Claude — primary models
- Qdrant, Pinecone — vector stores
- Cohere — re-ranking

**Automation**
- n8n — workflow orchestration (preferred for complex branching logic)
- Celery + Redis — task queues for async agent pipelines
- MCP servers (TypeScript) — LLM tool integrations

**Backend**
- Python + FastAPI — primary API server for AI services
- TypeScript + Node.js — MCP servers, BFF layers
- PostgreSQL — operational data
- Redis — caching, queues, session state

**Infra**
- Docker + Compose — local and production
- AWS (EC2, S3, Lambda) — cloud workloads
- Nginx — reverse proxy, SSL termination

**Frontend** (when shipping full-stack)
- Next.js, React, Tailwind CSS, Framer Motion

He makes tool choices based on the *production constraints* of each project — not personal preference or hype cycle proximity.`,
  },

  // ── Experience / Background ─────────────────────────────────────────
  {
    patterns: [/experience/i, /background/i, /career/i, /history/i, /where.*work/i, /how long/i],
    response: `Pranav has 4+ years of engineering experience, with the last 2+ years focused entirely on AI systems:

**Senior AI Automation Engineer** — Current (2024–Present)
Enterprise AI consultancy. Leads AI/LLM workstreams — RAG pipelines, multi-agent systems, MCP integrations. Shipped 3 production RAG systems now handling 10k+ daily queries.

**LLM Integration Specialist** — 2022–2024
Series B SaaS startup. Built the company's first AI layer from scratch — support RAG system, AI-guided onboarding, OpenAI function-calling integration. Support RAG handles 60% of Tier-1 tickets without human involvement.

**Backend Engineer** — 2020–2022
Product startup. API engineering, performance optimisation, first ML features (collaborative filtering recommendation engine). Reduced core API p99 latency by 60%.

**The progression:** Backend foundations → ML curiosity → LLM integration → full AI systems architecture. Each stage built the layer that made the next one possible.

He's available for senior AI engineering roles and consulting engagements. The best way to evaluate his work is the system you're talking to right now.`,
  },

  // ── Automation Workflows ────────────────────────────────────────────
  {
    patterns: [/automat/i, /workflow/i, /n8n/i, /pipeline/i, /process/i],
    response: `Pranav's approach to automation is "boring reliability over clever complexity."

**His process for any automation project:**

1. **Map the current process** — what does a person actually do, step by step? Time each step.
2. **Identify the bottlenecks** — usually it's a decision point that feels hard to automate but isn't
3. **Build the happy path first** — get the 90% case working before handling exceptions
4. **Design failure modes explicitly** — what happens when an API is down? When a document is malformed?
5. **Add human-in-the-loop for the 10%** — never try to automate 100% on day one

**His tool choices:**
- **n8n** for complex multi-system workflows with branching logic — the visual graph makes it auditable and maintainable by non-engineers
- **Celery + Redis** for async Python workloads where reliability and retry logic matter
- **LangGraph** when agents need to make decisions mid-pipeline

**The document intelligence pipeline** he built handles 2,000+ documents/day:
Email/S3/FTP → ingest → classify (LLM) → extract structured data → validate → route → audit log

92% of previously manual document handling is now automated for that client.`,
  },

  // ── This Portfolio / How the AI Works ──────────────────────────────
  {
    patterns: [/this (portfolio|website|site)/i, /how.*ai.*work/i, /how.*assistant.*work/i, /how.*built/i, /this chat/i],
    response: `This portfolio is itself a production AI system — the proof of Pranav's work, not a description of it.

**How the AI assistant works:**

\`\`\`
Your message
     │
     ▼
ChatService (abstraction layer)
     │
     ├── [Current] MockChatService
     │     Pattern-matches queries → streams canned, grounded responses
     │
     └── [Production] ApiChatService (easy to swap in)
           → POST /api/chat (SSE streaming)
           → Real RAG: embed query → Qdrant retrieval → re-rank → Claude
     │
     ▼
Streamed tokens → UI renders progressively
\`\`\`

**Design decisions:**
- **ChatService abstraction** — the UI components know nothing about the backend. Swapping mock for real is a single import change in \`useChat.ts\`
- **Strictly grounded** — the assistant never speculates about Pranav; it only answers from the knowledge base
- **No welcome message** — the empty state with suggested prompts is more respectful of user intent than an autoplay script

**Built with:**
Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Plus Jakarta Sans + Caveat fonts

The site itself is Pranav's strongest portfolio piece — because you're interacting with it, not reading about it.`,
  },

  // ── Contact / Availability ──────────────────────────────────────────
  {
    patterns: [/contact/i, /hire/i, /available/i, /work together/i, /reach/i, /email/i, /connect/i],
    response: `Pranav is currently **open to senior AI engineering roles and consulting engagements**.

**Best ways to reach him:**
- **Email:** pranav@example.com *(replace with real email)*
- **LinkedIn:** linkedin.com/in/pranav *(replace)*
- **GitHub:** github.com/pranav *(replace)*

**What he's looking for:**
- Senior / Staff AI engineer roles at companies building real AI products
- Consulting on RAG architecture, agent design, or AI/LLM integration strategy
- Projects where AI genuinely changes the operation of a business — not demos

**What he's NOT looking for:**
- Purely frontend/backend roles with no AI component
- Proof-of-concept work with no production path

If you're evaluating him for a role — this conversation is a better signal than a CV. Ask anything about his work and see how the system responds.`,
  },
];

// ─── Fallback response ───────────────────────────────────────────────
const FALLBACK_RESPONSE = `I don't have specific information about that in my knowledge base.

I can answer questions about:
- **Pranav's projects** — RAG systems, agent pipelines, MCP servers, automation
- **Business outcomes** — measurable results from his work
- **Technical architecture** — how he designs and builds AI systems
- **Experience & background** — career history and approach
- **This portfolio** — how the AI assistant itself was built
- **Contact & availability** — how to reach him

Try one of the suggested prompts, or rephrase your question around one of those topics.`;

// ─── Streaming helper ────────────────────────────────────────────────
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function streamText(
  text: string,
  onToken: (token: string) => void,
  signal?: AbortSignal
): Promise<void> {
  // Split into small word-chunks (1-3 words) for realistic streaming feel
  const words = text.split(' ');
  let buffer = '';

  for (let i = 0; i < words.length; i++) {
    if (signal?.aborted) break;

    const word = words[i] ?? '';
    buffer += (i === 0 ? '' : ' ') + word;

    // Emit every 1-3 words
    if ((i + 1) % 2 === 0 || i === words.length - 1) {
      onToken(buffer);
      buffer = '';
      // Variable delay simulates natural generation pace
      const delay = word.endsWith('.') || word.endsWith('?') || word.endsWith('!')
        ? 80 + Math.random() * 60   // longer pause after sentences
        : 18 + Math.random() * 22;  // quick pace within a sentence
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

    // Small initial "thinking" delay — realistic LLM behaviour
    await sleep(400 + Math.random() * 300);
    if (signal.aborted) return;

    // Find the best matching response
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

// Singleton — one service instance shared by the hook
export const mockChatService = new MockChatService();
