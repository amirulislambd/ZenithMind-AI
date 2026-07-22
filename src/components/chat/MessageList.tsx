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
  activeVoiceMessageId?: string | null;
  onTogglePlayback?: (messageId: string, message: IMessage) => void;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typingActive]);

  return (
    <div className="relative h-full">
      <div
        ref={scrollRef}
        className="
          h-full
          overflow-y-auto
          rounded-2xl
          border
          border-white/10
          bg-[radial-gradient(circle_at_20%_0%,rgba(99,102,241,0.10),transparent_45%),radial-gradient(circle_at_100%_100%,rgba(56,189,248,0.06),transparent_40%)]
          bg-slate-900/70
          p-2.5
          shadow-inner
          shadow-black/30

          scrollbar-thin
          scrollbar-track-transparent
          scrollbar-thumb-indigo-600/50

          sm:p-4
        "
      >
        {messages.length === 0 && !typingActive && (
          <div className="flex h-full items-center justify-center px-4">
            <div
              className="
                relative
                max-w-md
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-slate-800/50
                p-6
                text-center
                shadow-lg
                shadow-black/20

                sm:p-8
              "
            >
              <div
                aria-hidden
                className="
                  pointer-events-none
                  absolute
                  -top-16
                  left-1/2
                  h-40
                  w-40
                  -translate-x-1/2
                  rounded-full
                  bg-indigo-500/25
                  blur-3xl
                "
              />

              <div className="relative mb-4 flex justify-center">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    rounded-full
                    border
                    border-indigo-400/30
                    bg-gradient-to-br
                    from-indigo-500/25
                    to-sky-500/10
                    p-3.5
                    text-indigo-200
                    shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)]
                  "
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
              </div>

              <p className="relative text-sm font-medium text-slate-200">
                No messages yet
              </p>
              <p className="relative mt-1.5 text-sm text-slate-400">
                Start a conversation with ZenithMind AI.
              </p>

              <div className="relative mt-4 flex items-center justify-center gap-2">
                <span className="h-px w-8 bg-white/10" />
                <p className="text-xs text-slate-500">
                  আমি বাংলায়ও কথা বলতে পারি
                </p>
                <span className="h-px w-8 bg-white/10" />
              </div>
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m, i) => {
            const messageId = `${m.role}-${m.timestamp}-${i}`;

            return <MessageBubble key={messageId} message={m} />;
          })}
        </AnimatePresence>

        {typingActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="mb-3 flex justify-start"
          >
            <div
              className="
                flex
                items-center
                gap-2.5
                rounded-2xl
                border
                border-slate-700/50
                bg-slate-800/70
                px-3.5
                py-2.5
                shadow-sm
                backdrop-blur

                sm:px-4
                sm:py-3
              "
            >
              <div
                className="
                  rounded-full
                  border
                  border-indigo-400/20
                  bg-indigo-500/10
                  p-2
                  text-indigo-200
                "
              >
                <Brain className="h-4 w-4" />
              </div>

              <span className="text-sm font-medium text-slate-300">
                ZenithMind AI is thinking
              </span>

              <span className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Fade masks at top/bottom so content doesn't hard-cut at the edges */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-6
          rounded-t-2xl
          bg-gradient-to-b
          from-slate-900/70
          to-transparent
        "
      />
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-6
          rounded-b-2xl
          bg-gradient-to-t
          from-slate-900/70
          to-transparent
        "
      />
    </div>
  );
}