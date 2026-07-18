import { notFound } from "next/navigation";
import AddKitForm from "@/src/components/dashboard/AddKitForm";
import { GetServer } from "@/src/lib/core/servermutaion";

export const metadata = {
  title: "Edit Wellness Kit | ZenithMind AI",
  description: "Update an existing wellness kit on the platform.",
};

interface EditItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditItemPage({ params }: EditItemPageProps) {
  const { id } = await params;
  const response = await GetServer(`/items/${id}`);

  if (!response?.success || !response.data?.item) {
    notFound();
  }

  const item = response.data.item;

  return (
    <AddKitForm
      mode="edit"
      itemId={id}
      initialValues={{
        title: item.title,
        shortDescription: item.shortDescription,
        fullDescription: item.fullDescription,
        price: item.price,
        category: item.category,
        imageUrl: item.imageUrl,
      }}
    />
  );
}
