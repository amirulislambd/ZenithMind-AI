"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import {
  Users,
  ShieldCheck,
  Activity,
  TrendingUp,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  Crown,
  Loader2,
  AlertTriangle,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

// ── Types ───────────────────────────────────────────────────────────────────

interface AdminUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  plan: string;
  emailVerified: boolean;
  createdAt: string;
}

// ── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  delta,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
  color: string;
}) {
  return (
    <div className="bg-[#0b1120] border border-[#1e293b] rounded-2xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
        <span className="text-xs text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 px-2 py-0.5 rounded-full">
          {delta}
        </span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-[#64748b] mt-1">{label}</p>
    </div>
  );
}

// ── Avatar helper ────────────────────────────────────────────────────────────

function UserAvatar({ user }: { user: AdminUser }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = user.name ? user.name.substring(0, 2).toUpperCase() : "U";
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#6366f1] to-[#10b981] flex items-center justify-center shrink-0">
      {user.image && !imgFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.image}
          alt={user.name}
          className="h-full w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className="text-xs font-bold text-white">{initials}</span>
      )}
    </div>
  );
}

// ── Role Badge ───────────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: string }) {
  if (role === "admin")
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded-full">
        <Crown size={10} /> Admin
      </span>
    );
  return (
    <span className="text-[10px] font-semibold bg-[#1e293b] text-[#94a3b8] border border-[#273448] px-2 py-0.5 rounded-full">
      User
    </span>
  );
}

// ── Plan Badge ───────────────────────────────────────────────────────────────

function PlanBadge({ plan }: { plan: string }) {
  if (plan === "premium")
    return (
      <span className="text-[10px] font-semibold bg-[#6366f1]/15 text-[#6366f1] border border-[#6366f1]/25 px-2 py-0.5 rounded-full">
        Premium
      </span>
    );
  return (
    <span className="text-[10px] font-semibold bg-[#0b1120] text-[#64748b] border border-[#1e293b] px-2 py-0.5 rounded-full">
      Free
    </span>
  );
}

// ── Main Admin Panel ─────────────────────────────────────────────────────────

export default function AdminPanel() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Guard: redirect non-admins
  useEffect(() => {
    if (!authLoading && user) {
      const role = (user as any).role;
      if (role !== "admin") router.push("/dashboard");
    }
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  // Fetch users from Better Auth API
  const fetchUsers = useCallback(async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/auth/admin/list-users?limit=100", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        // Better Auth returns { users: [...] }
        const raw: any[] = data.users ?? data ?? [];
        const mapped: AdminUser[] = raw.map((u: any) => ({
          id: u.id ?? u._id,
          name: u.name ?? "Unknown",
          email: u.email,
          image: u.image ?? u.imageUrl ?? "",
          role: u.role ?? "user",
          plan: u.plan ?? "freeUser",
          emailVerified: u.emailVerified ?? false,
          createdAt: u.createdAt ?? new Date().toISOString(),
        }));
        setUsers(mapped);
      }
    } catch {
      // silently fail — demo data shown below
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Demo fallback if API unavailable
  const displayUsers =
    users.length > 0
      ? users
      : [
          {
            id: "1",
            name: "Demo Admin",
            email: "demo@zenithmind.ai",
            image: "",
            role: "admin",
            plan: "premium",
            emailVerified: true,
            createdAt: "2026-01-15T10:00:00Z",
          },
          {
            id: "2",
            name: "Jane Cooper",
            email: "jane@example.com",
            image: "",
            role: "user",
            plan: "freeUser",
            emailVerified: true,
            createdAt: "2026-03-22T08:30:00Z",
          },
          {
            id: "3",
            name: "Alex Morgan",
            email: "alex@example.com",
            image: "",
            role: "user",
            plan: "premium",
            emailVerified: false,
            createdAt: "2026-05-10T14:45:00Z",
          },
          {
            id: "4",
            name: "Sam Chen",
            email: "sam@example.com",
            image: "",
            role: "user",
            plan: "freeUser",
            emailVerified: true,
            createdAt: "2026-06-01T09:00:00Z",
          },
        ];

  const filteredUsers = displayUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const stats = {
    total: displayUsers.length,
    admins: displayUsers.filter((u) => u.role === "admin").length,
    premium: displayUsers.filter((u) => u.plan === "premium").length,
    verified: displayUsers.filter((u) => u.emailVerified).length,
  };

  if (authLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-[#050d24]">
        <Loader2 className="h-8 w-8 text-[#6366f1] animate-spin" />
      </div>
    );
  }

  const currentUserRole = (user as any)?.role;
  if (currentUserRole !== "admin") return null;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck size={16} className="text-[#10b981]" />
          <span className="text-xs font-medium text-[#10b981] uppercase tracking-wider">
            Admin Panel
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Platform Management
        </h1>
        <p className="text-[#64748b] mt-1.5 text-sm">
          Monitor users, manage roles, and oversee platform health.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Users size={18} className="text-[#6366f1]" />}
          label="Total Users"
          value={String(stats.total)}
          delta="All time"
          color="bg-[#6366f1]/10"
        />
        <StatCard
          icon={<Crown size={18} className="text-amber-400" />}
          label="Admins"
          value={String(stats.admins)}
          delta="Active"
          color="bg-amber-500/10"
        />
        <StatCard
          icon={<TrendingUp size={18} className="text-[#10b981]" />}
          label="Premium Users"
          value={String(stats.premium)}
          delta="Subscribed"
          color="bg-[#10b981]/10"
        />
        <StatCard
          icon={<Activity size={18} className="text-blue-400" />}
          label="Verified Emails"
          value={String(stats.verified)}
          delta="Confirmed"
          color="bg-blue-500/10"
        />
      </div>

      {/* Users Table */}
      <div className="bg-[#0b1120] border border-[#1e293b] rounded-2xl overflow-hidden">
        {/* Table Header / Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-[#1e293b]">
          <h2 className="text-sm font-semibold text-white">
            Registered Users
          </h2>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]"
              />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-[#070f20] border border-[#1e293b] rounded-lg text-xs text-white placeholder-[#475569] focus:outline-none focus:ring-1 focus:ring-[#6366f1]/40 w-40"
              />
            </div>
            {/* Role filter */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(e.target.value as "all" | "admin" | "user")
                }
                className="appearance-none pl-3 pr-7 py-1.5 bg-[#070f20] border border-[#1e293b] rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#6366f1]/40"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none"
              />
            </div>
            {/* Refresh */}
            <button
              onClick={fetchUsers}
              className="p-1.5 rounded-lg border border-[#1e293b] text-[#64748b] hover:text-white hover:border-[#273448] transition-colors"
              title="Refresh"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Table Body */}
        {fetching ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 text-[#6366f1] animate-spin" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertTriangle size={32} className="text-[#475569] mb-3" />
            <p className="text-sm text-[#64748b]">No users found</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e293b]">
                    {["User", "Email", "Role", "Plan", "Verified", "Joined", "Actions"].map(
                      (h, i) => (
                        <th
                          key={i}
                          className="px-5 py-3 text-left text-[10px] font-semibold text-[#475569] uppercase tracking-wider"
                        >
                          {h === "Actions" ? "" : h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0d1627]">
                  {filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="hover:bg-[#0d1428] transition-colors group"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <UserAvatar user={u} />
                          <span className="font-medium text-[#e2e8f0] truncate max-w-[120px]">
                            {u.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[#94a3b8] text-xs">
                        {u.email}
                      </td>
                      <td className="px-5 py-3.5">
                        <RoleBadge role={u.role} />
                      </td>
                      <td className="px-5 py-3.5">
                        <PlanBadge plan={u.plan} />
                      </td>
                      <td className="px-5 py-3.5">
                        {u.emailVerified ? (
                          <CheckCircle size={16} className="text-[#10b981]" />
                        ) : (
                          <XCircle size={16} className="text-red-400" />
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-[#64748b]">
                        {new Date(u.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === u.id ? null : u.id
                              )
                            }
                            className="p-1.5 rounded-lg text-[#475569] hover:text-white hover:bg-[#1e293b] transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <MoreVertical size={14} />
                          </button>
                          {openMenuId === u.id && (
                            <div className="absolute right-0 mt-1 w-36 bg-[#0b1120] border border-[#1e293b] rounded-xl shadow-xl z-10 overflow-hidden">
                              <button className="w-full text-left px-4 py-2.5 text-xs text-[#e2e8f0] hover:bg-[#1e293b] transition-colors">
                                View Profile
                              </button>
                              <button className="w-full text-left px-4 py-2.5 text-xs text-amber-400 hover:bg-[#1e293b] transition-colors">
                                Make Admin
                              </button>
                              <button className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors">
                                Suspend User
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="md:hidden divide-y divide-[#0d1627]">
              {filteredUsers.map((u) => (
                <div key={u.id} className="p-4 hover:bg-[#0d1428] transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={u} />
                      <div>
                        <p className="text-sm font-medium text-[#e2e8f0]">
                          {u.name}
                        </p>
                        <p className="text-xs text-[#64748b]">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {u.emailVerified ? (
                        <CheckCircle size={13} className="text-[#10b981]" />
                      ) : (
                        <XCircle size={13} className="text-red-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <RoleBadge role={u.role} />
                    <PlanBadge plan={u.plan} />
                    <span className="text-[10px] text-[#475569]">
                      Joined{" "}
                      {new Date(u.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#1e293b] flex items-center justify-between">
          <p className="text-xs text-[#475569]">
            Showing {filteredUsers.length} of {displayUsers.length} users
          </p>
          <p className="text-xs text-[#475569]">
            {users.length === 0 ? "Demo data — API not connected" : "Live data"}
          </p>
        </div>
      </div>
    </div>
  );
}
