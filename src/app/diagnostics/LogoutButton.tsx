'use client';

export function LogoutButton() {
  return <button onClick={async () => { await fetch('/api/diagnostics/logout', { method: 'POST' }); location.assign('/diagnostics/login'); }} className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-slate-500 hover:text-white">Sign out</button>;
}

