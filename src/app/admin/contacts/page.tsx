"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, type ContactFormItem } from "@/lib/cms/pageApi";

export default function AdminContactsPage() {
  const [items, setItems] = useState<ContactFormItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getContactFormData()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">پیام‌های تماس</h1>
        <p className="text-muted-foreground">
          لیست پیام‌های ارسالی از فرم تماس سایت
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">در حال بارگذاری...</div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            پیامی یافت نشد
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>لیست پیام‌ها ({items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-2">نام</th>
                    <th className="text-right p-2">تلفن</th>
                    <th className="text-right p-2">ایمیل</th>
                    <th className="text-right p-2">شرکت</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.phone}</td>
                      <td className="p-2">{item.email}</td>
                      <td className="p-2">{item.company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
