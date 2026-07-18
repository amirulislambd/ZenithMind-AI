import {
    Home,
    Compass,
    LayoutDashboard,
    Info,
    LifeBuoy,
  } from "lucide-react";
  
  export interface NavRoute {
    label: string;
    href: string;
    icon?: React.ElementType;
  }
  
  export const LOGGED_OUT_ROUTES: NavRoute[] = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Explore Kits",
      href: "/explore",
      icon: Compass,
    },
  ];
  
  export const LOGGED_IN_ROUTES: NavRoute[] = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Explore Kits",
      href: "/explore",
      icon: Compass,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "About Us",
      href: "/about",
      icon: Info,
    },
    {
      label: "Support",
      href: "/support",
      icon: LifeBuoy,
    },
  ];