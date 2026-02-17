"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/cms/pageApi";
import { ArrowRight } from "lucide-react";

export default function NewCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      let imagePath: string | null = null;
      if (imageFile) {
        imagePath = await api.uploadImage(imageFile);
      }
      await api.createCategory({
        slug: formData.slug,
        title: formData.title,
        image: imagePath,
      });
      alert("دسته‌بندی با موفقیت ایجاد شد");
      router.push("/admin/categories");
    } catch (error: unknown) {
      alert(
        `خطا در ایجاد دسته‌بندی: ${error instanceof Error ? error.message : "خطای نامشخص"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">ایجاد دسته‌بندی جدید</h1>
        <p className="text-muted-foreground">دسته‌بندی جدید را ایجاد کنید</p>
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
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                minLength={2}
                placeholder="مثال: فولاد کم‌کربن"
              />
            </div>
            <div>
              <Label htmlFor="slug">اسلاگ *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
                placeholder="مثال: low-carbon-steel"
              />
            </div>
            <div>
              <Label htmlFor="image">تصویر دسته‌بندی</Label>
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
            {loading ? "در حال ذخیره..." : "ذخیره دسته‌بندی"}
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
