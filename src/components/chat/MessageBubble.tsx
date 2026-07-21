"use client";

import { useState } from "react";
import { IMessage } from "@/src/types/chat";
import { motion } from "framer-motion";
import { Languages, Loader2 } from "lucide-react";

export default function MessageBubble({ message }: { message: IMessage }) {
  const isAssistant =
    (message.role as unknown as string) === "model" ||
    (message.role as unknown as string) === "assistant";

  // System leakage cleanup (যদি কোনো সিস্টেম মেসেজ লিক হয়ে থাকে তা বাদ দেওয়া)
  const cleanContent = message.content
    .replace(/IMPORTANT:\s*Reply in Bangla only[\s\S]*/gi, "")
    .trim();

  // ভাষা ফিল্টারিং
  const hasEnglishLetters = /[A-Za-z]/.test(cleanContent);
  const hasBengaliLetters = /[\u0980-\u09FF]/.test(cleanContent);
  const isRtlText = /[\u0600-\u06FF]/.test(cleanContent);

  // বাটন দৃশ্যমানতার লজিক:
  // AI রেসপন্স এবং (বাংলা ছাড়া অন্য বর্ণ থাকলে অথবা ইংরেজি বর্ণ থাকলে) বাটন দেখাবে।
  // ১০০% বাংলা হলে বাটন সম্পূর্ণ হাইড থাকবে।
  const shouldShowTranslateButton =
    isAssistant && (hasEnglishLetters || !hasBengaliLetters);

  const [translated, setTranslated] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [showTranslated, setShowTranslated] = useState(false);
  const [translateError, setTranslateError] = useState(false);

  const displayText = showTranslated && translated ? translated : cleanContent;
  const displayIsRtl = showTranslated && translated ? false : isRtlText;

  async function handleTranslate() {
    if (translated) {
      setShowTranslated((prev) => !prev);
      return;
    }
    setTranslating(true);
    setTranslateError(false);
    try {
      const trimmedText = cleanContent.trim();
      if (!trimmedText) return;

      const sourceLang = isRtlText ? "ar" : "en";
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmedText)}&langpair=${sourceLang}|bn`,
        {
          headers: {
            Accept: "application/json",
          },
        },
      );
      const data = await res.json();

      if (data.responseData?.translatedText) {
        setTranslated(data.responseData.translatedText);
        setShowTranslated(true);
      } else {
        throw new Error("Translation failed");
      }
    } catch (err) {
      console.error("Translate Error:", err);
      setTranslateError(true);
    } finally {
      setTranslating(false);
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22 }}
      className={`mb-3 flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[92%] sm:max-w-[80%] ${
          message.role === "user" ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`rounded-2xl border px-3 py-2.5 shadow-sm backdrop-blur sm:px-4 sm:py-3 ${
            message.role === "user"
              ? "border-indigo-500/30 bg-indigo-600/25 text-slate-50"
              : "border-slate-700/50 bg-slate-800/60 text-slate-100"
          }`}
        >
          <div
            dir={displayIsRtl ? "rtl" : "ltr"}
            className={`whitespace-pre-wrap break-words text-sm leading-6 sm:leading-7 ${
              displayIsRtl ? "text-right" : "text-left"
            }`}
          >
            {displayText}
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>
              {message.timestamp
                ? new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </span>
            <div className="flex items-center gap-1.5">
              {shouldShowTranslateButton && (
                <button
                  type="button"
                  onClick={handleTranslate}
                  disabled={translating}
                  className={`flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] transition-all ${
                    showTranslated && translated
                      ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-200"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  {translating ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Languages className="h-3 w-3" />
                  )}
                  <span>
                    {showTranslated && translated ? "মূল লেখা" : "বাংলা"}
                  </span>
                </button>
              )}
            </div>
          </div>

          {translateError && (
            <p className="mt-1 text-[11px] text-rose-300">
              অনুবাদ করা সম্ভব হয়নি। আবার চেষ্টা করুন।
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}