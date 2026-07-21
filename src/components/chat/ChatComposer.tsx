"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Select, ListBox, Label } from "@heroui/react";
import { Mic, MicOff, SendHorizonal, ChevronDown, Check } from "lucide-react";

type RecognitionLanguage = "bn-BD" | "ar-SA" | "en-US" | "ur-PK";

export default function ChatComposer({
  input,
  onInputChange,
  onSubmit,
  isStreaming,
  isListening,
  voiceError,
  selectedLanguage,
  onLanguageChange,
  onToggleListening,
}: {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isStreaming: boolean;
  isListening: boolean;
  voiceError: string | null;
  selectedLanguage: RecognitionLanguage;
  onLanguageChange: (language: RecognitionLanguage) => void;
  onToggleListening: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    requestAnimationFrame(() => {
      textarea.style.height = "auto";
      const maxHeight = 160; // px, matches max-h-40
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    });
  };

  useEffect(() => {
    resizeTextarea();
  }, [input]);

  return (
    <div className="border-t border-white/10 px-2 py-2.5 sm:px-4 sm:py-3 lg:px-6">
      {voiceError && (
        <p className="mb-2 px-1 text-xs text-rose-300 sm:text-sm">
          {voiceError}
        </p>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-slate-900/80 p-2.5 shadow-inner shadow-black/30 sm:flex-row sm:items-end sm:gap-2">
          {/* Auto-growing textarea up to max-h-40, then scrolls internally */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              onInputChange(e.target.value);
              resizeTextarea();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            placeholder="Ask anything… বাংলায় লিখতে পারেন।"
            disabled={isStreaming}
            rows={1}
            className="box-border max-h-40 min-h-11 w-full min-w-0 flex-1 resize-none overflow-y-auto border-0 bg-transparent px-2.5 py-2 text-base text-slate-100 outline-none placeholder:text-slate-500 disabled:opacity-60 sm:text-sm"
          />
          {/* Action Toolbar */}
          <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-2 sm:shrink-0 sm:justify-end sm:border-0 sm:pt-0">
            <Select
              aria-label="Select voice input language"
              selectedKey={selectedLanguage}
              onSelectionChange={(key) => {
                if (key) onLanguageChange(String(key) as RecognitionLanguage);
              }}
              className="w-auto min-w-25 sm:w-28"
            >
              <Label className="sr-only">Voice language</Label>
              <Select.Trigger className="flex h-9 min-h-[36px] items-center justify-between gap-1.5 rounded-full border border-white/10 bg-slate-800/80 px-3 text-xs text-slate-100 shadow-none transition data-hovered:bg-slate-700/80 data-focus-visible:border-indigo-400 sm:h-10">
                <Select.Value className="text-xs text-slate-100">
                  {({ selectedText }) => selectedText || "Language"}
                </Select.Value>
                <Select.Indicator>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </Select.Indicator>
              </Select.Trigger>

              <Select.Popover className="min-w-(--trigger-width) overflow-hidden rounded-2xl border border-white/10 bg-slate-900 text-slate-100 shadow-xl">
                <ListBox className="max-h-72 overflow-auto p-1.5">
                  <ListBox.Item
                    id="bn-BD"
                    className="w-full bg-transparent outline-none data-hovered:bg-slate-800 data-focused:bg-slate-800 data-focus-visible:bg-slate-800 data-pressed:bg-slate-800"
                  >
                    {({ isSelected, isHovered }) => (
                      <div
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs sm:text-sm transition-colors ${
                          isSelected
                            ? "bg-indigo-500/15 text-indigo-200"
                            : isHovered
                              ? "bg-slate-800 text-slate-100"
                              : "bg-transparent text-slate-200"
                        }`}
                      >
                        <Label>বাংলা</Label>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-indigo-300" />
                        )}
                      </div>
                    )}
                  </ListBox.Item>

                  <ListBox.Item
                    id="ar-SA"
                    className="w-full bg-transparent outline-none data-hovered:bg-slate-800 data-focused:bg-slate-800 data-focus-visible:bg-slate-800 data-pressed:bg-slate-800"
                  >
                    {({ isSelected, isHovered }) => (
                      <div
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs sm:text-sm transition-colors ${
                          isSelected
                            ? "bg-indigo-500/15 text-indigo-200"
                            : isHovered
                              ? "bg-slate-800 text-slate-100"
                              : "bg-transparent text-slate-200"
                        }`}
                      >
                        <Label>العربية</Label>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-indigo-300" />
                        )}
                      </div>
                    )}
                  </ListBox.Item>

                  <ListBox.Item
                    id="en-US"
                    className="w-full bg-transparent outline-none data-hovered:bg-slate-800 data-focused:bg-slate-800 data-focus-visible:bg-slate-800 data-pressed:bg-slate-800"
                  >
                    {({ isSelected, isHovered }) => (
                      <div
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs sm:text-sm transition-colors ${
                          isSelected
                            ? "bg-indigo-500/15 text-indigo-200"
                            : isHovered
                              ? "bg-slate-800 text-slate-100"
                              : "bg-transparent text-slate-200"
                        }`}
                      >
                        <Label>English</Label>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-indigo-300" />
                        )}
                      </div>
                    )}
                  </ListBox.Item>

                  <ListBox.Item
                    id="ur-PK"
                    className="w-full bg-transparent outline-none data-hovered:bg-slate-800 data-focused:bg-slate-800 data-focus-visible:bg-slate-800 data-pressed:bg-slate-800"
                  >
                    {({ isSelected, isHovered }) => (
                      <div
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs sm:text-sm transition-colors ${
                          isSelected
                            ? "bg-indigo-500/15 text-indigo-200"
                            : isHovered
                              ? "bg-slate-800 text-slate-100"
                              : "bg-transparent text-slate-200"
                        }`}
                      >
                        <Label>اردو</Label>
                        {isSelected && (
                          <Check className="h-3.5 w-3.5 text-indigo-300" />
                        )}
                      </div>
                    )}
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={onToggleListening}
                disabled={isStreaming}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all sm:h-10 sm:w-10 ${
                  isListening
                    ? "border-rose-400/40 bg-rose-500/20 text-rose-200 shadow-[0_0_0_3px_rgba(248,113,113,0.18)] animate-pulse"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
                } ${isStreaming ? "opacity-60" : ""}`}
                aria-label="Toggle voice typing"
              >
                {isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </motion.button>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                disabled={isStreaming || !input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:h-10 sm:w-10"
              >
                <SendHorizonal className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}