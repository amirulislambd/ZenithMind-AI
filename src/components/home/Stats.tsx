"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, Activity, HeartPulse, Users } from "lucide-react";

const stats = [
  {
    label: "Active minds tracked",
    value: 18400,
    suffix: "+",
    icon: Brain,
  },
  {
    label: "Burnout reduced",
    value: 41,
    suffix: "%",
    icon: Activity,
  },
  {
    label: "Certified therapists joined",
    value: 132,
    suffix: "+",
    icon: Users,
  },
  {
    label: "Weekly check-ins",
    value: 96000,
    suffix: "+",
    icon: HeartPulse,
  },
];

function useIntersectionObserver(ref: React.RefObject<HTMLElement | null>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;

    const duration = 1200;

    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);

      setCount(Math.round(target * progress));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <p
      className="
        mt-4
        text-center
        text-4xl
        font-bold
        tracking-tight
        text-neutral
        transition-colors
        duration-300
        group-hover:text-accent
        md:text-5xl
      "
    >
      {count}
      {suffix}
    </p>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement | null>(null);

  const isVisible = useIntersectionObserver(ref);

  return (
    <section
      ref={ref}
      className="
        bg-primary
        px-4
        py-14
        md:px-8
        md:py-24
        lg:px-16
      "
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.28em]
              text-accent
            "
          >
            MEASURABLE MOMENTUM
          </p>

          <h2
            className="
              mt-3
              text-3xl
              font-bold
              leading-tight
              text-neutral
              md:text-4xl
            "
          >
            Real impact, backed by measurable results.
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-base
              leading-7
              text-neutral/70
            "
          >
            Thousands of professionals use ZenithMind AI to improve focus,
            reduce burnout, and build healthier work habits.
          </p>
        </div>

        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-4
            xl:gap-8
          "
        >
          {" "}
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                group
                relative
                flex
                min-h-[240px]
                flex-col
                items-center
                justify-center
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-6
                text-center
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-accent/40
                hover:bg-white/10
                hover:shadow-2xl
                hover:shadow-accent/10
              "
              >
                {/* Background Glow */}
                <div
                  className="
                  absolute
                  -right-6
                  -top-6
                  h-28
                  w-28
                  rounded-full
                  bg-accent/10
                  blur-3xl
                  transition-all
                  duration-300
                  group-hover:scale-125
                "
                />

                {/* Icon */}
                <div
                  className="
                  relative
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-accent/20
                  bg-accent/10
                  text-accent
                  transition-all
                  duration-300
                  group-hover:rotate-6
                  group-hover:scale-110
                "
                >
                  <Icon className="h-8 w-8" />
                </div>

                {/* Number */}
                {isVisible ? (
                  <CountUp target={stat.value} suffix={stat.suffix} />
                ) : (
                  <p
                    className="
                    mt-4
                    text-center
                    text-4xl
                    font-bold
                    tracking-tight
                    text-neutral
                    md:text-5xl
                  "
                  >
                    0{stat.suffix}
                  </p>
                )}

                {/* Label */}
                <p
                  className="
                  mt-4
                  max-w-[180px]
                  text-center
                  text-sm
                  font-medium
                  leading-6
                  text-neutral/70
                  transition-colors
                  duration-300
                  group-hover:text-neutral
                "
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}