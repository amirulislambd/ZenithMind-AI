import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In | ZenithMind AI",
  description:
    "Sign in to your ZenithMind AI account to access your cognitive health tracker, AI burnout coach, and workspace analytics.",
  keywords: [
    "ZenithMind AI Login",
    "Sign In",
    "Cognitive Health Portal",
    "Burnout Tracker Account",
  ],
  openGraph: {
    title: "Sign In | ZenithMind AI",
    description:
      "Access your ZenithMind AI workspace and personal cognitive health insights.",
    url: "https://zenithmind-ai.vercel.app/login",
    siteName: "ZenithMind AI",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-10" />

      <div className="relative z-20 w-full max-w-md p-4 sm:p-0 py-12">
        <LoginForm />
      </div>
    </div>
  );
}