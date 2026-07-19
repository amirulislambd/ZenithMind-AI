import React from 'react';

export default function SupportPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Support</h1>
      <p className="text-neutral-700 mb-4">If you need assistance with ZenithMind AI, our support team is ready to help.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold">Contact Us</h3>
          <p className="mt-2 text-neutral-700">Email: support@zenithmind.ai</p>
          <p className="mt-1 text-neutral-700">Phone: +1 (800) 555-0199 (Mon–Fri, 9am–6pm ET)</p>
          <p className="mt-2 text-sm text-neutral-500">For enterprise support, include your organization name and a brief summary of the issue.</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h3 className="font-semibold">Help Center</h3>
          <p className="mt-2 text-neutral-700">Visit our knowledge base at <a className="text-primary underline" href="https://zenithmind.ai/help">zenithmind.ai/help</a> for guides on onboarding, analytics, and AI behavior.</p>
        </div>
      </div>
    </main>
  );
}
