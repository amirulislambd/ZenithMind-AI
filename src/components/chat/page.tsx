"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useChatSession } from "@/src/hooks/useChatSession";
import { useVoiceAssistant } from "@/src/hooks/useVoiceAssistant";
import { IMessage } from "@/src/types/chat";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatComposer from "./ChatComposer";
import AgenticPlanPanel from "./AgenticPlanPanel";
import FollowUpChips from "./FollowUpChips";
import VoiceModeOverlay from "./VoiceModeOverlay";

export default function ChatPage() {
  const [input, setInput] = useState("");

  const {
    messages,
    isStreaming,
    typingActive,
    followUps,
    plan,
    clearing,
    handleSend,
    handleClear,
  } = useChatSession({
    onAssistantReply: (fullText) => {
      const shouldSpeak = voice.autoSpeak || voice.voiceModeOpen;
      if (shouldSpeak) {
        voice.speakText(
          fullText,
          voice.detectLanguage(fullText),
          `${Date.now()}-assistant`,
        );
      }
    },
  });

  const voice = useVoiceAssistant({
    input,
    setInput,
    isStreaming,
    onAutoSend: (text) => {
      setInput("");
      void handleSend(text);
    },
  });

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input;
    setInput("");
    void handleSend(text);
  }

  function togglePlayback(messageId: string, message: IMessage) {
    if (voice.activeVoiceMessageId === messageId) {
      voice.stopSpeech();
    } else {
      voice.speakText(
        message.content,
        voice.detectLanguage(message.content),
        messageId,
      );
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_45%),linear-gradient(135deg,#020617,#0f172a)] px-3 py-6 text-slate-100 sm:px-4 lg:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto flex max-w-5xl flex-col rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl"
      >
        <ChatHeader
          autoSpeak={voice.autoSpeak}
          onToggleAutoSpeak={() => voice.setAutoSpeak((prev) => !prev)}
          onClear={handleClear}
          clearing={clearing}
          disableClear={clearing || isStreaming || messages.length === 0}
        />

        <div className="flex-1 px-3 py-3 sm:px-4 lg:px-6">
          <MessageList
            messages={messages}
            typingActive={typingActive}
            activeVoiceMessageId={voice.activeVoiceMessageId}
            onTogglePlayback={togglePlayback}
          />
        </div>

        <ChatComposer
          input={input}
          onInputChange={setInput}
          onSubmit={submit}
          isStreaming={isStreaming}
          isListening={voice.isListening}
          voiceError={voice.voiceError}
          onOpenVoiceMode={() => voice.setVoiceModeOpen(true)}
          onToggleListening={voice.toggleListening}
        />

        <AgenticPlanPanel plan={plan} />
        <FollowUpChips
          followUps={followUps}
          isStreaming={isStreaming}
          onSelect={handleSend}
        />
      </motion.div>

      <VoiceModeOverlay
        open={voice.voiceModeOpen}
        isListening={voice.isListening}
        typingActive={typingActive}
        voicePaused={voice.voicePaused}
        activeVoiceMessageId={voice.activeVoiceMessageId}
        micMuted={voice.micMuted}
        onClose={() => {
          voice.setVoiceModeOpen(false);
          voice.recognitionRef.current?.stop();
        }}
        onToggleMuteMic={voice.toggleMuteMic}
        onTogglePauseVoice={voice.togglePauseVoice}
      />
    </div>
  );
}
