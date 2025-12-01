import { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 mr-64 p-8">{children}</main>
      </div>
    </div>
  );
}
