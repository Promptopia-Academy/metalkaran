"use client";
import { getAboutUsWhyUs, updateAboutUsWhyUs } from "@/lib/cms/aboutUsWhyUsApi";

import {
  getAboutUsCards,
  createAboutUsCard,
  updateAboutUsCard,
  deleteAboutUsCard,
} from "@/lib/cms/aboutUsCardsApi";

import Image from "next/image";
import { uploadImage } from "@/lib/cms/uploadImageApi";

import {
  getAboutUsDescriptions,
  createAboutUsDescription,
  updateAboutUsDescription,
  deleteAboutUsDescription,
} from "@/lib/cms/aboutUsDesApi";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const [form, setForm] = useState({
    whyUsTitle: "",
    whyUsDescription: "",
  });
  const [cards, setCards] = useState<IAboutUsPageCard[]>([]);
  const [descriptions, setDescriptions] = useState<IAboutUsPageDescription[]>(
    [],
  );
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editingDescId, setEditingDescId] = useState<number | null>(null);
  const [deletedCardIds, setDeletedCardIds] = useState<number[]>([]);
  const [deletedDescIds, setDeletedDescIds] = useState<number[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [whyUs, cardsData, descData] = await Promise.all([
          getAboutUsWhyUs(),
          getAboutUsCards(),
          getAboutUsDescriptions(),
        ]);

        if (whyUs.length > 0) {
          setForm({
            whyUsTitle: whyUs[0].title,
            whyUsDescription: whyUs[0].description,
          });
        }

        setCards(cardsData);
        setDescriptions(descData);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    load();
  }, []);
  const handleUpload = async (file: File, key: string) => {
    try {
      setUploadingKey(key);
      return await uploadImage(file);
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // چرا ما
      const whyUsList = await getAboutUsWhyUs();

      if (whyUsList.length > 0 && typeof whyUsList[0].id === "number") {
        await updateAboutUsWhyUs(whyUsList[0].id, {
          title: form.whyUsTitle,
          description: form.whyUsDescription,
        });
      }

      // حذف کارت‌ها
      for (const id of deletedCardIds) {
        await deleteAboutUsCard(id);
      }

      // حذف توضیحات
      for (const id of deletedDescIds) {
        await deleteAboutUsDescription(id);
      }

      // کارت‌های جدید یا ویرایش شده (به غیر از حذف‌شده‌ها)
      for (const card of cards.filter((c) => !deletedCardIds.includes(c.id))) {
        if (card.id < 0) {
          await createAboutUsCard({
            title: card.title,
            image: card.image,
          });
        } else if (typeof card.id === "number") {
          await updateAboutUsCard(card.id, {
            title: card.title,
            image: card.image,
          });
        }
      }

      // توضیحات جدید یا ویرایش شده
      for (const desc of descriptions.filter(
        (d) => !deletedDescIds.includes(d.id),
      )) {
        const payload = {
          image: desc.image,
          alt: desc.alt,
          width: desc.width,
          height: desc.height,
          title: desc.title,
          content_class_name: desc.content_class_name,
          description: desc.description,
        };

        if (desc.id < 0) {
          await createAboutUsDescription(payload);
        } else if (typeof desc.id === "number") {
          await updateAboutUsDescription(desc.id, payload);
        }

        if (desc.id < 0) {
          await createAboutUsDescription(desc);
        } else if (typeof desc.id === "number") {
          const payload = {
            image: desc.image,
            alt: desc.alt,
            width: desc.width,
            height: desc.height,
            title: desc.title,
            content_class_name: desc.content_class_name,
            description: desc.description,
          };
          await updateAboutUsDescription(desc.id, payload);
        }
      }

      alert("ذخیره شد");
    } catch (err) {
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
  };
  const removeCard = (idx: number) => {
    if (!confirm("حذف این کارت؟")) return;

    setCards((prev) => {
      const card = prev[idx];
      if (card.id > 0) {
        setDeletedCardIds((d) => [...d, card.id]);
      }
      return prev.filter((_, i) => i !== idx);
    });

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
        content_class_name: "",
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
  };
  const removeDescription = (idx: number) => {
    if (!confirm("حذف این مورد؟")) return;

    setDescriptions((prev) => {
      const desc = prev[idx];

      if (desc.id > 0) {
        setDeletedDescIds((d) => [...d, desc.id]);
      }

      return prev.filter((_, i) => i !== idx);
    });

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
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {card.image && (
                          <div className="relative md:col-span-2 w-full h-40 rounded overflow-hidden border">
                            <Image
                              src={card.image}
                              alt={card.title || "card image"}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        )}

                        <div>
                          <Label>عنوان</Label>
                          <Input
                            placeholder="عنوان"
                            value={card.title}
                            onChange={(e) =>
                              updateCard(idx, { title: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <Label>آدرس تصویر</Label>
                          <Input
                            placeholder="آدرس تصویر"
                            value={card.image}
                            onChange={(e) =>
                              updateCard(idx, { image: e.target.value })
                            }
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label>آپلود تصویر</Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              if (!e.target.files?.[0]) return;

                              const image = await handleUpload(
                                e.target.files[0],
                                `card-${idx}`,
                              );
                              updateCard(idx, { image });
                            }}
                          />

                          {uploadingKey === `card-${idx}` && (
                            <p className="text-sm text-muted-foreground mt-1">
                              در حال آپلود تصویر...
                            </p>
                          )}
                        </div>

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
                        <div className="flex items-center gap-3">
                          {card.image && (
                            <div className="relative w-16 h-16 rounded overflow-hidden border">
                              <Image
                                src={card.image}
                                alt={card.title || "card image"}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>
                          )}

                          <span className="font-medium">{card.title}</span>
                        </div>

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
                        {desc.image && (
                          <div className="relative md:col-span-2 w-full h-48 rounded overflow-hidden border">
                            <Image
                              src={desc.image}
                              alt={
                                desc.alt || desc.title || "description image"
                              }
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                        )}

                        <Input
                          placeholder="عنوان"
                          value={desc.title}
                          onChange={(e) =>
                            updateDescription(idx, { title: e.target.value })
                          }
                        />
                        <div>
                          <Label>آدرس تصویر</Label>
                          <Input
                            placeholder="آدرس تصویر"
                            value={desc.image}
                            onChange={(e) =>
                              updateDescription(idx, { image: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <Label>آپلود تصویر</Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              if (!e.target.files?.[0]) return;

                              const image = await handleUpload(
                                e.target.files[0],
                                `desc-${idx}`,
                              );
                              updateDescription(idx, { image });
                            }}
                          />

                          {uploadingKey === `desc-${idx}` && (
                            <p className="text-sm text-muted-foreground mt-1">
                              در حال آپلود تصویر...
                            </p>
                          )}
                        </div>

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
                          value={desc.content_class_name || ""}
                          onChange={(e) =>
                            updateDescription(idx, {
                              content_class_name: e.target.value,
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
                        <div className="flex items-start gap-3">
                          {desc.image && (
                            <div className="relative w-20 h-20 rounded overflow-hidden border shrink-0">
                              <Image
                                src={desc.image}
                                alt={
                                  desc.alt || desc.title || "description image"
                                }
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>
                          )}

                          <div>
                            <p className="font-medium">{desc.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {desc.description}
                            </p>
                          </div>
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
          <Button
            type="button"
            variant="outline"
            onClick={() => history.back()}
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            بازگشت
          </Button>
        </div>
      </form>
    </div>
  );
}
