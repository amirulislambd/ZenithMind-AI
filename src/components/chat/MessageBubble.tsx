"use client";

import { useState } from "react";
import { IMessage } from "@/src/types/chat";
import { motion } from "framer-motion";
import { Languages, Loader2 } from "lucide-react";

// Bumps the MyMemory daily quota from 5,000 -> 50,000 chars/day.
// Note: this ships inside client-side JS, so it will be visible in the
// browser's network tab to anyone who looks — that's unavoidable since
// MyMemory requires the email be sent from wherever the request originates.
const MYMEMORY_CONTACT_EMAIL = "badshaalomgir954@gmail.com";

// MyMemory hard-limits ~500 chars per request. We stay comfortably under
// that so URL-encoding overhead doesn't push us over.
const MAX_CHUNK_LENGTH = 450;

function splitIntoChunks(text: string, maxLen: number): string[] {
  // Split on sentence boundaries first so each chunk translates coherently.
  const sentences = text.match(/[^.!?\n]+[.!?\n]*|[^.!?\n]+$/g) || [text];

  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    // If a single sentence is itself too long, fall back to word-level splits.
    if (sentence.length > maxLen) {
      const words = sentence.split(/(\s+)/);
      for (const word of words) {
        if ((current + word).length > maxLen) {
          if (current.trim()) chunks.push(current.trim());
          current = word;
        } else {
          current += word;
        }
      }
      continue;
    }

    if ((current + sentence).length > maxLen) {
      if (current.trim()) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }

  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

async function translateChunk(
  chunk: string,
  sourceLang: string,
): Promise<string> {
  const emailParam = MYMEMORY_CONTACT_EMAIL
    ? `&de=${encodeURIComponent(MYMEMORY_CONTACT_EMAIL)}`
    : "";

  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=${sourceLang}|bn${emailParam}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );
  const data = await res.json();

  // responseStatus 403/429-ish situations come back as 200 with a warning
  // string in MyMemory's API instead of a proper HTTP error, so check both.
  if (data.responseStatus && data.responseStatus !== 200) {
    throw new Error(data.responseDetails || "Translation quota/error");
  }
  if (data.responseData?.translatedText) {
    return data.responseData.translatedText;
  }
  throw new Error("Translation failed for chunk");
}

// Runs async tasks with a small concurrency cap so we don't fire 20+
// simultaneous requests at the free API (which tends to start failing).
async function runWithConcurrency<T>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<string>,
): Promise<string[]> {
  const results: string[] = new Array(items.length);
  let nextIndex = 0;

  async function runNext(): Promise<void> {
    const current = nextIndex++;
    if (current >= items.length) return;
    results[current] = await worker(items[current], current);
    await runNext();
  }

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    () => runNext(),
  );
  await Promise.all(workers);
  return results;
}

export default function MessageBubble({ message }: { message: IMessage }) {
  const isAssistant =
    (message.role as unknown as string) === "model" ||
    (message.role as unknown as string) === "assistant";

  const cleanContent = message.content
    .replace(/IMPORTANT:\s*Reply in Bangla only[\s\S]*/gi, "")
    .trim();

  const hasEnglishLetters = /[A-Za-z]/.test(cleanContent);
  const hasBengaliLetters = /[\u0980-\u09FF]/.test(cleanContent);

  // Proportion-based RTL check: count Arabic letters against all "letters"
  // (Arabic + Bengali + Latin) rather than just checking presence. This way
  // a couple of stray Arabic words inside an otherwise Bangla/English
  // paragraph doesn't flip the entire bubble to right-aligned — only a
  // message that's predominantly Arabic does.
  const arabicLetterCount = (cleanContent.match(/[\u0600-\u06FF]/g) || [])
    .length;
  const totalLetterCount = (
    cleanContent.match(/[\u0600-\u06FF\u0980-\u09FFA-Za-z]/g) || []
  ).length;
  const isRtlText =
    totalLetterCount > 0 && arabicLetterCount / totalLetterCount > 0.5;

  const shouldShowTranslateButton =
    isAssistant && (hasEnglishLetters || !hasBengaliLetters);

  const [translated, setTranslated] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [showTranslated, setShowTranslated] = useState(false);
  const [translateError, setTranslateError] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(
    null,
  );

  const displayText = showTranslated && translated ? translated : cleanContent;
  const displayIsRtl = showTranslated && translated ? false : isRtlText;

  async function handleTranslate() {
    if (translated) {
      setShowTranslated((prev) => !prev);
      return;
    }
    setTranslating(true);
    setTranslateError(false);
    setProgress(null);

    try {
      const trimmedText = cleanContent.trim();
      if (!trimmedText) return;

      // Let MyMemory autodetect the source language instead of guessing
      // en/ar — messages can be mixed (e.g. mostly English with a couple
      // Arabic words), so a hardcoded guess was often wrong.
      const sourceLang = "autodetect";
      const chunks = splitIntoChunks(trimmedText, MAX_CHUNK_LENGTH);

      let doneCount = 0;
      setProgress({ done: 0, total: chunks.length });

      // Concurrency of 3 keeps long (1000+ word) messages from taking
      // forever while staying gentle on the free API.
      const translatedChunks = await runWithConcurrency(
        chunks,
        3,
        async (chunk) => {
          const result = await translateChunk(chunk, sourceLang);
          doneCount += 1;
          setProgress({ done: doneCount, total: chunks.length });
          return result;
        },
      );

      const fullTranslation = translatedChunks.join(" ");
      setTranslated(fullTranslation);
      setShowTranslated(true);
    } catch (err) {
      console.error("Translate Error:", err);
      setTranslateError(true);
    } finally {
      setTranslating(false);
      setProgress(null);
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
                    {translating && progress
                      ? `${progress.done}/${progress.total}`
                      : showTranslated && translated
                        ? "মূল লেখা"
                        : "বাংলা"}
                  </span>
                </button>
              )}
            </div>
          </div>

          {translateError && (
            <p className="mt-1 text-[11px] text-rose-300">
              অনুবাদ করা সম্ভব হয়নি। টেক্সট বেশি লম্বা হলে বা দৈনিক কোটা শেষ
              হয়ে গেলে এমন হতে পারে। কিছুক্ষণ পর আবার চেষ্টা করুন।
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}