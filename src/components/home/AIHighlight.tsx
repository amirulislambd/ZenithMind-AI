"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  FileSearch,
  Sparkles,
  Mic,
  Languages,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Conversational Guide",
    description:
      "Adaptive coaching for stress, focus, productivity and recovery planning.",
    color: "from-sky-500 to-cyan-500",
    badge: "Smart Coaching",
  },
  {
    icon: FileSearch,
    title: "File Data Analyzer",
    description:
      "Analyze PDFs, CSV files and wellness reports with AI-powered insights.",
    color: "from-violet-500 to-indigo-500",
    badge: "Deep Analysis",
  },
];

const capabilities = [
  {
    icon: Mic,
    label: "Voice AI",
  },
  {
    icon: Languages,
    label: "Multilingual",
  },
  {
    icon: Sparkles,
    label: "Agentic Memory",
  },
];

export default function AIHighlight() {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-14 md:px-8 md:py-24 lg:px-16">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-indigo-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10 lg:p-14">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300">
              <Sparkles size={16} />
              Agentic AI Experience
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-neutral md:text-5xl">
              Meet your next-generation
              <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                AI Wellness Companion
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Experience intelligent conversations, powerful document analysis,
              multilingual voice assistance and proactive recovery guidance— all
              inside one premium AI workspace.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {capabilities.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur"
                >
                  <item.icon size={16} className="text-sky-400" />
                  {item.label}
                </div>
              ))}
            </div>

            <Link
              href="/dashboard"
              className="group mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-7 py-4 font-semibold text-white shadow-xl shadow-sky-500/20 transition-all duration-300 hover:scale-105"
            >
              Launch AI Space
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {/* Right */}
          <div className="space-y-5">
            {" "}
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.55,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-sky-400/30
                  hover:shadow-2xl
                  hover:shadow-sky-500/10
                "
              >
                <div
                  className={`
                    absolute
                    right-0
                    top-0
                    h-28
                    w-28
                    rounded-full
                    bg-gradient-to-br
                    ${feature.color}
                    opacity-10
                    blur-3xl
                  `}
                />

                <div className="flex items-start gap-4">
                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      ${feature.color}
                      text-white
                      shadow-lg
                    `}
                  >
                    <feature.icon size={24} />
                  </div>

                  <div className="flex-1">
                    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-sky-300">
                      {feature.badge}
                    </span>

                    <h3 className="mt-3 text-xl font-semibold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              transition={{
                delay: 0.35,
              }}
              viewport={{
                once: true,
              }}
              className="
                rounded-3xl
                border
                border-sky-500/20
                bg-gradient-to-r
                from-sky-500/10
                to-indigo-500/10
                p-6
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-widest text-sky-300">
                    AI Performance
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-white">
                    99.9% Response Accuracy
                  </h3>
                </div>

                <div className="rounded-2xl bg-sky-500/20 p-4">
                  <Sparkles size={28} className="text-sky-300" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
