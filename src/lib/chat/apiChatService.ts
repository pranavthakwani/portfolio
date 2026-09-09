import type { ChatMessage, ChatServiceOptions, IChatService } from '@/types';
import { browserVisitorId } from '@/lib/analytics/identity';

interface ApiChatRequest {
  message: string;
  messages: Array<Pick<ChatMessage, 'role' | 'content'>>;
}

const MAX_HISTORY_MESSAGES = 12;

export class ApiChatService implements IChatService {
  private abortController: AbortController | null = null;

  async send(messages: ChatMessage[], options: ChatServiceOptions): Promise<void> {
    this.abort();
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    const lastUserIndex = messages.findLastIndex((message) => message.role === 'user');
    const lastUserMessage = messages[lastUserIndex];

    if (!lastUserMessage) {
      this.abortController = null;
      options.onError(new Error('A user message is required.'));
      return;
    }

    const request: ApiChatRequest = {
      message: lastUserMessage.content,
      messages: messages
        .slice(Math.max(0, lastUserIndex - MAX_HISTORY_MESSAGES), lastUserIndex)
        .map(({ role, content }) => ({ role, content })),
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-visitor-id': browserVisitorId() },
        body: JSON.stringify(request),
        cache: 'no-store',
        signal,
      });

      if (!response.ok) {
        throw new Error(await this.errorMessage(response));
      }
      if (!response.body) {
        throw new Error('The chat service returned no response stream.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      for (;;) {
        const chunk = await reader.read();
        if (chunk.done) break;
        const token = decoder.decode(chunk.value, { stream: true });
        if (token) {
          fullText += token;
          options.onToken(token);
        }
      }

      const finalToken = decoder.decode();
      if (finalToken) {
        fullText += finalToken;
        options.onToken(finalToken);
      }
      if (!signal.aborted) options.onComplete(fullText);
    } catch (error) {
      if (!signal.aborted) {
        options.onError(error instanceof Error ? error : new Error('Unknown chat service error.'));
      }
    } finally {
      if (this.abortController?.signal === signal) this.abortController = null;
    }
  }

  abort(): void {
    this.abortController?.abort();
    this.abortController = null;
  }

  private async errorMessage(response: Response): Promise<string> {
    try {
      const payload = await response.json() as { error?: { message?: string; requestId?: string } };
      const message = payload.error?.message ?? 'The chat service request failed.';
      return payload.error?.requestId ? `${message} Request ID: ${payload.error.requestId}` : message;
    } catch {
      return `The chat service request failed with status ${response.status}.`;
    }
  }
}

export const apiChatService = new ApiChatService();
