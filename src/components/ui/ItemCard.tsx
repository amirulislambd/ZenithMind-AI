import Link from "next/link";
import { CalendarDays, DollarSign, MapPin, Star } from "lucide-react";
import type { IWellnessItem } from "../../types/item";

export default function ItemCard({ item }: { item: IWellnessItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 backdrop-blur">
          {item.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
            {item.title}
          </h3>
          <div className="flex items-center gap-1 rounded-full bg-[#f8fafc] px-2.5 py-1 text-sm font-medium text-[#1e293b]">
            <Star size={14} className="fill-[#10b981] text-[#10b981]" />
            {(item.rating ?? 0).toFixed(1)}
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {item.shortDescription}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-600">
          <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2">
            <DollarSign size={14} className="text-[#6366f1]" />
            <span>${item.price}</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2">
            <CalendarDays size={14} className="text-[#6366f1]" />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2">
            <MapPin size={14} className="text-[#6366f1]" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2">
            <Star size={14} className="text-[#6366f1]" />
            <span>{item.rating}/5</span>
          </div>
        </div>

        <Link
          href={`/explore/${item._id}`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1e293b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f172a]"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
