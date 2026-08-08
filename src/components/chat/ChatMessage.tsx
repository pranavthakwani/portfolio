'use client';

import { motion } from 'framer-motion';
import type { ChatMessage as ChatMessageType } from '@/types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { TypingIndicator } from './TypingIndicator';

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
  streamingContent?: string;
}

/* ── Assistant avatar ───────────────────────────────────────────────── */
function AssistantAvatar() {
  return (
    <div className="shrink-0 w-8 h-8 rounded-xl border border-teal-300 bg-teal-50 flex items-center justify-center shadow-soft -rotate-3">
      <span className="font-accent text-lg font-bold leading-none text-teal-700">P</span>
    </div>
  );
}

/* ── User message bubble ─────────────────────────────────────────────  */
function UserBubble({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-end"
    >
      <div className="chat-bubble-user max-w-[80%]">
        <p className="text-xs text-ink-800 leading-relaxed">{content}</p>
      </div>
    </motion.div>
  );
}

/* ── Assistant message bubble ───────────────────────────────────────── */
function AssistantBubble({
  content,
  isStreaming,
  streamingContent,
}: {
  content: string;
  isStreaming?: boolean;
  streamingContent?: string;
}) {
  const displayContent = isStreaming ? (streamingContent ?? '') : content;
  const showTyping = isStreaming && !displayContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-2.5"
    >
      <AssistantAvatar />

      <div className="chat-bubble-assistant flex-1 min-w-0">
        {showTyping ? (
          <TypingIndicator />
        ) : (
          <>
            <MarkdownRenderer content={displayContent} />
            {/* Streaming cursor */}
            {isStreaming && (
              <span className="inline-block w-0.5 h-3.5 bg-ink-400 ml-0.5 animate-cursor-blink align-middle" />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ── Combined export ────────────────────────────────────────────────── */
export function ChatMessage({
  message,
  isStreaming,
  streamingContent,
}: ChatMessageProps) {
  if (message.role === 'user') {
    return <UserBubble content={message.content} />;
  }

  return (
    <AssistantBubble
      content={message.content}
      isStreaming={isStreaming}
      streamingContent={streamingContent}
    />
  );
}

/* ── Streaming placeholder (shown while waiting for first token) ───── */
export function StreamingAssistantMessage({
  streamingContent,
  hasStarted,
}: {
  streamingContent: string;
  hasStarted: boolean;
}) {
  return (
    <AssistantBubble
      content=""
      isStreaming
      streamingContent={hasStarted ? streamingContent : ''}
    />
  );
}
