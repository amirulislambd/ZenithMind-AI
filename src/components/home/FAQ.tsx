"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  ShieldCheck,
  Brain,
  Stethoscope,
  Building2,
  Lock,
} from "lucide-react";

const faqs = [
  {
    icon: ShieldCheck,
    question: "How does ZenithMind AI protect my personal wellbeing data?",
    answer:
      "Your recordings, check-ins, and recovery notes stay private by default. We use encrypted storage practices and give you complete control over what is shared with your care team or organization.",
  },
  {
    icon: Brain,
    question: "Can the AI really be trusted for health guidance?",
    answer:
      "ZenithMind AI is designed for coaching and wellbeing support—not clinical diagnosis. It identifies patterns, provides insights, and encourages healthier habits while keeping human professionals involved.",
  },
  {
    icon: Stethoscope,
    question: "Do doctors and therapists participate in the platform?",
    answer:
      "Yes. Licensed professionals can review insights, create personalized care plans, and collaborate with users whenever they choose to receive professional support.",
  },
  {
    icon: Building2,
    question: "Is the platform suitable for organizations and teams?",
    answer:
      "Absolutely. Teams can monitor wellbeing trends anonymously, reduce burnout, and improve productivity without compromising employee privacy.",
  },
  {
    icon: Lock,
    question: "Can I export or permanently delete my data?",
    answer:
      "Yes. You can export your history, remove your information, or permanently deactivate your account whenever you choose.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="relative overflow-hidden bg-primary px-4 py-14 md:px-8 md:py-24 lg:px-16">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary-light/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            Frequently Asked Questions
          </p>

          <h2 className="mt-3 text-3xl font-bold text-neutral md:text-5xl">
            Everything you need to know
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-neutral/70">
            Find quick answers about privacy, AI guidance, healthcare
            professionals, and how ZenithMind helps individuals and teams build
            healthier lives.
          </p>
        </div>

        <div className="mt-14 space-y-5">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                layout
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                className={`
                  overflow-hidden
                  rounded-3xl
                  border
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  ${
                    isOpen
                      ? "border-accent/40 bg-white/10 shadow-xl shadow-accent/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }
                `}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        transition-all

                        ${
                          isOpen
                            ? "bg-accent text-white"
                            : "bg-white/10 text-accent"
                        }
                      `}
                    >
                      <Icon size={22} />
                    </div>

                    <div>
                      <span className="mb-1 block text-xs font-semibold tracking-widest text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="text-lg font-semibold text-neutral md:text-xl">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 45 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="rounded-full bg-white/10 p-2 text-accent"
                  >
                    <Plus size={20} />
                  </motion.div>
                </button>{" "}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/10 px-6 pb-6 pt-5">
                        <p className="leading-8 text-neutral/70">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-neutral">
            Still have questions?
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-neutral/70">
            Our team is always here to help. Whether you're exploring ZenithMind
            AI for yourself or your organization, we'll gladly answer your
            questions.
          </p>

          <button
            className="
              mt-8
              rounded-full
              bg-accent
              px-7
              py-3
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-xl
              hover:shadow-accent/30
            "
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
