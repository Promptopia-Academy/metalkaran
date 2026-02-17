"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<
    { id: number; slug: string; title: string }[]
  >([]);
  const [usages, setUsages] = useState<{ id: string; title: string }[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    introduction: "",
    description: "",
    categoryId: "" as string,
    usageIds: [] as string[],
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
    const loadOptions = async () => {
      const [cats, usg] = await Promise.all([
        api.getCmsCategories(),
        api.getCmsUsages(),
      ]);
      setCategories(cats);
      setUsages(usg);
    };
    loadOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await api.createProductFull({
        title: formData.title,
        slug: formData.slug,
        introduction: formData.introduction,
        description: formData.description,
        categoryId: formData.categoryId ? Number(formData.categoryId) : null,
        usageIds: formData.usageIds.length ? formData.usageIds : undefined,
        image: imageFile,
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
      alert("محصول با موفقیت ایجاد شد");
      router.push("/admin/products");
    } catch (error: unknown) {
      alert(
        `خطا در ایجاد محصول: ${error instanceof Error ? error.message : "خطای نامشخص"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleUsage = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      usageIds: prev.usageIds.includes(id)
        ? prev.usageIds.filter((u) => u !== id)
        : [...prev.usageIds, id],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">ایجاد محصول جدید</h1>
        <p className="text-muted-foreground">محصول جدید را ایجاد کنید</p>
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
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                minLength={2}
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
                placeholder="مثال: st37"
              />
            </div>
            <div>
              <Label htmlFor="image">تصویر محصول</Label>
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
                onChange={(e) =>
                  setFormData({ ...formData, introduction: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                minLength={10}
              />
            </div>
            <div>
              <Label>دسته‌بندی</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(v) =>
                  setFormData({ ...formData, categoryId: v })
                }
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
            <div>
              <Label htmlFor="standards">استانداردها</Label>
              <Input
                id="standards"
                value={formData.standards}
                onChange={(e) =>
                  setFormData({ ...formData, standards: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="thermalExpansion">انبساط حرارتی</Label>
              <textarea
                id="thermalExpansion"
                className={textareaClass}
                value={formData.thermalExpansion}
                onChange={(e) =>
                  setFormData({ ...formData, thermalExpansion: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="corrosionResistance">
                مقاومت در برابر خوردگی
              </Label>
              <textarea
                id="corrosionResistance"
                className={textareaClass}
                value={formData.corrosionResistance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    corrosionResistance: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="heatResistance">مقاومت حرارتی</Label>
              <textarea
                id="heatResistance"
                className={textareaClass}
                value={formData.heatResistance}
                onChange={(e) =>
                  setFormData({ ...formData, heatResistance: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="manufacturing">تولید</Label>
              <textarea
                id="manufacturing"
                className={textareaClass}
                value={formData.manufacturing}
                onChange={(e) =>
                  setFormData({ ...formData, manufacturing: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="hotForming">فرم‌دهی گرم</Label>
              <textarea
                id="hotForming"
                className={textareaClass}
                value={formData.hotForming}
                onChange={(e) =>
                  setFormData({ ...formData, hotForming: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="coldForming">فرم‌دهی سرد</Label>
              <textarea
                id="coldForming"
                className={textareaClass}
                value={formData.coldForming}
                onChange={(e) =>
                  setFormData({ ...formData, coldForming: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="welding">جوشکاری</Label>
              <textarea
                id="welding"
                className={textareaClass}
                value={formData.welding}
                onChange={(e) =>
                  setFormData({ ...formData, welding: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="machining">ماشینکاری</Label>
              <textarea
                id="machining"
                className={textareaClass}
                value={formData.machining}
                onChange={(e) =>
                  setFormData({ ...formData, machining: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "در حال ذخیره..." : "ذخیره محصول"}
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
