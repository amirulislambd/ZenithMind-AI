"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/src/context/AuthContext";
import { useAdminPanelData, useUpdateAdminUser } from "@/src/lib/api/admin";
import {
  Users,
  ShieldCheck,
  Activity,
  TrendingUp,
  Search,
  CheckCircle,
  XCircle,
  Crown,
  Loader2,
  AlertTriangle,
  RefreshCw,
  ChevronDown,
  Lock,
  Unlock,
  UserPlus,
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
  banned: boolean;
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
    <div className="w-8 h-8 rounded-full overflow-hidden bg-linear-to-br from-[#6366f1] to-[#10b981] flex items-center justify-center shrink-0">
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

type ConfirmActionType = "promote" | "demote" | "ban" | "unban";

interface ConfirmAction {
  userId: string;
  userName: string;
  type: ConfirmActionType;
  label: string;
  description: string;
  updates: Record<string, unknown>;
}

export default function AdminPanel() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useAdminPanelData();
  const updateUser = useUpdateAdminUser();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(
    null,
  );

  useEffect(() => {
    if (!authLoading && user) {
      if ((user as any).role !== "admin") {
        router.push("/dashboard");
      }
    }
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, router, user]);

  const executeConfirmAction = useCallback(async () => {
    if (!confirmAction) return;

    try {
      await updateUser.mutateAsync({
        userId: confirmAction.userId,
        updates: confirmAction.updates,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setConfirmAction(null);
    }
  }, [confirmAction, updateUser]);

  const openActionModal = useCallback(
    (user: AdminUser, type: ConfirmActionType) => {
      const common = {
        userId: user.id,
        userName: user.name,
      };

      if (type === "ban") {
        setConfirmAction({
          ...common,
          type,
          label: "Ban user",
          description: `Are you sure you want to ban ${user.name}? This will prevent them from accessing the platform.`,
          updates: { banned: true },
        });
      } else if (type === "unban") {
        setConfirmAction({
          ...common,
          type,
          label: "Unban user",
          description: `Are you sure you want to unban ${user.name}? They will regain access immediately.`,
          updates: { banned: false },
        });
      } else if (type === "promote") {
        setConfirmAction({
          ...common,
          type,
          label: "Promote to admin",
          description: `Promote ${user.name} to administrator privileges? This will allow them to manage the platform.`,
          updates: { role: "admin" },
        });
      } else {
        setConfirmAction({
          ...common,
          type,
          label: "Demote to user",
          description: `Demote ${user.name} back to a standard user? This will remove their admin privileges.`,
          updates: { role: "user" },
        });
      }
    },
    [],
  );

  const handleToggleBan = useCallback(
    (user: AdminUser) => {
      openActionModal(user, user.banned ? "unban" : "ban");
    },
    [openActionModal],
  );

  const handleToggleRole = useCallback(
    (user: AdminUser) => {
      openActionModal(user, user.role === "admin" ? "demote" : "promote");
    },
    [openActionModal],
  );

  const users: AdminUser[] =
    data?.users?.map((item: any) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      image: item.image,
      role: item.role,
      plan: item.plan,
      emailVerified: item.emailVerified,
      banned: item.banned ?? false,
      createdAt: item.createdAt,
    })) ?? [];

  const filteredUsers = users.filter((u) => {
    const normalized = search.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(normalized) ||
      u.email.toLowerCase().includes(normalized);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: data?.stats?.totalUsers ?? "0",
    admins: data?.stats?.admins ?? "0",
    premium: data?.stats?.premium ?? "0",
    verified: data?.stats?.verified ?? "0",
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
          <h2 className="text-sm font-semibold text-white">Registered Users</h2>
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
              onClick={() => refetch()}
              className="p-1.5 rounded-lg border border-[#1e293b] text-[#64748b] hover:text-white hover:border-[#273448] transition-colors"
              title="Refresh"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Table Body */}
        {isLoading ? (
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
                    {[
                      "User",
                      "Email",
                      "Role",
                      "Plan",
                      "Verified",
                      "Joined",
                      "Actions",
                    ].map((h, i) => (
                      <th
                        key={i}
                        className="px-5 py-3 text-left text-[10px] font-semibold text-[#475569] uppercase tracking-wider"
                      >
                        {h === "Actions" ? "" : h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0d1627]">
                  <AnimatePresence mode="popLayout">
                    {filteredUsers.map((u) => (
                      <motion.tr
                        key={u.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className="hover:bg-[#0d1428] transition-colors group"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <UserAvatar user={u} />
                            <span className="font-medium text-[#e2e8f0] truncate max-w-30">
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
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleBan(u)}
                              disabled={updateUser.isPending}
                              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {u.banned ? (
                                <Unlock size={15} />
                              ) : (
                                <Lock size={15} />
                              )}
                              {u.banned ? "Unban" : "Ban"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleRole(u)}
                              disabled={updateUser.isPending}
                              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                u.role === "admin"
                                  ? "border-rose-500/20 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20"
                                  : "border-amber-500/20 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20"
                              }`}
                            >
                              <UserPlus size={15} />
                              {u.role === "admin" ? "Demote" : "Promote"}
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="md:hidden divide-y divide-[#0d1627]">
              {filteredUsers.map((u) => (
                <div
                  key={u.id}
                  className="p-4 hover:bg-[#0d1428] transition-colors"
                >
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
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleToggleBan(u)}
                      disabled={updateUser.isPending}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {u.banned ? <Unlock size={15} /> : <Lock size={15} />}
                      {u.banned ? "Unban" : "Ban"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleRole(u)}
                      disabled={updateUser.isPending}
                      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        u.role === "admin"
                          ? "border-rose-500/20 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20"
                          : "border-amber-500/20 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20"
                      }`}
                    >
                      <UserPlus size={15} />
                      {u.role === "admin" ? "Demote" : "Promote"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#1e293b] flex items-center justify-between">
          <p className="text-xs text-[#475569]">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <p className="text-xs text-[#475569]">
            {data ? "Live data" : "Loading..."}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {confirmAction && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg rounded-3xl border border-[#1e293b] bg-[#020815] p-6 shadow-2xl shadow-slate-950/60"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-5">
                <h2 className="text-xl font-semibold text-white">
                  {confirmAction.label}
                </h2>
                <p className="mt-2 text-sm text-[#94a3b8]">
                  {confirmAction.description}
                </p>
              </div>
              <div className="rounded-2xl border border-[#0f172a] bg-[#0b1120] p-4 text-sm text-neutral-dark">
                <p className="font-semibold text-white">Target user</p>
                <p className="mt-1">{confirmAction.userName}</p>
                <p className="mt-2 text-xs text-[#64748b]">
                  Action type: {confirmAction.type}
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setConfirmAction(null)}
                  className="rounded-2xl border border-[#1e293b] px-4 py-2 text-sm font-medium text-[#94a3b8] transition hover:border-slate-500 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={executeConfirmAction}
                  disabled={updateUser.isPending}
                  className="rounded-2xl bg-[#10b981] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#22c55e] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {updateUser.isPending ? "Processing..." : "Confirm"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
