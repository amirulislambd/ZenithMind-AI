import { createAuthClient } from "better-auth/react";

const getClientBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return (
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000"
  );
};

export const { signIn, signUp, useSession, signOut, updateUser } =
  createAuthClient({
    baseURL: getClientBaseUrl(),
  });

