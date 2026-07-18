"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Menu,
  ChevronDown,
} from "lucide-react";

import { usePathname } from "next/navigation";

import { useAuth } from "@/src/context/AuthContext";

import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileDrawer from "./MobileDrawer";
import ProfileDropdown from "./ProfileDropdown";

import {
  LOGGED_IN_ROUTES,
  LOGGED_OUT_ROUTES,
} from "./routes";

export default function Navbar() {
  const pathname = usePathname();

  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  const routes = user
    ? LOGGED_IN_ROUTES
    : LOGGED_OUT_ROUTES;

  const handleLogout = () => {
    setProfileOpen(false);
    setMobileOpen(false);
    logout();
  };

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-[#1e293b]/40
          bg-[#0b1120]/95
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
          <Logo />

          <DesktopNav
            routes={routes}
            isActive={isActive}
          />

          <div className="hidden md:block">
            {!user ? (
              <Link
                href="/login"
                className="
                  rounded-full
                  bg-linear-to-r
                  from-[#1666ff]
                  to-[#0d4cff]
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-[#1666ff]/20
                  transition
                  hover:opacity-95
                "
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() =>
                    setProfileOpen(
                      !profileOpen
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border border-slate-600 bg-slate-800 flex items-center justify-center shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={(user as any).image || (user as any).imageUrl || ""} 
                      alt={user.name || "User"} 
                      className="h-full w-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                      style={{ display: ((user as any).image || (user as any).imageUrl) ? 'block' : 'none' }}
                    />
                    <span className={`text-sm font-semibold text-white ${((user as any).image || (user as any).imageUrl) ? 'hidden' : ''}`}>
                      {user.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
                    </span>
                  </div>

                  <ChevronDown
                    className={`text-[#e2e8f0] transition ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <ProfileDropdown
                  open={profileOpen}
                  close={() =>
                    setProfileOpen(false)
                  }
                  logout={handleLogout}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 md:hidden">
            {user && (
              <button
                onClick={() => setMobileOpen(true)}
                className="relative h-8 w-8 rounded-full overflow-hidden border border-slate-600 bg-slate-800 flex items-center justify-center shrink-0 focus:outline-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={(user as any).image || (user as any).imageUrl || ""} 
                  alt={user.name || "User"} 
                  className="h-full w-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                  style={{ display: ((user as any).image || (user as any).imageUrl) ? 'block' : 'none' }}
                />
                <span className={`text-xs font-semibold text-white ${((user as any).image || (user as any).imageUrl) ? 'hidden' : ''}`}>
                  {user.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
                </span>
              </button>
            )}
            <button
              onClick={() => setMobileOpen(true)}
              className="
                text-[#e2e8f0]
                cursor-pointer
                focus:outline-none
              "
            >
              <Menu />
            </button>
          </div>
        </nav>
      </header>

      <MobileDrawer
        open={mobileOpen}
        close={() =>
          setMobileOpen(false)
        }
        user={user}
        routes={routes}
        isActive={isActive}
        logout={handleLogout}
      />
    </>
  );
}