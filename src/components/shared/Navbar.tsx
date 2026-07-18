"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Home,
  LayoutDashboard,
  Info,
  LifeBuoy,
  Compass,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/src/context/AuthContext";

interface NavRoute {
  label: string;
  href: string;
  icon?: React.ElementType;
}

const LOGGED_OUT_ROUTES: NavRoute[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Explore Kits",
    href: "/explore",
    icon: Compass,
  },
];

const LOGGED_IN_ROUTES: NavRoute[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Explore Kits",
    href: "/explore",
    icon: Compass,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "About Us",
    href: "/about",
    icon: Info,
  },
  {
    label: "Support",
    href: "/support",
    icon: LifeBuoy,
  },
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
    <header
      className="
    sticky
    top-0
    z-50
    border-b
    border-white/10
    bg-[#0B1120]/80
    backdrop-blur-xl
  "
    >
      <nav
        className="
      mx-auto
      flex
      h-16
      max-w-7xl
      items-center
      justify-between
      px-4
      md:px-8
    "
      >
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
            <span className="text-lg font-black text-white">Z</span>
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
        <div className="hidden items-center gap-8 md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`
        text-sm
        font-medium
        transition

        ${
          isActive(route.href)
            ? "text-cyan-400"
            : "text-slate-300 hover:text-white"
        }
      `}
            >
              {route.label}
            </Link>
          ))}

          {!user && (
            <Link
              href="/login"
              className="
        rounded-xl
        bg-cyan-500
        px-5
        py-2
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-cyan-400
      "
            >
              Login
            </Link>
          )}
          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="
          flex
          items-center
          gap-2
          rounded-xl
          p-1
          hover:bg-white/5
        "
              >
                {user.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="
              h-9
              w-9
              rounded-full
              object-cover
            "
                  />
                ) : (
                  <div
                    className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-cyan-500
              text-white
            "
                  >
                    {user.name?.[0]}
                  </div>
                )}

                <ChevronDown
                  size={16}
                  className={`
            text-slate-400
            transition
            ${profileOpen ? "rotate-180" : ""}
          `}
                />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="
        absolute
        right-0
        mt-3
        w-56
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#111827]
        shadow-2xl
      "
                  >
                    <div className="border-b border-white/10 p-4">
                      <p className="font-medium text-white">{user.name}</p>

                      <p className="mt-1 text-xs text-slate-400">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="
          flex
          items-center
          gap-3
          px-4
          py-3
          text-sm
          text-slate-300
          transition
          hover:bg-white/5
        "
                    >
                      <User size={16} />
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="
          flex
          w-full
          items-center
          gap-3
          px-4
          py-3
          text-left
          text-sm
          text-red-400
          transition
          hover:bg-red-500/10
        "
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="
    rounded-xl
    p-2
    text-white
    transition
    cursor-pointer
    hover:bg-white/5
    md:hidden
  "
        >
          <Menu size={24} />
        </button>
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="
        fixed
        inset-0
        z-40
        bg-black/60
        backdrop-blur-sm
      "
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
              className="
        fixed
        right-0
        top-0
        z-50
        flex
        h-screen
        w-[320px]
        flex-col
        border-l
        border-white/10
        bg-[#0B1120]
        p-6
      "
            >
              {/* Top Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-white">Menu</h2>

                  <button
                    onClick={() => setMobileOpen(false)}
                    className="text-slate-400 cursor-pointer hover:text-white"
                  >
                    <X />
                  </button>
                </div>

                {user && (
                  <div
                    className="
              mt-8
              rounded-2xl
              border
              border-cyan-500/20
              bg-cyan-500/10
              p-4
            "
                  >
                    <div className="flex items-center gap-3">
                      {user.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt={user.name}
                          className="
                    h-14
                    w-14
                    rounded-full
                    object-cover
                  "
                        />
                      ) : (
                        <div
                          className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-cyan-500
                    text-xl
                    font-bold
                    text-white
                  "
                        >
                          {user.name?.[0]}
                        </div>
                      )}

                      <div>
                        <p className="font-medium text-white">{user.name}</p>

                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="mt-8 space-y-2">
                  {routes.map((route) => {
                    const Icon = route.icon;

                    return (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setMobileOpen(false)}
                        className={`
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition

                  ${
                    isActive(route.href)
                      ? "border border-cyan-500/20 bg-cyan-500/15 text-cyan-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }
                `}
                      >
                        {Icon && <Icon size={18} />}
                        {route.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t border-white/10 pt-4">
                {!user ? (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="
              flex
              w-full
              items-center
              justify-center
              rounded-2xl
              bg-cyan-500
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-cyan-400
            "
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              px-4
              py-3
              text-sm
              font-semibold
              text-red-400
              transition
              hover:bg-red-500/20
            "
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                )}

                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-500">
                    Powered by ZenithMind AI
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    © {new Date().getFullYear()} All Rights Reserved
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
