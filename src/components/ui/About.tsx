"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  TrendingUp,
  Award,
  Users,
  Cpu,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const features = [
  {
    icon: <TrendingUp size={22} className="text-[#6366f1]" />,
    title: "Evidence-Driven Insights",
    description:
      "Our analytics synthesize session patterns and behavioral metrics to surface early burnout indicators before they impact productivity.",
    color: "border-[#6366f1]/20 bg-[#6366f1]/10",
  },
  {
    icon: <Brain size={22} className="text-[#10b981]" />,
    title: "Personalized AI Coaching",
    description:
      "The AI Executive Coach offers practical cognitive optimization strategies and micro-interventions tailored strictly to your history.",
    color: "border-[#10b981]/20 bg-[#10b981]/10",
  },
  {
    icon: <ShieldCheck size={22} className="text-blue-400" />,
    title: "Enterprise-Ready Control",
    description:
      "Role-based dashboards, encrypted data pipelines, and team-level KPIs built explicitly for organizational privacy and clarity.",
    color: "border-blue-500/20 bg-blue-500/10",
  },
  {
    icon: <Zap size={22} className="text-amber-400" />,
    title: "Actionable Recovery Workflows",
    description:
      "Guided recovery plans, real-time stress tracking, and recommended wellness items designed to sustain high performance.",
    color: "border-amber-500/20 bg-amber-500/10",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#070c14] text-[#cbd5e1] py-12 px-4 sm:px-6 lg:px-8">
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-16"
      >
        {/* Header Hero Section */}
        <motion.section variants={itemVariants} className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#6366f1] text-xs font-medium">
            <Sparkles size={14} />
            Empowering Mental Fitness
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#10b981]">ZenithMind AI</span>
          </h1>
          <p className="text-[#64748b] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            ZenithMind AI is a premium cognitive health platform focused on identifying, tracking, and reducing executive burnout using intelligent LLM interventions.
          </p>
        </motion.section>

        {/* Highlight Stats / Badges Banner */}
        <motion.section variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Burnout Risk Reduction", value: "35%", icon: <Award size={18} className="text-[#10b981]" /> },
            { label: "Active User Base", value: "10K+", icon: <Users size={18} className="text-[#6366f1]" /> },
            { label: "LLM Analytical Engine", value: "Groq/Gemini", icon: <Cpu size={18} className="text-blue-400" /> },
            { label: "System Uptime", value: "99.9%", icon: <ShieldCheck size={18} className="text-amber-400" /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#0b1120] border border-[#1e293b] rounded-2xl p-4 text-center space-y-1"
            >
              <div className="flex justify-center mb-1">{stat.icon}</div>
              <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-[#64748b]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Why Choose ZenithMind AI Section */}
        <motion.section variants={itemVariants} className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Why Choose ZenithMind AI
            </h2>
            <p className="text-xs text-[#64748b] max-w-md mx-auto">
              Combining passive behavioral insights with AI-guided recovery tools for sustainable leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-[#0b1120] border border-[#1e293b] hover:border-[#273448] rounded-2xl p-6 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${item.color}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Mission Card */}
        <motion.section variants={itemVariants}>
          <div className="bg-gradient-to-r from-[#0b1120] via-[#0d1428] to-[#0b1120] border border-[#1e293b] rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#6366f1]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#10b981] uppercase tracking-wider">
                <Target size={16} /> Our Core Mission
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Sustaining high performance without sacrificing human well-being.
              </h2>
              <p className="text-xs md:text-sm text-[#94a3b8] leading-relaxed">
                We help knowledge workers and leaders detect early signs of cognitive strain, deliver concise micro-interventions, and measure recovery outcomes — all while prioritizing data privacy and clinical transparency.
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard/chat"
                  className="inline-flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-[#6366f1]/20"
                >
                  Explore AI Workspace <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}