"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Star } from "lucide-react";
import ItemCard from "../ui/ItemCard";
import type { IWellnessItem } from "../../types/item";

export default function ItemDetailClient({
  item,
  relatedItems,
}: {
  item: IWellnessItem;
  relatedItems: IWellnessItem[];
}) {
  const safeRating = typeof item?.rating === "number" && Number.isFinite(item.rating) ? item.rating : 0;
  const safePrice = typeof item?.price === "number" && Number.isFinite(item.price) ? item.price : 0;

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-10 text-slate-900 md:px-8 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <Link href="/explore" className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-[#6366f1] hover:text-[#6366f1]">
          <ArrowLeft size={16} />
          Back to explore
        </Link>

        <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div className="relative overflow-hidden rounded-3xl bg-slate-100">
              <img src={item.imageUrl} alt={item.title} className="h-full min-h-80 w-full object-cover" />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 backdrop-blur">
                {item.category}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#e0e7ff] px-3 py-1 text-sm font-medium text-[#4338ca]">
                  <Sparkles size={16} />
                  Premium wellness experience
                </div>
                <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{item.title}</h1>
                <p className="mt-4 text-base leading-7 text-slate-600">{item.fullDescription || item.shortDescription}</p>
              </div>

              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Price</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">${safePrice}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Date</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{item.date}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Location</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{item.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Overview</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{item.fullDescription || item.shortDescription}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Category</p>
                <p className="mt-1 text-sm text-slate-600">{item.category}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Rating</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <Star size={15} className="fill-[#10b981] text-[#10b981]" />
                  {safeRating.toFixed(1)} / 5.0
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Why it stands out</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li className="rounded-2xl bg-slate-50 p-3">Built for calm, focus, and recovery in a single experience.</li>
              <li className="rounded-2xl bg-slate-50 p-3">Designed with a premium onboarding flow and mindful pacing.</li>
              <li className="rounded-2xl bg-slate-50 p-3">Curated for professionals managing stress and burnout risk.</li>
            </ul>
          </div>
        </section>

        {relatedItems?.length ? (
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-slate-900">Related wellness kits</h2>
              <p className="text-sm text-slate-500">Similar experiences you may enjoy</p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedItems.map((related) => (
                <ItemCard key={related._id} item={related} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
