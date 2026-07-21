"use client";

import { useState } from "react";
import { Trash2, Sparkles } from "lucide-react";

export default function ChatHeader({
  onClear,
  clearing,
  disableClear,
}: {
  onClear: () => Promise<void> | void;
  clearing: boolean;
  disableClear: boolean;
}) {
  const [showClearModal, setShowClearModal] = useState(false);

  const handleConfirmClear = async () => {
    await onClear();
    setShowClearModal(false);
  };

  return (
    <>
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
          onClick={() => setShowClearModal(true)}
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

      {showClearModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            backdrop-blur-sm
            px-4
          "
        >
          <div
            className="
              w-full
              max-w-sm
              rounded-2xl
              border
              border-white/10
              bg-slate-900
              p-6
              shadow-xl
            "
          >
            <h3 className="text-lg font-semibold text-white">
              Clear Chat History?
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              All chat messages will be permanently deleted. This action cannot
              be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowClearModal(false)}
                disabled={clearing}
                className="
                  rounded-xl
                  border
                  border-white/10
                  px-4
                  py-2
                  text-sm
                  text-slate-300
                  hover:bg-white/5
                "
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmClear}
                disabled={clearing}
                className="
                  rounded-xl
                  bg-rose-500
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-rose-600
                  disabled:opacity-50
                "
              >
                {clearing ? "Clearing..." : "OK, Clear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}