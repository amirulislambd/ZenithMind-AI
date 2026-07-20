import type { IMessage } from '@/src/types/chat';

export type SseChunkEvent = { chunk: string };
export type SseDoneEvent = {
  plan: { title: string; detail: string }[];
  suggestions: string[];
  goalReached: boolean;
};
export type SseEvent = SseChunkEvent | SseDoneEvent;

/**
 * Opens an SSE stream to the backend chat endpoint and returns an
 * async-iterable that yields parsed SSE event payloads one at a time.
 * The caller can distinguish chunk events from the final summary event
 * by checking whether `"chunk"` or `"suggestions"` is present in the object.
 */
export async function* streamChat(
  message: string,
  history: IMessage[] = [],
): AsyncGenerator<SseEvent> {
  const res = await fetch('/api/ai/chat', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Chat request failed: ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // SSE frames are separated by double newlines
    const frames = buffer.split('\n\n');
    // keep the last (possibly incomplete) frame in the buffer
    buffer = frames.pop() ?? '';

    for (const frame of frames) {
      // Each frame may have multiple lines; we care about "data: ..." lines
      for (const line of frame.split('\n')) {
        if (!line.startsWith('data:')) continue;
        const raw = line.slice(5).trim();
        if (raw === '[DONE]') return; // sentinel — stop iteration
        try {
          yield JSON.parse(raw) as SseEvent;
        } catch {
          // malformed line — skip
        }
      }
    }
  }
}

// Legacy compatibility shim kept for the Next.js proxy route.
export async function chatStream(message: string, history: IMessage[] = []) {
  const res = await fetch('/api/ai/chat', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  if (!res.ok || !res.body) throw new Error('Streaming failed');
  return res.body; // ReadableStream
}

export async function analyzeCSV(file: File) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/ai/analyze', {
    method: 'POST',
    credentials: 'include',
    body: fd,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Analyze failed');
  }

  const payload = await res.json();
  if (
    payload &&
    typeof payload === "object" &&
    ("success" in payload || "data" in payload)
  ) {
    if (payload.success === false) {
      throw new Error(payload.error || "Analyze failed");
    }
    return payload.data ?? payload;
  }

  return payload;
}

export async function getChatHistory() {
  const res = await fetch('/api/ai/chat/history', {
    credentials: 'include',
  });
  if (!res.ok) return [];
  return res.json();
}

export async function clearChatHistory() {
  const res = await fetch('/api/ai/chat/history', {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.ok;
}
