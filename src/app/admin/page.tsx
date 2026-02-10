"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Box, MessageSquare, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    articles: 0,
    elements: 0,
    contacts: 0,
    health: "unknown" as "healthy" | "degraded" | "unhealthy" | "unknown",
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const articlesRes = await api.getArticles({ limit: 1 });
        const articlesCount = articlesRes.data?.length || 0;
        if (articlesRes.pagination) {
          setStats((prev) => ({
            ...prev,
            articles: articlesRes.pagination.total,
          }));
        } else {
          const allArticles = await api.getArticles();
          setStats((prev) => ({
            ...prev,
            articles: allArticles.data?.length || 0,
          }));
        }

        const elementsRes = await api.getElements({ limit: 1 });
        if (elementsRes.pagination) {
          setStats((prev) => ({
            ...prev,
            elements: elementsRes.pagination.total,
          }));
        } else {
          const allElements = await api.getElements();
          setStats((prev) => ({
            ...prev,
            elements: allElements.data?.length || 0,
          }));
        }

        try {
          const { status } = await api.healthCheck();
          setStats((prev) => ({ ...prev, health: status }));
        } catch {
          setStats((prev) => ({ ...prev, health: "unhealthy" }));
        }
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">داشبورد مدیریت</h1>
        <p className="text-muted-foreground">
          خوش آمدید به پنل مدیریت Metalkaran
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">مقالات</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.articles}</div>
            <p className="text-xs text-muted-foreground">تعداد کل مقالات</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">المنت‌ها</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.elements}</div>
            <p className="text-xs text-muted-foreground">تعداد کل المنت‌ها</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">پیام‌های تماس</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contacts}</div>
            <p className="text-xs text-muted-foreground">
              تعداد پیام‌های دریافتی
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">وضعیت سیستم</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {stats.health === "healthy" && "سالم"}
              {stats.health === "degraded" && "تضعیف شده"}
              {stats.health === "unhealthy" && "نا‌سالم"}
              {stats.health === "unknown" && "نامشخص"}
            </div>
            <p className="text-xs text-muted-foreground">وضعیت سرور</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>دسترسی سریع</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/articles"
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <FileText className="h-6 w-6 mb-2" />
              <h3 className="font-semibold">مدیریت مقالات</h3>
              <p className="text-sm text-muted-foreground">
                افزودن، ویرایش و حذف مقالات
              </p>
            </a>
            <a
              href="/admin/elements"
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <Box className="h-6 w-6 mb-2" />
              <h3 className="font-semibold">مدیریت المنت‌ها</h3>
              <p className="text-sm text-muted-foreground">
                افزودن، ویرایش و حذف المنت‌ها
              </p>
            </a>
            <a
              href="/admin/contacts"
              className="p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <MessageSquare className="h-6 w-6 mb-2" />
              <h3 className="font-semibold">پیام‌های تماس</h3>
              <p className="text-sm text-muted-foreground">
                مشاهده و مدیریت پیام‌ها
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
