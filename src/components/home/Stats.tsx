"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Active minds tracked", value: 18400, suffix: "+" },
  { label: "Burnout reduced", value: 41, suffix: "%" },
  { label: "Certified therapists joined", value: 132, suffix: "+" },
  { label: "Weekly check-ins", value: 96000, suffix: "+" },
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
      { threshold: 0.35 }
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
    <p className="mt-3 text-4xl font-semibold text-neutral md:text-5xl">
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
      className="bg-primary px-4 py-12 md:px-8 md:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
            Measurable momentum
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral md:text-4xl">
            The impact is visible in the numbers our members and teams feel
            every week.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-primary-light/40 p-6"
            >
              {isVisible ? (
                <CountUp target={stat.value} suffix={stat.suffix} />
              ) : (
                <p className="mt-3 text-4xl font-semibold text-neutral md:text-5xl">
                  0{stat.suffix}
                </p>
              )}
              <p className="mt-4 text-sm leading-7 text-neutral/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
