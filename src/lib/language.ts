export type SupportedLanguage = "bn-BD" | "ar-SA" | "en-US";

export function detectTextLanguage(text: string): SupportedLanguage {
  const normalized = text.trim();
  if (!normalized) return "en-US";

  if (/[\u0980-\u09FF]/.test(normalized)) return "bn-BD";
  if (/[\u0600-\u06FF]/.test(normalized)) return "ar-SA";

  return "en-US";
}

export function getDefaultSpeechLanguage(): SupportedLanguage {
  if (typeof navigator === "undefined") return "en-US";

  const preferredLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language || "en-US"];

  for (const locale of preferredLanguages) {
    const normalized = locale.toLowerCase();
    if (normalized.startsWith("bn")) return "bn-BD";
    if (normalized.startsWith("ar")) return "ar-SA";
    if (normalized.startsWith("en")) return "en-US";
  }

  return "en-US";
}

export function buildLanguageInstruction() {
  return "You are a helpful multilingual assistant. Reply in the same language as the user's message, and keep the response natural and conversational.";
}
