import { createDiagnosticsSession, DIAGNOSTICS_COOKIE, verifyDiagnosticsPassword } from '@/lib/diagnostics/auth';

export const runtime = 'nodejs';

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => ({})) as { password?: string };
  if (!body.password || !verifyDiagnosticsPassword(body.password)) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return Response.json({ error: 'Incorrect password.' }, { status: 401 });
  }
  const session = createDiagnosticsSession();
  const response = Response.json({ ok: true });
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  response.headers.append('set-cookie', `${DIAGNOSTICS_COOKIE}=${session.token}; Path=/diagnostics; HttpOnly${secure}; SameSite=Strict; Max-Age=${session.maxAge}`);
  return response;
}
