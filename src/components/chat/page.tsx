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

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input;
    setInput("");
    void handleSend(text, false);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_45%),linear-gradient(135deg,#020617,#0f172a)] px-2 py-4 text-slate-100 sm:px-4 sm:py-6 lg:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto flex max-w-5xl flex-col rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl sm:rounded-3xl"
      >
        <ChatHeader
          onClear={handleClear}
          clearing={clearing}
          disableClear={clearing || isStreaming || messages.length === 0}
        />

        <div className="flex-1 px-2.5 py-2.5 sm:px-4 sm:py-3 lg:px-6">
          <MessageList messages={messages} typingActive={typingActive} />
        </div>

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

        <AgenticPlanPanel plan={plan} />
        <FollowUpChips
          followUps={followUps}
          isStreaming={isStreaming}
          onSelect={(t) => handleSend(t, false)}
        />
      </motion.div>
    </div>
  );
}