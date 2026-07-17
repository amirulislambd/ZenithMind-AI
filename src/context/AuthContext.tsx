"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthUser {
  name: string;
  email: string;
  role: "user" | "admin";
  imageUrl?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // TODO: replace with real Better Auth session (useSession) once wired up
  const [user, setUser] = useState<AuthUser | null>(null);

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}