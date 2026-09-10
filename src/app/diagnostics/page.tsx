import { redirect } from 'next/navigation';
import { HeatmapExplorer, type HeatClick } from '@/components/diagnostics/HeatmapExplorer';
import { hasDiagnosticsSession } from '@/lib/diagnostics/auth';
import { ragConfig } from '@/lib/analytics/server';
import { LogoutButton } from './LogoutButton';

export const dynamic = 'force-dynamic';

type Item = Record<string, unknown>;
type Snapshot = { generatedAt: string; retentionDays: number; events: Item[]; requests: Item[] };
type SectionMetric = { name: string; clicks: number; dwellMs: number; dwellSamples: number; sessions: Set<string> };

const text = (value: unknown, fallback = 'unknown') => typeof value === 'string' && value ? value : fallback;
const number = (value: unknown) => typeof value === 'number' && Number.isFinite(value) ? value : Number(value) || 0;
const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const sectionOrder = ['home', 'chat', 'projects', 'experience', 'skills', 'about', 'contact'];
const label = (value: string) => value.replace(/^outside-section$/, 'Page shell').replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

function countBy(items: Item[], key: string) {
  const counts = new Map<string, number>();
  for (const item of items) counts.set(text(item[key]), (counts.get(text(item[key])) || 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1]);
}

function formatDuration(milliseconds: number) {
  if (milliseconds < 1_000) return '—';
  const seconds = Math.round(milliseconds / 1_000);
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function Ranking({ rows, total, empty }: { rows: [string, number][]; total: number; empty: string }) {
  if (!rows.length) return <p className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 p-5 text-sm leading-relaxed text-slate-400">{empty}</p>;
  return <div className="space-y-4">{rows.slice(0, 7).map(([name, value]) => (
    <div key={name}>
      <div className="mb-2 flex justify-between gap-3 text-sm"><span className="truncate text-slate-300">{label(name)}</span><span className="font-semibold text-white">{value}</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${Math.max(4, value / Math.max(1, total) * 100)}%` }} /></div>
    </div>
  ))}</div>;
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
  try {
    snapshot = await loadSnapshot();
  } catch (error) {
    return <main className="min-h-screen bg-slate-950 p-8 text-white"><h1 className="text-3xl font-bold text-white">Diagnostics unavailable</h1><p className="mt-3 text-slate-400">{error instanceof Error ? error.message : 'Unknown error'}</p></main>;
  }

  const pageViews = snapshot.events.filter((event) => event.eventName === 'page_view');
  const clicks = snapshot.events.filter((event) => event.eventName === 'click');
  const sectionViews = snapshot.events.filter((event) => event.eventName === 'section_view');
  const dwell = snapshot.events.filter((event) => event.eventName === 'section_dwell');
  const scrolls = snapshot.events.filter((event) => event.eventName === 'scroll_depth');
  const sessions = new Set(snapshot.events.map((event) => text(event.sessionId)).filter((value) => value !== 'unknown'));
  const visitors = new Set(snapshot.events.map((event) => text(event.visitorHash)).filter((value) => value !== 'unknown'));
  const avgScroll = scrolls.length ? scrolls.reduce((sum, event) => sum + number(event.depthPct), 0) / scrolls.length : null;

  const sectionMap = new Map<string, SectionMetric>();
  const getSection = (name: string) => {
    if (!sectionMap.has(name)) sectionMap.set(name, { name, clicks: 0, dwellMs: 0, dwellSamples: 0, sessions: new Set() });
    return sectionMap.get(name)!;
  };
  for (const event of sectionViews) getSection(text(event.section)).sessions.add(text(event.sessionId));
  for (const event of clicks) { const metric = getSection(text(event.section)); metric.clicks += 1; metric.sessions.add(text(event.sessionId)); }
  for (const event of dwell) { const metric = getSection(text(event.section)); metric.dwellMs += number(event.durationMs); metric.dwellSamples += 1; metric.sessions.add(text(event.sessionId)); }
  const sections = [...sectionMap.values()].sort((a, b) => {
    const ai = sectionOrder.indexOf(a.name); const bi = sectionOrder.indexOf(b.name);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
  });
  const attention = [...sections].filter((section) => section.dwellMs > 0).sort((a, b) => b.dwellMs - a.dwellMs);
  const mostClicked = [...sections].sort((a, b) => b.clicks - a.clicks)[0];
  let biggestDrop: { from: string; to: string; loss: number } | null = null;
  for (let index = 1; index < sections.length; index += 1) {
    const previous = sections[index - 1];
    const current = sections[index];
    if (!previous || !current) continue;
    const loss = previous.sessions.size - current.sessions.size;
    if (loss > 0 && (!biggestDrop || loss > biggestDrop.loss)) biggestDrop = { from: previous.name, to: current.name, loss };
  }

  const totalCost = snapshot.requests.reduce((sum, request) => sum + number(request.estimatedUsd), 0);
  const totalTokens = snapshot.requests.reduce((sum, request) => sum + number(request.totalTokens), 0);
  const failures = snapshot.requests.filter((request) => text(request.status) !== 'completed');
  const successRate = snapshot.requests.length ? Math.round((snapshot.requests.length - failures.length) / snapshot.requests.length * 100) : null;
  const latestFailure = failures[0];

  const trend = new Map<string, number>();
  for (let index = 13; index >= 0; index -= 1) trend.set(new Date(Date.now() - index * 86_400_000).toISOString().slice(5, 10), 0);
  for (const event of pageViews) { const day = text(event.occurredAt).slice(5, 10); if (trend.has(day)) trend.set(day, (trend.get(day) || 0) + 1); }
  const maxTrend = Math.max(1, ...trend.values());

  const heatClicks: HeatClick[] = clicks.slice(0, 1_200).map((event) => ({
    occurredAt: text(event.occurredAt), target: text(event.target, 'Page'), section: text(event.section, 'outside-section'),
    xPct: number(event.xPct), yPct: number(event.yPct), viewportXPct: number(event.viewportXPct), viewportYPct: number(event.viewportYPct),
    sectionXPct: event.sectionXPct === null || event.sectionXPct === undefined ? undefined : number(event.sectionXPct),
    sectionYPct: event.sectionYPct === null || event.sectionYPct === undefined ? undefined : number(event.sectionYPct),
  }));

  const partialData = pageViews.length === 0 && snapshot.events.length > 0;
  const metricCards: [string, string, string][] = [
    ['Visitors', compact.format(visitors.size), 'anonymous people'], ['Sessions', compact.format(sessions.size), 'browsing sessions'],
    ['Page views', compact.format(pageViews.length), partialData ? 'partial session data' : 'pages opened'], ['Clicks', compact.format(clicks.length), 'recorded actions'],
    ['Avg. scroll', avgScroll === null ? '—' : `${avgScroll.toFixed(0)}%`, scrolls.length ? `${scrolls.length} completed sessions` : 'waiting for a completed visit'],
    ['RAG requests', compact.format(snapshot.requests.length), `${failures.length} failed`],
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-7 lg:px-10">
      <header className="mx-auto flex max-w-[1500px] items-start justify-between gap-5 border-b border-slate-800 pb-6">
        <div><p className="font-mono text-xs uppercase tracking-[.2em] text-emerald-400">Private · live data</p><h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Portfolio diagnostics</h1><p className="mt-2 text-sm text-slate-400">Last {snapshot.retentionDays} days · updated {new Date(snapshot.generatedAt).toLocaleString('en-IN')}</p></div>
        <div className="flex gap-2"><a href="/" className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-slate-500 hover:text-white">View site</a><LogoutButton /></div>
      </header>

      <div className="mx-auto max-w-[1500px] py-7">
        {partialData && <aside className="mb-5 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-100"><strong>Partial session detected.</strong> Clicks arrived before the page-view event could be stored. Reload the portfolio once after accepting analytics; future visits will include complete traffic, audience, reach, and attention data.</aside>}

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">{metricCards.map(([title, value, detail]) => <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p><p className="mt-2 text-3xl font-bold text-white">{value}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></article>)}</section>

        <section className="mt-5 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5"><p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Strongest interest</p><p className="mt-3 text-xl font-bold text-white">{mostClicked?.clicks ? label(mostClicked.name) : 'Not enough data yet'}</p><p className="mt-2 text-sm text-slate-300">{mostClicked?.clicks ? `${mostClicked.clicks} recorded click${mostClicked.clicks === 1 ? '' : 's'}—check its controls in the map below.` : 'Clicks will reveal which content creates intent.'}</p></article>
          <article className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-5"><p className="text-xs font-bold uppercase tracking-wider text-sky-400">Most attention</p><p className="mt-3 text-xl font-bold text-white">{attention[0] ? label(attention[0].name) : 'Waiting for dwell time'}</p><p className="mt-2 text-sm text-slate-300">{attention[0] ? `${formatDuration(attention[0].dwellMs)} total · ${formatDuration(attention[0].dwellMs / attention[0].dwellSamples)} average.` : 'Leave the site or switch tabs once to close the current viewing session.'}</p></article>
          <article className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-5"><p className="text-xs font-bold uppercase tracking-wider text-rose-400">Needs attention</p><p className="mt-3 text-xl font-bold text-white">{failures.length ? `${failures.length} RAG failure${failures.length === 1 ? '' : 's'}` : biggestDrop ? `${label(biggestDrop.from)} → ${label(biggestDrop.to)}` : 'No clear drop-off yet'}</p><p className="mt-2 text-sm text-slate-300">{failures.length ? text(latestFailure?.error, 'Open the request ledger for failure details.').slice(0, 150) : biggestDrop ? `${biggestDrop.loss} session${biggestDrop.loss === 1 ? '' : 's'} stopped before the next section.` : 'More completed visits are needed for a reliable signal.'}</p></article>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-white">Traffic trend</h2><p className="mt-1 text-sm text-slate-500">Daily page views over 14 days</p></div><span className="rounded-full bg-slate-950 px-3 py-1 text-sm text-slate-400">{pageViews.length} total</span></div><div className="relative mt-6 flex h-56 items-end gap-2">{pageViews.length === 0 && <div className="absolute inset-0 z-10 grid place-items-center rounded-xl border border-dashed border-slate-700 bg-slate-950/90 p-6 text-center"><div><p className="font-bold text-white">No complete page views yet</p><p className="mt-2 text-sm text-slate-400">Reload the portfolio after analytics consent to start the trend.</p></div></div>}{[...trend].map(([day, value]) => <div key={day} className="flex min-w-0 flex-1 flex-col items-center gap-2"><span className="text-xs text-slate-500">{value || ''}</span><div className="w-full rounded-t bg-emerald-400/80" style={{ height: `${Math.max(value ? 8 : 2, value / maxTrend * 160)}px` }} /><span className="text-[11px] text-slate-600">{day}</span></div>)}</div></article>
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-white">AI assistant health</h2><p className="mt-1 text-sm text-slate-500">Usage and reliability</p></div><span className={`h-3 w-3 rounded-full ${failures.length ? 'bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,.8)]' : 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.7)]'}`} /></div><div className="mt-5 grid grid-cols-2 gap-3">{[['Tokens', compact.format(totalTokens)], ['Est. cost', `$${totalCost.toFixed(4)}`], ['Failures', failures.length], ['Success', successRate === null ? '—' : `${successRate}%`]].map(([title, value]) => <div key={String(title)} className="rounded-xl border border-slate-800 bg-slate-950 p-3"><p className="text-xs text-slate-500">{title}</p><p className="mt-1 text-xl font-bold text-white">{value}</p></div>)}</div>{latestFailure && <p className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 p-3 text-sm leading-relaxed text-rose-100"><strong>Latest error:</strong> {text(latestFailure.error, 'Unknown request error')}</p>}</article>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-lg font-bold text-white">Section journey</h2><p className="mt-1 text-sm text-slate-500">Reach, clicks, and average attention in reading order</p></div><span className="text-sm text-slate-500">{sessions.size} tracked session{sessions.size === 1 ? '' : 's'}</span></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead><tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500"><th className="pb-3 font-semibold">Section</th><th className="pb-3 font-semibold">Reached</th><th className="pb-3 font-semibold">Clicks</th><th className="pb-3 font-semibold">Avg. attention</th><th className="pb-3 font-semibold">Signal</th></tr></thead><tbody>{sections.length ? sections.map((section) => { const reach = sessions.size ? Math.round(section.sessions.size / sessions.size * 100) : 0; const avg = section.dwellSamples ? section.dwellMs / section.dwellSamples : 0; return <tr key={section.name} className="border-b border-slate-800/70"><td className="py-4 font-semibold text-white">{label(section.name)}</td><td className="py-4 text-slate-300">{section.sessions.size} · {reach}%</td><td className="py-4 text-slate-300">{section.clicks}</td><td className="py-4 text-slate-300">{formatDuration(avg)}</td><td className="py-4"><div className="h-2 w-28 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-sky-400" style={{ width: `${Math.max(section.sessions.size ? 6 : 0, reach)}%` }} /></div></td></tr>; }) : <tr><td colSpan={5} className="py-10 text-center text-slate-400">No section journey yet. It begins after the next consented page load.</td></tr>}</tbody></table></div></article>
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5"><h2 className="text-lg font-bold text-white">Audience context</h2><p className="mt-1 text-sm text-slate-500">Useful for checking responsive design and reach</p><div className="mt-5 grid gap-5 sm:grid-cols-3 xl:grid-cols-1"><div><p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Devices</p><Ranking rows={countBy(pageViews, 'device')} total={pageViews.length} empty="No device data yet. It arrives with page views." /></div><div><p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Countries</p><Ranking rows={countBy(pageViews, 'country')} total={pageViews.length} empty="No location data locally. Vercel adds country data in production." /></div><div><p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Browsers</p><Ranking rows={countBy(pageViews, 'browser')} total={pageViews.length} empty="No browser data yet. It arrives with page views." /></div></div></article>
        </section>

        <section className="mt-5"><HeatmapExplorer clicks={heatClicks} /></section>

        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-lg font-bold text-white">AI request ledger</h2><p className="mt-1 text-sm text-slate-500">Open a request to inspect its answer, retrieval, tokens, cost, and exact failure.</p></div><span className="text-sm text-slate-500">Newest first · {snapshot.requests.length} stored</span></div><div className="mt-5 space-y-2">{snapshot.requests.length === 0 ? <p className="rounded-xl border border-dashed border-slate-700 bg-slate-950 p-5 text-sm text-slate-400">No AI requests recorded yet.</p> : snapshot.requests.map((request) => <details key={text(request.requestId)} className="group rounded-xl border border-slate-800 bg-slate-950 open:border-emerald-500/40"><summary className="grid cursor-pointer list-none gap-2 p-4 md:grid-cols-[11rem_minmax(0,1fr)_7rem_7rem] md:items-center"><span className="text-xs text-slate-500">{new Date(text(request.occurredAt)).toLocaleString('en-IN')}</span><span className="truncate font-semibold text-slate-200">{text(request.question)}</span><span className="text-xs text-slate-400">{text(request.intent)}</span><span className={`w-fit rounded-full px-2 py-1 text-xs font-bold ${text(request.status) === 'completed' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'}`}>{text(request.status)}</span></summary><div className="grid gap-4 border-t border-slate-800 p-4 lg:grid-cols-2"><div><h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Question</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-100">{text(request.question)}</p><h3 className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">Answer</h3><p className="mt-2 max-h-80 overflow-auto whitespace-pre-wrap text-sm leading-relaxed text-slate-300">{text(request.answer, 'No answer captured')}</p>{request.error ? <><h3 className="mt-5 text-xs font-bold uppercase tracking-wider text-rose-400">Error</h3><p className="mt-2 rounded-lg bg-rose-400/10 p-3 text-sm text-rose-100">{text(request.error)}</p></> : null}</div><div className="grid content-start grid-cols-2 gap-3">{[['Request ID', text(request.requestId)], ['Search query', text(request.searchQuery)], ['Sources', Array.isArray(request.sourceTitles) ? request.sourceTitles.join(', ') || 'none' : 'none'], ['Chunks', number(request.selectedChunkCount)], ['Candidates', number(request.candidateCount)], ['Model time', `${number(request.modelDurationMs)} ms`], ['Input tokens', number(request.inputTokens)], ['Output tokens', number(request.outputTokens)], ['Total tokens', number(request.totalTokens)], ['Est. USD', `$${number(request.estimatedUsd).toFixed(6)}`], ['Est. INR', `₹${number(request.estimatedInr).toFixed(4)}`], ['Visitor', text(request.visitorHash).slice(0, 12)]].map(([title, value]) => <div key={String(title)} className="rounded-lg bg-slate-900 p-3"><p className="text-xs uppercase tracking-wider text-slate-600">{title}</p><p className="mt-1 break-words text-xs font-semibold text-slate-300">{value}</p></div>)}</div></div></details>)}</div></section>
      </div>
    </main>
  );
}
