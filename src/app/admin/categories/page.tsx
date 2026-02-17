"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { api } from "@/lib/cms/pageApi";
import Link from "next/link";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<
    { id: number; slug: string; title: string; image?: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await api.getCmsCategories();
      setCategories(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">مدیریت دسته‌بندی‌ها</h1>
          <p className="text-muted-foreground">افزودن و مشاهده دسته‌بندی‌ها</p>
        </div>
        <Link href="/admin/categories/new">
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            دسته‌بندی جدید
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">در حال بارگذاری...</div>
      ) : categories.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            دسته‌بندی‌ای یافت نشد
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Card key={c.id}>
              <CardHeader>
                <CardTitle className="text-lg">{c.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{c.slug}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}