'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { ChatMessage, StreamingAssistantMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { EmptyState } from './EmptyState';
import { cn } from '@/lib/utils/cn';

export function ChatPanel() {
  const { messages, isStreaming, streamingContent, sendMessage, clearMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;
  const hasStartedStreaming = streamingContent.length > 0;

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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={cn(
        'flex flex-col h-full rounded-2xl overflow-hidden',
        'glass-panel'
      )}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/60 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
          </span>
          <div>
            <span className="text-xs font-semibold text-ink-800 leading-none block">
              Pranav&apos;s AI Assistant
            </span>
            <span className="text-[10px] text-ink-400 leading-none mt-0.5 block">
              Powered by his actual knowledge base
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasMessages && (
            <motion.button
              onClick={clearMessages}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Clear conversation"
              title="Clear conversation"
              className="flex items-center justify-center w-7 h-7 rounded-lg text-ink-300 hover:text-ink-600 hover:bg-white/60 transition-all duration-150"
            >
              <RotateCcw size={13} />
            </motion.button>
          )}
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-50 border border-purple-100/60">
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
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isStreaming && (
              <StreamingAssistantMessage
                streamingContent={streamingContent}
                hasStarted={hasStartedStreaming}
              />
            )}
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
