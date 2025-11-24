"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save, Eye, EyeOff } from "lucide-react";

export default function AdminSettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("admin_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem("admin_api_key", apiKey.trim());
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
            برای استفاده از API، لطفاً API Key خود را وارد کنید. این کلید از فایل .env.local
            سرور شما دریافت می‌شود.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">API Key</label>
            <div className="relative">
              <Input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="your-api-key-here"
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
              این کلید در مرورگر شما ذخیره می‌شود و فقط برای احراز هویت API استفاده می‌شود.
            </p>
          </div>

          <Button onClick={handleSave} disabled={!apiKey.trim() || saved}>
            <Save className="w-4 h-4 ml-2" />
            {saved ? "ذخیره شد" : "ذخیره"}
          </Button>

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
            <h3 className="font-semibold mb-2">نحوه دریافت API Key:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>فایل .env.local را در ریشه پروژه باز کنید</li>
              <li>مقدار API_KEY را پیدا کنید (یا JWT_SECRET)</li>
              <li>مقدار را در فیلد بالا کپی کنید</li>
              <li>روی دکمه "ذخیره" کلیک کنید</li>
            </ol>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-mono">
              <strong>مثال:</strong> API_KEY=your-secret-key-here
            </p>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">نکات امنیتی:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>API Key را با کسی به اشتراک نگذارید</li>
              <li>از API Key در محیط production استفاده کنید</li>
              <li>در صورت افشا شدن، سریعاً آن را تغییر دهید</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

