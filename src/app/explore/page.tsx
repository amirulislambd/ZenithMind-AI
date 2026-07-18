import { Suspense } from "react";
import ExplorePageClient from "../../components/explore/ExplorePageClient";

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] px-4 py-10 text-slate-900 md:px-8 lg:px-16" /> }>
      <ExplorePageClient />
    </Suspense>
  );
}
