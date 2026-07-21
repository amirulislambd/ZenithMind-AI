"use client";

import { useEffect, useRef, useState } from "react";

interface UseVoiceAssistantOptions {
  setInput: (value: string | ((prev: string) => string)) => void;
}

type RecognitionLanguage = "bn-BD" | "ar-SA" | "en-US" | "ur-PK";

export function useVoiceAssistant({ setInput }: UseVoiceAssistantOptions) {
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const [selectedLanguage, setSelectedLanguage] =
    useState<RecognitionLanguage>("bn-BD");

  const recognitionRef = useRef<any>(null);

  const finalTranscriptRef = useRef("");
  const lastInterimRef = useRef("");
  const draftTranscriptRef = useRef("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setVoiceError(
        "আপনার ব্রাউজারে স্পিচ রিকগনিশন ফিচারটি সমর্থিত নয়। Google Chrome ব্যবহার করুন।",
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
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);

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

      if (recognitionRef.current) {
        recognitionRef.current.lang = selectedLanguage;
      }
    };

    recognitionRef.current = recognition;

    return () => {
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