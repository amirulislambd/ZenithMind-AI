import Link from "next/link";
import { NavRoute } from "./routes";

interface Props {
  routes: NavRoute[];
  isActive: (href: string) => boolean;
}

export default function DesktopNav({
  routes,
  isActive,
}: Props) {
  return (
    <div className="hidden items-center gap-8 md:flex">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={`text-sm font-medium transition ${
            isActive(route.href)
              ? "text-cyan-400"
              : "text-slate-300 hover:text-white"
          }`}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}