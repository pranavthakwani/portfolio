'use client';

import { useMemo, useState } from 'react';

export type HeatClick = {
  occurredAt: string;
  target: string;
  section: string;
  xPct: number;
  yPct: number;
  viewportXPct: number;
  viewportYPct: number;
  sectionXPct?: number;
  sectionYPct?: number;
};

const sectionLabel = (value: string) => value
  .replace(/^outside-section$/, 'Page shell')
  .replace(/[-_]+/g, ' ')
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

export function HeatmapExplorer({ clicks }: { clicks: HeatClick[] }) {
  const sections = useMemo(() => {
    const counts = new Map<string, number>();
    for (const click of clicks) counts.set(click.section, (counts.get(click.section) || 0) + 1);
    return [...counts].sort((a, b) => b[1] - a[1]);
  }, [clicks]);
  const [selected, setSelected] = useState(() => sections[0]?.[0] || 'home');
  const selectedClicks = clicks.filter((click) => click.section === selected);
  const targets = useMemo(() => {
    const counts = new Map<string, number>();
    for (const click of selectedClicks) counts.set(click.target, (counts.get(click.target) || 0) + 1);
    return [...counts].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [selectedClicks]);
  const previewAnchor = selected === 'outside-section' || selected === 'home' ? '' : `#${encodeURIComponent(selected)}`;

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-rose-400">Behaviour map</p>
          <h2 className="mt-1 text-xl font-bold text-white">Where people click</h2>
          <p className="mt-1 text-sm text-slate-400">Choose a section to see clicks over the actual portfolio—not an abstract canvas.</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-right">
          <p className="text-2xl font-bold text-white">{selectedClicks.length}</p>
          <p className="text-xs text-slate-500">clicks in this section</p>
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Heatmap section filters">
        {(sections.length ? sections : [['home', 0] as [string, number]]).map(([section, count]) => (
          <button
            type="button"
            key={section}
            onClick={() => setSelected(section)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${selected === section ? 'border-emerald-300 bg-emerald-300 text-slate-950' : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'}`}
          >
            {sectionLabel(section)} <span className="ml-1 opacity-60">{count}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="relative aspect-[16/10] min-h-[28rem] overflow-hidden rounded-xl border border-slate-700 bg-[#faf6ee]">
          <iframe
            key={selected}
            src={`/?analytics-preview=1${previewAnchor}`}
            title={`${sectionLabel(selected)} portfolio preview`}
            loading="lazy"
            tabIndex={-1}
            className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-[#faf6ee]"
          />
          <div className="pointer-events-none absolute inset-0 bg-slate-950/5" />
          {selectedClicks.map((click, index) => {
            const left = click.sectionXPct ?? click.viewportXPct ?? click.xPct;
            const top = click.sectionYPct ?? click.viewportYPct ?? click.yPct;
            return (
              <span
                key={`${click.occurredAt}-${index}`}
                title={`${click.target} · ${sectionLabel(click.section)}`}
                className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-200/90 bg-red-500/55 shadow-[0_0_0_10px_rgba(239,68,68,.16),0_0_26px_rgba(239,68,68,.8)]"
                style={{ left: `${Math.min(98, Math.max(2, left))}%`, top: `${Math.min(96, Math.max(4, top))}%` }}
              />
            );
          })}
          {selectedClicks.length === 0 && (
            <div className="absolute inset-0 grid place-items-center bg-slate-950/65 p-6 text-center backdrop-blur-[2px]">
              <div>
                <p className="text-lg font-bold text-white">No clicks recorded here yet</p>
                <p className="mt-2 max-w-md text-sm text-slate-300">Open the site, use this section normally, then return to diagnostics. New clicks will appear over this preview.</p>
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <h3 className="font-bold text-white">Clicked controls</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">This turns the dots into something actionable.</p>
          <div className="mt-5 space-y-3">
            {targets.length ? targets.map(([target, count], index) => (
              <div key={target}>
                <div className="flex items-start justify-between gap-3 text-sm">
                  <span className="min-w-0 truncate text-slate-300"><span className="mr-2 text-slate-600">{index + 1}</span>{target}</span>
                  <span className="font-bold text-white">{count}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-rose-400" style={{ width: `${Math.max(8, count / Math.max(1, selectedClicks.length) * 100)}%` }} />
                </div>
              </div>
            )) : <p className="rounded-lg border border-dashed border-slate-700 p-4 text-sm leading-relaxed text-slate-500">No control rankings yet. This panel fills automatically with real clicks.</p>}
          </div>
          <p className="mt-6 rounded-lg bg-slate-900 p-3 text-xs leading-relaxed text-slate-400">Red dots show click positions. New events use section-relative coordinates for a closer visual match; older points use their original viewport position.</p>
        </aside>
      </div>
    </article>
  );
}
