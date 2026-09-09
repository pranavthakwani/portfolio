import { chatVisitorHash, ragConfig } from '@/lib/analytics/server';

const unavailableResponse = () => Response.json(
  { error: { code: 'SERVICE_UNAVAILABLE', message: 'The portfolio assistant is unavailable.', retryable: true } },
  { status: 503, headers: { 'cache-control': 'no-store' } }
);

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request): Promise<Response> {
  try {
    const { url: serviceUrl, secret } = ragConfig();
    const visitorHash = chatVisitorHash(request);
    const upstream = await fetch(`${serviceUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'content-type': request.headers.get('content-type') ?? 'application/json',
        'x-request-id': request.headers.get('x-request-id') ?? crypto.randomUUID(),
        'x-portfolio-secret': secret,
        'x-visitor-hash': visitorHash,
      },
      body: await request.text(),
      cache: 'no-store',
      signal: request.signal,
    });
    const headers = new Headers({
      'cache-control': 'no-store, no-transform',
      'content-type': upstream.headers.get('content-type') ?? 'text/plain; charset=utf-8',
    });
    for (const name of ['x-request-id', 'x-source-count', 'x-grounded-response', 'x-rate-limit-limit', 'x-rate-limit-remaining', 'retry-after']) {
      const value = upstream.headers.get(name);
      if (value) headers.set(name, value);
    }
    return new Response(upstream.body, { status: upstream.status, headers });
  } catch {
    return unavailableResponse();
  }
}
