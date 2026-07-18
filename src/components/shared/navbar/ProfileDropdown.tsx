"use client";

import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  close: () => void;
  logout: () => void;
}

export default function ProfileDropdown({
  open,
  close,
  logout,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 10,
          }}
          className="
            absolute
            right-0
            mt-3
            w-56
            overflow-hidden
            rounded-2xl
            border
            border-[#173056]
            bg-[#050d24]
            shadow-xl
          "
        >
          <Link
            href="/dashboard/profile"
            onClick={close}
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              text-sm
              text-[#e2e8f0]
              transition
              hover:bg-[#0b1e46]
            "
          >
            <User size={16} />
            Profile
          </Link>

          <button
            onClick={logout}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-3
              text-sm
              text-[#dc2626]
              transition
              hover:bg-[rgba(220,38,38,0.08)]
            "
          >
            <LogOut size={16} />
            Logout
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}