import { IArticle, Pagination } from "@/types/type";
import {
  apiUrl,
  authHeaders,
  getStoredToken,
  toCamelCase,
} from "@/utils/apiHelper";
import { handleUnauthorized } from "@/utils/apiHelper";

export async function getArticles(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{
  success: boolean;
  data: IArticle[];
  pagination: Pagination | null;
}> {
  try {
    const res = await fetch(apiUrl("/api/cms/articles"), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      return { success: false, data: [], pagination: null };
    }
    if (!res.ok) throw new Error("خطا در دریافت مقالات");
    const data = await res.json();
    let items = Array.isArray(data) ? data : [];
    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (a: { title?: string; introduction?: string }) =>
          a.title?.toLowerCase().includes(q) ||
          a.introduction?.toLowerCase().includes(q),
      );
    }
    const total = items.length;
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const paginated = items.slice(start, start + limit);
    return {
      success: true,
      data: toCamelCase<IArticle[]>(paginated),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  } catch (err) {
    return { success: false, data: [], pagination: null };
  }
}

export async function createArticle(
  data: Record<string, string>,
  token?: string,
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...authHeaders(),
  };
  const t = token ?? getStoredToken();
  if (t) headers["Authorization"] = `Bearer ${t}`;

  const res = await fetch(apiUrl("/api/cms/articles"), {
    method: "POST",
    headers,
    body: JSON.stringify({
      title: data.title,
      image: data.image || undefined,
      introduction: data.introduction,
      title1: data.title1,
      content1: data.content1,
      title2: data.title2 || undefined,
      content2: data.content2 || undefined,
      title3: data.title3 || undefined,
      content3: data.content3 || undefined,
      title4: data.title4 || undefined,
      content4: data.content4 || undefined,
      title5: data.title5 || undefined,
      content5: data.content5 || undefined,
    }),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "خطا در ایجاد مقاله");
  }
}

export async function deleteArticle(id: number, token?: string) {
  const headers: Record<string, string> = { ...authHeaders() };
  const t = token ?? getStoredToken();
  if (t) headers["Authorization"] = `Bearer ${t}`;

  const res = await fetch(apiUrl(`/api/cms/articles/${id}`), {
    method: "DELETE",
    headers,
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "خطا در حذف");
  }
}

/** برای ادمین: یک مقاله با id (با auth) */
export async function getArticleById(id: number): Promise<IArticle | null> {
  try {
    const res = await fetch(apiUrl(`/api/cms/articles/${id}`), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      return null;
    }
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("خطا در دریافت مقاله");
    const data = await res.json();
    return toCamelCase(data) as IArticle;
  } catch {
    return null;
  }
}

/** برای سایت: لیست مقالات (بدون auth) */
export async function getArticlesForSite(params?: {
  page?: number;
  limit?: number;
}): Promise<{
  success: boolean;
  data: IArticle[];
  pagination: Pagination | null;
}> {
  try {
    const res = await fetch(apiUrl("/api/site/articles"));
    if (!res.ok) throw new Error("خطا در دریافت مقالات");
    const data = await res.json();
    const items = Array.isArray(data) ? data : data?.data ?? [];
    const total = items.length;
    const page = params?.page || 1;
    const limit = params?.limit ?? 100;
    const start = (page - 1) * limit;
    const paginated = items.slice(start, start + limit);
    return {
      success: true,
      data: toCamelCase<IArticle[]>(paginated),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  } catch {
    return { success: false, data: [], pagination: null };
  }
}

/** برای سایت: یک مقاله با id (بدون auth) */
export async function getArticleByIdForSite(id: number): Promise<IArticle | null> {
  try {
    const res = await fetch(apiUrl(`/api/site/articles/${id}`));
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("خطا در دریافت مقاله");
    const data = await res.json();
    return toCamelCase(data) as IArticle;
  } catch {
    return null;
  }
}

export async function updateArticle(
  id: number,
  data: Record<string, string>,
  token?: string,
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...authHeaders(),
  };
  const t = token ?? getStoredToken();
  if (t) headers["Authorization"] = `Bearer ${t}`;

  const res = await fetch(apiUrl(`/api/cms/articles/${id}`), {
    method: "PUT",
    headers,
    body: JSON.stringify({
      title: data.title,
      image: data.image || undefined,
      introduction: data.introduction,
      title1: data.title1,
      content1: data.content1,
      title2: data.title2 || undefined,
      content2: data.content2 || undefined,
      title3: data.title3 || undefined,
      content3: data.content3 || undefined,
      title4: data.title4 || undefined,
      content4: data.content4 || undefined,
      title5: data.title5 || undefined,
      content5: data.content5 || undefined,
      applicationTitle: data.applicationTitle || undefined,
    }),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "خطا در ویرایش مقاله");
  }
}
