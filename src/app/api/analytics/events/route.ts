import { analyticsVisitorHash, ragConfig, vercelLocation } from '@/lib/analytics/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const allowedEvents = new Set(['page_view', 'click', 'section_dwell', 'scroll_depth']);

export async function POST(request: Request): Promise<Response> {
  try {
    const payload = await request.json() as { events?: Array<Record<string, unknown>> };
    if (!Array.isArray(payload.events) || payload.events.length > 50) return Response.json({ error: 'Invalid events' }, { status: 400 });
    const visitorHash = analyticsVisitorHash(request);
    const location = vercelLocation(request.headers);
    const events = payload.events.filter((event) =>
      allowedEvents.has(String(event.eventName)) && typeof event.sessionId === 'string' && typeof event.path === 'string'
    ).map((event) => ({
      ...event,
      sessionId: String(event.sessionId).slice(0, 128),
      path: String(event.path).slice(0, 300),
      visitorHash,
      ...location,
    }));
    if (events.length === 0) return new Response(null, { status: 204 });
    const { url, secret } = ragConfig();
    const response = await fetch(`${url}/api/analytics/events`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-portfolio-secret': secret },
      body: JSON.stringify({ events }),
      cache: 'no-store',
    });
    return new Response(null, { status: response.ok ? 204 : 502 });
  } catch {
    return new Response(null, { status: 204 });
  }
}

