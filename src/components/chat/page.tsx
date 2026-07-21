"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { useChatSession } from "@/src/hooks/useChatSession";
import { useVoiceAssistant } from "@/src/hooks/useVoiceAssistant";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatComposer from "./ChatComposer";
import AgenticPlanPanel from "./AgenticPlanPanel";
import FollowUpChips from "./FollowUpChips";

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
  } = useChatSession();

  const voice = useVoiceAssistant({
    setInput,
  });

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();

    const text = input.trim();

    if (!text) return;

    setInput("");

    voice.clearVoiceDraft();

    await handleSend(text, false);
  }

  return (
    <div
      className="
        min-h-screen
        bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_45%),linear-gradient(135deg,#020617,#0f172a)]
        text-slate-100
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="
          mx-auto
          flex
          h-screen
          max-w-5xl
          flex-col
          overflow-hidden

          sm:px-4
          sm:py-4
        "
      >
        <ChatHeader
          onClear={handleClear}
          clearing={clearing}
          disableClear={clearing || isStreaming || messages.length === 0}
        />
        <div
          className="
            flex-1
            overflow-hidden
          "
        >
          <div
            className="
              mx-auto
              h-full
              w-full
              max-w-4xl
              px-2
              py-3

              sm:px-4
              lg:px-6
            "
          >
            <MessageList messages={messages} typingActive={typingActive} />
          </div>
        </div>{" "}
        <div
          className="
            border-t
            border-white/10
            bg-slate-950/60
            backdrop-blur-xl
          "
        >
          <ChatComposer
            input={input}
            onInputChange={setInput}
            onSubmit={submit}
            isStreaming={isStreaming}
            isListening={voice.isListening}
            voiceError={voice.voiceError}
            selectedLanguage={voice.selectedLanguage}
            onLanguageChange={voice.setSelectedLanguage}
            onToggleListening={voice.toggleListening}
          />
        </div>
        <AgenticPlanPanel plan={plan} />
        <FollowUpChips
          followUps={followUps}
          isStreaming={isStreaming}
          onSelect={(text) => handleSend(text, false)}
        />
      </motion.div>
    </div>
  );
}