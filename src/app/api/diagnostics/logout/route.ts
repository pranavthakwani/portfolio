import { DIAGNOSTICS_COOKIE } from '@/lib/diagnostics/auth';

export async function POST(): Promise<Response> {
  const response = Response.json({ ok: true });
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  response.headers.append('set-cookie', `${DIAGNOSTICS_COOKIE}=; Path=/diagnostics; HttpOnly${secure}; SameSite=Strict; Max-Age=0`);
  return response;
}
