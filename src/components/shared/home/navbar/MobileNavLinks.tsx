import Link from "next/link";
import { NavRoute } from "./routes";

interface Props {
  routes: NavRoute[];
  isActive: (href: string) => boolean;
  close: () => void;
}

export default function MobileNavLinks({
  routes,
  isActive,
  close,
}: Props) {
  return (
    <div className="space-y-2">
      {routes.map((route) => {
        const Icon = route.icon;

        return (
          <Link
            key={route.href}
            href={route.href}
            onClick={close}
            className={`
              flex
              items-center
              gap-3
              rounded-2xl
              px-4
              py-3
              text-sm
              font-medium
              transition
              ${
                isActive(route.href)
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            {Icon && <Icon size={18} />}
            {route.label}
          </Link>
        );
      })}
    </div>
  );
}