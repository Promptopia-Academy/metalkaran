"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/dev/getData";
import { ArrowRight } from "lucide-react";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ slug: "", title: "", image: "" });

  useEffect(() => {
    if (Number.isNaN(id)) {
      setFetching(false);
      return;
    }
    api
      .getCmsCategories()
      .then((categories) => {
        const cat = categories.find((c) => c.id === id);
        if (cat) {
          setFormData({
            slug: cat.slug,
            title: cat.title,
            image: cat.image || "",
          });
        } else {
          alert("دسته‌بندی یافت نشد");
          router.push("/admin/categories");
        }
      })
      .catch(() => alert("خطا در بارگذاری"))
      .finally(() => setFetching(false));
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Number.isNaN(id)) return;
    setLoading(true);
    try {
      let imagePath: string | null = formData.image || null;
      if (imageFile) {
        imagePath = await api.uploadImage(imageFile);
      }
      await api.updateCategory(id, {
        slug: formData.slug,
        title: formData.title,
        image: imagePath,
      });
      alert("دسته‌بندی با موفقیت ویرایش شد");
      router.push("/admin/categories");
    } catch (error: unknown) {
      alert(`خطا در ویرایش: ${error instanceof Error ? error.message : "خطای نامشخص"}`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-8 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">ویرایش دسته‌بندی</h1>
        <p className="text-muted-foreground">ویرایش دسته‌بندی (شناسه: {id})</p>
      </div>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات دسته‌بندی</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">عنوان *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                minLength={2}
              />
            </div>
            <div>
              <Label htmlFor="slug">اسلاگ *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>تصویر فعلی</Label>
              {formData.image && (
                <p className="text-sm text-muted-foreground truncate mb-2">{formData.image}</p>
              )}
              <Label htmlFor="image">تصویر جدید (اختیاری)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-4 mt-6">
          <Button type="submit" disabled={loading}>
            {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            <ArrowRight className="w-4 h-4 ml-2" />
            بازگشت
          </Button>
        </div>
      </form>
    </div>
  );
}
