import { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Create an Account | ZenithMind AI",
  description:
    "Join ZenithMind AI today to track your cognitive health, manage executive stress, and prevent burnout with AI-driven wellness insights.",
  keywords: [
    "ZenithMind AI Register",
    "Sign Up ZenithMind",
    "Create Account",
    "Cognitive Health Platform",
    "Burnout Prevention",
  ],
  openGraph: {
    title: "Create an Account | ZenithMind AI",
    description:
      "Start your cognitive wellness journey. Track stress, access AI coaching, and optimize your performance.",
    url: "https://zenithmind-ai.vercel.app/register",
    siteName: "ZenithMind AI",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RegisterPage() {
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

      <div className="relative z-20 w-full max-w-lg p-4 sm:p-0 py-12">
        <RegisterForm />
      </div>
    </div>
  );
}