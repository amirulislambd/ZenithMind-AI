import { NextRequest, NextResponse } from 'next/server';

// Required so Next.js does not buffer the SSE response
export const dynamic = 'force-dynamic';
import { GetSessionToken } from '@/src/lib/core/sesstion';
import type { IMessage } from '@/src/types/chat';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function normalizeHistory(history: IMessage[] = []) {
  return (history || []).slice(-8).map((item) => ({
    role: item.role,
    content: String(item.content || '').trim(),
    timestamp: item.timestamp,
  }));
}

function buildAgenticReply(message: string, history: IMessage[] = []) {
  const recentHistory = normalizeHistory(history);
  const recentUserMessage = [...recentHistory].reverse().find((item) => item.role === 'user')?.content || '';
  const topicHint = recentUserMessage ? `You were recently discussing “${recentUserMessage.slice(0, 80)}”. ` : '';
  const lowerMessage = message.toLowerCase();

  let reply = `${topicHint}I’m treating this as an ongoing coaching session, not a one-off prompt. `;

  if (lowerMessage.includes('navigate') || lowerMessage.includes('dashboard') || lowerMessage.includes('where')) {
    reply += 'I can guide you to the relevant page in the app and explain the best next step.';
  } else if (lowerMessage.includes('burnout') || lowerMessage.includes('stress') || lowerMessage.includes('focus') || lowerMessage.includes('tired')) {
    reply += 'I recommend a short reset routine, a priority filter, and a low-friction recovery step for the next 20 minutes.';
  } else if (lowerMessage.includes('plan') || lowerMessage.includes('goal') || lowerMessage.includes('strategy')) {
    reply += 'I can turn this into a practical plan with one immediate action, one support action, and one review checkpoint.';
  } else {
    reply += 'I can help you break this into an actionable next step and keep the context of your earlier messages in mind.';
  }

  const followUps = [
    'Give me a 10-minute reset plan',
    'Show me the best next action for this goal',
    'Help me navigate the app faster',
  ];

  return `${reply}\n\n[${followUps.map((item) => JSON.stringify(item)).join(', ')}]`;
}

function createStreamFromText(text: string) {
  const encoder = new TextEncoder();
  const chunks = text.length
    ? Array.from({ length: Math.ceil(text.length / 120) }, (_, index) => text.slice(index * 120, (index + 1) * 120))
    : [text];

  return new ReadableStream<Uint8Array>({
    start(controller) {
      let index = 0;
      const interval = setInterval(() => {
        if (index >= chunks.length) {
          clearInterval(interval);
          controller.close();
          return;
        }

        controller.enqueue(encoder.encode(chunks[index]));
        index += 1;
      }, 25);
    },
  });
}

export async function POST(req: NextRequest) {
  const token = await GetSessionToken();
  const body = await req.text();
  let parsed: { message?: string; history?: IMessage[] } = {};

  try {
    parsed = JSON.parse(body);
  } catch {
    parsed = {};
  }

  const message = String(parsed.message || '').trim();
  const history = Array.isArray(parsed.history) ? parsed.history : [];

  if (!message) {
    return NextResponse.json({ error: 'Missing message' }, { status: 400 });
  }

  try {
    const response = await fetch(`${BACKEND_API}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ message, history: normalizeHistory(history), agentic: true }),
    });

    if (response.ok && response.body) {
      const contentType = response.headers.get('content-type') || 'text/event-stream';
      return new NextResponse(response.body, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no', // disables Nginx/Vercel proxy buffering
        },
      });
    }
  } catch {
    // fall through to local agentic fallback
  }

  const fallbackText = buildAgenticReply(message, history);
  return new NextResponse(createStreamFromText(fallbackText), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
