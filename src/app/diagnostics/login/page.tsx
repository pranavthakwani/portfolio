import { redirect } from 'next/navigation';
import { LoginForm } from './LoginForm';
import { hasDiagnosticsSession } from '@/lib/diagnostics/auth';

export const dynamic = 'force-dynamic';

export default function DiagnosticsLoginPage() {
  if (hasDiagnosticsSession()) redirect('/diagnostics');
  return <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-12"><LoginForm /></main>;
}

