import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ItemDetailClient from "../../../components/explore/ItemDetailClient";
import { GetServer } from "../../../lib/core/servermutaion";
import type { IWellnessItem } from "../../../types/item";

async function getItem(id: string) {
  const response = await GetServer(`/items/${id}`, false);
  if (!response?.success) {
    return null;
  }

  return response.data as {
    item: IWellnessItem;
    relatedItems: IWellnessItem[];
  } | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const itemData = await getItem(id);

  if (!itemData?.item) {
    return {
      title: "Kit not found | ZenithMind AI",
      description: "The requested wellness kit could not be found.",
    };
  }

  const { item } = itemData;

  return {
    title: `${item.title} | ZenithMind AI`,
    description: item.shortDescription,
    openGraph: {
      title: `${item.title} | ZenithMind AI`,
      description: item.shortDescription,
      images: item.imageUrl ? [item.imageUrl] : [],
    },
  };
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const itemData = await getItem(id);

  if (!itemData?.item) {
    notFound();
  }

  return (
    <ItemDetailClient
      item={itemData.item}
      relatedItems={itemData.relatedItems}
    />
  );
}
