import AdminPanel from "@/src/components/dashboard/AdminPanel";
import { getSession } from "better-auth/api";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Admin Panel | ZenithMind AI",
  description: "Admin management panel for ZenithMind AI platform",
};

export default async function AdminPage() {

  const session = await getSession();
  console.log('session', session)


  return <AdminPanel />;
}
