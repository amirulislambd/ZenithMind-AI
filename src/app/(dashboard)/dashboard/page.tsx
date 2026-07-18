import DashboardOverview from "@/src/components/dashboard/DashboardOverview";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard | ZenithMind AI",
  description: "Your ZenithMind AI cognitive health workspace",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
