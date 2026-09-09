# Analytics and diagnostics

The private dashboard is available at `/diagnostics`. It combines anonymous portfolio interaction analytics with durable RAG request audits stored in the existing Qdrant cluster under a separate collection.

## Required Vercel variables

Generate three unrelated random values. A PowerShell-friendly command is:

```powershell
[Convert]::ToHexString([Security.Cryptography.RandomNumberGenerator]::GetBytes(32)).ToLower()
```

Portfolio project:

```text
PORTFOLIO_RAG_API_URL=https://personal-rag-eight.vercel.app
PORTFOLIO_SHARED_SECRET=<same random value used by RAG>
ANALYTICS_HASH_SECRET=<a different random value>
DIAGNOSTICS_PASSWORD=<a strong password only Pranav knows>
DIAGNOSTICS_SESSION_SECRET=<a third random value>
```

RAG project:

```text
PORTFOLIO_SHARED_SECRET=<same value used by portfolio>
ANALYTICS_QDRANT_COLLECTION=portfolio_analytics
RAG_AUDIT_ENABLED=true
MODEL_AUDIT_ENABLED=false
```

Add values to Production, Preview, and Development as appropriate, then redeploy the RAG project first and the portfolio second.

## What is collected

- Anonymous page views, coarse Vercel country/region/city, browser, device class, referrer, and screen size.
- Click coordinates and control labels for the heatmap. Inputs, textareas, editable content, and elements marked `data-analytics-ignore` are excluded.
- Section dwell time and maximum scroll depth.
- Each RAG question, recent conversation history, final answer, intent, search query, source names, retrieval counts, model latency, token usage, estimated cost, status, and an irreversible visitor hash.

Portfolio interaction analytics starts only after the visitor chooses **Allow**. Chat questions are logged regardless, and this is disclosed beneath the composer.

## Limits and storage

The RAG reserves a maximum of 20 questions per anonymous visitor hash per UTC day. The old per-minute limiter remains as a second abuse-control layer. Analytics are kept outside the knowledge collection and never participate in retrieval.

The dashboard reads the most recent 90-day window, up to 7,500 interaction events and 1,000 request audits per load. Qdrant remains the source of truth; export or retention automation can be added later if traffic grows.

