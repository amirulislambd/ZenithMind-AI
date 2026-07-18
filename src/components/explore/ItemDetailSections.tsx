import { motion } from "framer-motion";
import { Calendar, MapPin, Sparkles, Star, Tag } from "lucide-react";
import Link from "next/link";
import ItemCard from "../ui/ItemCard";
import type { IWellnessItem } from "../../types/item";

type DetailItem = IWellnessItem & {
  fullDescription?: string;
  images?: string[];
  availability?: string;
  creatorId?: string;
};

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export function DetailHeader({
  item,
  mainImage,
  gallery,
  onSelectImage,
  children,
}: {
  item: DetailItem;
  mainImage: string;
  gallery: string[];
  onSelectImage: (src: string) => void;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-4xl border border-white/10 bg-primary-light/40 shadow-[0_0_50px_-20px_rgba(37,99,235,0.4)] backdrop-blur-sm"
    >
      <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_0.8fr_0.65fr] lg:p-10">
        <div>
          <div className="relative overflow-hidden rounded-3xl bg-primary">
            <img src={mainImage} alt={item.title} className="h-full min-h-80 w-full object-cover" />
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-accent/30 bg-primary/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur">
              <Tag size={12} />
              {item.category}
            </div>
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => onSelectImage(src)}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    mainImage === src ? "border-accent" : "border-white/10 hover:border-accent/50"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
              <Sparkles size={16} />
              Premium wellness experience
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-neutral sm:text-4xl">{item.title}</h1>
            <p className="mt-4 text-base leading-7 text-neutral/65">{item.fullDescription || item.shortDescription}</p>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-primary/50 p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/5 bg-primary-light/60 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral/40">Date</p>
                <p className="mt-1 text-lg font-semibold text-neutral">{item.date}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-primary-light/60 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral/40">Location</p>
                <p className="mt-1 text-lg font-semibold text-neutral">{item.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">{children}</div>
      </div>
    </motion.section>
  );
}

export function DetailSpecs({ item }: { item: DetailItem }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-[28px] border border-white/10 bg-primary-light/40 p-6 shadow-sm backdrop-blur-sm md:p-8"
    >
      <h2 className="text-2xl font-semibold text-neutral">Key Information</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SpecCard icon={<Tag size={12} />} label="Category" value={item.category} />
        <SpecCard icon={<MapPin size={12} />} label="Location" value={item.location} />
        <SpecCard icon={<Calendar size={12} />} label="Date" value={item.date} />
        <SpecCard icon={<Sparkles size={12} />} label="Availability" value={item.availability || "Available now"} />
      </div>
    </motion.section>
  );
}

export function DetailReviews({ reviews, avgReviewRating }: { reviews: Review[]; avgReviewRating: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-[28px] border border-white/10 bg-primary-light/40 p-6 shadow-sm backdrop-blur-sm md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-neutral">Reviews & Ratings</h2>
        <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
          <Star size={16} className="fill-accent text-accent" />
          <span className="text-sm font-semibold text-neutral">{avgReviewRating.toFixed(1)} / 5.0</span>
          <span className="text-xs text-neutral/50">({reviews.length} {reviews.length === 1 ? "review" : "reviews"})</span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-primary/40 px-6 py-10 text-center">
          <p className="text-sm text-neutral/60">No reviews yet — be the first to share your experience.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-white/5 bg-primary/50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-neutral">{review.name}</p>
                <div className="flex items-center gap-1 text-accent">
                  <Star size={13} className="fill-accent" />
                  <span className="text-xs font-medium">{review.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="mt-2 text-sm text-neutral/60">{review.comment}</p>
              <p className="mt-3 text-xs text-neutral/35">{review.date}</p>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

export function DetailRelated({ relatedItems }: { relatedItems: IWellnessItem[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-[28px] border border-white/10 bg-primary-light/40 p-6 shadow-sm backdrop-blur-sm md:p-8"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-neutral">Related wellness kits</h2>
        <p className="text-sm text-neutral/50">Similar experiences you may enjoy</p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedItems.map((related) => (
          <ItemCard key={related._id} item={related} />
        ))}
      </div>
    </motion.section>
  );
}

function SpecCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-primary/50 p-4">
      <p className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-neutral/40">
        {icon} {label}
      </p>
      <p className="mt-1 text-sm font-medium text-neutral">{value}</p>
    </div>
  );
}
