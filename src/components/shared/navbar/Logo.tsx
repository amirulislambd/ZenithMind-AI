"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 transition-transform duration-200 active:scale-95"
    >
      {/* 
        Icon Container: 
        Mobile: h-12 w-12 (3-line height matched)
        Desktop (sm): h-14 w-14 (Perfect fit for 2 lines)
      */}
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 p-1 shadow-md backdrop-blur-md transition-all duration-300 group-hover:border-indigo-500/40 group-hover:shadow-indigo-500/20 sm:h-13 sm:w-13">
        <Image
          src="/aiLogo.png"
          alt="ZenithMind AI Logo"
          width={56}
          height={56}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* Brand Typography aligned properly */}
      <div className="flex flex-col justify-center -space-y-0.5">
        <h1
          className="
            bg-gradient-to-r
            from-cyan-400
            via-blue-400
            to-indigo-400
            bg-clip-text
            text-base
            font-extrabold
            leading-tight
            tracking-tight
            text-transparent
            transition-all
            duration-300
            group-hover:brightness-110
            sm:text-xl
          "
        >
          ZenithMind
        </h1>

        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-slate-400
            transition-colors
            duration-300
            group-hover:text-slate-300
            sm:text-[10px]
          "
        >
          AI Learning Platform
        </p>
      </div>
    </Link>
  );
}