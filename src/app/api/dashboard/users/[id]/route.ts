import { NextRequest, NextResponse } from "next/server";
import { GetSessionToken } from "@/src/lib/core/sesstion";

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const token = await GetSessionToken();
  const body = await req.json();

  const response = await fetch(`${BACKEND_API}/dashboard/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  const data = await response.text();
  return new NextResponse(data, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") || "application/json",
    },
  });
}
