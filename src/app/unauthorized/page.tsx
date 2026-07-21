import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#070c14] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-black/40">
        <div className="mb-6 rounded-3xl bg-slate-900/90 p-6 text-slate-100">
          <h1 className="text-3xl font-semibold sm:text-4xl">Unauthorized</h1>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            You don’t have access to this section. Please log in with an authorized account to continue.
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-slate-300">
          <p className="text-sm">Need access?</p>
          <ul className="list-inside list-disc space-y-2 text-sm text-slate-400">
            <li>Sign in or register for an account.</li>
            <li>Check the access permissions on your profile.</li>
            <li>Return to the homepage if you were redirected in error.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Log in now
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-indigo-400/50 hover:text-white"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
