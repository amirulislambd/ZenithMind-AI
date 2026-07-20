"use client";

import { useEffect, useRef, useState } from "react";

interface UseVoiceAssistantOptions {
  input: string;
  setInput: (value: string) => void;
  isStreaming: boolean;
  onAutoSend: (text: string) => void;
}

export function useVoiceAssistant({
  input,
  setInput,
  isStreaming,
  onAutoSend,
}: UseVoiceAssistantOptions) {
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [voiceModeOpen, setVoiceModeOpen] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [voicePaused, setVoicePaused] = useState(false);
  const [activeVoiceMessageId, setActiveVoiceMessageId] = useState<
    string | null
  >(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voicesReady, setVoicesReady] = useState(false);
  const cachedVoicesRef = useRef<SpeechSynthesisVoice[]>([]);

  const inputRef = useRef(input);
  const isStreamingRef = useRef(isStreaming);
  const autoSpeakRef = useRef(autoSpeak);
  const voiceModeOpenRef = useRef(voiceModeOpen);
  const micMutedRef = useRef(micMuted);
  const recognitionRef = useRef<any>(null);
  const activeSpeechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceBufferRef = useRef("");
  const voiceAutoSendTimerRef = useRef<number | null>(null);
  const voiceRestartTimerRef = useRef<number | null>(null);
  const shouldAutoRestartRef = useRef(false);
  const isRecognitionActiveRef = useRef(false);
  const voiceLanguageRef = useRef("bn-BD");

  useEffect(() => {
    inputRef.current = input;
  }, [input]);
  useEffect(() => {
    isStreamingRef.current = isStreaming;
  }, [isStreaming]);
  useEffect(() => {
    autoSpeakRef.current = autoSpeak;
  }, [autoSpeak]);
  useEffect(() => {
    voiceModeOpenRef.current = voiceModeOpen;
  }, [voiceModeOpen]);
  useEffect(() => {
    micMutedRef.current = micMuted;
  }, [micMuted]);
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  
    function loadVoices() {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        cachedVoicesRef.current = voices;
        setVoicesReady(true);
      }
    }
  
    loadVoices(); 
    window.speechSynthesis.onvoiceschanged = loadVoices; 
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  function detectLanguage(text: string) {
    const normalized = text.trim();
    if (/[\u0980-\u09FF]/.test(normalized)) return "bn-BD";
    if (/[\u0600-\u06FF]/.test(normalized)) return "ar-SA";
    return "en-US";
  }

  function getSpeechLanguage(text: string) {
    const normalized = text.trim();
    if (!normalized) return voiceLanguageRef.current || "bn-BD";
    return detectLanguage(normalized);
  }

  function setVoiceLanguage(text: string) {
    const nextLanguage = getSpeechLanguage(text);
    voiceLanguageRef.current = nextLanguage;
    if (recognitionRef.current && !isRecognitionActiveRef.current) {
      recognitionRef.current.lang = nextLanguage;
    }
    return nextLanguage;
  }

  function getPreferredVoice(language: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    const voices = cachedVoicesRef.current.length
      ? cachedVoicesRef.current
      : window.speechSynthesis.getVoices();
    const locale = language.toLowerCase();
  
    if (locale.startsWith("bn")) {
      return (
        voices.find((v) => v.lang.toLowerCase().startsWith("bn")) ||
        voices.find((v) => v.lang.toLowerCase().includes("bengali")) ||
        voices.find((v) => v.lang.toLowerCase().includes("bangla")) ||
        voices.find((v) => v.lang.toLowerCase().startsWith("hi")) ||
        null 
      );
    }
    if (locale.startsWith("ar")) {
      return voices.find((v) => v.lang.toLowerCase().startsWith("ar")) || null;
    }
    return voices.find((v) => v.lang.toLowerCase().startsWith("en")) || null;
  }

  function stopSpeech() {
    if (typeof window !== "undefined") window.speechSynthesis.cancel();
    setActiveVoiceMessageId(null);
    setVoicePaused(false);
    activeSpeechRef.current = null;
  }

  async function startVoiceRecognition() {
    if (typeof window === "undefined" || !recognitionRef.current) {
      setVoiceError("Speech recognition is not supported in this browser.");
      return;
    }
    if (
      isStreamingRef.current ||
      micMutedRef.current ||
      isRecognitionActiveRef.current
    )
      return;

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.mediaDevices?.getUserMedia
      ) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch {
      setVoiceError("Microphone access is required to use Voice Mode.");
      setIsListening(false);
      return;
    }

    try {
      recognitionRef.current.stop();
    } catch {}
    try {
      recognitionRef.current.abort();
    } catch {}

    const detectedLanguage = setVoiceLanguage(inputRef.current);
    recognitionRef.current.lang = detectedLanguage;
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    try {
      recognitionRef.current.start();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (
        message.includes("already started") ||
        message.includes("InvalidStateError")
      ) {
        isRecognitionActiveRef.current = true;
        setIsListening(true);
        return;
      }
      isRecognitionActiveRef.current = false;
      setIsListening(false);
      setVoiceError("Speech recognition could not start. Please try again.");
      return;
    }

    shouldAutoRestartRef.current = true;
    setVoiceError(null);
  }

  function stopVoiceRecognition() {
    shouldAutoRestartRef.current = false;
    isRecognitionActiveRef.current = false;
    if (voiceAutoSendTimerRef.current)
      clearTimeout(voiceAutoSendTimerRef.current);
    voiceAutoSendTimerRef.current = null;
    if (voiceRestartTimerRef.current)
      clearTimeout(voiceRestartTimerRef.current);
    voiceRestartTimerRef.current = null;
    try {
      recognitionRef.current?.stop();
    } catch {}
    try {
      recognitionRef.current?.abort();
    } catch {}
    setIsListening(false);
  }

  function speakText(text: string, language: string, messageId: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setVoiceError("Text-to-speech is not supported in this browser.");
      return;
    }
    if (!text?.trim()) return;

    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = language;
    utterance.rate = 1;
    utterance.pitch = 1;

    const preferredVoice = getPreferredVoice(language);
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
      setActiveVoiceMessageId(null);
      setVoicePaused(false);
      activeSpeechRef.current = null;
      if (
        voiceModeOpenRef.current &&
        !micMutedRef.current &&
        !isStreamingRef.current
      ) {
        window.setTimeout(() => {
          if (
            voiceModeOpenRef.current &&
            !micMutedRef.current &&
            !isStreamingRef.current
          ) {
            void startVoiceRecognition();
          }
        }, 400);
      }
    };
    utterance.onerror = () => {
      setActiveVoiceMessageId(null);
      setVoicePaused(false);
      activeSpeechRef.current = null;
    };

    activeSpeechRef.current = utterance;
    setActiveVoiceMessageId(messageId);
    setVoicePaused(false);
    window.speechSynthesis.speak(utterance);
  }

  function toggleListening() {
    if (!recognitionRef.current) {
      setVoiceError("Speech recognition is not supported in this browser.");
      return;
    }
    if (isListening) {
      stopVoiceRecognition();
      return;
    }
    if (micMuted) setMicMuted(false);
    void startVoiceRecognition();
  }

  function toggleMuteMic() {
    if (micMuted) {
      setMicMuted(false);
      if (!isListening) toggleListening();
      return;
    }
    if (isListening) stopVoiceRecognition();
    setMicMuted(true);
  }

  function togglePauseVoice() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setVoiceError("Text-to-speech is not supported in this browser.");
      return;
    }
    if (!activeSpeechRef.current) return;

    if (voicePaused) {
      window.speechSynthesis.resume();
      setVoicePaused(false);
      return;
    }
    window.speechSynthesis.pause();
    setVoicePaused(true);
  }

  // Set up the SpeechRecognition instance once
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setVoiceError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = getSpeechLanguage(inputRef.current);

    recognition.onresult = (event: any) => {
      // IMPORTANT: with continuous=true, event.results contains the FULL
      // history of results since recognition started — not just new ones.
      // We must only process results from event.resultIndex onward, or
      // every previously-finalized phrase gets re-appended (duplicated)
      // on every subsequent result event.
      let newFinalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0]?.transcript ?? "";
        if (result.isFinal) {
          newFinalText += (newFinalText ? " " : "") + transcript;
        } else {
          interimText += (interimText ? " " : "") + transcript;
        }
      }

      if (!newFinalText) {
        if (interimText) {
          const preview = [voiceBufferRef.current, interimText]
            .filter(Boolean)
            .join(" ")
            .trim();
          setInput(preview);
          inputRef.current = preview;
        }
        return;
      }

      const nextText = [voiceBufferRef.current, newFinalText]
        .filter(Boolean)
        .join(" ")
        .trim();
      voiceBufferRef.current = nextText;
      setInput(nextText);
      inputRef.current = nextText;

      if (voiceAutoSendTimerRef.current)
        clearTimeout(voiceAutoSendTimerRef.current);

      // Auto-send-after-pause only applies to full Voice Mode conversation
      // (the left "Voice Mode" button). Plain dictation via the composer's
      // Mic button should just fill the text box — the user sends manually.
      if (!voiceModeOpenRef.current) return;

      voiceAutoSendTimerRef.current = window.setTimeout(() => {
        const textToSend = voiceBufferRef.current.trim();
        if (!textToSend || isStreamingRef.current) return;
        voiceBufferRef.current = "";
        stopVoiceRecognition();
        onAutoSend(textToSend);
        voiceAutoSendTimerRef.current = null;
      }, 900);
    };

    recognition.onstart = () => {
      isRecognitionActiveRef.current = true;
      setIsListening(true);
    };

    recognition.onerror = (event: any) => {
      isRecognitionActiveRef.current = false;
      if (event?.error === "not-allowed") {
        setVoiceError(
          "Microphone access was denied. Please enable it in your browser settings.",
        );
      } else if (event?.error !== "aborted") {
        setVoiceError("Speech recognition could not start. Please try again.");
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      isRecognitionActiveRef.current = false;
      setIsListening(false);
      if (
        shouldAutoRestartRef.current &&
        voiceModeOpenRef.current &&
        !micMutedRef.current &&
        !isStreamingRef.current
      ) {
        voiceRestartTimerRef.current = window.setTimeout(() => {
          if (
            shouldAutoRestartRef.current &&
            voiceModeOpenRef.current &&
            !micMutedRef.current &&
            !isStreamingRef.current
          ) {
            void startVoiceRecognition();
          }
        }, 350);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      shouldAutoRestartRef.current = false;
      if (voiceAutoSendTimerRef.current)
        clearTimeout(voiceAutoSendTimerRef.current);
      if (voiceRestartTimerRef.current)
        clearTimeout(voiceRestartTimerRef.current);
      recognition.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-start listening when Voice Mode opens
  useEffect(() => {
    if (!voiceModeOpen) {
      stopVoiceRecognition();
      return;
    }
    if (micMuted || isStreamingRef.current || isRecognitionActiveRef.current)
      return;

    setVoiceLanguage(inputRef.current);
    void startVoiceRecognition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceModeOpen, isListening, micMuted]);

  return {
    // state
    isListening,
    autoSpeak,
    setAutoSpeak,
    voiceModeOpen,
    setVoiceModeOpen,
    micMuted,
    voicePaused,
    activeVoiceMessageId,
    voiceError,
    // actions
    toggleListening,
    toggleMuteMic,
    togglePauseVoice,
    speakText,
    stopSpeech,
    detectLanguage,
    recognitionRef,
  };
}
