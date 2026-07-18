"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import {
  LayoutDashboard,
  Brain,
  ShieldCheck,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X,
  PlusCircle,
  FolderKanban,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "AI Chat",
    href: "/dashboard/chat",
    icon: <Brain size={18} />,
  },
  {
    label: "AI Analyzer",
    href: "/dashboard/analyze",
    icon: <Sparkles size={18} />,
  },
  {
    label: "My Profile",
    href: "/dashboard/profile",
    icon: <UserCircle size={18} />,
  },
  {
    label: "Add Wellness Kit",
    href: "/items/add",
    icon: <PlusCircle size={18} />,
    adminOnly: true,
  },
  {
    label: "Manage Kits",
    href: "/items/manage",
    icon: <FolderKanban size={18} />,
    adminOnly: true,
  },
  {
    label: "Admin Panel",
    href: "/dashboard/admin",
    icon: <ShieldCheck size={18} />,
    adminOnly: true,
  },
];

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const userRole = (user as any)?.role;
  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.adminOnly || userRole === "admin"
  );

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  const avatarSrc = (user as any)?.image || (user as any)?.imageUrl || "";
  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : "U";

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo / Header */}
      <div
        className={`flex items-center gap-3 px-4 py-5 border-b border-[#1e293b] ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#10b981] flex items-center justify-center shrink-0">
          <Brain size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-white text-sm tracking-wide">
            ZenithMind AI
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {visibleItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium group ${
              isActive(item.href)
                ? "bg-[#6366f1]/20 text-[#6366f1] border border-[#6366f1]/30"
                : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-white"
            } ${collapsed ? "justify-center" : ""}`}
            title={collapsed ? item.label : undefined}
          >
            <span
              className={`shrink-0 ${
                isActive(item.href)
                  ? "text-[#6366f1]"
                  : "text-[#64748b] group-hover:text-white"
              }`}
            >
              {item.icon}
            </span>
            {!collapsed && <span>{item.label}</span>}
            {!collapsed && item.adminOnly && (
              <span className="ml-auto text-[10px] bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 px-1.5 py-0.5 rounded-full">
                Admin
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-[#1e293b] p-3">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-xl bg-[#0b1120]">
            <div className="relative h-8 w-8 rounded-full overflow-hidden border border-[#1e293b] bg-[#1e293b] flex items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarSrc}
                alt={user?.name || "User"}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (
                    e.target as HTMLImageElement
                  ).nextElementSibling?.classList.remove("hidden");
                }}
                style={{ display: avatarSrc ? "block" : "none" }}
              />
              <span
                className={`text-xs font-semibold text-white ${
                  avatarSrc ? "hidden" : ""
                }`}
              >
                {initials}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">
                {user?.name}
              </p>
              <p className="text-[10px] text-[#64748b] truncate">
                {user?.email}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all ${
            collapsed ? "justify-center" : ""
          }`}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-20 left-4 z-30 bg-[#0b1120] border border-[#1e293b] text-white p-2 rounded-xl shadow-lg"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed left-0 top-0 z-50 h-full w-64 bg-[#070f20] border-r border-[#1e293b] transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#1e293b]">
          <span className="font-bold text-white text-sm">Dashboard</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-[#94a3b8] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        <div className="h-[calc(100%-64px)]">{SidebarContent}</div>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`relative hidden md:flex flex-col h-screen sticky top-0 bg-[#070f20] border-r border-[#1e293b] transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-20 z-10 bg-[#1e293b] border border-[#273448] rounded-full p-0.5 text-[#94a3b8] hover:text-white transition-colors shadow-lg"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
        {SidebarContent}
      </aside>
    </>
  );
}
