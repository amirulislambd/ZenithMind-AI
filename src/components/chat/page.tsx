"use client";
import React, { useEffect, useRef, useState } from "react";
import { streamChat, getChatHistory, clearChatHistory } from "../../lib/api/ai";
import type { IMessage } from "../../types/chat";

interface PlanStep {
  title: string;
  detail: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [plan, setPlan] = useState<PlanStep[]>([]);
  const [typingActive, setTypingActive] = useState(false);
  const [clearing, setClearing] = useState(false);

  // Use a ref so the index is always current inside async callbacks
  const assistantIdxRef = useRef<number>(-1);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* ── Auto-scroll ── */
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typingActive]);

  /* ── Load history on mount ── */
  useEffect(() => {
    let mounted = true;
    getChatHistory()
      .then((res: any) => {
        if (!mounted) return;
        if (Array.isArray(res))
          setMessages(
            res.map((m: any) => ({
              role: m.role,
              content: m.content,
              timestamp: m.timestamp,
            }))
          );
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  /* ── Clear chat history ── */
  async function handleClear() {
    if (!confirm("Clear all chat history? This cannot be undone.")) return;
    setClearing(true);
    await clearChatHistory();
    setMessages([]);
    setFollowUps([]);
    setPlan([]);
    setClearing(false);
  }

  /* ── Send a message ── */
  async function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    const historySnapshot = messages.slice(-8);
    const userMsg: IMessage = {
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    // Add user message, then add the empty assistant placeholder in the SAME
    // functional update batch so we can capture the correct index via the ref.
    setMessages((prev) => {
      const withUser = [...prev, userMsg];
      const withPlaceholder = [
        ...withUser,
        { role: "model" as const, content: "", timestamp: new Date().toISOString() },
      ];
      assistantIdxRef.current = withPlaceholder.length - 1;
      return withPlaceholder;
    });

    setInput("");
    setFollowUps([]);
    setPlan([]);
    setIsStreaming(true);
    setTypingActive(true);

    let fullText = "";

    try {
      for await (const event of streamChat(trimmed, historySnapshot)) {
        // First event received → hide typing indicator
        if (typingActive) setTypingActive(false);

        if ("chunk" in event) {
          fullText += event.chunk;
          const idx = assistantIdxRef.current;
          setMessages((prev) => {
            if (idx < 0 || idx >= prev.length) return prev;
            const updated = [...prev];
            updated[idx] = { ...updated[idx], content: fullText };
            return updated;
          });
        } else if ("suggestions" in event) {
          if (Array.isArray(event.suggestions))
            setFollowUps(event.suggestions.slice(0, 3).map(String));
          if (Array.isArray(event.plan))
            setPlan((event.plan as PlanStep[]).slice(0, 3));
        }
      }
    } catch (err) {
      console.error("Chat stream error:", err);
      const idx = assistantIdxRef.current;
      setMessages((prev) => {
        if (idx < 0 || idx >= prev.length) return prev;
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          content:
            fullText ||
            "Sorry — the AI is temporarily unavailable. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
      setTypingActive(false);
    }
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    handleSend(input);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-neutral-50 rounded-2xl shadow-sm p-6">
        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-2xl font-semibold text-[#0b1220]">
              ZenithMind AI — Executive Coach
            </h2>
            <p className="text-sm text-neutral-600 mt-0.5">
              Ask in any language — Bengali, English, or any other. I'll reply in the same language.
            </p>
          </div>
          <button
            onClick={handleClear}
            disabled={clearing || isStreaming || messages.length === 0}
            className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-40 transition-colors whitespace-nowrap"
          >
            {clearing ? "Clearing…" : "Clear Chat"}
          </button>
        </div>

        {/* ── Message thread ── */}
        <div
          ref={scrollRef}
          className="h-[60vh] overflow-y-auto rounded-xl p-4 bg-white border border-neutral-200 mt-4"
        >
          {messages.length === 0 && !typingActive && (
            <div className="flex h-full items-center justify-center">
              <p className="text-neutral-400 text-sm text-center">
                No messages yet. Say hello!<br />
                <span className="text-xs">আমি বাংলায়ও কথা বলতে পারি।</span>
              </p>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={`${m.role}-${m.timestamp}-${i}`}
              className={`mb-3 flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-xl ${
                  m.role === "user"
                    ? "bg-accent text-white"
                    : "bg-neutral-100 text-neutral-900"
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
                <div className="text-xs text-neutral-400 mt-1 opacity-70">
                  {new Date(m.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {/* ── Typing indicator ── */}
          {typingActive && (
            <div className="mb-3 flex justify-start">
              <div className="p-3 rounded-xl bg-neutral-100">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:0ms]" />
                  <span className="h-2 w-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:150ms]" />
                  <span className="h-2 w-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Input form ── */}
        <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything… বাংলায় লিখতে পারেন।"
            disabled={isStreaming}
            className="flex-1 border rounded-xl px-4 py-2 bg-white disabled:opacity-60 text-sm"
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="px-4 py-2 rounded-xl bg-accent text-white disabled:opacity-60 text-sm font-medium"
          >
            {isStreaming ? "…" : "Send"}
          </button>
        </form>

        {/* ── Agentic reasoning plan ── */}
        {plan.length > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
              Agentic Reasoning
            </p>
            <ul className="space-y-1">
              {plan.map((step, i) => (
                <li key={i} className="text-sm text-blue-900">
                  <span className="font-medium">{step.title}:</span> {step.detail}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Follow-up suggestion chips ── */}
        {followUps.length > 0 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {followUps.map((f, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(f)}
                disabled={isStreaming}
                className="px-3 py-1.5 rounded-full bg-secondary text-white whitespace-nowrap text-xs disabled:opacity-60 hover:opacity-90 transition-opacity"
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
