"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Brain, Activity, HeartPulse } from "lucide-react";
import Link from "next/link";

// Rotating content slides — no external images, per spec.
// Each slide highlights one core capability of ZenithMind AI.
const SLIDES = [
  {
    icon: Brain,
    stat: "10,000+",
    label: "Cognitive check-ins tracked this month",
  },
  {
    icon: Activity,
    stat: "42%",
    label: "Average reduction in reported burnout signals",
  },
  {
    icon: HeartPulse,
    stat: "24/7",
    label: "Real-time stress & recovery monitoring",
  },
];

const SLIDE_INTERVAL_MS = 4000;

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(
      trimmed ? `/explore?search=${encodeURIComponent(trimmed)}` : "/explore"
    );
  };

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const ActiveIcon = SLIDES[slideIndex].icon;

  return (
    <section className="relative flex h-[65vh] w-full flex-col items-center justify-center overflow-hidden bg-linear-to-br from-[#050d24] via-[#071125] to-[#081b35] px-4 text-center md:px-8 lg:px-16">
      {/* Decorative glow — gradient only, no images */}
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#6ba1ff]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-[#4f7dff]/20 blur-3xl" />

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl text-3xl font-bold text-white md:text-5xl"
      >
        Understand Your Mind. Prevent Burnout Before It Starts.
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative z-10 mt-4 max-w-xl text-base text-[#cbd5e1] md:text-lg"
      >
        ZenithMind AI tracks your cognitive load, stress patterns, and recovery
        in real time — so you can perform at your best without burning out.
      </motion.p>

      {/* Interactive rotating stat slider */}
      <div className="relative z-10 mt-6 flex h-14 w-full max-w-md items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 rounded-xl bg-[#ffffff14] px-5 py-2.5 backdrop-blur-sm shadow-[0_20px_80px_-40px_rgba(0,0,0,0.55)]"
          >
            <ActiveIcon size={20} className="text-[#6ba1ff]" />
            <span className="text-lg font-bold text-white">
              {SLIDES[slideIndex].stat}
            </span>
            <span className="text-sm text-[#cbd5e1]/90">
              {SLIDES[slideIndex].label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicator dots */}
      <div className="relative z-10 mt-3 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Show stat ${i + 1}`}
            onClick={() => setSlideIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === slideIndex ? "w-6 bg-[#4f7dff]" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Functional search input */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onSubmit={handleSearch}
        className="relative z-10 mt-6 flex w-full max-w-md items-center gap-2 rounded-xl bg-[#071228] p-2 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.55)]"
      >
        <Search size={20} className="ml-2 text-[#94a3b8]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search wellness kits, e.g. Sleep Optimization"
          className="flex-1 bg-transparent px-1 text-sm text-white outline-none placeholder:text-[#94a3b8]"
        />
        <button
          type="submit"
          className="rounded-lg bg-linear-to-r from-[#1666ff] to-[#0d4cff] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Search
        </button>
      </motion.form>

      {/* Primary CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="relative z-10 mt-6"
      >
        <Link
          href="/explore"
          className="rounded-full bg-linear-to-r from-[#1666ff] to-[#0d4cff] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1666ff]/25 transition hover:opacity-95"
        >
          Explore Wellness Kits
        </Link>
      </motion.div>

      {/* Visual flow indicator to next section */}
      <button
        onClick={scrollToFeatures}
        aria-label="Scroll to features"
        className="absolute bottom-6 z-10 animate-bounce text-[#cbd5e1]/80 hover:text-white"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}