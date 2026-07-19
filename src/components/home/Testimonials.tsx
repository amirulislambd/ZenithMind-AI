import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mina Alvarez",
    role: "Tech Lead, Northstar Labs",
    quote:
      "The burnout signals are so clear now that we can intervene early instead of reacting after people hit a wall.",
  },
  {
    name: "Daniel Brooks",
    role: "HR Director, Meridian Health",
    quote:
      "Our managers finally have a language for wellbeing that is practical, private, and genuinely useful.",
  },
  {
    name: "Sofia Chen",
    role: "Founder, Brightline Studio",
    quote:
      "The daily checkpoints helped me recover faster without turning self-care into another task on my list.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-primary px-4 py-12 md:px-8 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary-light">
            Trusted by modern teams
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-neutral md:text-4xl">
            Real stories from people building healthier working rhythms.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6  lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-3xl border border-white/10 bg-primary-light/40 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 font-semibold text-accent">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-neutral/70">{testimonial.role}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className="fill-[#10b981] text-[#10b981]"
                  />
                ))}
              </div>

              <p className="mt-4 text-sm leading-7 text-neutral/70">
                “{testimonial.quote}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
