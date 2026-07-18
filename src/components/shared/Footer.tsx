import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
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
  { icon: FaFacebook, href: "https://facebook.com/zenithmindai", label: "Facebook" },
  { icon: BsTwitterX, href: "https://x.com/zenithmindai", label: "X (Twitter)" },
  { icon: LiaLinkedin, href: "https://linkedin.com/company/zenithmindai", label: "LinkedIn" },
  { icon: BsInstagram, href: "https://instagram.com/zenithmindai", label: "Instagram" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050d24] text-[#cbd5e1]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-2 md:px-8 lg:grid-cols-4 lg:px-16">
        {/* Column 1: Brand Info */}
        <div>
          <Link href="/" className="text-xl font-bold text-white">
            ZenithMind<span className="text-[#6ba1ff]">AI</span>
          </Link>
          <p className="mt-3 text-sm text-[#94a3b8]">
            Real-time cognitive health tracking and burnout prevention for
            individuals and high-performing teams.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#7f9afe]">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[#cbd5e1] transition hover:text-[#6ba1ff]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#7f9afe]">
            Categories
          </h3>
          <ul className="mt-4 space-y-2">
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/explore?category=${cat.slug}`}
                  className="text-sm text-primary/70 transition hover:text-accent"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Socials */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#7f9afe]">
            Contact
          </h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2 text-sm text-[#cbd5e1]">
              <Mail size={16} className="mt-0.5 shrink-0 text-[#6ba1ff]" />
              <a href="mailto:support@zenithmind.ai" className="hover:text-[#6ba1ff]">
                support@zenithmind.ai
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-[#cbd5e1]">
              <Phone size={16} className="mt-0.5 shrink-0 text-[#6ba1ff]" />
              <a href="tel:+18005551234" className="hover:text-[#6ba1ff]">
                +1 (800) 555-1234
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-[#cbd5e1]">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#6ba1ff]" />
              <span>221 Wellness Ave, Suite 400, Austin, TX 78701</span>
            </li>
          </ul>

          <div className="mt-5 flex gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0b1633] text-[#cbd5e1] transition hover:bg-[#1666ff] hover:text-white"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Compliance Bar */}
      <div className="border-t border-[#173056]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-[#94a3b8] md:flex-row md:px-8 lg:px-16">
          <p>© {year} ZenithMind AI. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-[#6ba1ff]">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#6ba1ff]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}