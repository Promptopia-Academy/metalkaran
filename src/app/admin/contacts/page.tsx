"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AdminContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">پیام‌های تماس</h1>
        <p className="text-muted-foreground">
          پیام‌های تماس از بک‌اند جداگانه دریافت می‌شوند.
        </p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground mb-4">
            برای مشاهده و مدیریت پیام‌های تماس، به پنل بک‌اند جداگانه مراجعه کنید.
          </p>
          <p className="text-sm text-muted-foreground">
            متغیر محیطی <code className="bg-muted px-1 rounded">NEXT_PUBLIC_API_URL</code> را برای ارسال فرم تماس به بک‌اند تنظیم کنید.
          </p>
          <Link
            href="/admin/settings"
            className="text-primary hover:underline mt-4 inline-block"
          >
            رفتن به تنظیمات
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
