"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-cyan-500
          via-blue-500
          to-violet-600
          shadow-lg
          shadow-cyan-500/25
        "
      >
        <span className="text-lg font-black text-white">
          Z
        </span>
      </div>

      <div>
        <h1
          className="
            bg-gradient-to-r
            from-cyan-400
            via-blue-400
            to-violet-400
            bg-clip-text
            text-lg
            font-extrabold
            tracking-tight
            text-transparent
          "
        >
          ZenithMind
        </h1>

        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-slate-500
          "
        >
          AI Learning Platform
        </p>
      </div>
    </Link>
  );
}