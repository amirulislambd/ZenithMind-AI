import Link from "next/link";
import { NavRoute } from "./routes";

interface Props {
  routes: NavRoute[];
  pathname: string;
  onClick?: () => void;
}

export default function NavLinks({
  routes,
  pathname,
  onClick,
}: Props) {
  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  return (
    <>
      {routes.map((route) => {
        const Icon = route.icon;

        return (
          <Link
            key={route.href}
            href={route.href}
            onClick={onClick}
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
                  ? "border border-[#0d4cff]/20 bg-[#081d46] text-[#7db0ff]"
                  : "text-[#cbd5e1] hover:bg-[#0c1832] hover:text-white"
              }
            `}
          >
            {Icon && <Icon size={18} />}
            {route.label}
          </Link>
        );
      })}
    </>
  );
}