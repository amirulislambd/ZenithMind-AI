"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "About Us", href: "/about" },
  { label: "Support", href: "/support" },
];

const CATEGORIES = [
  { label: "Stress Relief", slug: "stress-relief" },
  { label: "Sleep Optimization", slug: "sleep-optimization" },
  { label: "Executive Recovery", slug: "executive-recovery" },
  { label: "Focus Boost", slug: "focus-boost" },
];

const SOCIALS = [
  {
    icon: FaFacebook,
    href: "https://facebook.com/zenithmindai",
    label: "Facebook",
  },
  {
    icon: BsTwitterX,
    href: "https://x.com/zenithmindai",
    label: "X",
  },
  {
    icon: LiaLinkedin,
    href: "https://linkedin.com/company/zenithmindai",
    label: "LinkedIn",
  },
  {
    icon: BsInstagram,
    href: "https://instagram.com/zenithmindai",
    label: "Instagram",
  },
];

const TRUST = [
  { icon: ShieldCheck, title: "Privacy First" },
  { icon: BadgeCheck, title: "Secure Platform" },
  { icon: Sparkles, title: "AI Powered" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050d24] text-slate-300 backdrop-blur-xl">
      {/* Background Neon Ambient Glows */}
      <div className="pointer-events-none absolute left-1/4 top-0 -z-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-80 w-80 rounded-full bg-indigo-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-16 lg:py-16">
        {/* =======================================================
            1. DESKTOP & TABLET VIEW (4-Column Layout)
           ======================================================= */}
        <div className="hidden sm:block">
          {/* Trust Badges */}
          <div className="mb-12 flex flex-wrap items-center gap-3">
            {TRUST.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 backdrop-blur-md transition-colors hover:border-sky-500/30 hover:bg-white/10"
              >
                <item.icon size={16} className="text-sky-400" />
                <span>{item.title}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <Link href="/" className="inline-flex items-center gap-2.5">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 p-1 shadow-md">
                  <Image
                    src="/aiLogo.png"
                    alt="ZenithMind AI"
                    width={44}
                    height={44}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
                    ZenithMind
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    AI Learning Platform
                  </span>
                </div>
              </Link>

              <p className="text-sm leading-relaxed text-slate-400">
                Intelligent mental wellness powered by AI. Helping individuals
                and teams prevent burnout before it happens.
              </p>
            </motion.div>

            {/* Quick Links Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-sm">
                {QUICK_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-sky-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Categories Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
                Categories
              </h3>
              <ul className="space-y-2.5 text-sm">
                {CATEGORIES.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/explore?category=${item.slug}`}
                      className="transition-colors hover:text-sky-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Contact
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <Mail size={16} className="text-sky-400 shrink-0" />
                  <a
                    href="mailto:support@zenithmind.ai"
                    className="transition-colors hover:text-sky-400"
                  >
                    support@zenithmind.ai
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={16} className="text-sky-400 shrink-0" />
                  <a
                    href="tel:+18005551234"
                    className="transition-colors hover:text-sky-400"
                  >
                    +1 (800) 555-1234
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin size={16} className="text-sky-400 shrink-0" />
                  <span>Austin, Texas, United States</span>
                </li>
              </ul>

              <div className="pt-2">
                <p className="mb-2 text-xs font-medium text-slate-300">
                  Follow Us
                </p>
                <div className="flex gap-2">
                  {SOCIALS.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-sky-400/40 hover:bg-sky-500 hover:text-white"
                      aria-label={social.label}
                    >
                      <social.icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* =======================================================
            2. MOBILE VIEW (Centered, Clean & Ultra-Compact)
           ======================================================= */}
        <div className="flex flex-col items-center text-center space-y-6 sm:hidden">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex flex-col items-center gap-2">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 p-1 shadow-md">
              <Image
                src="/aiLogo.png"
                alt="ZenithMind AI"
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
                ZenithMind
              </span>
              <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                AI Learning Platform
              </span>
            </div>
          </Link>

          {/* Short 2-line Bio */}
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            Intelligent AI for Mental Wellness & Learning
          </p>

          <div className="w-full border-t border-white/10" />

          {/* Essential Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-200">
            {QUICK_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-sky-400"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Social Icons Centered */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-300 transition-colors active:scale-95"
                aria-label={social.label}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>

          <div className="w-full border-t border-white/10" />

          {/* Compact Legal Links */}
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <Link href="/privacy-policy" className="hover:text-slate-200">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:text-slate-200">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-slate-200">
              Cookies
            </Link>
          </div>
        </div>

        {/* =======================================================
            3. GLOBAL BOTTOM BAR
           ======================================================= */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500 sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>
            © {year}{" "}
            <span className="font-semibold text-slate-300">ZenithMind AI</span>.
            All rights reserved.
          </p>
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-sky-400">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-sky-400">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-sky-400">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
