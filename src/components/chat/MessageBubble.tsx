"use client";

import { IMessage } from "@/src/types/chat";
import { motion } from "framer-motion";
import { Speaker, VolumeX } from "lucide-react";


export default function MessageBubble({
  message,
  messageId,
  isActiveVoice,
  onTogglePlayback,
}: {
  message: IMessage;
  messageId: string;
  isActiveVoice: boolean;
  onTogglePlayback: () => void;
}) {
  const isAssistant = message.role === "model";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22 }}
      className={`mb-3 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[92%] sm:max-w-[80%] ${message.role === "user" ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl border px-4 py-3 shadow-sm backdrop-blur ${
            message.role === "user"
              ? "border-indigo-500/30 bg-indigo-600/25 text-slate-50"
              : "border-slate-700/50 bg-slate-800/60 text-slate-100"
          }`}
        >
          <div className="whitespace-pre-wrap text-sm leading-7">{message.content}</div>
          <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-slate-400">
            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
            {isAssistant && (
              <button
                type="button"
                onClick={onTogglePlayback}
                className={`rounded-full border p-1.5 transition-all ${
                  isActiveVoice
                    ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-200"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
                }`}
                aria-label="Toggle voice playback"
              >
                {isActiveVoice ? <VolumeX className="h-3.5 w-3.5" /> : <Speaker className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}