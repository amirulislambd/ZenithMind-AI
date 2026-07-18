"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "../../lib/auth-client";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Loader2, Mail, Lock, User, AlertCircle, Eye, EyeOff, Camera } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: null as any,
    },
  });

  const password = watch("password");
  const imageFile = watch("image");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      let imageUrl = "";

      if (data.image && data.image.length > 0) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        
        if (!imgbbApiKey) {
          console.warn("ImgBB API key is missing. Image will not be uploaded.");
          toast.error("ImgBB API key is missing in .env");
        } else {
          toast.loading("Uploading image...", { id: "imageUpload" });
          const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
            method: "POST",
            body: formData,
          });
          const imgData = await imgRes.json();
          toast.dismiss("imageUpload");
          
          if (imgData.success) {
            imageUrl = imgData.data.url;
          } else {
            throw new Error("Failed to upload image to ImgBB");
          }
        }
      }

      const { error: signUpError } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: imageUrl || undefined,
      });

      if (signUpError) {
        setError(signUpError.message || "Registration failed");
        toast.error("Failed to create account");
      } else {
        toast.success("Account created successfully!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      toast.dismiss("imageUpload");
      setError(err.message || "An unexpected error occurred");
      toast.error("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({ provider: "google" });
    } catch (err) {
      toast.error("Failed to login with Google");
    }
  };

  const handleDemoAdmin = () => {
    setValue("name", "Demo Admin");
    setValue("email", "demo@zenithmind.ai");
    setValue("password", "DemoAdmin2026!");
    setValue("confirmPassword", "DemoAdmin2026!");
    toast.success("Demo credentials loaded. Click Sign up to proceed.");
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 sm:p-10 w-full relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Join ZenithMind AI today
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/20 border-l-4 border-red-500 p-4 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3 shrink-0" />
            <p className="text-sm text-white font-medium">{error}</p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Circular Image Upload Preview */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-indigo-500/50 bg-white/5 flex items-center justify-center group">
              {imageFile && imageFile.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={URL.createObjectURL(imageFile[0])}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              )}
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="mt-3 relative">
              <input
                id="image"
                type="file"
                accept="image/*"
                className="sr-only"
                {...register("image")}
              />
              <label
                htmlFor="image"
                className="cursor-pointer text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {imageFile && imageFile.length > 0 ? "Change picture" : "Upload profile picture"}
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Full Name
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="name"
                type="text"
                placeholder="Jane Doe"
                className={`block w-full pl-12 pr-4 py-3 bg-white/5 border ${
                  errors.name ? "border-red-400" : "border-white/20"
                } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all sm:text-sm`}
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">
                {errors.name.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Email address
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`block w-full pl-12 pr-4 py-3 bg-white/5 border ${
                  errors.email ? "border-red-400" : "border-white/20"
                } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all sm:text-sm`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Password
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`block w-full pl-12 pr-12 py-3 bg-white/5 border ${
                  errors.password ? "border-red-400" : "border-white/20"
                } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all sm:text-sm`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`block w-full pl-12 pr-12 py-3 bg-white/5 border ${
                  errors.confirmPassword
                    ? "border-red-400"
                    : "border-white/20"
                } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all sm:text-sm`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-slate-400 hover:text-white transition-colors" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
              ) : null}
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900/60 backdrop-blur-md rounded-full text-slate-300">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/5 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Google
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-emerald-500/30 rounded-xl shadow-sm bg-emerald-500/10 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
            >
              Try Demo Admin Account
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-slate-300 text-sm sm:text-base">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-white hover:text-indigo-400 underline underline-offset-4 transition-colors"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
