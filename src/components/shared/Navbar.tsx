"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";


interface NavRoute {
  label: string;
  href: string;
}

const LOGGED_OUT_ROUTES: NavRoute[] = [
  { label: "Home", href: "/" },
  { label: "Explore Kits", href: "/explore" },
];

const LOGGED_IN_ROUTES: NavRoute[] = [
  { label: "Home", href: "/" },
  { label: "Explore Kits", href: "/explore" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "About Us", href: "/about" },
  { label: "Support", href: "/support" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const handleLogout = () => {
    setProfileOpen(false);
    setMobileOpen(false);
    logout();
    router.push("/");
  };

  const routes = user ? LOGGED_IN_ROUTES : LOGGED_OUT_ROUTES;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-neutral/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8 lg:px-16">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold text-primary">
          ZenithMind<span className="text-accent">AI</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors ${
                isActive(route.href)
                  ? "text-accent"
                  : "text-primary/70 hover:text-primary"
              }`}
            >
              {route.label}
            </Link>
          ))}

          {!user && (
            <Link
              href="/login"
              className="rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              Login
            </Link>
          )}

          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-neutral-100"
              >
                {user.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <ChevronDown
                  size={16}
                  className={`text-primary/60 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-neutral-200 bg-white py-2 shadow-md">
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:bg-neutral-100"
                  >
                    <User size={16} />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-neutral-100"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="text-primary md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-neutral md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive(route.href)
                    ? "bg-accent/10 text-accent"
                    : "text-primary/80 hover:bg-neutral-100"
                }`}
              >
                {route.label}
              </Link>
            ))}

            {!user ? (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-xl bg-accent px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-primary/80 hover:bg-neutral-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-neutral-100"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}