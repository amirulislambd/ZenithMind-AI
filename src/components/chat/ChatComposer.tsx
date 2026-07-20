"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, SendHorizonal, Speaker } from "lucide-react";

export default function ChatComposer({
  input,
  onInputChange,
  onSubmit,
  isStreaming,
  isListening,
  voiceError,
  onOpenVoiceMode,
  onToggleListening,
}: {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isStreaming: boolean;
  isListening: boolean;
  voiceError: string | null;
  onOpenVoiceMode: () => void;
  onToggleListening: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [input]);

  return (
    <div className="border-t border-white/10 px-3 py-3 sm:px-4 lg:px-6">
      {voiceError && <p className="mb-2 text-sm text-rose-300">{voiceError}</p>}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-slate-900/80 p-2 shadow-inner shadow-black/30">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            placeholder="Ask anything… বাংলায় লিখতে পারেন।"
            disabled={isStreaming}
            rows={1}
            className="max-h-45 min-h-11 flex-1 resize-none border-0 bg-transparent px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 disabled:opacity-60"
          />
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={onOpenVoiceMode}
            className="flex h-11 shrink-0 items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 text-sm text-indigo-100 transition-all hover:border-indigo-400/40 hover:bg-indigo-500/20"
          >
            <Speaker className="h-4 w-4" />
            Voice Mode
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={onToggleListening}
            disabled={isStreaming}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all ${
              isListening
                ? "border-rose-400/40 bg-rose-500/20 text-rose-200 shadow-[0_0_0_3px_rgba(248,113,113,0.18)]"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
            } ${isStreaming ? "opacity-60" : ""}`}
            aria-label="Toggle voice input"
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </motion.button>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={isStreaming || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <SendHorizonal className="h-5 w-5" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}