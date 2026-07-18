"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Pencil, BarChart3, Heart, Lock, X } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import type { IWellnessItem } from "@/src/types/item";
import {
  DetailHeader,
  DetailRelated,
  DetailReviews,
  DetailSpecs,
} from "./ItemDetailSections";

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

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function ItemDetailsPage({
  item: initialItem,
  relatedItems: initialRelatedItems,
}: {
  item?: DetailItem;
  relatedItems?: IWellnessItem[];
}) {
  const { user } = useAuth();
  const item = initialItem;
  const relatedItems = initialRelatedItems ?? [];
  const isLoading = !item;

  const [activeImage, setActiveImage] = useState<string | undefined>(undefined);
  const [wishlisted, setWishlisted] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Reviews would normally come from the API alongside item/relatedItems.
  const reviews: Review[] = [];

  if (isLoading || !item) {
    return (
      <main className="grid-bg relative min-h-screen bg-primary px-4 py-10 md:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="skeleton-shimmer h-12 w-40 rounded-full" />
          <div className="skeleton-shimmer mt-8 h-96 w-full rounded-4xl" />
        </div>
      </main>
    );
  }

  const safeRating =
    typeof item.rating === "number" && Number.isFinite(item.rating)
      ? item.rating
      : 0;
  const safePrice =
    typeof item.price === "number" && Number.isFinite(item.price)
      ? item.price
      : 0;
  const gallery = item.images?.length ? item.images : [item.imageUrl];
  const mainImage = activeImage ?? gallery[0];

  const avgReviewRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : safeRating;

  // ── Role / ownership detection ────────────────────────────────────────
  const isOwnerOrAdmin =
    !!user &&
    (user.id === item.creatorId ||
      (user as { role?: string }).role === "admin");
  const isLoggedInCustomer = !!user && !isOwnerOrAdmin;
  const isGuest = !user;

  return (
    <main className="grid-bg relative min-h-screen bg-primary px-4 py-10 text-neutral md:px-8 lg:px-16">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8">
        <Link
          href="/explore"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-primary-light/50 px-4 py-2 text-sm font-medium text-neutral/80 shadow-sm transition hover:border-accent hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back to explore
        </Link>

        <DetailHeader
          item={item}
          mainImage={mainImage}
          gallery={gallery}
          onSelectImage={setActiveImage}
        >
          <ActionPanel
            isOwnerOrAdmin={isOwnerOrAdmin}
            isLoggedInCustomer={isLoggedInCustomer}
            isGuest={isGuest}
            itemId={item._id}
            price={safePrice}
            wishlisted={wishlisted}
            onToggleWishlist={() => setWishlisted((v) => !v)}
            onOpenCheckout={() => setCheckoutOpen(true)}
          />
        </DetailHeader>

        <DetailSpecs item={item} />

        <DetailReviews reviews={reviews} avgReviewRating={avgReviewRating} />

        {relatedItems?.length ? (
          <DetailRelated relatedItems={relatedItems} />
        ) : null}
      </div>

      {/* Checkout popup — placeholder */}
      <AnimatePresence>
        {checkoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            onClick={() => setCheckoutOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl border border-white/10 bg-primary-light p-6 shadow-[0_0_60px_-15px_rgba(56,189,248,0.4)]"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-neutral">
                  Checkout — {item.title}
                </h3>
                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="rounded-full p-1.5 text-neutral/50 hover:bg-white/5 hover:text-neutral"
                  aria-label="Close checkout"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-primary/50 px-4 py-3">
                  <span className="text-sm text-neutral/60">Kit price</span>
                  <span className="text-lg font-semibold text-secondary-light">
                    ${safePrice}
                  </span>
                </div>
                {/* Placeholder fields — wire up to real payment flow later */}
                <input
                  disabled
                  placeholder="Card number (placeholder)"
                  className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-primary/40 px-4 py-3 text-sm text-neutral/40 outline-none"
                />
                <button
                  disabled
                  className="glow-pill w-full cursor-not-allowed rounded-full bg-secondary/50 px-4 py-3 text-sm font-semibold text-neutral/70"
                >
                  Confirm Purchase (coming soon)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ── Role-aware action panel ───────────────────────────────────────────
function ActionPanel({
  isOwnerOrAdmin,
  isLoggedInCustomer,
  isGuest,
  itemId,
  price,
  wishlisted,
  onToggleWishlist,
  onOpenCheckout,
}: {
  isOwnerOrAdmin: boolean;
  isLoggedInCustomer: boolean;
  isGuest: boolean;
  itemId: string;
  price: number;
  wishlisted: boolean;
  onToggleWishlist: () => void;
  onOpenCheckout: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="rounded-3xl border border-white/10 bg-primary/60 p-5"
    >
      {/* CASE A — Owner / Admin */}
      {isOwnerOrAdmin && (
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral/40">
            Kit management
          </p>
          <Link
            href={`/items/edit/${itemId}`}
            className="glow-pill inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-4 py-3 text-sm font-semibold text-neutral transition hover:bg-secondary-light"
          >
            <Pencil size={16} />
            Edit Wellness Kit
          </Link>
          <Link
            href={`/dashboard/analytics/${itemId}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm font-medium text-neutral/80 transition hover:border-accent hover:text-accent"
          >
            <BarChart3 size={16} />
            View Analytics
          </Link>
        </div>
      )}

      {/* CASE B — Logged-in regular / pro user */}
      {isLoggedInCustomer && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral/40">
              Kit price
            </p>
            <p className="mt-1 text-3xl font-bold text-secondary-light">
              ${price}
            </p>
          </div>
          <button
            onClick={onOpenCheckout}
            className="glow-pill inline-flex items-center justify-center rounded-full bg-secondary px-4 py-3 text-sm font-semibold text-neutral transition hover:bg-secondary-light"
          >
            Book / Purchase Kit
          </button>
          <button
            onClick={onToggleWishlist}
            className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
              wishlisted
                ? "border-accent bg-accent/10 text-accent"
                : "border-white/15 text-neutral/70 hover:border-accent/50 hover:text-accent"
            }`}
          >
            <Heart size={15} className={wishlisted ? "fill-accent" : ""} />
            {wishlisted ? "Added to Wishlist" : "Add to Premium Wishlist"}
          </button>
        </div>
      )}

      {/* CASE C — Guest / unauthenticated */}
      {isGuest && (
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Lock size={20} />
          </div>
          <p className="text-sm text-neutral/60">
            Sign in to unlock pricing, purchase, and personalized
            recommendations.
          </p>
          <Link
            href={`/login?redirect=/items/${itemId}`}
            className="glow-pill w-full rounded-full bg-secondary px-4 py-3 text-center text-sm font-semibold text-neutral transition hover:bg-secondary-light"
          >
            Login to Unlock & Purchase
          </Link>
        </div>
      )}
    </motion.div>
  );
}