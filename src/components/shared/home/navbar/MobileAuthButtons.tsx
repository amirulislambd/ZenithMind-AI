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
          bg-cyan-500
          px-4
          py-3
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-cyan-400
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
        border-red-500/20
        bg-red-500/10
        px-4
        py-3
        text-sm
        font-semibold
        text-red-400
      "
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}