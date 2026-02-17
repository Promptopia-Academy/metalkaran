"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Save, Eye, EyeOff, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AUTH_STORAGE_KEY } from "@/lib/cms/pageApi";

export default function AdminSettingsPage() {
  const { logout, setToken } = useAuth();
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedApiKey =
      typeof window !== "undefined"
        ? localStorage.getItem(AUTH_STORAGE_KEY)
        : null;
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      setToken(apiKey.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">تنظیمات</h1>
        <p className="text-muted-foreground">تنظیمات پنل مدیریت</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>احراز هویت</CardTitle>
          <CardDescription>
            ورود از طریق صفحه لاگین، توکن JWT را در مرورگر ذخیره می‌کند. در صورت
            نیاز می‌توانید توکن را دستی هم وارد یا جایگزین کنید (مثلاً پس از
            تمدید از سمت سرور).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">توکن (JWT)</label>
            <div className="relative">
              <Input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Bearer token از لاگین یا دستی"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showApiKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              توکن در مرورگر ذخیره می‌شود و در هر درخواست به API ارسال می‌شود.
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={!apiKey.trim() || saved}>
              <Save className="w-4 h-4 ml-2" />
              {saved ? "ذخیره شد" : "ذخیره"}
            </Button>
            <Button type="button" variant="outline" onClick={logout}>
              <LogOut className="w-4 h-4 ml-2" />
              خروج
            </Button>
          </div>

          {saved && (
            <p className="text-sm text-green-600">تنظیمات با موفقیت ذخیره شد</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>راهنمای استفاده</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">ورود به پنل:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>
                برای ورود از صفحه <strong>لاگین</strong> (/admin/login) استفاده
                کنید.
              </li>
              <li>
                در صورت نیاز می‌توانید توکن JWT را دستی در باکس بالا قرار دهید.
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">نکات امنیتی:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>توکن را با کسی به اشتراک نگذارید</li>
              <li>پس از خروج یا انقضای توکن، مجدداً وارد شوید</li>
              <li>
                در صورت افشا شدن، از پنل خروج کنید و رمز عبور را در سرور تغییر
                دهید
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
