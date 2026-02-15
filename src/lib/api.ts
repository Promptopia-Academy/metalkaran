/**
 * API Client - اتصال فرانت‌اند به بک‌اند
 * برای Deploy: NEXT_PUBLIC_API_URL خالی بذار (همان origin) وقتی Nginx /api رو پروکسی می‌کنه
 * برای Dev: NEXT_PUBLIC_API_URL=http://localhost:3001 وقتی بکند روی پورت 3001 اجراست
 */

import type {
  IArticle,
  ICompanyInformation,
  ICompanySocialLink,
  IProduct,
} from "@/types/type";

const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (url) return url.replace(/\/$/, "");
  if (typeof window !== "undefined") return "";
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
};

const apiUrl = (path: string) => {
  const base = getBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${p}` : p;
};

// تبدیل snake_case به camelCase برای سازگاری با تایپ‌های فرانت
function toCamelCase<T>(obj: unknown): T {
  if (obj === null || obj === undefined) return obj as T;
  if (Array.isArray(obj)) return obj.map((item) => toCamelCase(item)) as T;
  if (typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelKey = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      result[camelKey] = toCamelCase(value);
    }
    return result as T;
  }
  return obj as T;
}

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

// ============ تماس با ما (فرم تماس) ============
export async function submitContact(data: {
  name: string;
  phone: string;
  email: string;
  company: string;
}): Promise<{ success: boolean; message?: string; status?: number }> {
  try {
    const res = await fetch(apiUrl("/api/cms/contact-form-data"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok) {
      return { success: true, message: json.message || "ارسال شد" };
    }
    return {
      success: false,
      message: json.error || "خطا در ارسال",
      status: res.status,
    };
  } catch (err) {
    return { success: false, message: "خطا در اتصال به سرور" };
  }
}

// ============ ادمین - مقالات ============
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
    const res = await fetch(apiUrl("/api/cms/articles"));
    if (!res.ok) throw new Error("خطا در دریافت مقالات");
    const data = await res.json();
    let items = Array.isArray(data) ? data : [];
    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (a: { title?: string; introduction?: string }) =>
          a.title?.toLowerCase().includes(q) ||
          a.introduction?.toLowerCase().includes(q)
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
  token?: string
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

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
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "خطا در ایجاد مقاله");
  }
}

export async function deleteArticle(id: number, token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(apiUrl(`/api/cms/articles/${id}`), {
    method: "DELETE",
    headers,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "خطا در حذف");
  }
}

// ============ ادمین - المنت‌ها (محصولات) ============
export async function getElements(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{
  success: boolean;
  data: IProduct[];
  pagination: Pagination | null;
}> {
  try {
    const res = await fetch(apiUrl("/api/cms/products-full"));
    if (!res.ok) throw new Error("خطا در دریافت المنت‌ها");
    const data = await res.json();
    let items = Array.isArray(data) ? data : [];
    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (p: { title?: string; introduction?: string }) =>
          p.title?.toLowerCase().includes(q) ||
          p.introduction?.toLowerCase().includes(q)
      );
    }
    const total = items.length;
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const paginated = items.slice(start, start + limit);
    return {
      success: true,
      data: toCamelCase<IProduct[]>(paginated),
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

export async function deleteElement(id: number, token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(apiUrl(`/api/cms/products-full/${id}`), {
    method: "DELETE",
    headers,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "خطا در حذف");
  }
}

// ============ Health Check ============
export async function healthCheck() {
  try {
    const res = await fetch(apiUrl("/"));
    return { status: res.ok ? 200 : res.status };
  } catch {
    return { status: 0 };
  }
}

// ============ API سایت (داده برای صفحات عمومی) ============
export async function getSiteAboutUs() {
  try {
    const res = await fetch(apiUrl("/api/site/about-us"));
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    return toCamelCase(data);
  } catch {
    return null;
  }
}

export async function getSiteCategories() {
  try {
    const res = await fetch(apiUrl("/api/site/categories"));
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    return toCamelCase(data);
  } catch {
    return null;
  }
}

export async function getSiteProducts() {
  try {
    const res = await fetch(apiUrl("/api/site/products"));
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    return toCamelCase(data);
  } catch {
    return null;
  }
}

export async function getHeroSections() {
  try {
    const res = await fetch(apiUrl("/api/cms/hero-sections"));
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    return toCamelCase(data);
  } catch {
    return null;
  }
}

export async function getHomePageAbout() {
  try {
    const res = await fetch(apiUrl("/api/cms/home-page-about"));
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    const arr = Array.isArray(data) ? data : [];
    return arr[0] ? toCamelCase(arr[0]) : null;
  } catch {
    return null;
  }
}

export async function getContactUsPageData() {
  try {
    const res = await fetch(apiUrl("/api/cms/contact-us-page"));
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    const arr = Array.isArray(data) ? data : [];
    return arr[0] ? toCamelCase(arr[0]) : null;
  } catch {
    return null;
  }
}

export async function getCompanyInfo(): Promise<ICompanyInformation | null> {
  try {
    const socialRes = await fetch(apiUrl("/api/cms/company-social-links"));
    const infoRes = await fetch(apiUrl("/api/cms/company-information"));
    const social = socialRes.ok ? await socialRes.json() : [];
    const info = infoRes.ok ? await infoRes.json() : [];
    const first = Array.isArray(info) ? info[0] : null;
    if (!first) return null;

    const base = toCamelCase<Omit<ICompanyInformation, "socialLinks">>(first);
    const socialLinks = toCamelCase<ICompanySocialLink[]>(social);
    return { ...base, socialLinks };
  } catch {
    return null;
  }
}

export async function getQuestions() {
  try {
    const res = await fetch(apiUrl("/api/cms/questions"));
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    return toCamelCase(data);
  } catch {
    return null;
  }
}

// Auth
export async function login(username: string, password: string) {
  const res = await fetch(apiUrl("/api/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "خطا در ورود");
  return data;
}

export const api = {
  submitContact,
  getArticles,
  createArticle,
  deleteArticle,
  getElements,
  deleteElement,
  healthCheck,
  getSiteAboutUs,
  getSiteCategories,
  getSiteProducts,
  getHeroSections,
  getHomePageAbout,
  getContactUsPageData,
  getCompanyInfo,
  getQuestions,
  login,
};
