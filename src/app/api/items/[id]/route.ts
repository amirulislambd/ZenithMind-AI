import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/src/lib/core/db";

function parseObjectId(id: string) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

function serializeItem(item: any) {
  return {
    ...item,
    _id: item._id?.toString ? item._id.toString() : item._id,
  };
}

type ItemRouteContext =
  | { params: { id: string } }
  | { params: Promise<{ id: string }> };

export async function GET(
  req: NextRequest,
  context: ItemRouteContext,
) {
  const params = await context.params;
  const objectId = parseObjectId(params.id);
  if (!objectId) {
    return NextResponse.json({ error: "Invalid item id" }, { status: 400 });
  }

  const db = await getDb();
  const query = { _id: objectId };
  const item = await db.collection("items").findOne(query);

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const relatedItems = await db
    .collection("items")
    .find({
      category: item.category,
      _id: { $ne: item._id },
    })
    .limit(4)
    .toArray();

  return NextResponse.json({
    item: serializeItem(item),
    relatedItems: relatedItems.map(serializeItem),
  });
}

export async function PUT(
  req: NextRequest,
  context: ItemRouteContext,
) {
  const params = await context.params;
  const objectId = parseObjectId(params.id);
  if (!objectId) {
    return NextResponse.json({ error: "Invalid item id" }, { status: 400 });
  }

  const body = await req.json();
  const { _id, id, ...payload } = body || {};
  const db = await getDb();
  const query = { _id: objectId };

  const result = await db.collection("items").findOneAndUpdate(
    query,
    { $set: payload },
    { returnDocument: "after" },
  );

  if (!result || !result.value) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ item: serializeItem(result.value) });
}

export async function DELETE(
  req: NextRequest,
  context: ItemRouteContext,
) {
  const params = await context.params;
  const objectId = parseObjectId(params.id);
  if (!objectId) {
    return NextResponse.json({ error: "Invalid item id" }, { status: 400 });
  }

  const db = await getDb();
  const query = { _id: objectId };
  const result = await db.collection("items").deleteOne(query);

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
