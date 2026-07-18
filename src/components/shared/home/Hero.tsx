"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";

// Rotating background images for the hero slider.
// Replace these with real ZenithMind AI brand photography when available.
const SLIDES = [
  "https://picsum.photos/seed/zenith-calm/1600/900",
  "https://picsum.photos/seed/zenith-focus/1600/900",
  "https://picsum.photos/seed/zenith-recovery/1600/900",
];

const SLIDE_INTERVAL_MS = 5000;

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
    if (trimmed) {
      router.push(`/explore?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/explore");
    }
  };

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex h-[65vh] w-full flex-col items-center justify-center overflow-hidden px-4 text-center md:px-8 lg:px-16">
      {/* Sliding background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slideIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SLIDES[slideIndex]}
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark premium overlay so text stays readable over any photo */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-accent/70" />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      {/* Slide indicator dots */}
      <div className="absolute bottom-16 z-10 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setSlideIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === slideIndex ? "w-6 bg-secondary" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl text-3xl font-bold text-white md:text-5xl"
      >
        Understand Your Mind. Prevent Burnout Before It Starts.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative z-10 mt-4 max-w-xl text-base text-white/80 md:text-lg"
      >
        ZenithMind AI tracks your cognitive load, stress patterns, and recovery
        in real time — so you can perform at your best without burning out.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onSubmit={handleSearch}
        className="relative z-10 mt-8 flex w-full max-w-md items-center gap-2 rounded-xl bg-white p-2 shadow-lg"
      >
        <Search size={20} className="ml-2 text-primary/50" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search wellness kits, e.g. Sleep Optimization"
          className="flex-1 bg-transparent px-1 text-sm text-primary outline-none placeholder:text-primary/40"
        />
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Search
        </button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="relative z-10 mt-6"
      >
        <Link
          href="/explore"
          className="rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          Explore Wellness Kits
        </Link>
      </motion.div>

      <button
        onClick={scrollToFeatures}
        aria-label="Scroll to features"
        className="absolute bottom-6 z-10 animate-bounce text-white/80 hover:text-white"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}