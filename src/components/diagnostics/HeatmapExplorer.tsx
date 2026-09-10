'use client';

import { useEffect, useRef, useState } from 'react';

export type HeatClick = {
  occurredAt: string;
  target: string;
  section: string;
  xPct: number;
  yPct: number;
};

export type AttentionPoint = { section: string; averageMs: number; samples: number };

const label = (value: string) => value
  .replace(/^outside-section$/, 'Page shell')
  .replace(/[-_]+/g, ' ')
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatDuration = (milliseconds: number) => {
  const seconds = Math.round(milliseconds / 1_000);
  if (seconds < 60) return `${seconds}s avg.`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s avg.`;
};

export function HeatmapExplorer({ clicks, attention }: { clicks: HeatClick[]; attention: AttentionPoint[] }) {
  const [open, setOpen] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const addMarkers = () => {
    const frame = frameRef.current;
    const document = frame?.contentDocument;
    if (!document?.body) return;
    document.getElementById('portfolio-behaviour-map-layer')?.remove();
    document.getElementById('portfolio-behaviour-map-style')?.remove();

    const style = document.createElement('style');
    style.id = 'portfolio-behaviour-map-style';
    style.textContent = `
      #portfolio-behaviour-map-layer { position:absolute; inset:0 auto auto 0; z-index:2147483646; width:100%; pointer-events:none; }
      .portfolio-map-dot { position:absolute; width:30px; height:30px; transform:translate(-50%,-50%); border-radius:999px; background:rgba(239,68,68,.72); border:2px solid rgba(254,240,138,.98); box-shadow:0 0 0 9px rgba(239,68,68,.18),0 0 24px rgba(239,68,68,.82); }
      .portfolio-map-dot span { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); color:#fff; font:700 11px/1 system-ui,sans-serif; text-shadow:0 1px 2px #7f1d1d; }
      .portfolio-map-attention { position:absolute; left:18px; z-index:2; border:1px solid rgba(16,185,129,.9); border-radius:999px; padding:7px 10px; background:rgba(6,78,59,.92); color:#ecfdf5; font:700 12px/1.2 system-ui,sans-serif; box-shadow:0 4px 14px rgba(6,78,59,.3); }
      a, button, input, textarea, select { pointer-events:none !important; }
    `;
    document.head.append(style);

    const layer = document.createElement('div');
    layer.id = 'portfolio-behaviour-map-layer';
    const documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, document.documentElement.offsetHeight);
    layer.style.height = `${documentHeight}px`;
    document.body.style.position = 'relative';

    const clusters = new Map<string, HeatClick[]>();
    for (const click of clicks) {
      const key = `${Math.round(click.xPct / 2) * 2}-${Math.round(click.yPct / 2) * 2}`;
      clusters.set(key, [...(clusters.get(key) || []), click]);
    }
    for (const group of clusters.values()) {
      const first = group[0];
      if (!first) continue;
      const dot = document.createElement('div');
      dot.className = 'portfolio-map-dot';
      dot.style.left = `${Math.min(98, Math.max(2, first.xPct))}%`;
      dot.style.top = `${Math.min(99, Math.max(1, first.yPct))}%`;
      dot.title = group.map((click) => `${click.target} · ${label(click.section)}`).join('\n');
      if (group.length > 1) {
        const count = document.createElement('span');
        count.textContent = String(group.length);
        dot.append(count);
      }
      layer.append(dot);
    }

    for (const point of attention) {
      const section = document.getElementById(point.section);
      if (!section) continue;
      const badge = document.createElement('div');
      badge.className = 'portfolio-map-attention';
      badge.style.top = `${Math.max(10, section.offsetTop + 14)}px`;
      badge.textContent = `Viewed: ${label(point.section)} · ${formatDuration(point.averageMs)}`;
      layer.append(badge);
    }
    document.body.append(layer);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKeyDown); };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group block w-full rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:-translate-y-0.5 hover:border-rose-400/60 hover:bg-slate-900/80 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-rose-400">Behaviour map</p><h2 className="mt-1 text-xl font-bold text-white">Open the scrollable site view</h2><p className="mt-1 text-sm text-slate-400">Scroll through the actual portfolio with recorded clicks and attention markers directly on top of it.</p></div><span className="rounded-xl bg-rose-400 px-4 py-3 text-sm font-bold text-slate-950 transition group-hover:bg-rose-300">Explore map →</span></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-slate-800 bg-slate-950 p-4"><p className="text-2xl font-bold text-white">{clicks.length}</p><p className="mt-1 text-xs text-slate-500">recorded clicks</p></div><div className="rounded-xl border border-slate-800 bg-slate-950 p-4"><p className="text-2xl font-bold text-white">{attention.length}</p><p className="mt-1 text-xs text-slate-500">attention signals</p></div><div className="rounded-xl border border-slate-800 bg-slate-950 p-4"><p className="text-sm font-semibold text-emerald-300">Red = clicks</p><p className="mt-1 text-sm font-semibold text-emerald-300">Green = attention</p></div></div>
      </button>

      {open && <div role="dialog" aria-modal="true" aria-label="Scrollable portfolio behaviour map" className="fixed inset-0 z-[200] bg-slate-950">
        <header className="absolute inset-x-0 top-0 z-10 flex min-h-16 items-center justify-between gap-4 border-b border-slate-700 bg-slate-950/95 px-4 py-3 backdrop-blur sm:px-6"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-rose-400">Behaviour map</p><p className="mt-1 text-sm text-slate-300">Scroll the real site. Red dots are clicks; green labels show sections where people stayed.</p></div><button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-bold text-white hover:border-slate-400">Close</button></header>
        <iframe ref={frameRef} src="/?analytics-preview=1" title="Scrollable portfolio with analytics markers" onLoad={() => { addMarkers(); window.setTimeout(addMarkers, 1_000); }} className="h-full w-full border-0 pt-[4.75rem]" />
        {!clicks.length && <div className="pointer-events-none absolute inset-x-0 top-24 z-10 mx-auto w-fit rounded-full bg-slate-950/90 px-4 py-2 text-sm text-slate-300 shadow-lg">No clicks yet—use the portfolio normally, then reload this map.</div>}
      </div>}
    </>
  );
}
