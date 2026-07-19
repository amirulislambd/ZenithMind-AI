import { NextRequest, NextResponse } from 'next/server';
import { GetSessionToken } from '@/src/lib/core/sesstion';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function POST(req: NextRequest) {
  const token = await GetSessionToken();
  const formData = await req.formData();

  const backendRequest = new Request(`${BACKEND_API}/ai/analyze`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const response = await fetch(backendRequest);
  return new NextResponse(response.body, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('content-type') || 'application/json',
    },
  });
}
