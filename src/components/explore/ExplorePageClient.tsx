"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useGetKits } from "../../lib/api/items";
import { Search, SlidersHorizontal, ChevronDown, Check, MapPin, Star } from "lucide-react";
import { Select, Label, ListBox } from "@heroui/react";

export default function ExplorePageClient() {
  const {
    kits,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    errorMessage,
  } = useGetKits();
  const [showFilters, setShowFilters] = useState(false);

  const categoryOptions = useMemo(() => categories, [categories]);

  return (
    <main className="grid-bg relative min-h-screen bg-primary px-4 py-10 text-neutral md:px-8 lg:px-16">
      {/* Ambient glow, consistent with the Hero section */}
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8">
        {/* Search & Filter panel */}
        <section className="rounded-3xl border border-white/10 bg-primary-light/40 p-6 shadow-[0_0_40px_-15px_rgba(37,99,235,0.35)] backdrop-blur-sm md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Explore wellness kits
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-neutral sm:text-4xl">
                Find the right recovery ritual for your routine
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-neutral/60 sm:text-base">
                Browse curated cognitive wellness kits, filter by category, and
                discover practices designed for focus, rest, and resilience.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-neutral/80 transition hover:border-accent hover:text-accent"
            >
              <SlidersHorizontal size={16} />
              {showFilters ? "Hide filters" : "Show filters"}
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-4 lg:flex-row">
            {/* Search input */}
            <label className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-primary/60 px-4 py-3 transition focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]">
              <Search size={18} className="text-neutral/40" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search kits by title or description"
                className="w-full bg-transparent text-sm text-neutral outline-none placeholder:text-neutral/40"
              />
            </label>

            {/* HeroUI Select — Category filter, styled to match the dark theme */}
            {showFilters && (
              <Select
                selectedKey={selectedCategory || "all"}
                onSelectionChange={(key) =>
                  setSelectedCategory(key === "all" ? "" : String(key))
                }
                className="min-w-55"
              >
                <Label className="sr-only">Category</Label>
                <Select.Trigger className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-primary/60 px-4 py-3 text-sm text-neutral outline-none transition data-[hovered]:border-accent/60 data-[focus-visible]:border-accent data-[focus-visible]:shadow-[0_0_0_3px_rgba(56,189,248,0.15)]">
                  <Select.Value className="text-neutral/90">
                    {({ selectedText }) => selectedText || "All categories"}
                  </Select.Value>
                  <Select.Indicator>
                    <ChevronDown size={16} className="text-neutral/40" />
                  </Select.Indicator>
                </Select.Trigger>

                <Select.Popover className="min-w-(--trigger-width) overflow-hidden rounded-2xl border border-white/10 bg-primary-light shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]">
                  <ListBox className="max-h-72 overflow-auto p-1.5">
                    <ListBox.Item
                      id="all"
                      className="w-full bg-transparent outline-none data-[hovered]:bg-transparent data-[focused]:bg-transparent data-[focus-visible]:bg-transparent data-[pressed]:bg-transparent"
                    >
                      {({ isSelected, isHovered }) => (
                        <div
                          className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                            isSelected
                              ? "bg-accent/15 font-semibold text-accent"
                              : isHovered
                                ? "bg-accent/10 text-accent"
                                : "bg-transparent text-neutral/80"
                          }`}
                        >
                          <Label>All categories</Label>
                          {isSelected && (
                            <ListBox.ItemIndicator>
                              <Check size={14} className="text-accent" />
                            </ListBox.ItemIndicator>
                          )}
                        </div>
                      )}
                    </ListBox.Item>
                    {categoryOptions.map((category) => (
                      <ListBox.Item
                        key={category}
                        id={category}
                        className="w-full bg-transparent outline-none data-[hovered]:bg-transparent data-[focused]:bg-transparent data-[focus-visible]:bg-transparent data-[pressed]:bg-transparent"
                      >
                        {({ isSelected, isHovered }) => (
                          <div
                            className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                              isSelected
                                ? "bg-accent/15 font-semibold text-accent"
                                : isHovered
                                  ? "bg-accent/10 text-accent"
                                  : "bg-transparent text-neutral/80"
                            }`}
                          >
                            <Label>{category}</Label>
                            {isSelected && (
                              <ListBox.ItemIndicator>
                                <Check size={14} className="text-accent" />
                              </ListBox.ItemIndicator>
                            )}
                          </div>
                        )}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            )}
          </div>
        </section>

        {/* Results */}
        <section>
          {errorMessage ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          ) : null}

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton-shimmer h-80 rounded-2xl border border-white/5"
                />
              ))}
            </div>
          ) : kits.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 bg-primary-light/30 px-6 py-16 text-center">
              <h2 className="text-xl font-semibold text-neutral">No kits found</h2>
              <p className="mt-2 text-neutral/60">
                Try a broader search or switch to another category.
              </p>
            </div>
          ) : (
            <>
              <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {kits.map((kit: any) => (
                    <motion.article
                      key={kit._id || kit.id}
                      layout
                      initial={{ opacity: 0, y: 24, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -16, scale: 0.97 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      whileHover={{
                        y: -8,
                        scale: 1.015,
                        transition: { duration: 0.25, ease: "easeOut" },
                      }}
                      whileTap={{ scale: 0.99 }}
                      style={{ transformOrigin: "center" }}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-primary-light/50 shadow-[0_0_0_0_rgba(56,189,248,0)] transition-shadow duration-300 hover:border-accent/50 hover:shadow-[0_0_35px_-8px_rgba(56,189,248,0.45)]"
                    >
                      {/* Image with zoom-on-hover + gradient fade into card body */}
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-primary">
                        {kit.imageUrl ? (
                          <img
                            src={kit.imageUrl}
                            alt={kit.title}
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-neutral/20">
                            <Star size={28} />
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-light via-transparent to-transparent opacity-80" />
                        <span className="absolute right-3 top-3 rounded-full border border-accent/30 bg-primary/70 px-2.5 py-1 text-xs font-medium text-accent backdrop-blur-sm">
                          {kit.category}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="line-clamp-1 text-lg font-semibold text-neutral transition-colors group-hover:text-accent">
                          {kit.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-neutral/55">
                          {kit.shortDescription}
                        </p>

                        <div className="mt-4 flex items-center justify-between text-sm text-neutral/50">
                          <span className="font-semibold text-secondary-light">
                            ${kit.price}
                          </span>
                          {kit.location ? (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {kit.location}
                            </span>
                          ) : null}
                        </div>

                        <Link
                          href={`/explore/${kit._id || kit.id}`}
                          className="glow-pill mt-5 inline-flex items-center justify-center rounded-full bg-secondary px-4 py-2.5 text-sm font-semibold text-neutral transition hover:bg-secondary-light"
                        >
                          View details
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>

              {hasNextPage ? (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="glow-pill rounded-full border border-accent/30 bg-accent/10 px-6 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isFetchingNextPage ? "Loading..." : "Load more kits"}
                  </button>
                </div>
              ) : null}
            </>
          )}
        </section>
      </div>
    </main>
  );
}