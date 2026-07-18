import { Metadata } from "next";
import AddKitForm from "@/src/components/dashboard/AddKitForm";
import { GetSession, GetSessionToken } from "@/src/lib/core/sesstion";

export const metadata: Metadata = {
  title: "Add Wellness Kit | ZenithMind AI",
  description: "Create and publish a new wellness kit to the platform.",
};

export default async function AddItemPage() {
  const token = await GetSessionToken();
  console.log('token', token)
  return <AddKitForm />;
}
