import 'server-only';

import { createHmac } from 'node:crypto';

export function analyticsVisitorHash(request: Request): string {
  const secret = process.env.ANALYTICS_HASH_SECRET?.trim();
  if (!secret && process.env.NODE_ENV === 'production') throw new Error('ANALYTICS_HASH_SECRET is missing');
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  const visitorId = request.headers.get('x-visitor-id')?.slice(0, 128) || 'anonymous';
  const userAgent = request.headers.get('user-agent')?.slice(0, 256) || 'unknown';
  return createHmac('sha256', secret || 'local-development-only').update(`${visitorId}|${forwarded}|${userAgent}`).digest('hex');
}

export function chatVisitorHash(request: Request): string {
  const secret = process.env.ANALYTICS_HASH_SECRET?.trim();
  if (!secret && process.env.NODE_ENV === 'production') throw new Error('ANALYTICS_HASH_SECRET is missing');
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent')?.slice(0, 256) || 'unknown';
  return createHmac('sha256', secret || 'local-development-only').update(`${forwarded}|${userAgent}`).digest('hex');
}

export function ragConfig(): { url: string; secret: string } {
  const url = process.env.PORTFOLIO_RAG_API_URL?.trim().replace(/\/$/, '');
  const secret = process.env.PORTFOLIO_SHARED_SECRET?.trim();
  if (!url || !secret) throw new Error('RAG integration is not configured');
  return { url, secret };
}

export function vercelLocation(headers: Headers) {
  const decode = (value: string | null) => {
    try { return value ? decodeURIComponent(value) : 'unknown'; } catch { return 'unknown'; }
  };
  return {
    country: headers.get('x-vercel-ip-country') || 'unknown',
    region: decode(headers.get('x-vercel-ip-country-region')),
    city: decode(headers.get('x-vercel-ip-city')),
  };
}
