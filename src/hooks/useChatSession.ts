"use client";

import { useEffect, useRef, useState } from "react";
import { streamChat, getChatHistory, clearChatHistory } from "@/src/lib/api/ai";
import type { IMessage, PlanStep } from "@/src/types/chat";

interface UseChatSessionOptions {
  onAssistantReply?: (fullText: string, viaVoice: boolean) => void;
}

export function useChatSession({
  onAssistantReply,
}: UseChatSessionOptions = {}) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [typingActive, setTypingActive] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const [plan, setPlan] = useState<PlanStep[]>([]);
  const [clearing, setClearing] = useState(false);

  const assistantIdxRef = useRef<number>(-1);
  const messagesRef = useRef<IMessage[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    let mounted = true;
    getChatHistory()
      .then((res: any) => {
        if (!mounted) return;
        if (Array.isArray(res)) {
          setMessages(
            res.map((m: any) => ({
              role: m.role,
              content: m.content,
              timestamp: m.timestamp,
            })),
          );
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  async function handleClear() {
    if (!confirm("Clear all chat history? This cannot be undone.")) return;
    setClearing(true);
    await clearChatHistory();
    setMessages([]);
    setFollowUps([]);
    setPlan([]);
    setClearing(false);
  }

  // `viaVoice` = true only when this message originated from the Voice Mode
  // conversation window. It determines whether the reply gets spoken aloud.
  async function handleSend(text: string, viaVoice: boolean = false) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    // Sanitize and snapshot the recent conversation history to avoid context leakage
    const historySnapshot = messagesRef.current.slice(-8).map((m) => ({
      role: m.role,
      content: m.content,
      timestamp: m.timestamp,
    }));

    const userMsg: IMessage = {
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => {
      const withUser = [...prev, userMsg];
      const withPlaceholder = [
        ...withUser,
        {
          role: "model" as const,
          content: "",
          timestamp: new Date().toISOString(),
        },
      ];
      assistantIdxRef.current = withPlaceholder.length - 1;
      return withPlaceholder;
    });

    setFollowUps([]);
    setPlan([]);
    setIsStreaming(true);
    setTypingActive(true);

    let fullText = "";

    try {
      for await (const event of streamChat(trimmed, historySnapshot)) {
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
          if (Array.isArray(event.suggestions)) {
            setFollowUps(event.suggestions.slice(0, 3).map(String));
          }
          if (Array.isArray(event.plan)) {
            setPlan((event.plan as PlanStep[]).slice(0, 3));
          }
        }
      }

      if (fullText.trim()) onAssistantReply?.(fullText, viaVoice);
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

  return {
    messages,
    isStreaming,
    typingActive,
    followUps,
    plan,
    clearing,
    handleSend,
    handleClear,
  };
}