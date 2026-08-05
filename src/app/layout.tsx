import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Caveat, JetBrains_Mono } from 'next/font/google';
import './globals.css';

/* ─── Fonts ─────────────────────────────────────────────────────────
   next/font automatically self-hosts, preloads, and prevents FOUT.
   CSS variables are injected on <html> and consumed by Tailwind.
   ──────────────────────────────────────────────────────────────── */
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

/* ─── SEO Metadata ───────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://pranav.dev'), // ← replace with your domain
  title: {
    default: 'Pranav — AI Automation Engineer',
    template: '%s | Pranav',
  },
  description:
    'AI Automation Engineer specialising in RAG systems, AI Agents, LLM integrations, MCP servers, and business process automation. Ask my AI assistant anything.',
  keywords: [
    'AI Automation Engineer',
    'RAG systems',
    'AI Agents',
    'LLM integration',
    'MCP servers',
    'workflow automation',
    'LangChain',
    'LangGraph',
  ],
  authors: [{ name: 'Pranav' }],
  creator: 'Pranav',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pranav.dev',
    siteName: 'Pranav — AI Automation Engineer',
    title: 'Pranav — AI Automation Engineer',
    description:
      'I build production-grade AI systems that automate complex business workflows. Interact with my AI assistant to learn more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranav — AI Automation Engineer',
    description: 'I build production-grade AI systems. Talk to my AI assistant to find out more.',
    creator: '@pranav', // ← replace
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#FAFAF8',
  width: 'device-width',
  initialScale: 1,
};

/* ─── Root Layout ────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${caveat.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-paper-100 text-ink-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
