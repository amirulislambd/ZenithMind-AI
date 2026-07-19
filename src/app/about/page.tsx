import React from 'react';

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">About ZenithMind AI</h1>
      <p className="text-neutral-700 mb-6">ZenithMind AI is a premium cognitive health platform focused on identifying, tracking, and reducing executive burnout. We combine passive and active behavioral metrics with intelligent AI-guided interventions to help teams and leaders sustain high performance while preserving well-being.</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Why Choose ZenithMind AI</h2>
        <ul className="list-disc pl-6 text-neutral-700">
          <li><strong>Evidence-driven insights:</strong> Our analytics synthesize session patterns and wearable inputs to surface early burnout indicators.</li>
          <li><strong>Personalized coaching:</strong> The AI Executive Coach offers practical cognitive optimization strategies tailored to user history.</li>
          <li><strong>Enterprise-ready:</strong> Role-based dashboards, secure data controls, and team-level KPIs for HR and leadership.</li>
          <li><strong>Actionable workflows:</strong> Guided recovery plans, micro-interventions, and recommended learning kits.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-neutral-700 mt-2">We help knowledge workers and leaders detect early signs of cognitive strain, deliver concise interventions, and measure recovery outcomes — all while prioritizing data privacy and clinical transparency.</p>
      </section>
    </main>
  );
}
