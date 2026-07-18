"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { updateUser } from "@/src/lib/auth-client";
import {
  UserCircle,
  Mail,
  ShieldCheck,
  CreditCard,
  Camera,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const { user } = useAuth();

  // ── local state ────────────────────────────────────────────────────────────
  const [imgFailed, setImgFailed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [name, setName] = useState(user?.name || "");
  // track current avatar locally so it updates immediately after upload
  const [localAvatar, setLocalAvatar] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── derived values ─────────────────────────────────────────────────────────
  const avatarSrc =
    localAvatar ||
    (user as any)?.image ||
    (user as any)?.imageUrl ||
    "";
  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : "U";
  const userRole = (user as any)?.role ?? "user";
  const userPlan = (user as any)?.plan ?? "freeUser";

  // ── upload avatar to ImgBB → then updateUser ──────────────────────────────
  const handleAvatarChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview instantly
    const previewUrl = URL.createObjectURL(file);
    setLocalAvatar(previewUrl);
    setImgFailed(false);

    setUploadingAvatar(true);
    const uploadToast = toast.loading("Uploading profile picture…");

    try {
      const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!imgbbKey) throw new Error("ImgBB API key missing in .env");

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (!data.success) throw new Error("ImgBB upload failed");

      const hostedUrl: string = data.data.url;

      // Persist to Better Auth
      const { error } = await updateUser({ image: hostedUrl });
      if (error) throw new Error(error.message || "Failed to update profile");

      setLocalAvatar(hostedUrl);
      toast.dismiss(uploadToast);
      toast.success("Profile picture updated!");
    } catch (err: any) {
      toast.dismiss(uploadToast);
      toast.error(err.message || "Upload failed");
      // revert preview
      setLocalAvatar("");
      setImgFailed(false);
    } finally {
      setUploadingAvatar(false);
      // reset input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ── save name ──────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setSaving(true);
    try {
      const { error } = await updateUser({ name: name.trim() });
      if (error) throw new Error(error.message || "Update failed");
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setName(user?.name || "");
    setIsEditing(false);
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <UserCircle size={16} className="text-[#6366f1]" />
          <span className="text-xs font-medium text-[#6366f1] uppercase tracking-wider">
            My Account
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Profile Settings
        </h1>
        <p className="text-[#64748b] mt-1.5 text-sm">
          Manage your personal information and account preferences.
        </p>
      </div>

      {/* ── Avatar Card ───────────────────────────────────────────────────── */}
      <div className="bg-[#0b1120] border border-[#1e293b] rounded-2xl p-6 mb-4 flex items-center gap-5">
        {/* Avatar + camera button */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#6366f1]/30 bg-gradient-to-br from-[#6366f1] to-[#10b981] flex items-center justify-center">
            {avatarSrc && !imgFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarSrc}
                alt={user?.name || "User"}
                className="h-full w-full object-cover"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <span className="text-2xl font-bold text-white">{initials}</span>
            )}

            {/* Spinner overlay while uploading */}
            {uploadingAvatar && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full">
                <Loader2 size={20} className="text-white animate-spin" />
              </div>
            )}
          </div>

          {/* Camera trigger */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingAvatar}
            title="Change profile picture"
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#6366f1] border-2 border-[#0b1120] flex items-center justify-center hover:bg-[#5254cc] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Camera size={12} className="text-white" />
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Name / email / badges */}
        <div>
          <p className="font-bold text-white text-lg">{user?.name}</p>
          <p className="text-sm text-[#64748b]">{user?.email}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[10px] bg-[#6366f1]/10 text-[#6366f1] border border-[#6366f1]/20 px-2 py-0.5 rounded-full">
              <ShieldCheck size={10} />
              {userRole === "admin" ? "Administrator" : "Member"}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 px-2 py-0.5 rounded-full">
              <CreditCard size={10} />
              {userPlan === "freeUser" ? "Free Plan" : "Premium"}
            </span>
          </div>
          <p className="text-[11px] text-[#475569] mt-2">
            Click the camera icon to change your profile picture.
          </p>
        </div>
      </div>

      {/* ── Personal Information Card ──────────────────────────────────────── */}
      <div className="bg-[#0b1120] border border-[#1e293b] rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-white">
            Personal Information
          </h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-[#6366f1] hover:text-[#818cf8] transition-colors font-medium"
            >
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancelEdit}
                disabled={saving}
                className="text-xs text-[#64748b] hover:text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !name.trim()}
                className="flex items-center gap-1.5 text-xs bg-[#6366f1] hover:bg-[#5254cc] text-white px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <CheckCircle size={12} />
                )}
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1.5">
              Full Name
            </label>
            {isEditing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                placeholder="Enter your full name"
                className="w-full bg-[#070f20] border border-[#273448] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#475569] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/40 transition-all"
              />
            ) : (
              <p className="text-sm text-[#e2e8f0] px-4 py-2.5 bg-[#070f20] border border-[#1e293b] rounded-xl">
                {user?.name}
              </p>
            )}
            {isEditing && (
              <p className="text-[10px] text-[#475569] mt-1">
                {name.length}/80 characters
              </p>
            )}
          </div>

          {/* Email — read-only */}
          <div>
            <label className="block text-xs font-medium text-[#64748b] mb-1.5">
              Email Address
            </label>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#070f20] border border-[#1e293b] rounded-xl">
              <Mail size={14} className="text-[#475569] shrink-0" />
              <p className="text-sm text-[#e2e8f0] truncate flex-1">
                {user?.email}
              </p>
              {user?.emailVerified && (
                <span className="ml-auto text-[10px] text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 px-2 py-0.5 rounded-full shrink-0">
                  Verified
                </span>
              )}
            </div>
            <p className="text-[10px] text-[#475569] mt-1">
              Email address cannot be changed here.
            </p>
          </div>
        </div>
      </div>

      {/* ── Account Details Card ──────────────────────────────────────────── */}
      <div className="bg-[#0b1120] border border-[#1e293b] rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white mb-5">
          Account Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: "Account Role",
              value: userRole === "admin" ? "Administrator" : "Standard User",
            },
            {
              label: "Subscription Plan",
              value: userPlan === "freeUser" ? "Free Plan" : "Premium Plan",
            },
            {
              label: "Member Since",
              value: new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              }),
            },
            {
              label: "Email Status",
              value: user?.emailVerified ? "Verified ✓" : "Unverified",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#070f20] border border-[#1e293b] rounded-xl p-4"
            >
              <p className="text-[10px] text-[#475569] uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="text-sm font-medium text-[#e2e8f0]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
