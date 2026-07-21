"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { Search, ChevronDown, Brain, Activity, HeartPulse } from "lucide-react";

import Link from "next/link";

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
      trimmed ? `/explore?search=${encodeURIComponent(trimmed)}` : "/explore",
    );
  };

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const ActiveIcon = SLIDES[slideIndex].icon;

  return (
    <section
      className="
        relative
        flex
        min-h-[90vh]
        w-full
        flex-col
        items-center
        justify-center
        overflow-hidden
        bg-linear-to-br
        from-[#050d24]
        via-[#071125]
        to-[#081b35]
        px-4
        py-20
        text-center
        sm:px-6
        md:px-8
        lg:px-16
      "
    >
      {" "}
      {/* Background Glow Effects */}
      <div
        className="
        pointer-events-none
        absolute
        -top-24
        right-0
        h-72
        w-72
        rounded-full
        bg-[#6ba1ff]/20
        blur-3xl
      "
      />
      <div
        className="
        pointer-events-none
        absolute
        -bottom-24
        left-0
        h-72
        w-72
        rounded-full
        bg-[#4f7dff]/20
        blur-3xl
      "
      />
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
        relative
        z-10
        mb-6
      "
      >
        <span
          className="
          rounded-full
          border
          border-[#6ba1ff]/20
          bg-[#ffffff10]
          px-4
          py-2
          text-xs
          font-medium
          tracking-wide
          text-[#cbd5e1]
          backdrop-blur-sm
        "
        >
          AI-Powered Mental Performance Platform
        </span>
      </motion.div>
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
        relative
        z-10
        mx-auto
        max-w-4xl
        text-4xl
        font-bold
        leading-tight
        text-white
        sm:text-5xl
        lg:text-6xl
      "
      >
        Understand Your Mind.
        <br />
        Prevent Burnout Before It Starts.
      </motion.h1>
      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.15,
        }}
        className="
        relative
        z-10
        mt-6
        max-w-2xl
        text-base
        leading-8
        text-[#cbd5e1]
        sm:text-lg
      "
      >
        ZenithMind AI tracks your cognitive load, stress patterns, and recovery
        in real time — helping professionals, executives, and high performers
        stay productive without sacrificing their mental wellbeing.
      </motion.p>{" "}
      {/* Animated Stats Slider */}
      <div
        className="
          relative
          z-10
          mt-10
          flex
          min-h-[90px]
          w-full
          max-w-2xl
          items-center
          justify-center
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              flex
              w-full
              max-w-xl
              flex-col
              items-center
              gap-2
              rounded-2xl
              bg-[#ffffff14]
              px-5
              py-4
              text-center
              backdrop-blur-sm
              shadow-[0_20px_80px_-40px_rgba(0,0,0,0.55)]
              sm:flex-row
              sm:text-left
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-[#6ba1ff]/10
              "
            >
              <ActiveIcon size={22} className="text-[#6ba1ff]" />
            </div>

            <div className="flex flex-col">
              <span
                className="
                  text-2xl
                  font-bold
                  text-white
                "
              >
                {SLIDES[slideIndex].stat}
              </span>

              <span
                className="
                  text-sm
                  text-[#cbd5e1]
                "
              >
                {SLIDES[slideIndex].label}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Slider Indicators */}
      <div
        className="
          relative
          z-10
          mt-4
          flex
          items-center
          gap-2
        "
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlideIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`
              h-2
              rounded-full
              transition-all
              duration-300

              ${i === slideIndex ? "w-8 bg-[#4f7dff]" : "w-2 bg-white/30"}
            `}
          />
        ))}
      </div>{" "}
      {/* Search Box */}
      <motion.form
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.3,
        }}
        onSubmit={handleSearch}
        className="
          relative
          z-10
          mt-10
          w-full
          max-w-2xl
        "
      >
        <div
          className="
            flex
            flex-col
            gap-3
            rounded-3xl
            border
            border-white/10
            bg-[#071228]
            p-3
            backdrop-blur-xl
            shadow-[0_20px_80px_-40px_rgba(0,0,0,0.55)]
            sm:flex-row
            sm:items-center
          "
        >
          <div
            className="
              flex
              flex-1
              items-center
              gap-3
            "
          >
            <Search size={20} className="text-[#94a3b8]" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search wellness kits, focus boost, sleep optimization..."
              className="
                w-full
                bg-transparent
                text-sm
                text-white
                outline-none
                placeholder:text-[#94a3b8]
                sm:text-base
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              rounded-2xl
              bg-linear-to-r
              from-[#1666ff]
              to-[#0d4cff]
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:opacity-95
              sm:w-auto
            "
          >
            Search Now
          </button>
        </div>
      </motion.form>{" "}
      {/* CTA Buttons */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.45,
        }}
        className="
          relative
          z-10
          mt-10
          flex
          w-full
          max-w-xl
          flex-col
          items-center
          justify-center
          gap-4
          sm:flex-row
        "
      >
        <Link
          href="/explore"
          className="
            inline-flex
            w-full
            items-center
            justify-center
            rounded-full
            bg-linear-to-r
            from-[#1666ff]
            to-[#0d4cff]
            px-8
            py-4
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-[#1666ff]/25
            transition-all
            duration-300
            hover:scale-105
            sm:w-auto
          "
        >
          Explore Wellness Kits
        </Link>

        <Link
          href="/about"
          className="
            inline-flex
            w-full
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/5
            px-8
            py-4
            text-sm
            font-semibold
            text-white
            backdrop-blur-sm
            transition-all
            duration-300
            hover:bg-white/10
            sm:w-auto
          "
        >
          Learn More
        </Link>
      </motion.div>
      {/* Trust Indicators */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.6,
        }}
        className="
          relative
          z-10
          mt-10
          flex
          flex-wrap
          items-center
          justify-center
          gap-6
          text-xs
          text-[#94a3b8]
          sm:text-sm
        "
      >
        <span>✓ AI-Powered Insights</span>

        <span>✓ Burnout Detection</span>

        <span>✓ Cognitive Analytics</span>

        <span>✓ Recovery Tracking</span>
      </motion.div>{" "}
      {/* Scroll Down Indicator */}
      <motion.button
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.8,
        }}
        onClick={scrollToFeatures}
        aria-label="Scroll to features"
        className="
          absolute
          bottom-6
          z-10
          flex
          flex-col
          items-center
          gap-1
          text-[#cbd5e1]/80
          transition-all
          hover:text-white
        "
      >
        <span
          className="
            text-xs
            uppercase
            tracking-[0.2em]
          "
        >
          Scroll
        </span>

        <ChevronDown size={28} className="animate-bounce" />
      </motion.button>
    </section>
  );
}