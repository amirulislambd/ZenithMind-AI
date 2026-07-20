import { Suspense } from "react";
import ExplorePageClient from "../../components/explore/ExplorePageClient";
import { Metadata } from "next";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore Wellness Kits & AI Resources | ZenithMind AI",
  description:
    "Discover guided cognitive health kits, burnout prevention frameworks, and AI wellness resources designed to sustain peak performance.",
  keywords: [
    "ZenithMind AI Explore",
    "Cognitive Wellness Kits",
    "Mental Fitness Resources",
    "Burnout Recovery Guides",
    "Executive Health Tools",
  ],
  authors: [{ name: "ZenithMind AI Team" }],
  openGraph: {
    title: "Explore Wellness Kits & AI Resources | ZenithMind AI",
    description:
      "Browse our curated collection of cognitive wellness kits and AI-driven recovery workflows.",
    url: "https://zenithmind-ai.vercel.app/explore",
    siteName: "ZenithMind AI",
    images: [
      {
        url: "/og-explore.png",
        width: 1200,
        height: 630,
        alt: "Explore ZenithMind AI Resources",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Wellness Kits & AI Resources | ZenithMind AI",
    description:
      "Guided cognitive health kits and mental wellness strategies for teams and executives.",
    images: ["/og-explore.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Fallback Loader UI
function ExploreSkeleton() {
  return (
    <div className="min-h-screen bg-[#070c14] flex flex-col items-center justify-center gap-3 text-slate-400">
      <Loader2 className="animate-spin w-8 h-8 text-[#6366f1]" />
      <p className="text-xs tracking-wider uppercase">
        Loading Wellness Kits...
      </p>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<ExploreSkeleton />}>
      <ExplorePageClient />
    </Suspense>
  );
}