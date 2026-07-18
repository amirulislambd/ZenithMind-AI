import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

import { Toaster } from "react-hot-toast";
import ConditionalLayout from "../components/shared/ConditionalLayout";
import QueryProvider from "../components/providers/QueryProvider";

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
          <QueryProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Toaster
              position="top-center"
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
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}