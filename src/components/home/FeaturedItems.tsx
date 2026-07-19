import type { IWellnessItem } from "../../types/item";
import CardSkeleton from "../ui/CardSkeleton";
import ItemCard from "../ui/ItemCard";

type FeaturedItemsProps = {
  items?: IWellnessItem[] | null;
  isLoading?: boolean;
};

export default function FeaturedItems({ items, isLoading = false }: FeaturedItemsProps) {
  const visibleItems = items?.slice(0, 4) ?? [];

  return (
    <section className="bg-[#f8fafc] px-4 py-12 md:px-8 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6366f1]">
              Featured recovery kits
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[#1e293b] md:text-4xl">
              Proven tools for focus, rest, and sustainable energy.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600">
            Each experience is designed to reduce friction while helping people build healthier daily rhythms.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : visibleItems.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {visibleItems.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            <h3 className="text-xl font-semibold text-[#1e293b]">No featured kits are available yet</h3>
            <p className="mt-3 text-sm leading-7">
              New wellness experiences will appear here as we expand the collection.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
