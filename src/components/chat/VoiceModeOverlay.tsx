"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Brain, Mic, Pause, Play, Sparkles, Speaker, X } from "lucide-react";

export default function VoiceModeOverlay({
  open,
  isListening,
  typingActive,
  voicePaused,
  activeVoiceMessageId,
  micMuted,
  liveTranscript,
  onClose,
  onToggleMuteMic,
  onTogglePauseVoice,
}: {
  open: boolean;
  isListening: boolean;
  typingActive: boolean;
  voicePaused: boolean;
  activeVoiceMessageId: string | null;
  micMuted: boolean;
  liveTranscript?: string;
  onClose: () => void;
  onToggleMuteMic: () => void;
  onTogglePauseVoice: () => void;
}) {
  const voiceOverlayState = isListening
    ? "Listening..."
    : typingActive
      ? "Thinking..."
      : voicePaused
        ? "Paused"
        : activeVoiceMessageId
          ? "Speaking..."
          : "Ready";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/80 px-2 py-4 backdrop-blur-xl sm:px-4 sm:py-6"
        >
          <motion.div
            initial={{ scale: 0.96, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative flex h-full max-h-190 w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/85 shadow-2xl shadow-black/50 sm:rounded-[32px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.28),transparent_45%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.2),transparent_40%)]" />

            {/* <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                  Voice Mode
                </p>
                <h3 className="mt-1 text-base font-semibold text-white sm:text-xl">
                  Conversational AI, now hands-free
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition-all hover:border-white/20 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div> */}

            <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-6 text-center sm:px-6 sm:py-8">
              <motion.div
                animate={
                  isListening
                    ? {
                        scale: [1, 1.08, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0.25)",
                          "0 0 0 28px rgba(59, 130, 246, 0.08)",
                          "0 0 0 0 rgba(59, 130, 246, 0.25)",
                        ],
                      }
                    : typingActive
                      ? {
                          rotate: 360,
                          scale: [1, 1.04, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(129, 140, 248, 0.24)",
                            "0 0 0 24px rgba(129, 140, 248, 0.1)",
                            "0 0 0 0 rgba(129, 140, 248, 0.24)",
                          ],
                        }
                      : activeVoiceMessageId
                        ? {
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              "0 0 0 0 rgba(16, 185, 129, 0.2)",
                              "0 0 0 26px rgba(16, 185, 129, 0.08)",
                              "0 0 0 0 rgba(16, 185, 129, 0.2)",
                            ],
                          }
                        : { scale: 1 }
                }
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-6 flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-linear-to-br from-indigo-500/40 via-slate-900 to-emerald-400/40 shadow-2xl sm:mb-8 sm:h-44 sm:w-44"
              >
                <div className="flex h-18 w-18 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white sm:h-28 sm:w-28">
                  {isListening ? (
                    <Mic className="h-8 w-8 text-rose-300 sm:h-11 sm:w-11" />
                  ) : typingActive ? (
                    <Brain className="h-8 w-8 text-indigo-200 sm:h-11 sm:w-11" />
                  ) : activeVoiceMessageId ? (
                    <Speaker className="h-8 w-8 text-emerald-200 sm:h-11 sm:w-11" />
                  ) : (
                    <Sparkles className="h-8 w-8 text-indigo-200 sm:h-11 sm:w-11" />
                  )}
                </div>
              </motion.div>

              <div className="mb-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 sm:mb-6">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span>{voiceOverlayState}</span>
              </div>

              {liveTranscript && (
                <p className="mb-4 max-w-md text-sm text-slate-300 sm:mb-6">
                  “{liveTranscript}”
                </p>
              )}

              <div className="flex items-end justify-center gap-1 sm:gap-1.5">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    animate={
                      isListening
                        ? { scaleY: [0.4, 1.2, 0.5, 1.1] }
                        : typingActive
                          ? { scaleY: [0.7, 1.2, 0.7] }
                          : activeVoiceMessageId
                            ? { scaleY: [0.6, 1.1, 0.6, 1.1] }
                            : { scaleY: [0.6, 0.8, 0.6] }
                    }
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: idx * 0.08,
                    }}
                    className="w-1.5 rounded-full bg-linear-to-t from-indigo-500 to-emerald-400 sm:w-2"
                    style={{ height: 14 + idx * 5 }}
                  />
                ))}
              </div>
            </div>

            <div className="relative flex flex-wrap items-center justify-center gap-2 border-t border-white/10 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
              <button
                type="button"
                onClick={onToggleMuteMic}
                className={`rounded-full border px-3 py-2 text-xs transition-all sm:px-4 sm:text-sm ${
                  micMuted
                    ? "border-amber-400/30 bg-amber-500/15 text-amber-100"
                    : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {micMuted ? "Unmute Mic" : "Mute Mic"}
              </button>
              <button
                type="button"
                onClick={onTogglePauseVoice}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition-all hover:border-white/20 hover:bg-white/10 sm:px-4 sm:text-sm"
              >
                {voicePaused ? (
                  <span className="inline-flex items-center gap-1.5 sm:gap-2">
                    <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Resume
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 sm:gap-2">
                    <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Pause
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-2 text-xs text-rose-100 transition-all hover:bg-rose-500/20 sm:px-4 sm:text-sm"
              >
                <span className="inline-flex items-center gap-1.5 sm:gap-2">
                  <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Exit
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}