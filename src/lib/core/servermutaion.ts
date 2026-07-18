"use server";

import { GetSessionToken } from "./sesstion";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const authHeaders = async (
  requireAuth: boolean = true,
): Promise<Record<string, string>> => {
  const token = await GetSessionToken();
  const header: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    header.Authorization = `Bearer ${token}`;
  } else if (requireAuth) {
    throw new Error("You are not authorized to perform this action");
  }

  return header;
};

export const ServerMutation = async (
  url: string,
  data: any,
  method: string = "POST",
  requireAuth: boolean = true,
) => {
  try {
    const headers = await authHeaders(requireAuth);

    const res = await fetch(`${baseUrl}${url}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
      cache: "no-store",
    });
    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(
        responseData.message ||
          `Failed to ${method} ${url}, status: ${res.status}`,
      );
    }

    return { success: true, data: responseData };
  } catch (error: any) {
    console.error("Server Action Error:", error);
    return { success: false, error: error.message || "Something went wrong" };
  }
};

export const GetServer = async (url: string, requireAuth: boolean = false) => {
  try {
    const res = await fetch(`${baseUrl}${url}`, {
      headers: await authHeaders(requireAuth),
      cache: "no-store",
    });
    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(
        responseData.message || `Failed to GET ${url}, status: ${res.status}`,
      );
    }

    return { success: true, data: responseData };
  } catch (error: any) {
    console.error("Server Action Error:", error);
    return { success: false, error: error.message || "Something went wrong" };
  }
};