"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/cms/pageApi";
import { ArrowRight, Upload, X } from "lucide-react";

export default function NewArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    introduction: "",
    title1: "",
    content1: "",
    title2: "",
    content2: "",
    title3: "",
    content3: "",
    title4: "",
    content4: "",
    title5: "",
    content5: "",
    sources: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("لطفاً یک فایل تصویری انتخاب کنید.");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clearImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await api.uploadImage(imageFile);
      }
      await api.createArticle({ ...formData, image: imageUrl });
      alert("مقاله با موفقیت ایجاد شد");
      router.push("/admin/articles");
    } catch (error: unknown) {
      alert(
        `خطا در ایجاد مقاله: ${error instanceof Error ? error.message : "خطای نامشخص"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">ایجاد مقاله جدید</h1>
        <p className="text-muted-foreground">مقاله جدید را ایجاد کنید</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات مقاله</CardTitle>
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
                minLength={3}
              />
            </div>

            <div>
              <Label>تصویر مقاله</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="article-image"
              />
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  انتخاب تصویر
                </Button>
                {imageFile && (
                  <span className="text-sm text-muted-foreground">
                    {imageFile.name}
                  </span>
                )}
                {imagePreview && (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="پیش‌نمایش"
                      className="h-20 w-auto rounded border object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={clearImage}
                      aria-label="حذف تصویر"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="introduction">مقدمه *</Label>
              <textarea
                id="introduction"
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                value={formData.introduction}
                onChange={(e) =>
                  setFormData({ ...formData, introduction: e.target.value })
                }
                required
                minLength={10}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title1">عنوان 1 *</Label>
                <Input
                  id="title1"
                  value={formData.title1}
                  onChange={(e) =>
                    setFormData({ ...formData, title1: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="content1">محتوا 1 *</Label>
                <textarea
                  id="content1"
                  className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  value={formData.content1}
                  onChange={(e) =>
                    setFormData({ ...formData, content1: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {[2, 3, 4, 5].map((num) => (
              <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`title${num}`}>عنوان {num}</Label>
                  <Input
                    id={`title${num}`}
                    value={
                      formData[`title${num}` as keyof typeof formData] as string
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [`title${num}`]: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`content${num}`}>محتوا {num}</Label>
                  <textarea
                    id={`content${num}`}
                    className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    value={
                      formData[
                        `content${num}` as keyof typeof formData
                      ] as string
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [`content${num}`]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            ))}

            <div>
              <Label htmlFor="sources">منابع</Label>
              <textarea
                id="sources"
                className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                value={formData.sources}
                onChange={(e) =>
                  setFormData({ ...formData, sources: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "در حال ذخیره..." : "ذخیره مقاله"}
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
