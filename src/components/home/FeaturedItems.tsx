"use client";

import { motion } from "framer-motion";
import CardSkeleton from "../ui/CardSkeleton";
import ItemCard from "../ui/ItemCard";
import { useFeaturedKits } from "@/src/lib/api/items";

export default function FeaturedItems() {
  const { items, isLoading } = useFeaturedKits(4);
  const visibleItems = items?.slice(0, 4) ?? [];

  return (
    <section
      id="featured"
      className="bg-primary px-4 py-12 md:px-8 md:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Featured recovery kits
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-neutral md:text-4xl">
              Proven tools for focus, rest, and sustainable energy.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-neutral/60">
            Each experience is designed to reduce friction while helping people
            build healthier daily rhythms.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : visibleItems.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleItems.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.06,
                  ease: "easeOut",
                }}
              >
                <ItemCard item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-white/15 bg-primary-light/30 p-10 text-center">
            <h3 className="text-xl font-semibold text-neutral">
              No featured kits are available yet
            </h3>
            <p className="mt-3 text-sm leading-7 text-neutral/55">
              New wellness experiences will appear here as we expand the
              collection.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
