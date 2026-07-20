"use client";

import { PlanStep } from "@/src/types/chat";



export default function AgenticPlanPanel({ plan }: { plan: PlanStep[] }) {
  if (plan.length === 0) return null;

  return (
    <div className="border-t border-white/10 px-3 py-3 sm:px-4 lg:px-6">
      <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-200">
          Agentic reasoning
        </p>
        <ul className="space-y-1 text-sm text-slate-200">
          {plan.map((step, i) => (
            <li key={i}>
              <span className="font-medium text-white">{step.title}:</span> {step.detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}