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
      #portfolio-behaviour-map-layer { position:absolute; inset:0 auto auto 0; z-index:2147483646; width:100%; pointer-events:none; overflow:hidden; mix-blend-mode:multiply; }
      .portfolio-heat-spot { position:absolute; transform:translate(-50%,-50%); border-radius:999px; filter:blur(18px); opacity:.86; }
      .portfolio-heat-cool { background:radial-gradient(circle,rgba(132,204,22,.78) 0%,rgba(163,230,53,.58) 25%,rgba(74,222,128,.28) 52%,rgba(74,222,128,0) 76%); }
      .portfolio-heat-warm { background:radial-gradient(circle,rgba(250,204,21,.92) 0%,rgba(253,224,71,.82) 20%,rgba(132,204,22,.56) 48%,rgba(74,222,128,0) 76%); }
      .portfolio-heat-hot { background:radial-gradient(circle,rgba(239,68,68,.98) 0%,rgba(249,115,22,.96) 14%,rgba(250,204,21,.82) 31%,rgba(132,204,22,.52) 54%,rgba(74,222,128,0) 78%); }
      .portfolio-attention-zone { position:absolute; left:50%; transform:translate(-50%,-50%); border-radius:999px; background:radial-gradient(ellipse,rgba(132,204,22,.34) 0%,rgba(74,222,128,.2) 42%,rgba(74,222,128,0) 74%); filter:blur(28px); }
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
      const key = `${Math.round(click.xPct / 5) * 5}-${Math.round(click.yPct / 2.5) * 2.5}`;
      clusters.set(key, [...(clusters.get(key) || []), click]);
    }
    for (const group of clusters.values()) {
      const first = group[0];
      if (!first) continue;
      const spot = document.createElement('div');
      const strength = group.length >= 4 ? 'hot' : group.length >= 2 ? 'warm' : 'cool';
      const diameter = Math.min(360, 170 + group.length * 30);
      spot.className = `portfolio-heat-spot portfolio-heat-${strength}`;
      spot.style.left = `${Math.min(98, Math.max(2, first.xPct))}%`;
      spot.style.top = `${Math.min(99, Math.max(1, first.yPct))}%`;
      spot.style.width = `${diameter}px`;
      spot.style.height = `${diameter}px`;
      spot.title = group.map((click) => `${click.target} · ${label(click.section)}`).join('\n');
      layer.append(spot);
    }

    const maximumAttention = Math.max(1, ...attention.map((point) => point.averageMs));
    for (const point of attention) {
      const section = document.getElementById(point.section);
      if (!section) continue;
      const zone = document.createElement('div');
      zone.className = 'portfolio-attention-zone';
      zone.style.top = `${section.offsetTop + section.offsetHeight / 2}px`;
      zone.style.width = `${Math.min(document.documentElement.scrollWidth * .9, 1_300)}px`;
      zone.style.height = `${Math.max(220, Math.min(720, section.offsetHeight * .82))}px`;
      zone.style.opacity = String(.25 + (point.averageMs / maximumAttention) * .5);
      zone.title = `${label(point.section)} attention`;
      layer.append(zone);
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
        <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-slate-800 bg-slate-950 p-4"><p className="text-2xl font-bold text-white">{clicks.length}</p><p className="mt-1 text-xs text-slate-500">recorded clicks</p></div><div className="rounded-xl border border-slate-800 bg-slate-950 p-4"><p className="text-2xl font-bold text-white">{attention.length}</p><p className="mt-1 text-xs text-slate-500">attention zones</p></div><div className="rounded-xl border border-slate-800 bg-slate-950 p-4"><div className="h-3 rounded-full bg-gradient-to-r from-lime-400 via-yellow-300 to-red-500" /><p className="mt-2 text-xs font-semibold text-slate-300">Low activity → hotspot</p></div></div>
      </button>

      {open && <div role="dialog" aria-modal="true" aria-label="Scrollable portfolio behaviour map" className="fixed inset-0 z-[200] bg-slate-950">
        <header className="absolute inset-x-0 top-0 z-10 flex min-h-16 items-center justify-between gap-4 border-b border-slate-700 bg-slate-950/95 px-4 py-3 backdrop-blur sm:px-6"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-rose-400">Behaviour heatmap</p><p className="mt-1 text-sm text-slate-300">Scroll the real site. Green shows lower activity, yellow is stronger, and red marks concentrated hotspots.</p></div><button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-bold text-white hover:border-slate-400">Close</button></header>
        <iframe ref={frameRef} src="/?analytics-preview=1" title="Scrollable portfolio with analytics markers" onLoad={() => { addMarkers(); window.setTimeout(addMarkers, 1_000); }} className="h-full w-full border-0 pt-[4.75rem]" />
        {!clicks.length && <div className="pointer-events-none absolute inset-x-0 top-24 z-10 mx-auto w-fit rounded-full bg-slate-950/90 px-4 py-2 text-sm text-slate-300 shadow-lg">No clicks yet—use the portfolio normally, then reload this map.</div>}
      </div>}
    </>
  );
}
