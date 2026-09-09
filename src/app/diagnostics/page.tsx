import { redirect } from 'next/navigation';
import { hasDiagnosticsSession } from '@/lib/diagnostics/auth';
import { ragConfig } from '@/lib/analytics/server';
import { LogoutButton } from './LogoutButton';

export const dynamic = 'force-dynamic';

type Item = Record<string, unknown>;
type Snapshot = { generatedAt: string; retentionDays: number; events: Item[]; requests: Item[] };

const text = (value: unknown, fallback = 'unknown') => typeof value === 'string' && value ? value : fallback;
const number = (value: unknown) => typeof value === 'number' && Number.isFinite(value) ? value : Number(value) || 0;
const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

function countBy(items: Item[], key: string) {
  const counts = new Map<string, number>();
  for (const item of items) counts.set(text(item[key]), (counts.get(text(item[key])) || 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1]);
}

function topRows(items: [string, number][], total: number) {
  return items.slice(0, 7).map(([label, value]) => (
    <div key={label} className="grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-3">
      <div><div className="mb-1 flex justify-between gap-3 text-xs"><span className="truncate text-slate-300">{label}</span><span className="text-slate-500">{value}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${Math.max(3, value / Math.max(1, total) * 100)}%` }} /></div></div>
      <span className="text-right text-xs text-slate-500">{Math.round(value / Math.max(1, total) * 100)}%</span>
    </div>
  ));
}

async function loadSnapshot(): Promise<Snapshot> {
  const { url, secret } = ragConfig();
  const response = await fetch(`${url}/api/diagnostics`, { headers: { 'x-portfolio-secret': secret }, cache: 'no-store' });
  if (!response.ok) throw new Error('The analytics store could not be reached.');
  return response.json() as Promise<Snapshot>;
}

export default async function DiagnosticsPage() {
  if (!hasDiagnosticsSession()) redirect('/diagnostics/login');
  let snapshot: Snapshot;
  try { snapshot = await loadSnapshot(); } catch (error) {
    return <main className="min-h-screen bg-slate-950 p-8 text-white"><h1 className="text-3xl font-bold">Diagnostics unavailable</h1><p className="mt-3 text-slate-400">{error instanceof Error ? error.message : 'Unknown error'}</p></main>;
  }
  const pageViews = snapshot.events.filter((event) => event.eventName === 'page_view');
  const clicks = snapshot.events.filter((event) => event.eventName === 'click');
  const dwell = snapshot.events.filter((event) => event.eventName === 'section_dwell');
  const scrolls = snapshot.events.filter((event) => event.eventName === 'scroll_depth');
  const sessions = new Set(pageViews.map((event) => text(event.sessionId)));
  const visitors = new Set(pageViews.map((event) => text(event.visitorHash)));
  const avgScroll = scrolls.length ? scrolls.reduce((sum, event) => sum + number(event.depthPct), 0) / scrolls.length : 0;
  const sectionMs = new Map<string, number>();
  for (const event of dwell) sectionMs.set(text(event.section), (sectionMs.get(text(event.section)) || 0) + number(event.durationMs));
  const sectionSeconds = [...sectionMs].map(([key, value]) => [key, Math.round(value / 1000)] as [string, number]).sort((a, b) => b[1] - a[1]);
  const totalCost = snapshot.requests.reduce((sum, request) => sum + number(request.estimatedUsd), 0);
  const totalTokens = snapshot.requests.reduce((sum, request) => sum + number(request.totalTokens), 0);
  const failures = snapshot.requests.filter((request) => text(request.status) !== 'completed').length;
  const trend = new Map<string, number>();
  for (let i = 13; i >= 0; i--) { const d = new Date(Date.now() - i * 86_400_000).toISOString().slice(5, 10); trend.set(d, 0); }
  for (const event of pageViews) { const day = text(event.occurredAt).slice(5, 10); if (trend.has(day)) trend.set(day, (trend.get(day) || 0) + 1); }
  const maxTrend = Math.max(1, ...trend.values());
  const heatClicks = clicks.slice(0, 1200);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-7 lg:px-10">
      <header className="mx-auto flex max-w-[1500px] items-start justify-between gap-5 border-b border-slate-800 pb-6">
        <div><p className="font-mono text-xs uppercase tracking-[.2em] text-emerald-400">Private · live data</p><h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Portfolio diagnostics</h1><p className="mt-2 text-sm text-slate-500">Last {snapshot.retentionDays} days · refreshed {new Date(snapshot.generatedAt).toLocaleString('en-IN')}</p></div>
        <div className="flex gap-2"><a href="/" className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-300 hover:text-white">View site</a><LogoutButton /></div>
      </header>

      <div className="mx-auto max-w-[1500px] py-7">
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {[["Visitors", visitors.size], ["Sessions", sessions.size], ["Page views", pageViews.length], ["Clicks", clicks.length], ["Avg. scroll", `${avgScroll.toFixed(0)}%`], ["RAG requests", snapshot.requests.length]].map(([label, value]) => <article key={String(label)} className="rounded-2xl border border-slate-800 bg-slate-900 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold text-white">{typeof value === 'number' ? compact.format(value) : value}</p></article>)}
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_.8fr]">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><div className="flex items-center justify-between"><h2 className="text-lg font-bold">Traffic · 14 days</h2><span className="text-xs text-slate-500">page views</span></div><div className="mt-6 flex h-48 items-end gap-2">{[...trend].map(([day, value]) => <div key={day} className="flex min-w-0 flex-1 flex-col items-center gap-2"><span className="text-[10px] text-slate-500">{value || ''}</span><div className="w-full rounded-t bg-emerald-400/80" style={{ height: `${Math.max(value ? 8 : 2, value / maxTrend * 145)}px` }} /><span className="text-[9px] text-slate-600">{day}</span></div>)}</div></article>
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><h2 className="text-lg font-bold">RAG health</h2><div className="mt-5 grid grid-cols-2 gap-3">{[["Tokens", compact.format(totalTokens)], ["Est. cost", `$${totalCost.toFixed(4)}`], ["Failures", failures], ["Success", `${snapshot.requests.length ? Math.round((snapshot.requests.length - failures) / snapshot.requests.length * 100) : 0}%`]].map(([label, value]) => <div key={String(label)} className="rounded-xl bg-slate-950 p-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-xl font-bold">{value}</p></div>)}</div><p className="mt-4 text-xs leading-relaxed text-slate-500">Estimated model cost is based on recorded token usage; provider invoices can differ.</p></article>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {[['Top sections by time', sectionSeconds, sectionSeconds.reduce((s, x) => s + x[1], 0)], ['Devices', countBy(pageViews, 'device'), pageViews.length], ['Countries', countBy(pageViews, 'country'), pageViews.length], ['Most-clicked controls', countBy(clicks, 'target'), clicks.length]].map(([title, rows, total]) => <article key={String(title)} className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><h2 className="mb-5 text-base font-bold">{String(title)}</h2><div className="space-y-3">{topRows(rows as [string, number][], total as number)}</div></article>)}
        </section>

        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-lg font-bold">Click heatmap</h2><p className="mt-1 text-xs text-slate-500">Normalized across the full page. Brighter clusters mean more clicks.</p></div><span className="text-xs text-slate-500">{heatClicks.length} recent points</span></div><div className="relative mt-5 aspect-[16/9] max-h-[560px] overflow-hidden rounded-xl border border-slate-700 bg-gradient-to-b from-[#faf6ee] via-[#f2ead8] to-[#123c35]">{heatClicks.map((event, index) => <span key={`${text(event.occurredAt)}-${index}`} title={`${text(event.target)} · ${text(event.section)}`} className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/30 blur-[2px] ring-1 ring-amber-300/50" style={{ left: `${Math.min(100, Math.max(0, number(event.xPct)))}%`, top: `${Math.min(100, Math.max(0, number(event.yPct)))}%` }} />)}</div></section>

        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-lg font-bold">Complete RAG request ledger</h2><p className="mt-1 text-xs text-slate-500">Questions and answers are private. Expand a row for retrieval, usage, cost, and error details.</p></div><span className="text-xs text-slate-500">Newest first · {snapshot.requests.length} stored</span></div><div className="mt-5 space-y-2">{snapshot.requests.length === 0 ? <p className="rounded-xl bg-slate-950 p-5 text-sm text-slate-500">No audited requests yet.</p> : snapshot.requests.map((request) => <details key={text(request.requestId)} className="group rounded-xl border border-slate-800 bg-slate-950 open:border-emerald-500/40"><summary className="grid cursor-pointer list-none gap-2 p-4 md:grid-cols-[10rem_minmax(0,1fr)_7rem_6rem] md:items-center"><span className="text-xs text-slate-500">{new Date(text(request.occurredAt)).toLocaleString('en-IN')}</span><span className="truncate font-semibold text-slate-200">{text(request.question)}</span><span className="text-xs text-slate-400">{text(request.intent)}</span><span className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${text(request.status) === 'completed' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'}`}>{text(request.status)}</span></summary><div className="grid gap-4 border-t border-slate-800 p-4 lg:grid-cols-2"><div><h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Question</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{text(request.question)}</p><h3 className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">Answer</h3><p className="mt-2 max-h-80 overflow-auto whitespace-pre-wrap text-sm leading-relaxed text-slate-300">{text(request.answer, 'No answer captured')}</p></div><div className="grid content-start grid-cols-2 gap-3">{[['Request ID', text(request.requestId)], ['Search query', text(request.searchQuery)], ['Sources', Array.isArray(request.sourceTitles) ? request.sourceTitles.join(', ') || 'none' : 'none'], ['Chunks', number(request.selectedChunkCount)], ['Candidates', number(request.candidateCount)], ['Model time', `${number(request.modelDurationMs)} ms`], ['Input tokens', number(request.inputTokens)], ['Output tokens', number(request.outputTokens)], ['Total tokens', number(request.totalTokens)], ['Est. USD', `$${number(request.estimatedUsd).toFixed(6)}`], ['Est. INR', `₹${number(request.estimatedInr).toFixed(4)}`], ['Visitor', text(request.visitorHash).slice(0, 12)]].map(([label, value]) => <div key={String(label)} className="rounded-lg bg-slate-900 p-3"><p className="text-[10px] uppercase tracking-wider text-slate-600">{label}</p><p className="mt-1 break-words text-xs font-semibold text-slate-300">{value}</p></div>)}</div></div></details>)}</div></section>
      </div>
    </main>
  );
}
