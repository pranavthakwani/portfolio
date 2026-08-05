'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { ChatMessage, StreamingAssistantMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { EmptyState } from './EmptyState';
import { cn } from '@/lib/utils/cn';

/**
 * ChatPanel — the hero of the portfolio.
 *
 * Layout:
 *   ┌────────────────────────────────┐
 *   │  Header (label + disclosure)   │
 *   ├────────────────────────────────┤
 *   │                                │
 *   │  Message list / Empty state    │  ← scrollable
 *   │                                │
 *   ├────────────────────────────────┤
 *   │  Input bar                     │
 *   └────────────────────────────────┘
 *
 * The panel fills the available height of its container (set by Hero).
 */
export function ChatPanel() {
  const { messages, isStreaming, streamingContent, sendMessage, clearMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;
  const hasStartedStreaming = streamingContent.length > 0;

  // Auto-scroll to bottom when new messages / streaming content arrives
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 120;

    if (isNearBottom || isStreaming) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, streamingContent, isStreaming]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={cn(
        'flex flex-col h-full min-h-[520px] rounded-2xl overflow-hidden',
        'bg-white shadow-panel border border-ink-100/80'
      )}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-ink-100 shrink-0">
        <div className="flex items-center gap-2.5">
          {/* Status dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
          </span>

          {/* Label */}
          <div>
            <span className="text-xs font-semibold text-ink-800 leading-none block">
              Pranav&apos;s AI Assistant
            </span>
            <span className="text-[10px] text-ink-400 leading-none mt-0.5 block">
              Powered by a custom RAG pipeline
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {hasMessages && (
            <motion.button
              onClick={clearMessages}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Clear conversation"
              title="Clear conversation"
              className="flex items-center justify-center w-7 h-7 rounded-lg text-ink-300 hover:text-ink-600 hover:bg-paper-200 transition-all duration-150"
            >
              <RotateCcw size={13} />
            </motion.button>
          )}
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-paper-200">
            <Sparkles size={13} className="text-purple-400" />
          </div>
        </div>
      </div>

      {/* ── Message area ────────────────────────────────────────────── */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{ scrollbarWidth: 'thin' }}
      >
        {!hasMessages && !isStreaming ? (
          <EmptyState onPromptSelect={sendMessage} />
        ) : (
          <div className="flex flex-col gap-4">
            {/* Rendered messages */}
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* Streaming assistant response */}
            {isStreaming && (
              <StreamingAssistantMessage
                streamingContent={streamingContent}
                hasStarted={hasStartedStreaming}
              />
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* ── Input ───────────────────────────────────────────────────── */}
      <ChatInput
        onSend={sendMessage}
        isStreaming={isStreaming}
        disabled={false}
      />
    </motion.div>
  );
}
