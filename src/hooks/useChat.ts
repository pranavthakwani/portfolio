'use client';

import { useState, useCallback, useRef } from 'react';
import type { ChatMessage } from '@/types';
import { mockChatService } from '@/lib/chat/mockChatService';

/* ─── To connect a real backend:
   1. Create src/lib/chat/apiChatService.ts and implement IChatService
   2. Replace `mockChatService` below with your real service
   ─────────────────────────────────────────────────────────────── */
const chatService = mockChatService;

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export interface UseChatReturn {
  messages: ChatMessage[];
  isStreaming: boolean;
  streamingContent: string;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const streamingRef = useRef('');

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      createdAt: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsStreaming(true);
    setStreamingContent('');
    streamingRef.current = '';

    await chatService.send(updatedMessages, {
      onToken: (token) => {
        streamingRef.current += token;
        setStreamingContent(streamingRef.current);
      },
      onComplete: (fullText) => {
        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: fullText,
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsStreaming(false);
        setStreamingContent('');
        streamingRef.current = '';
      },
      onError: (error) => {
        console.error('[useChat] Error:', error);
        const errorMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content:
            "I encountered an error processing your request. Please try again.",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsStreaming(false);
        setStreamingContent('');
        streamingRef.current = '';
      },
    });
  }, [messages, isStreaming]);

  const clearMessages = useCallback(() => {
    chatService.abort();
    setMessages([]);
    setIsStreaming(false);
    setStreamingContent('');
    streamingRef.current = '';
  }, []);

  return { messages, isStreaming, streamingContent, sendMessage, clearMessages };
}
