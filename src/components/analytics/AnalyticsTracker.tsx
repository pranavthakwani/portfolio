'use client';

import { useEffect, useRef, useState } from 'react';
import { ANALYTICS_CONSENT_KEY, browserSessionId, browserVisitorId } from '@/lib/analytics/identity';

type EventName = 'page_view' | 'click' | 'section_dwell' | 'scroll_depth';
type QueuedEvent = { eventName: EventName; sessionId: string; path: string; occurredAt: string; data: Record<string, string | number | boolean | null> };

function browserName(): string {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return 'Edge';
  if (/Chrome\//.test(ua)) return 'Chrome';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Safari\//.test(ua)) return 'Safari';
  return 'Other';
}

export function AnalyticsTracker() {
  const [consent, setConsent] = useState<'yes' | 'no' | null>(null);
  const started = useRef(false);

  useEffect(() => setConsent(localStorage.getItem(ANALYTICS_CONSENT_KEY) as 'yes' | 'no' | null), []);

  useEffect(() => {
    if (consent !== 'yes' || started.current || location.pathname.startsWith('/diagnostics')) return;
    started.current = true;
    const sessionId = browserSessionId();
    const visitorId = browserVisitorId();
    const queue: QueuedEvent[] = [];
    const sectionStarts = new Map<string, number>();
    let clickCount = 0;
    let maxScroll = 0;
    const flush = () => {
      if (!queue.length) return;
      const body = JSON.stringify({ events: queue.splice(0, queue.length) });
      void fetch('/api/analytics/events', {
        method: 'POST', headers: { 'content-type': 'application/json', 'x-visitor-id': visitorId }, body, keepalive: true,
      });
    };
    const enqueue = (eventName: EventName, data: QueuedEvent['data']) => {
      queue.push({ eventName, sessionId, path: location.pathname, occurredAt: new Date().toISOString(), data });
      if (queue.length >= 10) flush();
    };
    enqueue('page_view', {
      title: document.title.slice(0, 180), referrer: document.referrer.slice(0, 300), browser: browserName(),
      platform: navigator.platform || 'unknown', language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      device: innerWidth < 768 ? 'mobile' : innerWidth < 1100 ? 'tablet' : 'desktop',
      screenWidth: screen.width, screenHeight: screen.height,
    });
    const onClick = (event: MouseEvent) => {
      if (++clickCount > 200) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('input,textarea,[contenteditable="true"],[data-analytics-ignore]')) return;
      const control = target?.closest('a,button,[role="button"]') as HTMLElement | null;
      const section = target?.closest('section[id]') as HTMLElement | null;
      enqueue('click', {
        xPct: Number(((event.pageX / Math.max(1, document.documentElement.scrollWidth)) * 100).toFixed(2)),
        yPct: Number(((event.pageY / Math.max(1, document.documentElement.scrollHeight)) * 100).toFixed(2)),
        viewportXPct: Number(((event.clientX / Math.max(1, innerWidth)) * 100).toFixed(2)),
        viewportYPct: Number(((event.clientY / Math.max(1, innerHeight)) * 100).toFixed(2)),
        target: (control?.getAttribute('aria-label') || control?.innerText || control?.id || control?.tagName || 'page').trim().slice(0, 100),
        section: section?.id || 'outside-section',
      });
    };
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - innerHeight;
      maxScroll = Math.max(maxScroll, available > 0 ? Math.round((scrollY / available) * 100) : 100);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id;
        if (entry.isIntersecting) sectionStarts.set(id, Date.now());
        else if (sectionStarts.has(id)) {
          const durationMs = Date.now() - (sectionStarts.get(id) || Date.now());
          sectionStarts.delete(id);
          if (durationMs >= 750) enqueue('section_dwell', { section: id, durationMs });
        }
      }
    }, { threshold: 0.4 });
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
    document.addEventListener('click', onClick, true);
    addEventListener('scroll', onScroll, { passive: true });
    const interval = window.setInterval(flush, 8_000);
    const onVisibility = () => {
      if (document.visibilityState !== 'hidden') return;
      for (const [section, start] of sectionStarts) enqueue('section_dwell', { section, durationMs: Date.now() - start });
      sectionStarts.clear();
      enqueue('scroll_depth', { depthPct: Math.min(100, maxScroll) });
      flush();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect(); document.removeEventListener('click', onClick, true); removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility); clearInterval(interval); flush();
    };
  }, [consent]);

  const decide = (value: 'yes' | 'no') => { localStorage.setItem(ANALYTICS_CONSENT_KEY, value); setConsent(value); };
  if (consent !== null) return null;
  return (
    <aside className="fixed bottom-4 left-1/2 z-[100] w-[min(92vw,36rem)] -translate-x-1/2 rounded-2xl border-2 border-ink-900 bg-[#fffdf8] p-4 shadow-[6px_7px_0_rgba(34,197,94,.22)]" aria-label="Analytics preference">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink-700">May I collect anonymous clicks, scroll depth, and section time to improve this portfolio? No typing or form content is recorded.</p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => decide('no')} className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-600 hover:bg-paper-200">No thanks</button>
          <button onClick={() => decide('yes')} className="rounded-lg bg-ink-900 px-4 py-2 text-sm font-bold text-white hover:bg-ink-700">Allow</button>
        </div>
      </div>
    </aside>
  );
}
