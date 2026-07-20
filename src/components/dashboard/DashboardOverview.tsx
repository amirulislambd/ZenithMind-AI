"use client";

import { useAuth } from "@/src/context/AuthContext";
import { useDashboardStats } from "@/src/lib/api/dashboard";
import {
  Brain,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Activity,
  Clock,
  ArrowRight,
  Zap,
  FolderKanban,
  PlusCircle,
  Users,
  Loader2,
  Server,
  UserCheck,
} from "lucide-react";

export default function DashboardOverview() {
  const { user } = useAuth();
  const userRole = (user as any)?.role || "member";

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useDashboardStats(userRole);

  console.log("Dashboard API Response:", response);

  const stats = response?.data?.stats || response?.stats || {};
  const activities = response?.data?.activities || response?.activities || [];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={16} className="text-[#10b981]" />
          <span className="text-xs font-medium text-[#10b981] uppercase tracking-wider">
            {userRole === "admin" ? "Admin Control Hub" : "Personal Workspace"}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {greeting()}, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-[#64748b] mt-1.5 text-sm">
          {userRole === "admin"
            ? "Platform health, system metrics, and content control dashboard."
            : "Here is your cognitive wellness and mental health progress overview."}
        </p>

        {/* Badges */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20 px-3 py-1 rounded-full">
            <ShieldCheck size={12} />
            {userRole === "admin" ? "System Admin" : "Member"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#0b1120] text-[#64748b] border border-[#1e293b] px-3 py-1 rounded-full">
            <Clock size={12} />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* 🔴 ADMIN VIEW */}
      {userRole === "admin" && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Users size={20} className="text-[#6366f1]" />}
              label="Total Platform Users"
              value={stats.totalUsers || "0"}
              sub={stats.usersSub}
              color="bg-[#6366f1]/10"
              isLoading={isLoading}
            />
            <StatCard
              icon={<FolderKanban size={20} className="text-[#10b981]" />}
              label="Active Wellness Kits"
              value={stats.activeKits || "0"}
              sub={stats.kitsSub}
              color="bg-[#10b981]/10"
              isLoading={isLoading}
            />
            <StatCard
              icon={<UserCheck size={20} className="text-blue-400" />}
              label="Premium Subscribers"
              value={stats.premiumSubs || "0"}
              sub={stats.subsSub}
              color="bg-blue-500/10"
              isLoading={isLoading}
            />
            <StatCard
              icon={<Server size={20} className="text-amber-400" />}
              label="Server Status"
              value={stats.systemHealth || "99.9%"}
              sub={stats.healthSub}
              color="bg-amber-500/10"
              isLoading={isLoading}
            />
          </div>
        </div>
      )}

      {/* 🟢 MEMBER VIEW */}
      {userRole !== "admin" && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Activity size={20} className="text-[#6366f1]" />}
              label="Stress Index"
              value={stats.stressIndex || "0%"}
              sub={stats.stressSub}
              color="bg-[#6366f1]/10"
              isLoading={isLoading}
            />
            <StatCard
              icon={<Brain size={20} className="text-[#10b981]" />}
              label="Cognitive Score"
              value={stats.cognitiveScore || "0/100"}
              sub={stats.scoreSub}
              color="bg-[#10b981]/10"
              isLoading={isLoading}
            />
            <StatCard
              icon={<TrendingUp size={20} className="text-blue-400" />}
              label="Focus Sessions"
              value={stats.focusSessions || "0"}
              sub={stats.focusSub}
              color="bg-blue-500/10"
              isLoading={isLoading}
            />
            <StatCard
              icon={<Sparkles size={20} className="text-amber-400" />}
              label="AI Insights"
              value={stats.aiInsights || "0"}
              sub={stats.insightsSub}
              color="bg-amber-500/10"
              isLoading={isLoading}
            />
          </div>
        </div>
      )}

      {/* Activity Logs */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider mb-4">
          System Activity Feed
        </h2>
        <div className="bg-[#0b1120] border border-[#1e293b] rounded-2xl divide-y divide-[#1e293b]">
          {isLoading ? (
            <div className="p-5 flex items-center justify-center gap-2 text-[#64748b] text-sm">
              <Loader2 className="animate-spin w-4 h-4 text-[#6366f1]" />
              Fetching activity data...
            </div>
          ) : activities.length > 0 ? (
            activities.map((item: any, i: number) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#0d1428] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[#1e293b] flex items-center justify-center shrink-0">
                  <Activity size={14} className="text-[#6366f1]" />
                </div>
                <p className="text-sm text-[#cbd5e1] flex-1">{item.action}</p>
                <span className="text-xs text-[#475569] shrink-0">
                  {item.time}
                </span>
              </div>
            ))
          ) : (
            <div className="p-4 text-xs text-[#64748b] text-center">
              No recent activity recorded.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Stat Card Sub-Component
function StatCard({ icon, label, value, sub, color, isLoading }: any) {
  return (
    <div className="bg-[#0b1120] border border-[#1e293b] rounded-2xl p-5 flex flex-col gap-3 hover:border-[#273448] transition-colors">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
      <div>
        {isLoading ? (
          <div className="h-8 w-20 bg-slate-800 animate-pulse rounded my-1" />
        ) : (
          <p className="text-2xl font-bold text-white">{value}</p>
        )}
        <p className="text-sm text-[#94a3b8] mt-0.5">{label}</p>
      </div>
      {isLoading ? (
        <div className="h-4 w-28 bg-slate-800 animate-pulse rounded" />
      ) : (
        <p className="text-xs text-[#64748b]">{sub}</p>
      )}
    </div>
  );
}