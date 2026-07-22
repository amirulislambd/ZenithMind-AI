"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Quote,
  Star,
} from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  metric: string;
  quote: string;
  icon: React.ElementType;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mina Alvarez",
    role: "Tech Lead",
    company: "Northstar Labs",
    avatar: "MA",
    rating: 5,
    metric: "41% Burnout Reduction",
    icon: HeartHandshake,
    quote:
      "ZenithMind AI helped our engineering team identify burnout patterns before they became real problems. Productivity increased while stress levels noticeably declined.",
  },
  {
    id: 2,
    name: "Daniel Brooks",
    role: "HR Director",
    company: "Meridian Health",
    avatar: "DB",
    rating: 5,
    metric: "3,800+ Employees Supported",
    icon: Building2,
    quote:
      "Managers finally have practical wellbeing insights without compromising privacy. The experience feels intelligent, reliable and genuinely useful.",
  },
  {
    id: 3,
    name: "Sofia Chen",
    role: "Founder",
    company: "Brightline Studio",
    avatar: "SC",
    rating: 5,
    metric: "92% Weekly Engagement",
    icon: BadgeCheck,
    quote:
      "Daily AI coaching became part of my routine. Instead of reacting to burnout, I now prevent it before it starts.",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Operations Manager",
    company: "Elevate Group",
    avatar: "JW",
    rating: 5,
    metric: "24/7 Wellness Tracking",
    icon: HeartHandshake,
    quote:
      "Our leaders now make better decisions using real wellbeing insights instead of assumptions. Team morale has improved dramatically.",
  },
];

const AUTO_DELAY = 6000;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const active = useMemo(() => testimonials[current], [current]);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, AUTO_DELAY);

    return () => clearInterval(timer);
  }, [paused]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -80) {
      next();
    }

    if (info.offset.x > 80) {
      previous();
    }
  };

  const ActiveIcon = active.icon;

  return (
    <section className="relative overflow-hidden bg-primary px-4 py-16 md:px-8 md:py-24 lg:px-16">
      {/* Animated Background */}

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-accent/10 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-light">
            Trusted Worldwide
          </p>

          <h2 className="mt-4 text-3xl font-bold text-neutral md:text-5xl">
            Loved by professionals across the world
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-neutral/70">
            Thousands of professionals rely on ZenithMind AI every day to reduce
            burnout, improve focus and build healthier work habits.
          </p>
        </motion.div>

        {/* Premium Slider */}

        <div
          className="relative mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {" "}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{
                opacity: 0,
                x: 80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -80,
              }}
              transition={{
                duration: 0.45,
              }}
              className="
            relative
            overflow-hidden
            rounded-[34px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-7

            md:p-10
            lg:p-14
          "
            >
              {/* Floating Quote */}

              <Quote
                size={110}
                className="
              absolute
              right-8
              top-6
              text-accent/10
            "
              />

              <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_.8fr]">
                {/* LEFT */}

                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({
                      length: active.rating,
                    }).map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                        transition={{
                          delay: index * 0.05,
                        }}
                      >
                        <Star
                          size={18}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.15,
                    }}
                    className="
                  mt-7
                  text-lg
                  leading-9
                  text-neutral/85

                  md:text-xl
                "
                  >
                    "{active.quote}"
                  </motion.p>

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
                      delay: 0.25,
                    }}
                    className="
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-accent/20
                  bg-accent/10
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  text-accent
                "
                  >
                    <ActiveIcon size={18} />

                    {active.metric}
                  </motion.div>
                </div>

                {/* RIGHT */}

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className="text-center"
                >
                  <div
                    className="
                  mx-auto
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-accent
                  to-secondary
                  text-3xl
                  font-bold
                  text-white
                  shadow-2xl
                "
                  >
                    {active.avatar}
                  </div>

                  <h3
                    className="
                  mt-6
                  text-2xl
                  font-bold
                  text-neutral
                "
                  >
                    {active.name}
                  </h3>

                  <p className="mt-2 text-neutral/70">{active.role}</p>

                  <div
                    className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-2
                  text-sm
                  text-neutral/80
                "
                  >
                    <Building2 size={16} />

                    {active.company}
                  </div>

                  <div
                    className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-emerald-500/10
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-emerald-400
                "
                  >
                    <BadgeCheck size={16} />
                    Verified Professional
                  </div>
                </motion.div>
              </div>

              {/* Navigation */}

              <div className="mt-12 flex items-center justify-between">
                <div className="flex gap-3">
                  <button
                    onClick={previous}
                    className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  p-3
                  transition
                  hover:border-accent
                  hover:bg-accent/10
                "
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={next}
                    className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  p-3
                  transition
                  hover:border-accent
                  hover:bg-accent/10
                "
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>{" "}
                {/* Indicators + Progress */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {testimonials.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrent(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                        className={`
          h-2.5
          rounded-full
          transition-all
          duration-300

          ${
            current === index
              ? "w-10 bg-accent"
              : "w-2.5 bg-white/20 hover:bg-white/40"
          }
        `}
                      />
                    ))}
                  </div>

                  <div
                    className="
      hidden
      h-1.5
      w-28
      overflow-hidden
      rounded-full
      bg-white/10

      sm:block
    "
                  >
                    <motion.div
                      key={current}
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: "100%",
                      }}
                      transition={{
                        duration: AUTO_DELAY / 1000,
                        ease: "linear",
                      }}
                      className="
        h-full
        rounded-full
        bg-accent
      "
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Stats */}

        <div
          className="
mt-16
grid
grid-cols-2
gap-5

lg:grid-cols-4
"
        >
          {[
            {
              value: "10K+",
              label: "Active Professionals",
            },
            {
              value: "96%",
              label: "Satisfaction Rate",
            },
            {
              value: "41%",
              label: "Burnout Reduced",
            },
            {
              value: "24/7",
              label: "AI Monitoring",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
rounded-3xl
border
border-white/10
bg-white/5
p-7
text-center
backdrop-blur-xl
"
            >
              <h3
                className="
  text-3xl
  font-bold
  text-accent
"
              >
                {item.value}
              </h3>

              <p
                className="
  mt-2
  text-sm
  text-neutral/70
"
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
