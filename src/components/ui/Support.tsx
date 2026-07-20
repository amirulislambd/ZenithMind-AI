"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  Send,
  Zap,
  LifeBuoy,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does ZenithMind AI calculate my Burnout & Stress Index?",
    answer:
      "ZenithMind AI uses active behavioral inputs, session engagement history, and chat interaction frequency to calculate real-time cognitive stress metrics using optimized LLM analytics.",
  },
  {
    question: "Is my personal wellness and chat data secure?",
    answer:
      "Yes, absolutely. We enforce enterprise-grade data security protocols. Your personal health metrics and AI coaching chats are fully encrypted and never shared with third parties.",
  },
  {
    question: "How do I upgrade to the Premium Plan?",
    answer:
      "Navigate to your Workspace Settings or Dashboard Header, click on the 'Free Plan' badge, and choose your preferred monthly or annual subscription tier.",
  },
  {
    question: "Can I connect custom CSV datasets for team analysis?",
    answer:
      "Yes! Go to 'AI Data Analyzer' from your workspace overview and upload your dataset in CSV format for automated KPI generation and risk detection.",
  },
];

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#070c14] text-[#cbd5e1] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-12"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#6366f1] text-xs font-medium">
            <LifeBuoy size={14} />
            Support Center
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-[#64748b] max-w-xl mx-auto text-sm md:text-base">
            Have questions about ZenithMind AI? Reach out to our cognitive wellness team or browse our quick answers below.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#0b1120] border border-[#1e293b] rounded-2xl p-6 flex flex-col justify-between hover:border-[#6366f1]/40 transition-all"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center text-[#6366f1]">
                <Mail size={20} />
              </div>
              <h3 className="font-semibold text-white text-base">Email Support</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Send us a direct inquiry for detailed technical assistance.
              </p>
            </div>
            <a
              href="mailto:support@zenithmind.ai"
              className="mt-4 text-xs font-medium text-[#6366f1] hover:underline inline-flex items-center gap-1"
            >
              support@zenithmind.ai
            </a>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#0b1120] border border-[#1e293b] rounded-2xl p-6 flex flex-col justify-between hover:border-[#10b981]/40 transition-all"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981]">
                <Phone size={20} />
              </div>
              <h3 className="font-semibold text-white text-base">Phone Assistance</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Mon–Fri, 9:00 AM – 6:00 PM EST
              </p>
            </div>
            <span className="mt-4 text-xs font-medium text-[#10b981]">
              +1 (800) 555-0199
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#0b1120] border border-[#1e293b] rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Clock size={20} />
              </div>
              <h3 className="font-semibold text-white text-base">Response Time</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Standard queries answered within 2–4 hours. Enterprise requests prioritized.
              </p>
            </div>
            <span className="mt-4 text-xs font-medium text-blue-400 inline-flex items-center gap-1">
              <Zap size={12} /> Fast Response Guaranteed
            </span>
          </motion.div>
        </motion.div>

        {/* Main Content: Form & FAQs */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Support Ticket Form */}
          <div className="lg:col-span-7 bg-[#0b1120] border border-[#1e293b] rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare size={20} className="text-[#6366f1]" /> Send a Message
              </h2>
              <p className="text-xs text-[#64748b] mt-1">
                Fill out the details below and our technical team will get back to you shortly.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#10b981]/10 border border-[#10b981]/30 rounded-xl p-6 text-center space-y-2"
                >
                  <CheckCircle2 size={36} className="text-[#10b981] mx-auto" />
                  <h4 className="text-white font-medium text-sm">Ticket Submitted Successfully!</h4>
                  <p className="text-xs text-[#64748b]">
                    Thank you for reaching out. We have logged your request.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#94a3b8]">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Mercer"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#070c14] border border-[#1e293b] focus:border-[#6366f1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#94a3b8]">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#070c14] border border-[#1e293b] focus:border-[#6366f1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#94a3b8]">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Issue with AI Data Analyzer export"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#070c14] border border-[#1e293b] focus:border-[#6366f1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#94a3b8]">Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your question or issue in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#070c14] border border-[#1e293b] focus:border-[#6366f1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                    type="submit"
                    className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#6366f1]/20"
                  >
                    <Send size={16} /> Submit Ticket
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive FAQ Accordion with Framer Motion */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <HelpCircle size={20} className="text-[#10b981]" /> Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b1120] border border-[#1e293b] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 flex items-center justify-between text-sm font-semibold text-white hover:bg-[#0d1428] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} className="text-[#64748b] shrink-0 ml-2" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 text-xs text-[#94a3b8] leading-relaxed border-t border-[#1e293b]/60 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}