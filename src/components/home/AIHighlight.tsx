import Link from "next/link";
import { ArrowRight, Brain, FileSearch } from "lucide-react";

export default function AIHighlight() {
  return (
    <section className="bg-primary px-4 py-12 md:px-8 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-primary-light/60 p-8 text-neutral shadow-[0_0_50px_-12px_rgba(37,99,235,0.35)] md:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#93c5fd]">
              Agentic AI, elevated
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Meet the two AI companions that make recovery proactive instead of
              reactive.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              The conversational guide helps you think clearly in the moment,
              while the file analyzer turns complex wellness data into practical
              next steps.
            </p>
            <Link
              href="/dashboard"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#10b981] px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Launch AI Space
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1d4ed8] text-white">
                  <Brain size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">AI Conversational Guide</h3>
                  <p className="text-sm text-slate-300">
                    Adaptive coaching for stress, focus, and recovery planning.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6366f1] text-white">
                  <FileSearch size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">File Data Analyzer</h3>
                  <p className="text-sm text-slate-300">
                    Find patterns in CSV and wellness exports without needing a
                    spreadsheet expert.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
