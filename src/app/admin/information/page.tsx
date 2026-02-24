"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/dev/getData";
import type { ICompanyInformation, ICompanySocialLink } from "@/types/type";
import { Plus, Edit, Trash2, ArrowRight } from "lucide-react";

export default function AdminInformationPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [info, setInfo] = useState<ICompanyInformation>({
    phoneNumber: "",
    emailAddress: "",
    companyAddress: "",
    socialLinks: [],
  });
  const [editingLinkId, setEditingLinkId] = useState<number | null>(null);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [showNewLink, setShowNewLink] = useState(false);

  useEffect(() => {
    api
      .getCompanyInfo()
      .then((d) => {
        if (d) setInfo(d);
      })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateCompanyInfo({
        phoneNumber: info.phoneNumber,
        emailAddress: info.emailAddress,
        companyAddress: info.companyAddress,
      });
      alert("ذخیره شد");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "خطا در ذخیره");
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = async () => {
    if (!newLink.title.trim() || !newLink.url.trim()) return;
    setLoading(true);
    try {
      const created = await api.createCompanySocialLink(newLink);
      setInfo((p) => ({
        ...p,
        socialLinks: [...(p.socialLinks || []), created],
      }));
      setNewLink({ title: "", url: "" });
      setShowNewLink(false);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "خطا در افزودن");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLink = async (id: number, title: string, url: string) => {
    setLoading(true);
    try {
      await api.updateCompanySocialLink(id, { title, url });
      setInfo((p) => ({
        ...p,
        socialLinks: (p.socialLinks || []).map((l) =>
          l.id === id ? { ...l, title, url } : l,
        ),
      }));
      setEditingLinkId(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "خطا در ویرایش");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (id: number) => {
    if (!confirm("حذف این لینک؟")) return;
    setLoading(true);
    try {
      await api.deleteCompanySocialLink(id);
      setInfo((p) => ({
        ...p,
        socialLinks: (p.socialLinks || []).filter((l) => l.id !== id),
      }));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "خطا در حذف");
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
        <h1 className="text-3xl font-bold mb-2">اطلاعات شرکت</h1>
        <p className="text-muted-foreground">
          تلفن، ایمیل، آدرس و لینک‌های شبکه‌های اجتماعی
        </p>
      </div>

      <form onSubmit={handleSaveInfo}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>اطلاعات تماس</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>شماره تلفن</Label>
              <Input
                value={info.phoneNumber}
                onChange={(e) =>
                  setInfo((p) => ({ ...p, phoneNumber: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>ایمیل</Label>
              <Input
                type="email"
                value={info.emailAddress}
                onChange={(e) =>
                  setInfo((p) => ({ ...p, emailAddress: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>آدرس شرکت</Label>
              <Input
                value={info.companyAddress}
                onChange={(e) =>
                  setInfo((p) => ({ ...p, companyAddress: e.target.value }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>لینک‌های شبکه اجتماعی</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowNewLink(true)}
            >
              <Plus className="w-4 h-4 ml-2" />
              افزودن لینک
            </Button>
          </CardHeader>
          <CardContent>
            {showNewLink && (
              <div className="flex flex-wrap gap-2 mb-4 p-3 border rounded-lg">
                <Input
                  placeholder="عنوان (مثلاً اینستاگرام)"
                  value={newLink.title}
                  onChange={(e) =>
                    setNewLink((p) => ({ ...p, title: e.target.value }))
                  }
                  className="max-w-[180px]"
                />
                <Input
                  placeholder="آدرس URL"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink((p) => ({ ...p, url: e.target.value }))
                  }
                  className="max-w-[240px]"
                />
                <Button type="button" size="sm" onClick={handleAddLink}>
                  ذخیره
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowNewLink(false);
                    setNewLink({ title: "", url: "" });
                  }}
                >
                  انصراف
                </Button>
              </div>
            )}
            {(!info.socialLinks || info.socialLinks.length === 0) && !showNewLink ? (
              <p className="text-muted-foreground text-sm">
                لینکی ثبت نشده. با دکمه بالا اضافه کنید.
              </p>
            ) : (
              <div className="space-y-2">
                {(info.socialLinks || []).map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between gap-4 p-3 border rounded-lg"
                  >
                    {editingLinkId === link.id ? (
                      <EditLinkRow
                        title={link.title}
                        url={link.url}
                        onSave={(title, url) =>
                          handleUpdateLink(link.id, title, url)
                        }
                        onCancel={() => setEditingLinkId(null)}
                      />
                    ) : (
                      <>
                        <span className="font-medium">{link.title}</span>
                        <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {link.url}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingLinkId(link.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteLink(link.id)}
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

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "در حال ذخیره..." : "ذخیره اطلاعات تماس"}
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

function EditLinkRow({
  title,
  url,
  onSave,
  onCancel,
}: {
  title: string;
  url: string;
  onSave: (title: string, url: string) => void;
  onCancel: () => void;
}) {
  const [t, setT] = useState(title);
  const [u, setU] = useState(url);
  return (
    <div className="flex flex-wrap gap-2 flex-1">
      <Input
        value={t}
        onChange={(e) => setT(e.target.value)}
        placeholder="عنوان"
        className="max-w-[180px]"
      />
      <Input
        value={u}
        onChange={(e) => setU(e.target.value)}
        placeholder="URL"
        className="max-w-[240px]"
      />
      <Button type="button" size="sm" onClick={() => onSave(t, u)}>
        ذخیره
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={onCancel}>
        انصراف
      </Button>
    </div>
  );
}
