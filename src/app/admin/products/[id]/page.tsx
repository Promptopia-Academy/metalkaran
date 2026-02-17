"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/cms/pageApi";
import { ArrowRight } from "lucide-react";

const textareaClass =
  "w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState<{ id: number; slug: string; title: string }[]>([]);
  const [usages, setUsages] = useState<{ id: string; title: string }[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    introduction: "",
    description: "",
    categoryId: "" as string,
    usageIds: [] as string[],
    image: "",
    standards: "",
    thermalExpansion: "",
    corrosionResistance: "",
    heatResistance: "",
    manufacturing: "",
    hotForming: "",
    coldForming: "",
    welding: "",
    machining: "",
  });

  useEffect(() => {
    if (Number.isNaN(id)) {
      setFetching(false);
      return;
    }
    const load = async () => {
      try {
        const [product, cats, usg] = await Promise.all([
          api.getProductFullForAdmin(id),
          api.getCmsCategories(),
          api.getCmsUsages(),
        ]);
        setCategories(cats);
        setUsages(usg);
        if (product) {
          setFormData({
            title: product.title || "",
            slug: product.slug || "",
            introduction: product.introduction || "",
            description: product.description || "",
            categoryId: product.category ? String(product.category.id) : "",
            usageIds: product.usageIds || [],
            image: product.image || "",
            standards: product.standards || "",
            thermalExpansion: product.thermalExpansion || "",
            corrosionResistance: product.corrosionResistance || "",
            heatResistance: product.heatResistance || "",
            manufacturing: product.manufacturing || "",
            hotForming: product.hotForming || "",
            coldForming: product.coldForming || "",
            welding: product.welding || "",
            machining: product.machining || "",
          });
        } else {
          alert("محصول یافت نشد");
          router.push("/admin/products");
        }
      } catch {
        alert("خطا در بارگذاری محصول");
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
      let imagePath: string | undefined = formData.image || undefined;
      if (imageFile) {
        imagePath = await api.uploadImage(imageFile);
      }
      await api.updateProduct(id, {
        title: formData.title,
        slug: formData.slug,
        introduction: formData.introduction,
        description: formData.description,
        categoryId: formData.categoryId ? Number(formData.categoryId) : null,
        usageIds: formData.usageIds.length ? formData.usageIds : undefined,
        image: imagePath,
        standards: formData.standards || undefined,
        thermalExpansion: formData.thermalExpansion || undefined,
        corrosionResistance: formData.corrosionResistance || undefined,
        heatResistance: formData.heatResistance || undefined,
        manufacturing: formData.manufacturing || undefined,
        hotForming: formData.hotForming || undefined,
        coldForming: formData.coldForming || undefined,
        welding: formData.welding || undefined,
        machining: formData.machining || undefined,
      });
      alert("محصول با موفقیت ویرایش شد");
      router.push("/admin/products");
    } catch (error: unknown) {
      alert(`خطا در ویرایش: ${error instanceof Error ? error.message : "خطای نامشخص"}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleUsage = (usageId: string) => {
    setFormData((prev) => ({
      ...prev,
      usageIds: prev.usageIds.includes(usageId)
        ? prev.usageIds.filter((u) => u !== usageId)
        : [...prev.usageIds, usageId],
    }));
  };

  if (fetching) {
    return <div className="p-8 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">ویرایش محصول</h1>
        <p className="text-muted-foreground">ویرایش محصول (شناسه: {id})</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>اطلاعات اصلی</CardTitle>
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
            <div>
              <Label htmlFor="introduction">مقدمه *</Label>
              <textarea
                id="introduction"
                className={textareaClass}
                value={formData.introduction}
                onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                required
                minLength={10}
              />
            </div>
            <div>
              <Label htmlFor="description">توضیحات *</Label>
              <textarea
                id="description"
                className={textareaClass}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                minLength={10}
              />
            </div>
            <div>
              <Label>دسته‌بندی</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(v) => setFormData({ ...formData, categoryId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {usages.length > 0 && (
              <div>
                <Label>کاربردها</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {usages.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => toggleUsage(u.id)}
                      className={`px-3 py-1 rounded-md text-sm border ${
                        formData.usageIds.includes(u.id)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-input"
                      }`}
                    >
                      {u.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>اطلاعات تکمیلی (اختیاری)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "standards",
              "thermalExpansion",
              "corrosionResistance",
              "heatResistance",
              "manufacturing",
              "hotForming",
              "coldForming",
              "welding",
              "machining",
            ].map((key) => (
              <div key={key}>
                <Label htmlFor={key}>
                  {key === "standards"
                    ? "استانداردها"
                    : key === "thermalExpansion"
                      ? "انبساط حرارتی"
                      : key === "corrosionResistance"
                        ? "مقاومت در برابر خوردگی"
                        : key === "heatResistance"
                          ? "مقاومت حرارتی"
                          : key === "manufacturing"
                            ? "تولید"
                            : key === "hotForming"
                              ? "فرم‌دهی گرم"
                              : key === "coldForming"
                                ? "فرم‌دهی سرد"
                                : key === "welding"
                                  ? "جوشکاری"
                                  : "ماشینکاری"}
                </Label>
                <textarea
                  id={key}
                  className={textareaClass}
                  value={formData[key as keyof typeof formData] as string}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-4">
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
