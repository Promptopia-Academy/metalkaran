"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import type { IHomePageAbout } from "@/types/type";
import { ArrowRight } from "lucide-react";
import { AdminHeroCarousel } from "@/components/admin/AdminHeroCarousel";
import { AdminIndustriesCarousel } from "@/components/admin/AdminIndustriesCarousel";
import {
  createHomePageAbout,
  getHomePageAbout,
  updateHomePageAbout,
} from "@/lib/cms/homeAboutApi";

const textareaClass =
  "w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm";

export default function AdminLandingPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [homePageAbout, setHomePageAbout] = useState<IHomePageAbout>({
    title: "",
    detail: "",
    extra_title: "",
    extra_detail: "",
  });

  useEffect(() => {
    fetchHomePageAbout();
  }, []);

  const fetchHomePageAbout = async () => {
    try {
      const data = await getHomePageAbout();
      setHomePageAbout(data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await getHomePageAbout();

      if (!data.length) {
        await createHomePageAbout(homePageAbout);
      } else {
        const existing = data[0];

        if (!existing?.id) {
          throw new Error("شناسه رکورد یافت نشد");
        }

        await updateHomePageAbout(existing.id, homePageAbout);
      }

      alert("ذخیره شد");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "خطا در ذخیره");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-8 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold mb-2">لندینگ / محتوای سایت</h1>
        <p className="text-muted-foreground">
          بخش درباره ما در صفحه اصلی و تنظیمات کلی
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>بخش درباره ما (صفحه اصلی)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>عنوان</Label>
              <Input
                value={homePageAbout.title}
                onChange={(e) =>
                  setHomePageAbout((p) => ({ ...p, title: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>جزئیات</Label>
              <textarea
                className={textareaClass}
                value={homePageAbout.detail}
                onChange={(e) =>
                  setHomePageAbout((p) => ({ ...p, detail: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>عنوان اضافه</Label>
              <Input
                value={homePageAbout.extra_title}
                onChange={(e) =>
                  setHomePageAbout((p) => ({
                    ...p,
                    extra_title: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>جزئیات اضافه</Label>
              <textarea
                className={textareaClass}
                value={homePageAbout.extra_detail}
                onChange={(e) =>
                  setHomePageAbout((p) => ({
                    ...p,
                    extra_detail: e.target.value,
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>
        <AdminHeroCarousel />
        <AdminIndustriesCarousel />

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
