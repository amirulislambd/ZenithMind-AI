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

export default function Features() {
  return (
    <section id="features" className="bg-[#f8fafc] px-4 py-12 md:px-8 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">
            Why leaders choose ZenithMind AI
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#1e293b] md:text-4xl">
            Calm clarity for high-pressure teams and ambitious professionals.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The platform turns scattered wellbeing signals into practical coaching, helping people recover sooner and perform more sustainably.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e0e7ff] text-[#6366f1]">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#1e293b]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
