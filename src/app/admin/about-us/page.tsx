"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/cms/pageApi";
import type {
  IAboutUsPageData,
  IAboutUsPageCard,
  IAboutUsPageDescription,
} from "@/types/type";
import { Plus, Edit, Trash2, ArrowRight } from "lucide-react";

const textareaClass =
  "w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm";

export default function AdminAboutUsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState<IAboutUsPageData | null>(null);
  const [form, setForm] = useState({
    whyUsTitle: "",
    whyUsDescription: "",
  });
  const [cards, setCards] = useState<IAboutUsPageCard[]>([]);
  const [descriptions, setDescriptions] = useState<IAboutUsPageDescription[]>([]);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editingDescId, setEditingDescId] = useState<number | null>(null);

  useEffect(() => {
    api
      .getAboutUsPageData()
      .then((d) => {
        if (d) {
          setData(d);
          setForm({
            whyUsTitle: d.whyUs?.title ?? "",
            whyUsDescription: d.whyUs?.description ?? "",
          });
          setCards(d.aboutUsCards ?? []);
          setDescriptions(d.aboutUsDescription ?? []);
        }
      })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateAboutUsPageData({
        whyUs: { title: form.whyUsTitle, description: form.whyUsDescription },
        aboutUsCards: cards,
        aboutUsDescription: descriptions,
      });
      alert("ذخیره شد");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "خطا در ذخیره");
    } finally {
      setLoading(false);
    }
  };

  const addCard = () => {
    setCards((prev) => [
      ...prev,
      { id: -prev.length - 1, image: "", title: "" },
    ]);
    setEditingCardId(cards.length);
  };
  const updateCard = (idx: number, patch: Partial<IAboutUsPageCard>) => {
    setCards((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)),
    );
    setEditingCardId(null);
  };
  const removeCard = (idx: number) => {
    if (confirm("حذف این کارت؟")) setCards((prev) => prev.filter((_, i) => i !== idx));
    setEditingCardId(null);
  };

  const addDescription = () => {
    setDescriptions((prev) => [
      ...prev,
      {
        id: -prev.length - 1,
        image: "",
        alt: "",
        width: 0,
        height: 0,
        title: "",
        contentClassName: "",
        description: "",
      },
    ]);
    setEditingDescId(descriptions.length);
  };
  const updateDescription = (
    idx: number,
    patch: Partial<IAboutUsPageDescription>,
  ) => {
    setDescriptions((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, ...patch } : d)),
    );
    setEditingDescId(null);
  };
  const removeDescription = (idx: number) => {
    if (confirm("حذف این مورد؟"))
      setDescriptions((prev) => prev.filter((_, i) => i !== idx));
    setEditingDescId(null);
  };

  if (fetching) {
    return <div className="p-8 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold mb-2">صفحه درباره ما</h1>
        <p className="text-muted-foreground">
          ویرایش بخش چرا ما و کارت‌ها و توضیحات
        </p>
      </div>

      <form onSubmit={handleSave}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>بخش چرا ما</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>عنوان</Label>
              <Input
                value={form.whyUsTitle}
                onChange={(e) =>
                  setForm((p) => ({ ...p, whyUsTitle: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>توضیحات</Label>
              <textarea
                className={textareaClass}
                value={form.whyUsDescription}
                onChange={(e) =>
                  setForm((p) => ({ ...p, whyUsDescription: e.target.value }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>کارت‌های درباره ما</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addCard}>
              <Plus className="w-4 h-4 ml-2" />
              افزودن کارت
            </Button>
          </CardHeader>
          <CardContent>
            {cards.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                کارتی ثبت نشده. با دکمه بالا اضافه کنید.
              </p>
            ) : (
              <div className="space-y-4">
                {cards.map((card, idx) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between gap-4 p-3 border rounded-lg"
                  >
                    {editingCardId === idx ? (
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Input
                          placeholder="عنوان"
                          value={card.title}
                          onChange={(e) =>
                            updateCard(idx, { title: e.target.value })
                          }
                        />
                        <Input
                          placeholder="آدرس تصویر"
                          value={card.image}
                          onChange={(e) =>
                            updateCard(idx, { image: e.target.value })
                          }
                        />
                        <div className="md:col-span-2 flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => setEditingCardId(null)}
                          >
                            انجام شد
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="font-medium">{card.title}</span>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingCardId(idx)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeCard(idx)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>توضیحات درباره ما (بلوک‌ها)</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addDescription}
            >
              <Plus className="w-4 h-4 ml-2" />
              افزودن بلوک
            </Button>
          </CardHeader>
          <CardContent>
            {descriptions.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                بلوکی ثبت نشده. با دکمه بالا اضافه کنید.
              </p>
            ) : (
              <div className="space-y-4">
                {descriptions.map((desc, idx) => (
                  <div
                    key={desc.id}
                    className="border rounded-lg p-4 space-y-2"
                  >
                    {editingDescId === idx && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Input
                          placeholder="عنوان"
                          value={desc.title}
                          onChange={(e) =>
                            updateDescription(idx, { title: e.target.value })
                          }
                        />
                        <Input
                          placeholder="آدرس تصویر"
                          value={desc.image}
                          onChange={(e) =>
                            updateDescription(idx, { image: e.target.value })
                          }
                        />
                        <Input
                          placeholder="alt"
                          value={desc.alt}
                          onChange={(e) =>
                            updateDescription(idx, { alt: e.target.value })
                          }
                        />
                        <Input
                          placeholder="عرض"
                          type="number"
                          value={desc.width || ""}
                          onChange={(e) =>
                            updateDescription(idx, {
                              width: Number(e.target.value) || 0,
                            })
                          }
                        />
                        <Input
                          placeholder="ارتفاع"
                          type="number"
                          value={desc.height || ""}
                          onChange={(e) =>
                            updateDescription(idx, {
                              height: Number(e.target.value) || 0,
                            })
                          }
                        />
                        <Input
                          placeholder="contentClassName"
                          value={desc.contentClassName || ""}
                          onChange={(e) =>
                            updateDescription(idx, {
                              contentClassName: e.target.value,
                            })
                          }
                        />
                        <div className="md:col-span-2">
                          <Label>توضیحات</Label>
                          <textarea
                            className={textareaClass}
                            value={desc.description || ""}
                            onChange={(e) =>
                              updateDescription(idx, {
                                description: e.target.value,
                              })
                            }
                          />
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => setEditingDescId(null)}
                        >
                          انجام شد
                        </Button>
                      </div>
                    )}
                    {editingDescId !== idx && (
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{desc.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {desc.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingDescId(idx)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeDescription(idx)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Button>
          <Button type="button" variant="outline" onClick={() => history.back()}>
            <ArrowRight className="w-4 h-4 ml-2" />
            بازگشت
          </Button>
        </div>
      </form>
    </div>
  );
}
