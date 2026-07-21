"use client";

import { Trash2 } from "lucide-react";

export default function ChatHeader({
  onClear,
  clearing,
  disableClear,
}: {
  onClear: () => void;
  clearing: boolean;
  disableClear: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          ZenithMind AI — Executive Coach
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Ask in any language. Use Voice Mode to talk hands-free — replies are
          spoken back automatically there.
        </p>
      </div>
      <button
        onClick={onClear}
        disabled={disableClear}
        className="self-start rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1.5 text-sm text-rose-200 transition-colors hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
      >
        <span className="mr-2 inline-flex items-center">
          <Trash2 className="h-4 w-4" />
        </span>
        {clearing ? "Clearing…" : "Clear chat"}
      </button>
    </div>
  );
}