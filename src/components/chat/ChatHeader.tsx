"use client";

import { Speaker, VolumeX, Trash2 } from "lucide-react";

export default function ChatHeader({
  autoSpeak,
  onToggleAutoSpeak,
  onClear,
  clearing,
  disableClear,
}: {
  autoSpeak: boolean;
  onToggleAutoSpeak: () => void;
  onClear: () => void;
  clearing: boolean;
  disableClear: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">ZenithMind AI — Executive Coach</h2>
        <p className="mt-1 text-sm text-slate-400">
          Ask in any language — Bengali, English, or any other. I will reply naturally in the same
          language.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onToggleAutoSpeak}
          className={`rounded-full border px-3 py-1.5 text-sm transition-all ${
            autoSpeak
              ? "border-indigo-500/40 bg-indigo-500/20 text-indigo-200 shadow-[0_0_0_1px_rgba(129,140,248,0.25)]"
              : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
          }`}
        >
          <span className="mr-2 inline-flex items-center">
            {autoSpeak ? <Speaker className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </span>
          {autoSpeak ? "Auto-speak on" : "Auto-speak off"}
        </button>
        <button
          onClick={onClear}
          disabled={disableClear}
          className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1.5 text-sm text-rose-200 transition-colors hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="mr-2 inline-flex items-center">
            <Trash2 className="h-4 w-4" />
          </span>
          {clearing ? "Clearing…" : "Clear chat"}
        </button>
      </div>
    </div>
  );
}