import Link from "next/link";

const categories = [
  {
    name: "Stress Relief",
    slug: "stress-relief",
    description: "Gentle reset routines for overwhelmed days and emotional overload.",
  },
  {
    name: "Sleep Optimization",
    slug: "sleep-optimization",
    description: "Recovery tools and evening rituals built to restore energy reliably.",
  },
  {
    name: "Executive Recovery",
    slug: "executive-recovery",
    description: "Structured support for leaders managing pressure, deadlines, and ambiguity.",
  },
  {
    name: "Focus Boost",
    slug: "focus-boost",
    description: "Clarity systems that cut distraction and sustain attention with intention.",
  },
];

export default function Categories() {
  return (
    <section className="bg-white px-4 py-12 md:px-8 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#10b981]">
              Explore by need
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[#1e293b] md:text-4xl">
              Recovery paths shaped around the pressure you feel most.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600">
            Each pathway combines coaching, education, and real-world rituals so progress feels tangible rather than abstract.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/explore?category=${category.slug}`}
              className="group rounded-3xl border border-slate-200 bg-[#f8fafc] p-6 transition hover:-translate-y-1 hover:border-[#6366f1] hover:shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1e293b] text-sm font-semibold text-white">
                {category.name.charAt(0)}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#1e293b]">{category.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-[#6366f1]">
                Discover this path
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
