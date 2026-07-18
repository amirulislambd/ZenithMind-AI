import Link from "next/link";
import { LogOut } from "lucide-react";

interface Props {
  user: any;
  logout: () => void;
  close: () => void;
}

export default function MobileAuthButtons({
  user,
  logout,
  close,
}: Props) {
  if (!user) {
    return (
        <Link
        href="/login"
        onClick={close}
        className="
          flex
          w-full
          items-center
          justify-center
          rounded-2xl
          px-4
          py-3
          text-white
          font-semibold
          bg-linear-to-r
          from-[#1666ff]
          to-[#0d4cff]
          transition
          hover:opacity-95
        "
      >
        Login
      </Link>
    );
  }

  return (
    <button
      onClick={logout}
      className="
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        border-[#173056]
        bg-[#081429]
        px-4
        py-3
        text-sm
        font-semibold
        text-[#e2e8f0]
      "
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}