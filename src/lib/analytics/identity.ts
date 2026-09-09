export const ANALYTICS_CONSENT_KEY = 'pranav-analytics-consent';
export const VISITOR_ID_KEY = 'pranav-visitor-id';
export const SESSION_ID_KEY = 'pranav-session-id';

function randomId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function browserVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = randomId();
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

export function browserSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = randomId();
    sessionStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

