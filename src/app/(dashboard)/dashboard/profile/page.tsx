import ProfilePage from "@/src/components/dashboard/ProfilePage";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "My Profile | ZenithMind AI",
  description: "Manage your ZenithMind AI profile and account settings",
};

export default function Profile() {
  return <ProfilePage />;
}
