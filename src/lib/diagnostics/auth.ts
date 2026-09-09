import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const DIAGNOSTICS_COOKIE = 'pranav_diagnostics';
const SESSION_SECONDS = 60 * 60 * 12;

function sessionSecret(): string {
  const value = process.env.DIAGNOSTICS_SESSION_SECRET?.trim();
  if (!value) throw new Error('DIAGNOSTICS_SESSION_SECRET is missing');
  return value;
}

function signature(expires: string): string {
  return createHmac('sha256', sessionSecret()).update(expires).digest('hex');
}

export function verifyDiagnosticsPassword(candidate: string): boolean {
  const expected = process.env.DIAGNOSTICS_PASSWORD?.trim();
  if (!expected) return false;
  const left = Buffer.from(expected);
  const right = Buffer.from(candidate);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createDiagnosticsSession(): { token: string; maxAge: number } {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return { token: `${expires}.${signature(expires)}`, maxAge: SESSION_SECONDS };
}

export function hasDiagnosticsSession(): boolean {
  const token = cookies().get(DIAGNOSTICS_COOKIE)?.value;
  if (!token) return false;
  const [expires, supplied] = token.split('.');
  if (!expires || !supplied || Number(expires) <= Math.floor(Date.now() / 1000)) return false;
  const expected = signature(expires);
  const left = Buffer.from(expected);
  const right = Buffer.from(supplied);
  return left.length === right.length && timingSafeEqual(left, right);
}

