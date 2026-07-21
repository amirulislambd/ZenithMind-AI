import { NextRequest, NextResponse } from "next/server";
import { GetSessionToken } from "@/src/lib/core/sesstion";

const BACKEND_API =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000/api";

function normalizeChatPayload(body: any) {
  if (!body || typeof body !== "object") return body;

  if (!Array.isArray(body.messages)) return body;

  const userMessages = body.messages.filter(
    (item: any) => item?.role === "user",
  );
  const lastUserMessage = userMessages[userMessages.length - 1];

  return {
    ...body,
    message:
      typeof lastUserMessage?.content === "string"
        ? lastUserMessage.content
        : (body.message ?? ""),
    history: body.messages.filter((item: any) => item?.role !== "system"),
  };
}

export async function POST(req: NextRequest) {
  const token = await GetSessionToken();
  const body = await req.json();
  const payload = normalizeChatPayload(body);

  const response = await fetch(`${BACKEND_API}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await response.text();
  return new NextResponse(data, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("content-type") || "application/json",
    },
  });
}
