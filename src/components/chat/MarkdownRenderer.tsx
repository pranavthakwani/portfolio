'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { Components } from 'react-markdown';
import type { CSSProperties } from 'react';

// Register only the languages we need (lighter bundle)
SyntaxHighlighter.registerLanguage('tsx', tsx);

// Type compatibility shim — react-syntax-highlighter typing lags @types/react 18
const Prism = SyntaxHighlighter as any; // eslint-disable-line
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('py', python);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('json', json);

/* ── Custom theme — dark surface matching our design system ─────────── */
const codeTheme: { [key: string]: CSSProperties } = {
  'code[class*="language-"]': {
    color: '#e2e8f0',
    background: 'none',
    fontFamily: 'var(--font-mono), Consolas, monospace',
    fontSize: '12px',
    lineHeight: '1.7',
  },
  'pre[class*="language-"]': {
    background: '#1e1e2e',
    padding: '1rem',
    overflow: 'auto',
    borderRadius: '0.75rem',
  },
  'comment': { color: '#6272a4', fontStyle: 'italic' },
  'string': { color: '#a8e3a9' },
  'keyword': { color: '#bd93f9' },
  'function': { color: '#8be9fd' },
  'number': { color: '#ffb86c' },
  'operator': { color: '#ff79c6' },
  'class-name': { color: '#f1fa8c' },
  'builtin': { color: '#ffb86c' },
  'boolean': { color: '#bd93f9' },
  'property': { color: '#8be9fd' },
  'punctuation': { color: '#cdd6f4' },
  'plain': { color: '#e2e8f0' },
};

/* ── Copy button for code blocks ───────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      aria-label="Copy code"
      className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-150"
    >
      {copied ? (
        <>
          <Check size={11} /> Copied
        </>
      ) : (
        <>
          <Copy size={11} /> Copy
        </>
      )}
    </button>
  );
}

/* ── Code block wrapper with header ────────────────────────────────── */
function CodeBlock({ language, children }: { language: string; children: string }) {
  return (
    <div className="my-3 rounded-xl overflow-hidden border border-white/[0.06]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#181825] border-b border-white/[0.06]">
        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider font-mono">
          {language || 'code'}
        </span>
        <CopyButton text={children} />
      </div>
      {/* Highlighted code */}
      <Prism
        language={language || 'text'}
        style={codeTheme}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: '#1e1e2e',
          fontSize: '12px',
        }}
        PreTag="div"
      >
        {children}
      </Prism>
    </div>
  );
}

/* ── Markdown component overrides ──────────────────────────────────── */
const components: Components = {
  // Code — inline vs block
  code({ className, children, ...rest }) {
    const match = /language-(\w+)/.exec(className ?? '');
    const isBlock = !!match;
    const content = String(children).replace(/\n$/, '');

    if (isBlock) {
      return <CodeBlock language={match?.[1] ?? 'text'}>{content}</CodeBlock>;
    }

    return (
      <code
        className="bg-ink-100 text-ink-700 px-1.5 py-0.5 rounded text-[11px] font-mono"
        {...rest}
      >
        {children}
      </code>
    );
  },

  // Pre wrapper — SyntaxHighlighter renders its own pre, so we just pass through
  pre({ children }) {
    return <>{children}</>;
  },

  // Table
  table({ children }) {
    return (
      <div className="overflow-x-auto my-3">
        <table className="w-full text-xs border-collapse">{children}</table>
      </div>
    );
  },
  th({ children }) {
    return (
      <th className="text-left font-semibold text-ink-700 border-b border-ink-200 pb-2 pr-4 text-xs whitespace-nowrap">
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td className="text-ink-600 border-b border-ink-100 py-1.5 pr-4 align-top text-xs">
        {children}
      </td>
    );
  },

  // Blockquote
  blockquote({ children }) {
    return (
      <blockquote className="border-l-2 border-purple-300 pl-3 text-ink-500 italic my-2 text-xs">
        {children}
      </blockquote>
    );
  },

  // Links — open external in new tab
  a({ href, children }) {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="text-purple-500 hover:text-purple-700 underline underline-offset-2 decoration-purple-300 hover:decoration-purple-500 transition-colors"
      >
        {children}
      </a>
    );
  },

  // Strong
  strong({ children }) {
    return <strong className="font-semibold text-ink-900">{children}</strong>;
  },

  // Headings inside chat
  h1({ children }) { return <h3 className="font-bold text-ink-900 text-sm mt-4 mb-2 first:mt-0">{children}</h3>; },
  h2({ children }) { return <h4 className="font-semibold text-ink-900 text-xs mt-3 mb-1.5 first:mt-0">{children}</h4>; },
  h3({ children }) { return <h5 className="font-semibold text-ink-800 text-xs mt-2 mb-1 first:mt-0">{children}</h5>; },

  // Paragraphs
  p({ children }) { return <p className="mb-2.5 last:mb-0 leading-relaxed">{children}</p>; },

  // Lists
  ul({ children }) { return <ul className="mb-2.5 pl-4 list-disc space-y-1">{children}</ul>; },
  ol({ children }) { return <ol className="mb-2.5 pl-4 list-decimal space-y-1">{children}</ol>; },
  li({ children }) { return <li className="leading-relaxed">{children}</li>; },

  // HR
  hr() { return <hr className="my-3 border-ink-100" />; },
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Renders AI assistant responses with full markdown support.
 * Code blocks have syntax highlighting and a copy button.
 */
export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={`prose-chat text-xs ${className ?? ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
