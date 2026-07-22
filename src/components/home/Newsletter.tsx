"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Clock3,
  Sparkles,
} from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-[#0b1020] px-4 py-14 md:px-8 md:py-20 lg:px-16">
      <div
        className="
          mx-auto
          max-w-7xl
          overflow-hidden
          rounded-[36px]
          border
          border-white/10
          bg-gradient-to-br
          from-[#181924]
          to-[#11131d]
          p-8
          shadow-[0_25px_80px_rgba(0,0,0,0.35)]

          md:p-12
        "
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-sky-500/20
                bg-sky-500/10
                px-5
                py-2
                text-sm
                font-semibold
                text-sky-400
              "
            >
              <Mail size={16} />
              Join ZenithCircle
            </div>

            <h2
              className="
                mt-8
                max-w-xl
                text-5xl
                font-bold
                leading-tight
                text-white
              "
            >
              Stay one step ahead of burnout.
            </h2>

            <p
              className="
                mt-6
                max-w-xl
                text-lg
                leading-9
                text-slate-400
              "
            >
              Join thousands of professionals receiving practical AI-powered
              wellbeing insights, productivity strategies and mental recovery
              tips every week.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="
    rounded-[32px]
    border
    border-white/10
    bg-white/10
    p-5
    sm:p-8
    backdrop-blur-xl
    shadow-2xl
  "
          >
            <label
              htmlFor="email"
              className="mb-4 block text-sm font-semibold text-neutral/80"
            >
              Work Email
            </label>

            <div
              className="
      flex
      flex-col
      sm:flex-row
      items-stretch
      sm:items-center
      gap-3
      rounded-3xl
      sm:rounded-full
      border
      border-white/10
      bg-white/10
      p-3
    "
            >
              <div className="hidden sm:block pl-3 text-sky-400">
                <Mail size={20} />
              </div>

              <div className="flex items-center gap-3 flex-1">
                <div className="sm:hidden text-sky-400 pl-2">
                  <Mail size={20} />
                </div>

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your work email..."
                  className="
          flex-1
          min-w-0
          bg-transparent
          text-white
          placeholder:text-slate-400
          outline-none
          text-sm
          px-2
        "
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "loading"}
                className="
        flex
        w-full
        sm:w-auto
        items-center
        justify-center
        gap-2
        rounded-full
        bg-gradient-to-r
        from-sky-500
        to-indigo-500
        px-8
        py-1.5
        md:py-3.5
        font-semibold
        text-white
        transition
        text-sm
      "
              >
                {status === "loading" ? "Joining..." : "Join Now"}
                <ArrowRight size={18} />
              </motion.button>
            </div>

            <div
              className="
      mt-6
      flex
      flex-col
      sm:flex-row
      flex-wrap
      items-center
      justify-center
      gap-4
      sm:gap-6
      text-sm
      text-slate-400
    "
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-400" size={16} />
                100% Private
              </div>

              <div className="flex items-center gap-2">
                <Sparkles className="text-amber-400" size={16} />
                Weekly AI Insights
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="text-sky-400" size={16} />
                Unsubscribe Anytime
              </div>
            </div>

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
        mt-6
        flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        border-emerald-500/20
        bg-emerald-500/10
        px-4
        py-3
        text-sm
        text-emerald-300
        text-center
      "
              >
                <CheckCircle2 size={18} />
                You're in! Welcome to ZenithCircle.
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="
        mt-6
        rounded-2xl
        border
        border-red-500/20
        bg-red-500/10
        px-4
        py-3
        text-center
        text-sm
        text-red-300
      "
              >
                Something went wrong. Please try again.
              </motion.div>
            )}
          </motion.form>
        </div>

        {/* Bottom Features */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-12
            flex
            flex-wrap
            items-center
            justify-center
            gap-5
          "
        >
          {[
            {
              icon: ShieldCheck,
              title: "No Spam",
              desc: "Privacy first",
              color: "text-sky-400",
            },
            {
              icon: Clock3,
              title: "Weekly",
              desc: "Fresh insights",
              color: "text-cyan-400",
            },
            {
              icon: Sparkles,
              title: "AI Tips",
              desc: "Practical advice",
              color: "text-indigo-400",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
              className="
                flex
                min-w-[220px]
                items-center
                justify-center
                gap-4
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-6
                py-5
                text-center
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-accent/40
                hover:bg-white/10
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white/5
                "
              >
                <item.icon size={22} className={item.color} />
              </div>

              <div className="text-left">
                <h4 className="font-semibold text-white">{item.title}</h4>

                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}