"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-[#0f172a] px-4 py-12 md:px-8 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-linear-to-br from-[#1e293b] to-[#0f172a] p-8 text-white md:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#93c5fd]">
              Join ZenithCircle
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Receive practical recovery insights before your calendar gets crowded.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Get thoughtful reflections on burnout prevention, focus, and sustainable performance delivered with clarity.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <label htmlFor="email" className="text-sm font-medium text-slate-200">
              Work email
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-2xl border border-white/10 bg-white/90 px-4 py-3 text-sm text-[#1e293b] outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#10b981] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Joining..." : "Join ZenithCircle"}
                <ArrowRight size={16} />
              </button>
            </div>

            {status === "success" && (
              <div className="mt-4 flex items-center gap-2 text-sm text-[#bbf7d0]">
                <CheckCircle2 size={16} />
                You&apos;re on the list. Expect thoughtful recovery updates soon.
              </div>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-[#fecaca]">
                Something went wrong. Please try again in a moment.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
