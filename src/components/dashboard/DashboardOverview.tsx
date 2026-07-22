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
  Zap,
  FolderKanban,
  Users,
  Loader2,
  Server,
  UserCheck,
  ArrowUpRight,
} from "lucide-react";

import { motion } from "framer-motion";

export default function DashboardOverview() {
  const { user } = useAuth();

  const userRole = (user as any)?.role || "member";

  const { data: response, isLoading } = useDashboardStats(userRole);

  const stats = response?.data?.stats || response?.stats || {};

  const activities = response?.data?.activities || response?.activities || [];

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";

    return "Good evening";
  };

  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#020617]
      p-6
      md:p-8
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -top-40
        left-1/2
        -translate-x-1/2
        w-[500px]
        h-[500px]
        rounded-full
        bg-[#6366f1]/10
        blur-[140px]
        "
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
          mb-10
          rounded-3xl
          border
          border-[#1e293b]
          bg-[#0b1120]/70
          backdrop-blur-xl
          p-6
          md:p-8
          "
        >
          <div
            className="
            flex
            items-center
            gap-2
            mb-3
            "
          >
            <div
              className="
              w-8
              h-8
              rounded-xl
              bg-[#10b981]/10
              flex
              items-center
              justify-center
              "
            >
              <Zap size={16} className="text-[#10b981]" />
            </div>

            <span
              className="
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-[#10b981]
              "
            >
              {userRole === "admin"
                ? "Admin Control Hub"
                : "Personal Workspace"}
            </span>
          </div>

          <h1
            className="
            text-3xl
            md:text-4xl
            font-black
            tracking-tight
            text-white
            "
          >
            {greeting()}, {user?.name?.split(" ")[0]} 👋
          </h1>

          <p
            className="
            mt-3
            max-w-xl
            text-sm
            text-[#64748b]
            "
          >
            {userRole === "admin"
              ? "Monitor platform health, user activity, system performance and AI wellness operations."
              : "Track your cognitive wellness journey, AI insights and personal improvement progress."}
          </p>

          <div
            className="
            flex
            flex-wrap
            gap-3
            mt-5
            "
          >
            <Badge>
              <ShieldCheck size={13} />

              {userRole === "admin" ? "System Admin" : "Member"}
            </Badge>

            <Badge muted>
              <Clock size={13} />

              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </Badge>
          </div>
        </motion.div>
        {/* Stats */}
        <div
          className="
          grid
          grid-cols-2
          xl:grid-cols-4
          gap-5
          "
        >
          {userRole === "admin" ? (
            <>
              <StatCard
                icon={<Users />}
                label="Total Users"
                value={stats.totalUsers || "0"}
                sub={stats.usersSub}
                color="indigo"
                loading={isLoading}
              />

              <StatCard
                icon={<FolderKanban />}
                label="Active Wellness Kits"
                value={stats.activeKits || "0"}
                sub={stats.kitsSub}
                color="green"
                loading={isLoading}
              />

              <StatCard
                icon={<UserCheck />}
                label="Premium Subscribers"
                value={stats.premiumSubs || "0"}
                sub={stats.subsSub}
                color="blue"
                loading={isLoading}
              />

              <StatCard
                icon={<Server />}
                label="Server Status"
                value={stats.systemHealth || "99.9%"}
                sub={stats.healthSub}
                color="amber"
                loading={isLoading}
              />
            </>
          ) : (
            <>
              <StatCard
                icon={<Activity />}
                label="Stress Index"
                value={stats.stressIndex || "0%"}
                sub={stats.stressSub}
                color="indigo"
                loading={isLoading}
              />

              <StatCard
                icon={<Brain />}
                label="Cognitive Score"
                value={stats.cognitiveScore || "0/100"}
                sub={stats.scoreSub}
                color="green"
                loading={isLoading}
              />

              <StatCard
                icon={<TrendingUp />}
                label="Focus Sessions"
                value={stats.focusSessions || "0"}
                sub={stats.focusSub}
                color="blue"
                loading={isLoading}
              />

              <StatCard
                icon={<Sparkles />}
                label="AI Insights"
                value={stats.aiInsights || "0"}
                sub={stats.insightsSub}
                color="amber"
                loading={isLoading}
              />
            </>
          )}
        </div>{" "}
        {/* Activity Feed */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="
  mt-10
  "
        >
          <div
            className="
    flex
    items-center
    justify-between
    mb-5
    "
          >
            <div>
              <h2
                className="
        text-sm
        font-bold
        uppercase
        tracking-wider
        text-[#94a3b8]
        "
              >
                System Activity Feed
              </h2>

              <p
                className="
        text-xs
        text-[#475569]
        mt-1
        "
              >
                Recent platform activities and updates
              </p>
            </div>

            <div
              className="
      w-9
      h-9
      rounded-xl
      bg-[#6366f1]/10
      border
      border-[#6366f1]/20
      flex
      items-center
      justify-center
      "
            >
              <Activity size={17} className="text-[#6366f1]" />
            </div>
          </div>

          <div
            className="
    rounded-3xl
    border
    border-[#1e293b]
    bg-[#0b1120]/80
    backdrop-blur-xl
    overflow-hidden
    "
          >
            {isLoading ? (
              <div
                className="
        flex
        items-center
        justify-center
        gap-3
        py-8
        text-sm
        text-[#64748b]
        "
              >
                <Loader2
                  className="
          animate-spin
          text-[#6366f1]
          "
                  size={18}
                />
                Loading activity...
              </div>
            ) : activities.length > 0 ? (
              activities.map((item: any, index: number) => (
                <div
                  key={index}
                  className="
            flex
            items-center
            gap-4
            px-5
            py-4
            border-b
            border-[#1e293b]
            last:border-none
            hover:bg-[#111827]
            transition
            "
                >
                  <div
                    className="
              relative
              "
                  >
                    <div
                      className="
                w-10
                h-10
                rounded-2xl
                bg-[#6366f1]/10
                border
                border-[#6366f1]/20
                flex
                items-center
                justify-center
                "
                    >
                      <Activity size={16} className="text-[#6366f1]" />
                    </div>
                  </div>

                  <div
                    className="
              flex-1
              "
                  >
                    <p
                      className="
                text-sm
                font-medium
                text-[#cbd5e1]
                "
                    >
                      {item.action}
                    </p>

                    <p
                      className="
                text-xs
                text-[#475569]
                mt-1
                "
                    >
                      Recent system event
                    </p>
                  </div>

                  <div
                    className="
              flex
              items-center
              gap-1
              text-xs
              text-[#64748b]
              "
                  >
                    <Clock size={12} />

                    {item.time}
                  </div>
                </div>
              ))
            ) : (
              <div
                className="
        py-8
        text-center
        text-xs
        text-[#64748b]
        "
              >
                No recent activity recorded.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ===========================
BADGE COMPONENT
=========================== */

function Badge({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={`
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
text-xs
font-medium
border

${
  muted
    ? "bg-[#0b1120] text-[#64748b] border-[#1e293b]"
    : "bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20"
}

`}
    >
      {children}
    </span>
  );
}

/* ===========================
STAT CARD
=========================== */

function StatCard({ icon, label, value, sub, color, loading }: any) {
  const colors: any = {
    indigo:
      "from-[#6366f1]/20 to-[#6366f1]/5 border-[#6366f1]/20 text-[#6366f1]",

    green:
      "from-[#10b981]/20 to-[#10b981]/5 border-[#10b981]/20 text-[#10b981]",

    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/20 text-blue-400",

    amber:
      "from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400",
  };

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
group
relative
overflow-hidden
rounded-3xl
border
border-[#1e293b]
bg-[#0b1120]/80
backdrop-blur-xl
p-6
text-center
"
    >
      <div
        className="
absolute
inset-0
opacity-0
group-hover:opacity-100
transition
bg-gradient-to-br
from-white/[0.03]
to-transparent
"
      />

      <div
        className={`
relative
mx-auto
mb-5
w-14
h-14
rounded-2xl
border
bg-gradient-to-br
flex
items-center
justify-center
${colors[color]}
`}
      >
        {icon}
      </div>

      {loading ? (
        <div
          className="
h-9
w-20
mx-auto
rounded-lg
bg-slate-800
animate-pulse
"
        />
      ) : (
        <p
          className="
text-3xl
font-black
text-white
"
        >
          {value}
        </p>
      )}

      <p
        className="
mt-2
text-sm
font-medium
text-[#94a3b8]
"
      >
        {label}
      </p>

      {loading ? (
        <div
          className="
h-4
w-24
mx-auto
mt-3
rounded
bg-slate-800
animate-pulse
"
        />
      ) : (
        <p
          className="
mt-3
text-xs
text-[#64748b]
flex
items-center
justify-center
gap-1
"
        >
          {typeof sub === "string" && sub}

          <ArrowUpRight size={12} />
        </p>
      )}
    </motion.div>
  );
}
