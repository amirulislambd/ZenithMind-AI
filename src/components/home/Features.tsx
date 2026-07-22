"use client";

import { motion } from "framer-motion";
import { Activity, BrainCog, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    title: "Real-time Burnout Index",
    description:
      "Track cognitive strain, recovery gaps, and stress volatility as they evolve through the day.",
    icon: Activity,
  },
  {
    title: "AI Therapist Chat",
    description:
      "Receive calm, evidence-informed guidance that helps you reset before pressure turns into exhaustion.",
    icon: BrainCog,
  },
  {
    title: "Smart Wearable Sync",
    description:
      "Bring sleep, heart-rate, and recovery signals into one place for clearer decision-making.",
    icon: Sparkles,
  },
  {
    title: "Private Recovery Plans",
    description:
      "Build targeted rituals around focus, rest, and emotional balance without exposing your data.",
    icon: ShieldCheck,
  },
];

const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function Features() {
  return (
    <section
      id="features"
      className="
        relative
        overflow-hidden
        bg-primary
        px-4
        py-14
        md:px-8
        md:py-20
        lg:px-16
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-72
          w-72
          -translate-x-1/2
          rounded-full
          bg-accent/20
          blur-[120px]
        "
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.24em]
              text-secondary-light
            "
          >
            Why leaders choose ZenithMind AI
          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-semibold
              leading-tight
              text-neutral
              md:text-5xl
            "
          >
            Calm clarity for high-pressure teams and ambitious professionals.
          </h2>

          <p
            className="
              mt-5
              text-base
              leading-8
              text-neutral/70
              md:text-lg
            "
          >
            The platform turns scattered wellbeing signals into practical
            coaching, helping people recover sooner and perform more
            sustainably.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          className="
            mt-12
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                variants={cardAnimation}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  group
                  relative
                  rounded-[28px]
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  text-center
                  backdrop-blur-xl
                  transition
                  hover:border-accent/40
                  hover:bg-white/10
                  hover:shadow-[0_0_35px_-10px_rgba(56,189,248,0.5)]
                "
              >
                {/* Icon */}
                <div
                  className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-accent/30
                    to-secondary/20
                    text-accent
                    transition
                    group-hover:scale-110
                  "
                >
                  <Icon size={26} />
                </div>

                <h3
                  className="
                    mt-6
                    text-lg
                    font-semibold
                    text-neutral
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-neutral/70
                  "
                >
                  {feature.description}
                </p>

                {/* Bottom Glow */}
                <div
                  className="
                    absolute
                    inset-x-10
                    bottom-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-accent/50
                    to-transparent
                    opacity-0
                    transition
                    group-hover:opacity-100
                  "
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
