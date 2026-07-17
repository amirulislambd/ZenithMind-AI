import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/shared/Navbar";

// import Footer from "@/components/shared/Footer"; // when you build it

export const metadata: Metadata = {
  title: "ZenithMind AI",
  description: "Premium cognitive health & burnout tracking platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          {/* <Footer /> */}
        </AuthProvider>
      </body>
    </html>
  );
}