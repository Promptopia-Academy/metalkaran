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
    const raw = await res.json();
    let items = Array.isArray(raw) ? raw : raw?.data ?? [];
    if (params?.search && items.length > 0) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (a: { title?: string; introduction?: string }) =>
          a.title?.toLowerCase().includes(q) ||
          a.introduction?.toLowerCase().includes(q),
      );
    }
    const pagination = raw?.pagination;
    const total = pagination?.total ?? items.length;
    const page = params?.page || pagination?.page || 1;
    const limit = params?.limit ?? pagination?.limit ?? 10;
    const totalPages = (pagination?.totalPages ?? Math.ceil(total / limit)) || 1;
    const start = pagination ? 0 : (page - 1) * limit;
    const paginated = pagination ? items : items.slice(start, start + limit);
    return {
      success: true,
      data: toCamelCase<IArticle[]>(paginated),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  } catch (err) {
    return { success: false, data: [], pagination: null };
  }
}

/** ورودی ایجاد مقاله — applicationIds و applicationTitle اختیاری */
export type CreateArticleInput = Record<string, string | number[] | undefined> & {
  applicationIds?: number[];
  applicationTitle?: string;
};

export async function createArticle(
  data: CreateArticleInput,
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
      applicationTitle: data.applicationTitle || undefined,
      applicationIds: data.applicationIds ?? undefined,
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

/** برای ادمین: یک مقاله با id (با auth) — شامل sources، application، applicationIds */
export async function getArticleById(id: number): Promise<(IArticle & {
  sources?: { id: number; articleId: number; title: string; url: string }[];
  application?: { id: number; slug: string; faTitle: string; description: string }[];
  applicationIds?: number[];
}) | null> {
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
    return toCamelCase(data) as IArticle & {
      sources?: { id: number; articleId: number; title: string; url: string }[];
      application?: { id: number; slug: string; faTitle: string; description: string }[];
      applicationIds?: number[];
    };
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
    const raw = await res.json();
    const data = Array.isArray(raw) ? raw : raw?.data ?? [];
    const items = Array.isArray(data) ? data : [];
    const pagination = raw?.pagination;
    const total = pagination?.total ?? items.length;
    const page = params?.page || pagination?.page || 1;
    const limit = params?.limit ?? pagination?.limit ?? 100;
    const totalPages = (pagination?.totalPages ?? Math.ceil(total / limit)) || 1;
    const start = pagination ? 0 : (page - 1) * limit;
    const paginated = pagination ? items : items.slice(start, start + limit);
    return {
      success: true,
      data: toCamelCase<IArticle[]>(paginated),
      pagination: {
        page,
        limit,
        total,
        totalPages,
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

/** ورودی ویرایش مقاله — applicationIds و applicationTitle اختیاری */
export type UpdateArticleInput = Record<string, string | number[] | undefined> & {
  applicationIds?: number[];
  applicationTitle?: string;
};

export async function updateArticle(
  id: number,
  data: UpdateArticleInput,
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
      applicationIds: data.applicationIds ?? undefined,
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
