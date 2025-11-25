"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { api } from "@/lib/api";
import { IArticle } from "@/types/type";
import Link from "next/link";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const savedApiKey = localStorage.getItem("admin_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [page, search, apiKey]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await api.getArticles({
        page,
        limit: 10,
        search: search || undefined,
      });

      if (response.success) {
        setArticles(response.data || []);
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages);
        }
      }
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!apiKey) {
      alert("لطفاً ابتدا API Key را در تنظیمات وارد کنید");
      return;
    }

    if (!confirm("آیا از حذف این مقاله مطمئن هستید؟")) {
      return;
    }

    try {
      await api.deleteArticle(id, apiKey);
      loadArticles();
      alert("مقاله با موفقیت حذف شد");
    } catch (error: any) {
      alert(`خطا در حذف مقاله: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">مدیریت مقالات</h1>
          <p className="text-muted-foreground">افزودن، ویرایش و حذف مقالات</p>
        </div>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            مقاله جدید
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="جستجو در مقالات..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pr-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12">در حال بارگذاری...</div>
      ) : articles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            مقاله‌ای یافت نشد
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="mb-2">{article.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.introduction}
                    </p>
                  </div>
                  <div className="flex gap-2 mr-4">
                    <Link href={`/admin/articles/${article.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ArrowRight className="w-4 h-4" />
            قبلی
          </Button>
          <span className="text-sm text-muted-foreground">
            صفحه {page} از {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            بعدی
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
