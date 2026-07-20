import Support from "@/src/components/ui/Support";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & Help Center | ZenithMind AI",
  description:
    "Get instant technical support and answers to your questions about ZenithMind AI. Submit a support ticket or explore our FAQs on cognitive health analytics.",
  keywords: [
    "ZenithMind AI Support",
    "Customer Support",
    "AI Help Center",
    "Cognitive Health Assistance",
    "ZenithMind Technical Support",
  ],
  authors: [{ name: "ZenithMind AI Support Team" }],
  openGraph: {
    title: "Support & Help Center | ZenithMind AI",
    description:
      "Need assistance with ZenithMind AI? Reach out to our technical team or browse quick answers in our FAQ center.",
    url: "https://zenithmind-ai.vercel.app/support",
    siteName: "ZenithMind AI",
    images: [
      {
        url: "/og-support.png",
        width: 1200,
        height: 630,
        alt: "ZenithMind AI Support Center",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support & Help Center | ZenithMind AI",
    description:
      "Need help with AI Data Analyzer or cognitive coaching? Contact our support team directly.",
    images: ["/og-support.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SupportPage = () => {
  return <Support />;
};

export default SupportPage;