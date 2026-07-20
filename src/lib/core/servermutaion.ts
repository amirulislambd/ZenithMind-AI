"use server";

import { GetSessionToken } from "./sesstion";

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "/api";

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

export const ServerDelete = async (
  url: string,
  data?: any,
  requireAuth: boolean = true,
) => {
  try {
    const headers = await authHeaders(requireAuth);

    if (data && headers instanceof Headers) {
      headers.set("Content-Type", "application/json");
    } else if (data && typeof headers === "object") {
      (headers as any)["Content-Type"] = "application/json";
    }

    const res = await fetch(`${baseUrl}${url}`, {
      method: "DELETE",
      headers,
      body: data ? JSON.stringify(data) : undefined,
      cache: "no-store",
    });

    const textData = await res.text();
    const responseData = textData ? JSON.parse(textData) : null;

    if (!res.ok) {
      throw new Error(
        responseData?.message ||
        responseData?.error ||
        `Failed to DELETE ${url}, status: ${res.status}`,
      );
    }

    return { success: true, data: responseData };
  } catch (error: any) {
    console.error("Server Delete Error:", error);
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