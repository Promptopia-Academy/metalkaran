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
  getHeroSections,
  createHeroSection,
  updateHeroSection,
  deleteHeroSection,
  type HeroSlide,
} from "@/lib/cms/heroSectionApi";

export function AdminHeroCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [newSlide, setNewSlide] = useState({ src: "", alt: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const data = await getHeroSections();
      setSlides(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newSlide.src || !newSlide.alt) return;

    try {
      await createHeroSection(newSlide);

      setNewSlide({
        src: "",
        alt: "",
      });

      await fetchSlides();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async (slide: HeroSlide) => {
    try {
      setSavingId(slide.id);

      await updateHeroSection(slide.id, {
        src: slide.src,
        alt: slide.alt,
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
      await deleteHeroSection(id);

      setSlides((prev) => prev.filter((item) => item.id !== id));
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
    return <div className="text-center p-6">در حال بارگذاری اسلایدها...</div>;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>مدیریت اسلایدهای صفحه اصلی</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Existing Slides */}
        {slides.map((slide) => (
          <div key={slide.id} className="border rounded-lg p-4 space-y-4">
            <div className="relative w-full h-48 rounded overflow-hidden">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div>
              <Label>متن تصویر</Label>
              <Input
                value={slide.alt}
                onChange={(e) =>
                  setSlides((prev) =>
                    prev.map((s) =>
                      s.id === slide.id ? { ...s, alt: e.target.value } : s,
                    ),
                  )
                }
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => handleUpdate(slide)}
                disabled={savingId === slide.id}
              >
                <Save className="w-4 h-4 ml-2" />
                ذخیره
              </Button>

              <Button
                variant="destructive"
                onClick={() => handleDelete(slide.id)}
              >
                <Trash2 className="w-4 h-4 ml-2" />
                حذف
              </Button>
            </div>
          </div>
        ))}

        {/* Create New */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="font-bold text-lg">افزودن اسلاید جدید</h3>

          <div>
            <Label>آپلود تصویر</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                if (!e.target.files?.[0]) return;
                const src = await handleUpload(e.target.files[0]);
                setNewSlide((p) => ({ ...p, src }));
              }}
            />
            {uploading && (
              <p className="text-sm text-muted-foreground">در حال آپلود...</p>
            )}
          </div>

          {newSlide.src && (
            <div className="relative w-full h-40 rounded overflow-hidden">
              <Image
                src={newSlide.src}
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
              value={newSlide.alt}
              onChange={(e) =>
                setNewSlide((p) => ({ ...p, alt: e.target.value }))
              }
            />
          </div>

          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 ml-2" />
            افزودن اسلاید
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
