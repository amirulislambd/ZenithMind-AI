"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { useSession, signOut } from "../lib/auth-client";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    emailVerified: boolean;
  } | null;
  session: any | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending: isLoading } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session?.user && !isLoading) {
      if (pathname === "/login" || pathname === "/register") {
        router.push("/dashboard");
      }
    }
  }, [session, isLoading, pathname, router]);

  const logout = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        session: session || null,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}