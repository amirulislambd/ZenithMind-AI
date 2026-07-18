"use client";


import { X } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";


import MobileNavLinks from "./MobileNavLinks";
import MobileAuthButtons from "./MobileAuthButtons";
import { NavRoute } from "./routes";
import MobileUserCard from "./MobileUserCard";

interface Props {
  open: boolean;
  close: () => void;
  user: any;
  routes: NavRoute[];
  isActive: (href: string) => boolean;
  logout: () => void;
}

export default function MobileDrawer({
  open,
  close,
  user,
  routes,
  isActive,
  logout,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="
              fixed
              inset-0
              z-40
              bg-[#050d24]/70
              backdrop-blur-sm
            "
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
            className="
              fixed
              right-0
              top-0
              z-50
              flex
              h-screen
              w-[320px]
              flex-col
              border-l
              border-[#173056]/50
              bg-[#050d24]
              p-6
            "
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[#e2e8f0]">
                Menu
              </h2>

              <button
                onClick={close}
                className="text-[#cbd5e1] cursor-pointer hover:text-white"
              >
                <X />
              </button>
            </div>

            {user && (
              <MobileUserCard user={user} />
            )}

            <div className="mt-8 flex-1 overflow-y-auto">
              <MobileNavLinks
                routes={routes}
                isActive={isActive}
                close={close}
              />
            </div>

            <div className="border-t border-[#1e293b]/30 pt-4">
              <MobileAuthButtons
                user={user}
                logout={logout}
                close={close}
              />

              <div className="mt-5 text-center">
                <p className="text-xs text-[#94a3b8]">
                  Powered by ZenithMind AI
                </p>

                <p className="mt-1 text-xs text-[#64748b]">
                  © {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}