import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/Footer";
import { Toaster } from "react-hot-toast";

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
          <Footer />
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: "",
              duration: 4000,
              style: {
                background: "#fff",
                color: "#000",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}