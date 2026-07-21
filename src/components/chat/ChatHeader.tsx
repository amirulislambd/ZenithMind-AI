"use client";

import { Trash2, Sparkles } from "lucide-react";

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
    <div
      className="
        flex
        items-center
        justify-between
        border-b
        border-white/10
        px-4
        py-4
        sm:px-6
      "
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-500
              text-white
            "
          >
            <Sparkles className="h-4 w-4" />
          </div>

          <div>
            <h2 className="truncate text-lg font-semibold text-white">
              ZenithMind AI Coach
            </h2>

            <p className="text-xs text-slate-400">Online • Ready to help</p>
          </div>
        </div>
      </div>

      <button
        onClick={onClear}
        disabled={disableClear}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-rose-500/20
          bg-rose-500/10
          px-3
          py-2
          text-sm
          font-medium
          text-rose-300
          transition-all
          hover:bg-rose-500/20
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <Trash2 className="h-4 w-4" />

        <span className="hidden sm:inline">
          {clearing ? "Clearing..." : "Clear"}
        </span>
      </button>
    </div>
  );
}