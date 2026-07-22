"use client";

import { useEffect, useRef, useState } from "react";

interface UseVoiceAssistantOptions {
  setInput: (value: string | ((prev: string) => string)) => void;
}

// Note: English uses "en-IN" (Indian English) rather than "en-US". Chrome's
// Web Speech API applies a much stricter confidence threshold for "en-US"
// and frequently discards results for South Asian accents (silently — no
// error, just nothing appended). "en-IN" uses an acoustic model that matches
// this accent far better, so results actually come through.
type RecognitionLanguage = "bn-BD" | "ar-SA" | "en-IN" | "ur-PK";

export function useVoiceAssistant({ setInput }: UseVoiceAssistantOptions) {
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const [selectedLanguage, setSelectedLanguage] =
    useState<RecognitionLanguage>("bn-BD");

  const recognitionRef = useRef<any>(null);

  const finalTranscriptRef = useRef("");
  const lastInterimRef = useRef("");
  const draftTranscriptRef = useRef("");

  // If listening starts but no result (interim or final) arrives within
  // this window, we surface a clear message instead of silently doing
  // nothing — this is exactly the "spoke English, nothing showed up" case.
  const noResultTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const gotAnyResultRef = useRef(false);

  const clearNoResultTimeout = () => {
    if (noResultTimeoutRef.current) {
      clearTimeout(noResultTimeoutRef.current);
      noResultTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setVoiceError(
        "আপনার ব্রাউজারে স্পিচ রিকগনিশন ফিচারটি সমর্থিত নয়। Google Chrome ব্যবহার করুন।",
      );
      return;
    }

    const recognition = new SpeechRecognitionCtor();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;

    const appendTranscript = (value: string, isInterim = false) => {
      const normalizedValue = value.replace(/\s+/g, " ").trim();

      if (!normalizedValue) return;

      gotAnyResultRef.current = true;
      clearNoResultTimeout();

      // Interim speech
      if (isInterim) {
        setInput(() => {
          const base = finalTranscriptRef.current;

          if (!base) {
            return normalizedValue;
          }

          if (normalizedValue.toLowerCase().startsWith(base.toLowerCase())) {
            return normalizedValue;
          }

          return `${base} ${normalizedValue}`.trim();
        });

        return;
      }

      // Final speech
      const currentFinal = finalTranscriptRef.current;

      if (!currentFinal) {
        finalTranscriptRef.current = normalizedValue;
        draftTranscriptRef.current = normalizedValue;

        setInput(normalizedValue);
        return;
      }

      if (
        normalizedValue.toLowerCase().startsWith(currentFinal.toLowerCase())
      ) {
        finalTranscriptRef.current = normalizedValue;
        draftTranscriptRef.current = normalizedValue;

        setInput(normalizedValue);
        return;
      }

      const merged = `${currentFinal} ${normalizedValue}`.trim();

      finalTranscriptRef.current = merged;
      draftTranscriptRef.current = merged;

      setInput(merged);
    };

    recognition.onresult = (event: any) => {
      const latestResult = event.results?.[event.results.length - 1];

      const transcript = latestResult?.[0]?.transcript ?? "";

      if (!transcript.trim()) return;

      const normalizedTranscript = transcript.trim().replace(/\s+/g, " ");

      if (latestResult?.isFinal) {
        appendTranscript(normalizedTranscript, false);

        lastInterimRef.current = "";
        return;
      }

      if (
        normalizedTranscript &&
        normalizedTranscript !== lastInterimRef.current
      ) {
        lastInterimRef.current = normalizedTranscript;

        appendTranscript(normalizedTranscript, true);
      }
    };

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceError(null);
      gotAnyResultRef.current = false;

      // Give it 6s to produce *any* result. If nothing comes back, most
      // likely the recognizer is discarding low-confidence matches for
      // this language/accent combo — tell the user plainly instead of
      // leaving the input box silently empty.
      clearNoResultTimeout();
      noResultTimeoutRef.current = setTimeout(() => {
        if (!gotAnyResultRef.current) {
          setVoiceError(
            "কথা শোনা গেলেও লেখা তৈরি হচ্ছে না। ধীরে ও স্পষ্ট করে আবার বলার চেষ্টা করুন, অথবা ভাষা পরিবর্তন করে দেখুন।",
          );
        }
      }, 6000);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      clearNoResultTimeout();

      if (event?.error === "not-allowed") {
        setVoiceError(
          "Microphone permission was not granted. Please allow it in your browser settings.",
        );
      } else if (event?.error === "no-speech") {
        setVoiceError("No speech was detected. Please try again.");
      } else if (event?.error !== "aborted") {
        setVoiceError("Voice typing could not be started. Please try again.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      clearNoResultTimeout();

      if (recognitionRef.current) {
        recognitionRef.current.lang = selectedLanguage;
      }
    };

    recognitionRef.current = recognition;

    return () => {
      clearNoResultTimeout();
      try {
        recognition.stop();
      } catch {}
    };
  }, [selectedLanguage, setInput]);

  function toggleListening() {
    if (!recognitionRef.current) return;

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch {}

      setIsListening(false);
      lastInterimRef.current = "";
      clearNoResultTimeout();
    } else {
      try {
        setVoiceError(null);

        // NEW SESSION START
        draftTranscriptRef.current = "";
        finalTranscriptRef.current = "";
        lastInterimRef.current = "";

        if (recognitionRef.current) {
          recognitionRef.current.lang = selectedLanguage;
        }

        recognitionRef.current.start();
      } catch (err) {
        console.error("Mic start exception:", err);

        try {
          recognitionRef.current.abort();

          setTimeout(() => {
            recognitionRef.current.start();
          }, 200);
        } catch {}
      }
    }
  }
  function clearVoiceDraft() {
    draftTranscriptRef.current = "";
    finalTranscriptRef.current = "";
    lastInterimRef.current = "";

    setInput("");
  }

  return {
    isListening,
    voiceError,
    selectedLanguage,
    setSelectedLanguage,
    toggleListening,
    clearVoiceDraft,
  };
}