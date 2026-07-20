import About from "@/src/components/ui/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | ZenithMind AI - Cognitive Health & Executive Wellness",
  description:
    "Learn how ZenithMind AI helps leaders and knowledge workers identify, track, and reduce cognitive burnout using personalized AI coaching and real-time analytics.",
  keywords: [
    "ZenithMind AI",
    "About ZenithMind",
    "Cognitive Health",
    "Executive Burnout Reduction",
    "Mental Wellness AI",
    "AI Health Coach",
  ],
  authors: [{ name: "ZenithMind AI Team" }],
  openGraph: {
    title: "About ZenithMind AI - Empowering Mental Fitness & Performance",
    description:
      "Sustaining high performance without sacrificing human well-being. Discover our mission, AI insights, and executive recovery workflows.",
    url: "https://zenithmind.ai/about", // আপনার অরিজিনাল ডোমেইন দিন
    siteName: "ZenithMind AI",
    images: [
      {
        url: "/og-about.png", // public ফোল্ডারে থাকা ইমেজ পাথ
        width: 1200,
        height: 630,
        alt: "About ZenithMind AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ZenithMind AI - Cognitive Health & Executive Wellness",
    description:
      "Combining passive behavioral insights with AI-guided recovery tools for sustainable leadership.",
    images: ["/og-about.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const AboutPage = () => {
  return <About />;
};

export default AboutPage;