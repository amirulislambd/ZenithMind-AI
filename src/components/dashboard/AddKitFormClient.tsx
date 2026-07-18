"use client";

import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Loader2,
  Image as ImageIcon,
  PlusCircle,
  FileText,
  Tag,
  DollarSign,
  AlignLeft,
  X,
} from "lucide-react";
import { SaveItem } from "@/src/lib/action/items";

export const kitSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(200, "Short description cannot exceed 200 characters"),
  fullDescription: z.string().min(20, "Please provide a detailed full description"),
  price: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "" && !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a valid number greater than 0",
    }),
  category: z.enum([
    "Stress Relief",
    "Sleep Optimization",
    "Executive Recovery",
    "Focus Boost",
  ]),
});

export type KitFormValues = z.infer<typeof kitSchema>;

interface AddKitFormClientProps {
  mode?: "add" | "edit";
  itemId?: string;
  initialValues?: Partial<KitFormValues> & { imageUrl?: string };
  submitButtonLabel?: string;
  successMessage?: string;
  redirectTo?: string;
}

export default function AddKitFormClient({
  mode = "add",
  itemId,
  initialValues,
  submitButtonLabel = mode === "edit" ? "Save Changes" : "Publish Kit",
  successMessage = mode === "edit" ? "Kit updated successfully!" : "Kit created successfully!",
}: AddKitFormClientProps) {
  useAuth();
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialValues?.imageUrl ?? null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KitFormValues>({
    resolver: zodResolver(kitSchema),
    defaultValues: useMemo(
      () => ({
        title: initialValues?.title ?? "",
        shortDescription: initialValues?.shortDescription ?? "",
        fullDescription: initialValues?.fullDescription ?? "",
        price: initialValues?.price ?? "",
        category: initialValues?.category ?? undefined,
      }),
      [initialValues],
    ),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB.");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(initialValues?.imageUrl ?? null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: KitFormValues) => {
    if (!imageFile && !imagePreview) {
      toast.error("Please select an image for the wellness kit.");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Processing your submission...");

    try {
      let imageUrl = initialValues?.imageUrl;

      if (imageFile) {
        toast.loading("Uploading image to ImgBB...", { id: loadingToast });
        const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        if (!imgbbKey) throw new Error("ImgBB API key is missing.");

        const formData = new FormData();
        formData.append("image", imageFile);

        const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
          method: "POST",
          body: formData,
        });
        const imgData = await imgRes.json();

        if (!imgData.success) {
          throw new Error("Failed to upload image to ImgBB.");
        }

        imageUrl = imgData.data.url;
      }

      const finalPayload = {
        ...data,
        price: Number(data.price),
        imageUrl,
      };

      const res = await SaveItem(finalPayload, mode === "edit" ? itemId : undefined);
      if (!res.success) {
        throw new Error(res.error || "Failed to create item");
      }

      const payload = res.data as Record<string, unknown> | undefined;
      const nestedItem = payload?.item as Record<string, unknown> | undefined;
      const resolvedItemId =
        (nestedItem?.id as string | undefined) ??
        (nestedItem?._id as string | undefined) ??
        (payload?.id as string | undefined) ??
        (payload?._id as string | undefined) ??
        (mode === "edit" ? itemId : undefined);

      toast.success(successMessage, {
        id: loadingToast,
      });

      if (typeof reset === "function") {
        reset();
      }
      setImageFile(null);
      setImagePreview(initialValues?.imageUrl ?? null);

      if (resolvedItemId) {
        router.push(`/explore/${resolvedItemId}`);
      } else {
        router.push("/explore");
      }
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "An error occurred during submission.", {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <PlusCircle size={16} className="text-[#6366f1]" />
          <span className="text-xs font-medium text-[#6366f1] uppercase tracking-wider">
            Content Creation
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {mode === "edit" ? "Edit Wellness Kit" : "Add Wellness Kit"}
        </h1>
        <p className="text-[#64748b] mt-1.5 text-sm">
          {mode === "edit"
            ? "Update the wellness kit details and media for the platform."
            : "Publish a new cognitive health resource or tracking kit to the platform."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-[#0b1120] border border-[#1e293b] rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-[#cbd5e1] mb-2">
                <FileText size={16} className="text-[#475569]" />
                Kit Title
              </label>
              <input
                {...register("title")}
                placeholder="e.g. 21-Day Executive Burnout Recovery"
                className="w-full bg-[#070f20] border border-[#1e293b] rounded-xl px-4 py-3 text-sm text-white placeholder-[#475569] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 transition-all"
              />
              {errors.title && (
                <p className="text-red-400 text-xs mt-1.5">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[#cbd5e1] mb-2">
                <Tag size={16} className="text-[#475569]" />
                Category
              </label>
              <select
                {...register("category")}
                className="w-full bg-[#070f20] border border-[#1e293b] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 transition-all appearance-none"
              >
                <option value="">Select a category...</option>
                <option value="Stress Relief">Stress Relief</option>
                <option value="Sleep Optimization">Sleep Optimization</option>
                <option value="Executive Recovery">Executive Recovery</option>
                <option value="Focus Boost">Focus Boost</option>
              </select>
              {errors.category && (
                <p className="text-red-400 text-xs mt-1.5">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[#cbd5e1] mb-2">
                <DollarSign size={16} className="text-[#475569]" />
                Price (USD)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price")}
                placeholder="0.00"
                className="w-full bg-[#070f20] border border-[#1e293b] rounded-xl px-4 py-3 text-sm text-white placeholder-[#475569] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 transition-all"
              />
              {errors.price && (
                <p className="text-red-400 text-xs mt-1.5">{errors.price.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-[#cbd5e1] mb-2">
                <AlignLeft size={16} className="text-[#475569]" />
                Short Description (Max 200 chars)
              </label>
              <textarea
                {...register("shortDescription")}
                rows={2}
                placeholder="A brief, engaging summary of what this kit provides."
                className="w-full bg-[#070f20] border border-[#1e293b] rounded-xl px-4 py-3 text-sm text-white placeholder-[#475569] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 transition-all resize-none"
              />
              {errors.shortDescription && (
                <p className="text-red-400 text-xs mt-1.5">{errors.shortDescription.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-[#cbd5e1] mb-2">
                <AlignLeft size={16} className="text-[#475569]" />
                Full Description
              </label>
              <textarea
                {...register("fullDescription")}
                rows={6}
                placeholder="Provide comprehensive details about the kit's contents, benefits, and methodology."
                className="w-full bg-[#070f20] border border-[#1e293b] rounded-xl px-4 py-3 text-sm text-white placeholder-[#475569] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 transition-all resize-y"
              />
              {errors.fullDescription && (
                <p className="text-red-400 text-xs mt-1.5">{errors.fullDescription.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-[#cbd5e1] mb-2">
                <ImageIcon size={16} className="text-[#475569]" />
                Cover Image
              </label>

              <div
                className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all ${
                  imagePreview
                    ? "border-[#1e293b] bg-[#070f20]"
                    : "border-[#1e293b] bg-[#070f20] hover:border-[#6366f1]/50 hover:bg-[#0b1120]"
                }`}
              >
                {imagePreview ? (
                  <div className="relative w-full max-w-md aspect-[4/3] rounded-lg overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={clearImage}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-12 h-12 bg-[#1e293b] rounded-full flex items-center justify-center mb-3">
                      <ImageIcon size={24} className="text-[#94a3b8]" />
                    </div>
                    <p className="text-sm font-medium text-white mb-1">Click to upload an image</p>
                    <p className="text-xs text-[#64748b]">JPG, PNG or WEBP (Max 5MB)</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-[#1e293b] transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-[#6366f1] hover:bg-[#5254cc] text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#6366f1]/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <PlusCircle size={16} />
                {submitButtonLabel}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
