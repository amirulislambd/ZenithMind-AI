"use client";

import AddKitFormClient from "./AddKitFormClient";

interface AddKitFormProps {
  mode?: "add" | "edit";
  itemId?: string;
  initialValues?: {
    title?: string;
    shortDescription?: string;
    fullDescription?: string;
    price?: number | string;
    category?: "Stress Relief" | "Sleep Optimization" | "Executive Recovery" | "Focus Boost";
    imageUrl?: string;
  };
}

export default function AddKitForm({
  mode = "add",
  itemId,
  initialValues,
}: AddKitFormProps) {
  return (
    <AddKitFormClient
      mode={mode}
      itemId={itemId}
      initialValues={initialValues}
    />
  );
}
