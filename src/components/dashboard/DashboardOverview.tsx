"use client";

import { useAuth } from "@/src/context/AuthContext";
import {
  Brain,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Activity,
  Clock,
  ArrowRight,
  Zap,
} from "lucide-react";
import Link from "next/link";

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="bg-[#0b1120] border border-[#1e293b] rounded-2xl p-5 flex flex-col gap-3 hover:border-[#273448] transition-colors">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-[#94a3b8] mt-0.5">{label}</p>
      </div>
      <p className="text-xs text-[#64748b]">{sub}</p>
    </div>
  );
}

function QuickActionCard({
  icon,
  title,
  description,
  href,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 bg-[#0b1120] border border-[#1e293b] rounded-2xl p-5 hover:border-[#6366f1]/40 hover:bg-[#0d1428] transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center text-[#6366f1] shrink-0 group-hover:bg-[#6366f1]/20 transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-white text-sm">{title}</p>
          {badge && (
            <span className="text-[10px] bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-[#64748b] leading-relaxed">{description}</p>
      </div>
      <ArrowRight
        size={16}
        className="text-[#475569] group-hover:text-[#6366f1] transition-colors shrink-0 mt-0.5"
      />
    </Link>
  );
}

export default function DashboardOverview() {
  const { user } = useAuth();
  const userRole = (user as any)?.role;
  const userPlan = (user as any)?.plan;

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
            Workspace
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {greeting()}, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-[#64748b] mt-1.5 text-sm">
          Here's a snapshot of your cognitive health workspace today.
        </p>

        {/* Badges */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20 px-3 py-1 rounded-full">
            <ShieldCheck size={12} />
            {userRole === "admin" ? "Administrator" : "Member"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 px-3 py-1 rounded-full">
            <Activity size={12} />
            {userPlan === "freeUser" ? "Free Plan" : "Premium Plan"}
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

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Activity size={20} className="text-[#6366f1]" />}
          label="Stress Index"
          value="42%"
          sub="↓ 8% from last week"
          color="bg-[#6366f1]/10"
        />
        <StatCard
          icon={<Brain size={20} className="text-[#10b981]" />}
          label="Cognitive Score"
          value="87/100"
          sub="↑ 12 pts this month"
          color="bg-[#10b981]/10"
        />
        <StatCard
          icon={<TrendingUp size={20} className="text-blue-400" />}
          label="Focus Sessions"
          value="24"
          sub="Sessions logged this week"
          color="bg-blue-500/10"
        />
        <StatCard
          icon={<Sparkles size={20} className="text-amber-400" />}
          label="AI Insights"
          value="7"
          sub="New recommendations today"
          color="bg-amber-500/10"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickActionCard
            icon={<Brain size={22} />}
            title="AI Burnout Coach"
            description="Chat with your personal AI coach for cognitive health strategies, stress relief tips, and mental wellness guidance."
            href="/dashboard/chat"
            badge="New"
          />
          <QuickActionCard
            icon={<Sparkles size={22} />}
            title="AI Data Analyzer"
            description="Upload your wellness data as a CSV and get AI-powered burnout analysis, trend detection, and risk scoring."
            href="/dashboard/analyze"
          />
        </div>
      </div>

      {/* Admin Panel Quick Access */}
      {userRole === "admin" && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider mb-4">
            Admin Tools
          </h2>
          <Link
            href="/dashboard/admin"
            className="group flex items-center justify-between bg-gradient-to-r from-[#1e293b] to-[#0b1120] border border-[#273448] rounded-2xl p-5 hover:border-[#10b981]/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981]">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="font-semibold text-white">Admin Panel</p>
                <p className="text-xs text-[#64748b] mt-0.5">
                  Manage users, platform stats, and administrative controls
                </p>
              </div>
            </div>
            <ArrowRight
              size={18}
              className="text-[#475569] group-hover:text-[#10b981] transition-colors"
            />
          </Link>
        </div>
      )}

      {/* Recent Activity */}
      <div>
        <h2 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider mb-4">
          Recent Activity
        </h2>
        <div className="bg-[#0b1120] border border-[#1e293b] rounded-2xl divide-y divide-[#1e293b]">
          {[
            {
              action: "AI Chat session completed",
              time: "2 hours ago",
              icon: <Brain size={14} className="text-[#6366f1]" />,
            },
            {
              action: "Cognitive assessment submitted",
              time: "Yesterday",
              icon: <Activity size={14} className="text-[#10b981]" />,
            },
            {
              action: "Focus session: 45 minutes",
              time: "2 days ago",
              icon: <TrendingUp size={14} className="text-blue-400" />,
            },
            {
              action: "Stress report generated",
              time: "3 days ago",
              icon: <Sparkles size={14} className="text-amber-400" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#0d1428] transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-[#1e293b] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <p className="text-sm text-[#cbd5e1] flex-1">{item.action}</p>
              <span className="text-xs text-[#475569] shrink-0">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
