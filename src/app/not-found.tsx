import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#070c14] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-black/40">
        <div className="mb-6 rounded-3xl bg-slate-900/90 p-6 text-slate-100">
          <h1 className="text-4xl font-semibold tracking-tight">404</h1>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            The page you’re looking for can’t be found. It may have been removed or the URL might be wrong.
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-300">
          <p className="text-sm">Try these steps:</p>
          <ul className="list-inside list-disc space-y-2 text-sm text-slate-400">
            <li>Check the URL for typos.</li>
            <li>Return to the homepage.</li>
            <li>Visit the dashboard from the main menu.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Go back home
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-indigo-400/50 hover:text-white"
          >
            Explore kits
          </Link>
        </div>
      </div>
    </div>
  );
}
