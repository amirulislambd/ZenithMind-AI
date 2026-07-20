import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";
import ConditionalLayout from "../components/shared/ConditionalLayout";
import QueryProvider from "../components/providers/QueryProvider";

// 1. Viewport & Theme Color (Next.js 14+ Standard)
export const viewport: Viewport = {
  themeColor: "#070c14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// 2. Comprehensive Root Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://zenithmind-ai.vercel.app/"),
  title: {
    default: "ZenithMind AI | Cognitive Health & Executive Burnout Tracking",
    template: "%s | ZenithMind AI",
  },
  description:
    "ZenithMind AI is a premium cognitive health platform designed to track stress, reduce executive burnout, and optimize mental performance with AI-guided tools.",
  keywords: [
    "ZenithMind AI",
    "Cognitive Health Tracker",
    "Executive Burnout Prevention",
    "Mental Fitness AI",
    "Stress Management Platform",
    "AI Wellness Coach",
    "Workspace Health Analytics",
  ],
  authors: [{ name: "ZenithMind AI Team", url: "https://zenithmind.ai" }],
  creator: "ZenithMind AI",
  publisher: "ZenithMind AI",

  // Favicons & Manifest Setup
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Open Graph (For Facebook, LinkedIn, Discord sharing)
  openGraph: {
    title: "ZenithMind AI | Cognitive Health & Executive Burnout Tracking",
    description:
      "Sustain high performance without sacrificing well-being. Track burnout risks, access AI coaching, and optimize mental fitness.",
    url: "https://zenithmind-ai.vercel.app/",
    siteName: "ZenithMind AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZenithMind AI Platform Preview",
      },
    ],
  },

  // Twitter Cards (For X / Twitter sharing)
  twitter: {
    card: "summary_large_image",
    title: "ZenithMind AI | Cognitive Health Platform",
    description:
      "Identify early signs of mental fatigue and prevent burnout with intelligent AI interventions.",
    images: ["/og-image.png"],
  },

  // Search Engine Bots Settings
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070c14] text-[#cbd5e1] antialiased selection:bg-[#6366f1]/30 selection:text-white">
        <AuthProvider>
          <QueryProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#0b1120",
                  color: "#fff",
                  border: "1px solid #1e293b",
                  borderRadius: "12px",
                  fontSize: "14px",
                },
              }}
            />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
