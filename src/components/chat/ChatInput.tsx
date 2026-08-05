'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Square } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  isStreaming: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  onStop,
  isStreaming,
  disabled = false,
  placeholder = 'Ask anything about my work…',
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || isStreaming || disabled) return;
    onSend(trimmed);
    setValue('');
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [value, isStreaming, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    // Auto-resize up to ~120px
    const ta = e.target;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="p-3 border-t border-ink-100 bg-white/80 backdrop-blur-sm rounded-b-2xl">
      <div
        className={cn(
          'flex items-end gap-2 rounded-xl border transition-all duration-200',
          'bg-paper-100 px-3 py-2.5',
          disabled
            ? 'border-ink-100 opacity-60'
            : 'border-ink-200 focus-within:border-purple-300 focus-within:shadow-purple-glow'
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          aria-label="Chat input"
          className={cn(
            'flex-1 resize-none bg-transparent text-xs text-ink-800 placeholder-ink-300',
            'outline-none leading-relaxed min-h-[20px] max-h-[120px]',
            'scrollbar-none'
          )}
          style={{ scrollbarWidth: 'none' }}
        />

        <motion.button
          onClick={isStreaming ? onStop : handleSend}
          aria-label={isStreaming ? 'Stop generating' : 'Send message'}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className={cn(
            'shrink-0 flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200',
            isStreaming
              ? 'bg-ink-200 text-ink-600 hover:bg-ink-300'
              : canSend
                ? 'bg-purple-500 text-white hover:bg-purple-600 shadow-soft'
                : 'bg-ink-100 text-ink-300 cursor-not-allowed'
          )}
        >
          {isStreaming ? <Square size={11} fill="currentColor" /> : <Send size={11} />}
        </motion.button>
      </div>

      <p className="mt-1.5 text-[10px] text-ink-300 text-center">
        Shift+Enter for new line · powered by a custom RAG pipeline
      </p>
    </div>
  );
}
