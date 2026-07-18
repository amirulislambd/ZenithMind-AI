"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "@/src/lib/auth-client";
import { GetServer, ServerDelete } from "@/src/lib/core/servermutaion";
import { toast } from "react-hot-toast";
import { Loader2, PlusCircle, Trash2, Eye, PackageOpen } from "lucide-react";

interface ManageItem {
  _id: string;
  title: string;
  category: string;
  price: number;
  imageUrl?: string;
  shortDescription?: string;
}

interface ManageItemsResponse {
  items?: ManageItem[];
}

function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  isDeleting,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/40">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
            <Trash2 size={18} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Delete item?</h3>
            <p className="text-sm text-slate-400">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="mb-6 text-sm text-slate-300">
          Are you sure you want to delete this item?
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ManageItemsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session, isPending } = useSession();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  const { data, isLoading, isError, error } = useQuery<ManageItem[]>({
    queryKey: ["manageItems"],
    queryFn: async () => {
      const response = await GetServer("/items", true);

      if (!response.success) {
        throw new Error(response.error || "Failed to load managed items");
      }

      const payload = response.data as ManageItemsResponse | ManageItem[];

      if (Array.isArray(payload)) {
        return payload;
      }

      return payload.items ?? [];
    },
    enabled: !isPending && !!session,
  });

  const items = useMemo(() => data ?? [], [data]);

  const deleteMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await ServerDelete(`/items/${itemId}`, undefined, true);

      if (!response.success) {
        throw new Error(response.error || "Failed to delete item");
      }

      return response.data;
    },
    onSuccess: () => {
      toast.success("Item deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["manageItems"] });
      setShowDeleteModal(false);
      setPendingDeleteId(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to delete this item");
      setShowDeleteModal(false);
      setPendingDeleteId(null);
    },
  });

  const confirmDelete = (itemId: string) => {
    setPendingDeleteId(itemId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (!pendingDeleteId) return;
    deleteMutation.mutate(pendingDeleteId);
  };

  if (isPending || !session) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6 py-20">
        <div className="flex items-center gap-3 text-slate-300">
          <Loader2 size={18} className="animate-spin" />
          <span>Loading your items...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-[0_20px_80px_-40px_rgba(99,102,241,0.55)] md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">
            <PackageOpen size={14} />
            Manage Items
          </div>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            Your published wellness kits
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Review your content, open a published item, or remove anything you no longer want visible.
          </p>
        </div>

        <Link
          href="/items/add"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <PlusCircle size={16} />
          Add New Item
        </Link>
      </div>

      {isLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3 text-slate-300">
            <Loader2 size={18} className="animate-spin" />
            <span>Fetching your managed items...</span>
          </div>
        </div>
      ) : isError ? (
        <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-200">
          {(error as Error)?.message || "Unable to load your items right now."}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-10 text-center">
          <h2 className="text-xl font-semibold text-white">No items managed yet</h2>
          <p className="mt-2 text-sm text-slate-400">
            Create your first wellness kit and share it with your audience.
          </p>
          <Link
            href="/items/add"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Create Item
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 md:block">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
              <thead className="bg-slate-950/70 text-slate-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Image</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-800/60">
                    <td className="px-4 py-3">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-xs text-slate-400">
                          No image
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-400">{item.shortDescription}</div>
                    </td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">${Number(item.price).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/explore/${item._id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                        >
                          <Eye size={15} />
                          View
                        </Link>
                        <button
                          type="button"
                          onClick={() => confirmDelete(item._id)}
                          className="inline-flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:hidden">
            {items.map((item) => (
              <div key={item._id} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex items-start gap-3">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-16 w-16 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-xs text-slate-400">
                      No image
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-semibold text-white">{item.title}</div>
                    <div className="mt-1 text-sm text-slate-400">{item.category}</div>
                    <div className="mt-1 text-sm font-medium text-indigo-300">
                      ${Number(item.price).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/explore/${item._id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                  >
                    <Eye size={15} />
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => confirmDelete(item._id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/20"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <DeleteConfirmModal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPendingDeleteId(null);
        }}
        onConfirm={handleDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
