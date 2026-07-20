import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/src/lib/core/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = {
    ...body,
    price: Number(body.price),
    date: body.date || new Date().toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
  };

  const db = await getDb();
  const result = await db.collection("items").insertOne(item);
  const createdItem = { ...item, _id: result.insertedId.toString() };

  return NextResponse.json({ item: createdItem }, { status: 201 });
}
