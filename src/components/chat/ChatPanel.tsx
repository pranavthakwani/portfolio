'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { ChatMessage, StreamingAssistantMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { EmptyState } from './EmptyState';
import { cn } from '@/lib/utils/cn';

export function ChatPanel() {
  const { messages, isStreaming, streamingContent, sendMessage, clearMessages } = useChat();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;
  const hasStartedStreaming = streamingContent.length > 0;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 120;

    if (isNearBottom || isStreaming) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, streamingContent, isStreaming]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={cn(
        'flex flex-col h-full rounded-[1.4rem] overflow-hidden',
        'border-2 border-ink-900/80 bg-[#fffdf8] shadow-[8px_9px_0_rgba(22,163,74,0.18),0_24px_60px_rgba(15,23,42,0.13)]'
      )}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 border-b-2 border-ink-900/10 bg-paper-200/70 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
          </span>
          <div>
            <span className="font-accent text-xl font-bold text-ink-900 leading-none block">
              Ask Pranav&apos;s work
            </span>
            <span className="text-[11px] font-medium text-ink-600 leading-none mt-1 block">
              Answers grounded in real projects and experience
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
          <span aria-hidden="true" className="chat-brush-mark"><i /><i /><i /></span>
        </div>
      </div>

      {/* ── Message area ────────────────────────────────────────────── */}
      <div
        ref={scrollContainerRef}
        className={cn('flex-1 px-5 py-5', hasMessages || isStreaming ? 'overflow-y-auto' : 'overflow-hidden')}
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
