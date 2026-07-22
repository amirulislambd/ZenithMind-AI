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
  Sparkles,
  User,
  CalendarDays,
  Lock,
  BadgeCheck,
  Edit3,
  Save,
  X,
  UploadCloud,
} from "lucide-react";

import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user } = useAuth();

  const [imgFailed, setImgFailed] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [saving, setSaving] = useState(false);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [name, setName] = useState(user?.name || "");

  const [localAvatar, setLocalAvatar] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatarSrc =
    localAvatar || (user as any)?.image || (user as any)?.imageUrl || "";

  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : "U";

  const userRole = (user as any)?.role ?? "user";

  const userPlan = (user as any)?.plan ?? "freeUser";

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    setLocalAvatar(preview);

    setImgFailed(false);

    setUploadingAvatar(true);

    const loadingToast = toast.loading("Uploading profile picture...");

    try {
      const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      if (!imgbbKey) throw new Error("ImgBB key missing");

      const formData = new FormData();

      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (!data.success) throw new Error("Upload failed");

      const hostedUrl = data.data.url;

      const { error } = await updateUser({
        image: hostedUrl,
      });

      if (error) throw new Error(error.message);

      setLocalAvatar(hostedUrl);

      toast.dismiss(loadingToast);

      toast.success("Profile picture updated");
    } catch (err: any) {
      toast.dismiss(loadingToast);

      toast.error(err.message || "Upload failed");

      setLocalAvatar("");
    } finally {
      setUploadingAvatar(false);

      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");

      return;
    }

    setSaving(true);

    try {
      const { error } = await updateUser({
        name: name.trim(),
      });

      if (error) throw new Error(error.message);

      setIsEditing(false);

      toast.success("Profile updated");
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setName(user?.name || "");

    setIsEditing(false);
  };

  return (
    <div
      className="
relative
min-h-screen
bg-[#020617]
overflow-hidden
p-6
md:p-8
"
    >
      <div
        className="
absolute
top-0
left-1/2
-translate-x-1/2
w-[500px]
h-[500px]
bg-[#6366f1]/10
blur-[130px]
rounded-full
"
      />

      <div
        className="
relative
max-w-4xl
mx-auto
"
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
mb-8
rounded-3xl
border
border-[#1e293b]
bg-[#0b1120]/80
backdrop-blur-xl
p-6
md:p-8
"
        >
          <div
            className="
flex
items-center
gap-2
mb-3
"
          >
            <Sparkles size={16} className="text-[#6366f1]" />

            <span
              className="
text-xs
uppercase
tracking-wider
font-semibold
text-[#6366f1]
"
            >
              Personal Identity
            </span>
          </div>

          <h1
            className="
text-3xl
md:text-4xl
font-black
text-white
"
          >
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>

          <p
            className="
text-sm
text-[#64748b]
mt-3
"
          >
            Manage your profile, security and account preferences.
          </p>
        </motion.div>
        {/* Avatar Profile Card */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="
rounded-3xl
border
border-[#1e293b]
bg-[#0b1120]/80
backdrop-blur-xl
p-6
mb-6
"
        >
          <div
            className="
flex
flex-col
md:flex-row
items-center
gap-6
"
          >
            {/* Avatar */}

            <div
              className="
relative
"
            >
              <div
                className="
w-32
h-32
rounded-full
p-[3px]
bg-gradient-to-br
from-[#6366f1]
to-[#10b981]
"
              >
                <div
                  className="
w-full
h-full
rounded-full
overflow-hidden
bg-[#020617]
flex
items-center
justify-center
"
                >
                  {avatarSrc && !imgFailed ? (
                    // eslint-disable-next-line @next/next/no-img-element

                    <img
                      src={avatarSrc}
                      alt={user?.name || "User"}
                      className="
w-full
h-full
object-cover
"
                      onError={() => setImgFailed(true)}
                    />
                  ) : (
                    <span
                      className="
text-4xl
font-black
text-white
"
                    >
                      {initials}
                    </span>
                  )}

                  {uploadingAvatar && (
                    <div
                      className="
absolute
inset-0
rounded-full
bg-black/60
flex
items-center
justify-center
"
                    >
                      <Loader2
                        size={30}
                        className="
text-white
animate-spin
"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Camera Button */}

              <button
                type="button"
                disabled={uploadingAvatar}
                onClick={() => fileInputRef.current?.click()}
                className="
absolute
bottom-2
right-2
w-10
h-10
rounded-full
bg-[#6366f1]
border-4
border-[#0b1120]
flex
items-center
justify-center
hover:bg-[#5254cc]
transition
disabled:opacity-50
"
              >
                <Camera size={17} className="text-white" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* User Information */}

            <div
              className="
text-center
md:text-left
flex-1
"
            >
              <h2
                className="
text-2xl
font-bold
text-white
"
              >
                {user?.name}
              </h2>

              <div
                className="
flex
items-center
justify-center
md:justify-start
gap-2
mt-2
text-sm
text-[#64748b]
"
              >
                <Mail size={14} />

                {user?.email}
              </div>

              <div
                className="
flex
flex-wrap
justify-center
md:justify-start
gap-2
mt-4
"
              >
                <span
                  className="
inline-flex
items-center
gap-1.5
px-3
py-1.5
rounded-full
text-xs
bg-[#6366f1]/10
text-[#818cf8]
border
border-[#6366f1]/20
"
                >
                  <ShieldCheck size={13} />

                  {userRole === "admin" ? "Administrator" : "Member"}
                </span>

                <span
                  className="
inline-flex
items-center
gap-1.5
px-3
py-1.5
rounded-full
text-xs
bg-[#10b981]/10
text-[#10b981]
border
border-[#10b981]/20
"
                >
                  <CreditCard size={13} />

                  {userPlan === "freeUser" ? "Free Plan" : "Premium"}
                </span>
              </div>

              <p
                className="
text-xs
text-[#475569]
mt-4
"
              >
                Your profile represents your digital identity.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Personal Information */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="
rounded-3xl
border
border-[#1e293b]
bg-[#0b1120]/80
backdrop-blur-xl
p-6
mb-6
"
        >
          <div
            className="
flex
items-center
justify-between
mb-6
"
          >
            <h2
              className="
text-lg
font-bold
text-white
"
            >
              Personal Information
            </h2>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="
flex
items-center
gap-1.5
text-xs
text-[#6366f1]
hover:text-[#818cf8]
"
              >
                <Edit3 size={13} />
                Edit
              </button>
            ) : (
              <div
                className="
flex
gap-2
"
              >
                <button
                  onClick={cancelEdit}
                  disabled={saving}
                  className="
flex
items-center
gap-1
text-xs
px-3
py-2
rounded-xl
bg-[#1e293b]
text-[#94a3b8]
"
                >
                  <X size={13} />
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="
flex
items-center
gap-1
text-xs
px-3
py-2
rounded-xl
bg-[#6366f1]
text-white
"
                >
                  {saving ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Save size={13} />
                  )}
                  Save
                </button>
              </div>
            )}
          </div>

          <div
            className="
space-y-5
"
          >
            {/* Name */}

            <div>
              <label
                className="
text-xs
text-[#64748b]
block
mb-2
"
              >
                Full Name
              </label>

              {isEditing ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
w-full
bg-[#070f20]
border
border-[#273448]
rounded-2xl
px-4
py-3
text-sm
text-white
focus:outline-none
focus:ring-2
focus:ring-[#6366f1]/40
"
                />
              ) : (
                <div
                  className="
bg-[#070f20]
border
border-[#1e293b]
rounded-2xl
px-4
py-3
text-sm
text-[#e2e8f0]
"
                >
                  {user?.name}
                </div>
              )}
            </div>

            {/* Email */}

            <div>
              <label
                className="
text-xs
text-[#64748b]
block
mb-2
"
              >
                Email Address
              </label>

              <div
                className="
flex
items-center
gap-3
bg-[#070f20]
border
border-[#1e293b]
rounded-2xl
px-4
py-3
"
              >
                <Mail size={16} className="text-[#475569]" />

                <span
                  className="
text-sm
text-[#e2e8f0]
truncate
"
                >
                  {user?.email}
                </span>

                {user?.emailVerified && (
                  <span
                    className="
ml-auto
text-[10px]
px-2
py-1
rounded-full
bg-[#10b981]/10
text-[#10b981]
border
border-[#10b981]/20
"
                  >
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Account Details */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
rounded-3xl
border
border-[#1e293b]
bg-[#0b1120]/80
backdrop-blur-xl
p-6
mb-6
"
        >
          <div
            className="
flex
items-center
gap-2
mb-6
"
          >
            <User size={18} className="text-[#6366f1]" />

            <h2
              className="
text-lg
font-bold
text-white
"
            >
              Account Details
            </h2>
          </div>

          <div
            className="
grid
grid-cols-1
sm:grid-cols-2
gap-4
"
          >
            <AccountCard
              icon={<ShieldCheck size={18} />}
              label="Account Role"
              value={userRole === "admin" ? "Administrator" : "Standard User"}
            />

            <AccountCard
              icon={<CreditCard size={18} />}
              label="Subscription"
              value={userPlan === "freeUser" ? "Free Plan" : "Premium Plan"}
            />

            <AccountCard
              icon={<CalendarDays size={18} />}
              label="Member Since"
              value={new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            />

            <AccountCard
              icon={<BadgeCheck size={18} />}
              label="Email Status"
              value={user?.emailVerified ? "Verified" : "Unverified"}
            />
          </div>
        </motion.div>

        {/* Profile Completion */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
          }}
          className="
rounded-3xl
border
border-[#1e293b]
bg-[#0b1120]/80
backdrop-blur-xl
p-6
mb-6
"
        >
          <div
            className="
flex
items-center
justify-between
mb-4
"
          >
            <h2
              className="
text-lg
font-bold
text-white
"
            >
              Profile Completion
            </h2>

            <span
              className="
text-sm
font-bold
text-[#10b981]
"
            >
              80%
            </span>
          </div>

          <div
            className="
w-full
h-3
rounded-full
bg-[#1e293b]
overflow-hidden
"
          >
            <div
              className="
h-full
w-[80%]
rounded-full
bg-gradient-to-r
from-[#6366f1]
to-[#10b981]
"
            />
          </div>

          <p
            className="
text-xs
text-[#64748b]
mt-3
"
          >
            Complete your profile to unlock better personalized experiences.
          </p>
        </motion.div>

        {/* Security Section */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
          }}
          className="
rounded-3xl
border
border-[#1e293b]
bg-[#0b1120]/80
backdrop-blur-xl
p-6
"
        >
          <div
            className="
flex
items-center
gap-2
mb-5
"
          >
            <Lock size={18} className="text-[#10b981]" />

            <h2
              className="
text-lg
font-bold
text-white
"
            >
              Security
            </h2>
          </div>

          <div
            className="
space-y-3
"
          >
            <SecurityItem
              title="Email Verification"
              description={
                user?.emailVerified
                  ? "Your email address is verified"
                  : "Please verify your email"
              }
              success={!!user?.emailVerified}
            />

            <SecurityItem
              title="Authentication"
              description="Your account is protected with secure authentication"
              success
            />

            <SecurityItem
              title="Profile Protection"
              description="Your personal information is securely stored"
              success
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ==========================
      ACCOUNT CARD
========================== */

function AccountCard({ icon, label, value }: any) {
  return (
    <div
      className="
group
rounded-2xl
border
border-[#1e293b]
bg-[#070f20]
p-5
hover:border-[#6366f1]/40
transition
"
    >
      <div
        className="
w-10
h-10
rounded-xl
bg-[#6366f1]/10
text-[#6366f1]
flex
items-center
justify-center
mb-4
group-hover:scale-110
transition
"
      >
        {icon}
      </div>

      <p
        className="
text-xs
uppercase
tracking-wider
text-[#475569]
mb-1
"
      >
        {label}
      </p>

      <p
        className="
text-sm
font-semibold
text-[#e2e8f0]
"
      >
        {value}
      </p>
    </div>
  );
}

/* ==========================
      SECURITY ITEM
========================== */

function SecurityItem({
  title,
  description,
  success,
}: {
  title: string;

  description: string;

  success: boolean;
}) {
  return (
    <div
      className="
flex
items-center
gap-4
rounded-2xl
border
border-[#1e293b]
bg-[#070f20]
p-4
"
    >
      <div
        className={`
w-10
h-10
rounded-xl
flex
items-center
justify-center

${success ? "bg-[#10b981]/10 text-[#10b981]" : "bg-red-500/10 text-red-400"}

`}
      >
        {success ? <CheckCircle size={18} /> : <X size={18} />}
      </div>

      <div>
        <p
          className="
text-sm
font-semibold
text-white
"
        >
          {title}
        </p>

        <p
          className="
text-xs
text-[#64748b]
mt-1
"
        >
          {description}
        </p>
      </div>
    </div>
  );
}