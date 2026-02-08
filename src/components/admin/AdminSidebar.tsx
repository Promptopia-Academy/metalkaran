"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { ADMIN_MENU_ITEMS } from "@/lib/constants";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed right-0 top-0 h-screen w-64 bg-primary text-primary-foreground shadow-lg">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-primary-foreground/20">
          <h1 className="text-2xl font-bold">پنل مدیریت</h1>
          <p className="text-sm text-primary-foreground/70 mt-1">Metalkaran</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {ADMIN_MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground font-semibold"
                    : "hover:bg-primary-foreground/10 text-primary-foreground/80"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-foreground/20">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-foreground/10 text-primary-foreground/80 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>بازگشت به سایت</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
