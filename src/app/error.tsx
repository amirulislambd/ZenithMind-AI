"use client";

import Link from "next/link";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-[#070c14] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-black/40">
        <div className="mb-6 rounded-3xl bg-indigo-500/10 p-6 text-slate-100">
          <h1 className="text-3xl font-semibold sm:text-4xl">Something went wrong</h1>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            We hit an unexpected error while loading this page. Please try again or go back to the app.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-300">
          <p className="text-sm text-slate-400">Error details:</p>
          <pre className="mt-3 whitespace-pre-wrap text-xs leading-6 text-slate-200 sm:text-sm">
            {error?.message}
          </pre>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Reload page
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-indigo-400/50 hover:text-white"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
