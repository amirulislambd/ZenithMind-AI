import { NextRequest, NextResponse } from "next/server";
import { GetSessionToken } from "@/src/lib/core/sesstion";

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

export async function GET(req: NextRequest) {
  const token = await GetSessionToken();

  const response = await fetch(`${BACKEND_API}/dashboard/admin-stats`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.text();
  return new NextResponse(data, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") || "application/json",
    },
  });
}
