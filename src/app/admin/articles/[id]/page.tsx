"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/cms/pageApi";
import { ArrowRight } from "lucide-react";
import type { IArticle } from "@/types/type";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
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
    applicationTitle: "",
  });

  useEffect(() => {
    if (Number.isNaN(id)) {
      setFetching(false);
      return;
    }
    const load = async () => {
      try {
        let article: IArticle | null = await api.getArticleById(id);
        if (!article) {
          const res = await api.getArticles({ limit: 500 });
          article = res.data?.find((a) => a.id === id) ?? null;
        }
        if (article) {
          setFormData({
            title: article.title || "",
            image: article.image || "",
            introduction: article.introduction || "",
            title1: article.title1 || "",
            content1: article.content1 || "",
            title2: article.title2 || "",
            content2: article.content2 || "",
            title3: article.title3 || "",
            content3: article.content3 || "",
            title4: article.title4 || "",
            content4: article.content4 || "",
            title5: article.title5 || "",
            content5: article.content5 || "",
            applicationTitle: (article as { applicationTitle?: string }).applicationTitle || "",
          });
        } else {
          alert("مقاله یافت نشد");
          router.push("/admin/articles");
        }
      } catch {
        alert("خطا در بارگذاری مقاله");
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Number.isNaN(id)) return;
    setLoading(true);
    try {
      await api.updateArticle(id, formData);
      alert("مقاله با موفقیت ویرایش شد");
      router.push("/admin/articles");
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
        <h1 className="text-3xl font-bold mb-2">ویرایش مقاله</h1>
        <p className="text-muted-foreground">ویرایش مقاله (شناسه: {id})</p>
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
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                minLength={3}
              />
            </div>
            <div>
              <Label htmlFor="image">آدرس تصویر</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="introduction">مقدمه *</Label>
              <textarea
                id="introduction"
                className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                value={formData.introduction}
                onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, title1: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="content1">محتوا 1 *</Label>
                <textarea
                  id="content1"
                  className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  value={formData.content1}
                  onChange={(e) => setFormData({ ...formData, content1: e.target.value })}
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
                    value={formData[`title${num}` as keyof typeof formData] as string}
                    onChange={(e) =>
                      setFormData({ ...formData, [`title${num}`]: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`content${num}`}>محتوا {num}</Label>
                  <textarea
                    id={`content${num}`}
                    className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                    value={formData[`content${num}` as keyof typeof formData] as string}
                    onChange={(e) =>
                      setFormData({ ...formData, [`content${num}`]: e.target.value })
                    }
                  />
                </div>
              </div>
            ))}
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
