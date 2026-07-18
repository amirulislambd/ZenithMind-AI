import AdminPanel from "@/src/components/dashboard/AdminPanel";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Admin Panel | ZenithMind AI",
  description: "Admin management panel for ZenithMind AI platform",
};

export default function AdminPage() {
  return <AdminPanel />;
}
