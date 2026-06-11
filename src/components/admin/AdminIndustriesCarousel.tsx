"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Save } from "lucide-react";
import { uploadImage } from "@/lib/cms/uploadImageApi";
import {
  getIndustriesCarousel,
  createIndustriesCarousel,
  updateIndustriesCarousel,
  deleteIndustriesCarousel,
  type IndustriesCarouselItem,
} from "@/lib/cms/industriesCarouselApi";

export function AdminIndustriesCarousel() {
  const [items, setItems] = useState<IndustriesCarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [newItem, setNewItem] = useState({ src: "", alt: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getIndustriesCarousel();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newItem.src || !newItem.alt) return;

    try {
      await createIndustriesCarousel(newItem);

      setNewItem({
        src: "",
        alt: "",
      });

      await fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (item: IndustriesCarouselItem) => {
    try {
      setSavingId(item.id);

      await updateIndustriesCarousel(item.id, {
        src: item.src,
        alt: item.alt,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("حذف شود؟")) return;

    try {
      await deleteIndustriesCarousel(id);

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);

      const src = await uploadImage(file);

      return src;
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-6">در حال بارگذاری آیتم‌های کاروسل صنایع...</div>;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>مدیریت کاروسل صنایع</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 space-y-4">
            <div className="relative w-full h-48 rounded overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div>
              <Label>متن تصویر</Label>
              <Input
                value={item.alt}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((s) =>
                      s.id === item.id ? { ...s, alt: e.target.value } : s,
                    ),
                  )
                }
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => handleUpdate(item)}
                disabled={savingId === item.id}
              >
                <Save className="w-4 h-4 ml-2" />
                ذخیره
              </Button>

              <Button
                variant="destructive"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="w-4 h-4 ml-2" />
                حذف
              </Button>
            </div>
          </div>
        ))}

        <div className="border-t pt-6 space-y-4">
          <h3 className="font-bold text-lg">افزودن آیتم جدید</h3>

          <div>
            <Label>آپلود تصویر</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                if (!e.target.files?.[0]) return;
                const src = await handleUpload(e.target.files[0]);
                setNewItem((p) => ({ ...p, src }));
              }}
            />
            {uploading && (
              <p className="text-sm text-muted-foreground">در حال آپلود...</p>
            )}
          </div>

          {newItem.src && (
            <div className="relative w-full h-40 rounded overflow-hidden">
              <Image
                src={newItem.src}
                alt="preview"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}

          <div>
            <Label>متن تصویر</Label>
            <Input
              value={newItem.alt}
              onChange={(e) =>
                setNewItem((p) => ({ ...p, alt: e.target.value }))
              }
            />
          </div>

          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 ml-2" />
            افزودن آیتم
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
