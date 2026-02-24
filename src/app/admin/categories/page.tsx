"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { api } from "@/lib/dev/getData";
import Link from "next/link";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<
    { id: number; slug: string; title: string; image?: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await api.getCmsCategories();
    setCategories(data);
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`آیا از حذف دسته‌بندی «${title}» مطمئن هستید؟`)) return;
    try {
      await api.deleteCategory(id);
      await load();
      alert("دسته‌بندی حذف شد");
    } catch (error: unknown) {
      alert(`خطا در حذف: ${error instanceof Error ? error.message : "خطای نامشخص"}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">مدیریت دسته‌بندی‌ها</h1>
          <p className="text-muted-foreground">افزودن، ویرایش و حذف دسته‌بندی‌ها</p>
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
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{c.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{c.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/categories/${c.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(c.id, c.title)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}