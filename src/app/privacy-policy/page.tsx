import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-neutral-700 mb-4">ZenithMind AI collects minimal operational data required to deliver personalized cognitive health insights. Sensitive personal data and health metrics are stored securely and only accessed for the purpose of improving user outcomes. We do not sell user data to third parties.</p>

      <section className="mt-6">
        <h2 className="font-semibold">Data Collected</h2>
        <ul className="list-disc pl-6 text-neutral-700">
          <li>Account profile (name, email)</li>
          <li>Activity and engagement metrics</li>
          <li>Optional wearable telemetry when user consents</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Security</h2>
        <p className="text-neutral-700">We use industry-standard encryption in transit and at rest. Access controls and auditing limit access to authorized systems and personnel only.</p>
      </section>
    </main>
  );
}
