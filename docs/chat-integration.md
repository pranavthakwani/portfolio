# Portfolio assistant integration

The existing chat UI uses `ApiChatService`, which implements the existing `IChatService` contract. Browser requests go to the portfolio's same-origin `POST /api/chat` route; that route streams the response from the separately deployed RAG service.

Set `PORTFOLIO_RAG_API_URL` in the portfolio deployment to the RAG service origin, without `/api/chat`. For local development, run the RAG service on port 3001 and use:

```env
PORTFOLIO_RAG_API_URL=http://localhost:3001
```

The URL is server-only and does not use a `NEXT_PUBLIC_` prefix. The proxy forwards the request body, abort signal, correlation ID, grounding header, and source count while keeping browser traffic same-origin.

The client sends the current user message separately and retains only the latest 12 prior user/assistant messages. Stop and clear actions use `AbortController`, so cancelling the UI also cancels the portfolio proxy request and its upstream RAG stream.
