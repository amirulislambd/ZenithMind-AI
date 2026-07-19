import AIHighlight from "../components/home/AIHighlight";
import Categories from "../components/home/Categories";
import FAQ from "../components/home/FAQ";
import Features from "../components/home/Features";
import FeaturedItems from "../components/home/FeaturedItems";
import Hero from "../components/home/Hero";
import Newsletter from "../components/home/Newsletter";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import type { IWellnessItem } from "../types/item";

const featuredItems: IWellnessItem[] = [
  {
    _id: "1",
    title: "Executive Recovery Sprint",
    imageUrl:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
    shortDescription:
      "A four-day reset plan for leaders navigating overload without losing momentum.",
    fullDescription:
      "A concise recovery protocol built for demanding schedules.",
    price: 89,
    date: "2026-07-01",
    rating: 4.8,
    location: "Remote",
    category: "executive-recovery",
  },
  {
    _id: "2",
    title: "Sleep Optimization Ritual",
    imageUrl:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
    shortDescription:
      "Evening guidance that helps your body settle before the next high-pressure day.",
    fullDescription: "A calming sequence grounded in sustainable rest habits.",
    price: 64,
    date: "2026-06-22",
    rating: 4.7,
    location: "London",
    category: "sleep-optimization",
  },
  {
    _id: "3",
    title: "Focus Reset Lab",
    imageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
    shortDescription:
      "An expert-led routine for restoring attention after cognitive overload.",
    fullDescription:
      "A simple way to clear mental noise and return to meaningful work.",
    price: 74,
    date: "2026-06-14",
    rating: 4.9,
    location: "Berlin",
    category: "focus-boost",
  },
  {
    _id: "4",
    title: "Stress Relief Flow",
    imageUrl:
      "https://images.unsplash.com/photo-1506126279646-a697353d3166?auto=format&fit=crop&w=900&q=80",
    shortDescription:
      "A grounded recovery experience for people who feel stretched beyond capacity.",
    fullDescription:
      "A practical toolkit for steadier nervous-system regulation.",
    price: 58,
    date: "2026-05-28",
    rating: 4.6,
    location: "Toronto",
    category: "stress-relief",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col flex-1 items-center justify-center bg-white font-sans">
      <main className="w-full">
        <Hero />
        <Features />
        <Categories />
        <FeaturedItems items={featuredItems} />
        <Stats />
        <Testimonials />
        <AIHighlight />
        <FAQ />
        <Newsletter />
      </main>
    </div>
  );
}
