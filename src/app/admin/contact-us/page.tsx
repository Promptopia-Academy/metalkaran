"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/dev/getData";
import type { IContactUsPageData } from "@/types/type";
import { ArrowRight } from "lucide-react";

const textareaClass =
  "w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm";

export default function AdminContactUsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState<IContactUsPageData>({
    mainParagraph: "",
    subParagraph: "",
  });

  useEffect(() => {
    api
      .getContactUsPageData()
      .then((d: IContactUsPageData | null | undefined) => {
        if (d) setForm(d);
      })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateContactUsPageData(form);
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
        <h1 className="text-3xl font-bold mb-2">صفحه تماس با ما</h1>
        <p className="text-muted-foreground">
          متن اصلی و زیرمتن صفحه تماس با ما
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>محتوا</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>پاراگراف اصلی</Label>
              <textarea
                className={textareaClass}
                value={form.mainParagraph}
                onChange={(e) =>
                  setForm((p) => ({ ...p, mainParagraph: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>پاراگراف فرعی</Label>
              <textarea
                className={textareaClass}
                value={form.subParagraph}
                onChange={(e) =>
                  setForm((p) => ({ ...p, subParagraph: e.target.value }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>پیش‌نمایش ثبت‌شده</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">پاراگراف اصلی:</p>
              <p className="whitespace-pre-wrap">{form.mainParagraph || "—"}</p>
              <p className="text-muted-foreground mt-4">پاراگراف فرعی:</p>
              <p className="whitespace-pre-wrap">{form.subParagraph || "—"}</p>
            </div>
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
