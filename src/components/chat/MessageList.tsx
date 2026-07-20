"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { IMessage } from "@/src/types/chat";


export default function MessageList({
  messages,
  typingActive,
  activeVoiceMessageId,
  onTogglePlayback,
}: {
  messages: IMessage[];
  typingActive: boolean;
  activeVoiceMessageId: string | null;
  onTogglePlayback: (messageId: string, message: IMessage) => void;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typingActive]);

  return (
    <div
      ref={scrollRef}
      className="h-[62vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/70 p-3 shadow-inner shadow-black/30 sm:p-4"
    >
      {messages.length === 0 && !typingActive && (
        <div className="flex h-full items-center justify-center">
          <div className="max-w-md rounded-2xl border border-white/10 bg-slate-800/60 p-6 text-center text-slate-400">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-200">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm">No messages yet. Start a conversation with ZenithMind AI.</p>
            <p className="mt-2 text-xs text-slate-500">আমি বাংলায়ও কথা বলতে পারি।</p>
          </div>
        </div>
      )}

      <AnimatePresence initial={false}>
        {messages.map((m, i) => {
          const messageId = `${m.role}-${m.timestamp}-${i}`;
          return (
            <MessageBubble
              key={messageId}
              message={m}
              messageId={messageId}
              isActiveVoice={activeVoiceMessageId === messageId}
              onTogglePlayback={() => onTogglePlayback(messageId, m)}
            />
          );
        })}
      </AnimatePresence>

      {typingActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 flex justify-start"
        >
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/70 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <div className="rounded-full border border-indigo-400/20 bg-indigo-500/10 p-2 text-indigo-200">
                <Brain className="h-4 w-4" />
              </div>
              <span className="font-medium">ZenithMind AI is thinking...</span>
              <span className="ml-1 flex items-center gap-1">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-400" />
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-400 [animation-delay:150ms]" />
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-400 [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}