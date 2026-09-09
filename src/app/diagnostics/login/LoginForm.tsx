'use client';

import { FormEvent, useState } from 'react';

export function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true); setError('');
    const response = await fetch('/api/diagnostics/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password }) });
    setLoading(false);
    if (response.ok) location.assign('/diagnostics');
    else setError('That password is not correct.');
  };
  return (
    <form onSubmit={submit} className="w-full max-w-md rounded-[2rem] border-2 border-slate-700 bg-slate-900 p-7 shadow-[10px_12px_0_rgba(34,197,94,.25)]">
      <p className="mb-2 font-mono text-xs uppercase tracking-[.22em] text-emerald-400">Private workspace</p>
      <h1 className="font-accent text-4xl font-bold text-white">Portfolio diagnostics</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">Traffic, heatmaps, engagement, and the complete RAG request ledger.</p>
      <label className="mt-7 block text-sm font-semibold text-slate-200" htmlFor="password">Dashboard password</label>
      <input id="password" type="password" autoFocus autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-400" />
      {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
      <button disabled={loading || !password} className="mt-5 w-full rounded-xl bg-emerald-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-50">{loading ? 'Checking…' : 'Open diagnostics'}</button>
      <a href="/" className="mt-5 block text-center text-sm text-slate-500 hover:text-slate-300">← Back to portfolio</a>
    </form>
  );
}

