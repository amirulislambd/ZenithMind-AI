"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does ZenithMind AI protect my personal wellbeing data?",
    answer:
      "Your recordings, check-ins, and recovery notes stay private by default. We use encrypted storage practices and give you control over what is shared with your care team or organization.",
  },
  {
    question: "Can the AI really be trusted for health guidance?",
    answer:
      "The assistant is designed to support reflection and coaching, not replace licensed clinical judgment. It can surface patterns and suggest next steps, while human professionals remain part of the process.",
  },
  {
    question: "Do doctors and therapists participate in the platform?",
    answer:
      "Yes. Certified clinicians can review insights, contribute care plans, and collaborate with users when they opt in to professional support.",
  },
  {
    question: "Is the platform suitable for high-performing teams?",
    answer:
      "Absolutely. The system is built for organizations that want healthier work patterns without compromising privacy, clarity, or operational flexibility.",
  },
  {
    question: "What happens if I want to stop using it?",
    answer:
      "You can export your notes and deactivate the account at any time. We make it easy to pause or leave without losing the context you already built.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-primary px-4 py-12 md:px-8 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
            Frequently asked questions
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral md:text-4xl">
            Clear answers for people evaluating a more humane path to wellbeing.
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-primary-light/40 shadow-sm"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="text-lg font-semibold text-neutral">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"} text-[#6366f1]`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-7 text-neutral/70">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
