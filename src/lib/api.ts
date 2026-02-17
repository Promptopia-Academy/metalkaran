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

/**
 * آدرس پایهٔ سروری که فایل‌های آپلود (/uploads) را سرو می‌کند.
 * اول NEXT_PUBLIC_UPLOADS_URL، بعد NEXT_PUBLIC_API_URL، وگرنه خالی (همان origin).
 */
function getUploadsBaseUrl(): string {
  const uploadsUrl = process.env.NEXT_PUBLIC_UPLOADS_URL;
  if (uploadsUrl) return uploadsUrl.replace(/\/$/, "");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) return apiUrl.replace(/\/$/, "");
  return "";
}

/**
 * برای نمایش عکس‌های آپلودشده از بک‌اند.
 * در Production حتماً NEXT_PUBLIC_API_URL یا NEXT_PUBLIC_UPLOADS_URL را به آدرس بک‌اند (همان سروری که /uploads را سرو می‌کند) بذار، وگرنه عکس‌ها ۴۰۰ می‌خورن.
 */
export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = getUploadsBaseUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}

const apiUrl = (path: string) => {
  const base = getBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${p}` : p;
};

/** کلید ذخیره توکن JWT ادمین در localStorage (مطابق بک‌اند) */
export const AUTH_STORAGE_KEY = "admin_api_key";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_STORAGE_KEY);
}

/** در صورت 401 توکن را پاک کرده و به صفحه لاگین هدایت می‌کند */
export function handleUnauthorized(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
  window.location.href = "/admin/login";
}

/** هدرهای احراز هویت برای درخواست‌های CMS/آپلود */
function authHeaders(): Record<string, string> {
  const token = getStoredToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

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

// آپلود تصویر - برگرداندن path برای ذخیره در دیتابیس
export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(apiUrl("/api/upload-image"), {
    method: "POST",
    headers: authHeaders(),
    body: form,
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در آپلود تصویر");
  }
  const json = (await res.json()) as { path: string };
  return json.path;
}

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

export async function getArticleById(id: number): Promise<IArticle | null> {
  try {
    const res = await fetch(apiUrl(`/api/cms/articles/${id}`));
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("خطا در دریافت مقاله");
    const data = await res.json();
    return toCamelCase(data) as IArticle;
  } catch {
    return null;
  }
}

// ============ ادمین - المنت‌ها (محصولات) ============
export async function getProducts(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{
  success: boolean;
  data: IProduct[];
  pagination: Pagination | null;
}> {
  try {
    const res = await fetch(apiUrl("/api/cms/products-full"), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      throw new Error("توکن نامعتبر است");
    }
    if (!res.ok) throw new Error("خطا در دریافت المنت‌ها");
    const data = await res.json();
    let items = Array.isArray(data) ? data : [];
    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (p: { title?: string; introduction?: string }) =>
          p.title?.toLowerCase().includes(q) ||
          p.introduction?.toLowerCase().includes(q),
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

export async function deleteProduct(id: number, token?: string) {
  const headers: Record<string, string> = { ...authHeaders() };
  const t = token ?? getStoredToken();
  if (t) headers["Authorization"] = `Bearer ${t}`;

  const res = await fetch(apiUrl(`/api/cms/products-full/${id}`), {
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

// دسته‌بندی‌ها
export async function createCategory(
  data: {
    slug: string;
    title: string;
    image?: string | null;
  },
  token?: string,
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...authHeaders(),
  };
  const t = token ?? getStoredToken();
  if (t) headers["Authorization"] = `Bearer ${t}`;

  const res = await fetch(apiUrl("/api/cms/categories"), {
    method: "POST",
    headers,
    body: JSON.stringify({
      slug: data.slug,
      title: data.title,
      image: data.image ?? undefined,
    }),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { error?: string }).error || "خطا در ایجاد دسته‌بندی",
    );
  }
  return res.json();
}

// دسته‌بندی‌ها و کاربردها برای فرم محصول
export async function getCmsCategories() {
  try {
    const res = await fetch(apiUrl("/api/cms/categories"), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      throw new Error("توکن نامعتبر است");
    }
    if (!res.ok) throw new Error("خطا در دریافت دسته‌بندی‌ها");
    const data = await res.json();
    return toCamelCase(data) as {
      id: number;
      slug: string;
      title: string;
      image?: string;
    }[];
  } catch {
    return [];
  }
}

export async function getCmsUsages() {
  try {
    const res = await fetch(apiUrl("/api/cms/usages"), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      throw new Error("توکن نامعتبر است");
    }
    if (!res.ok) throw new Error("خطا در دریافت کاربردها");
    const data = await res.json();
    return toCamelCase(data) as { id: string; title: string; image: string }[];
  } catch {
    return [];
  }
}

export type CreateProductFullInput = {
  image?: File | null;
  title: string;
  slug: string;
  categoryId?: number | null;
  introduction: string;
  description: string;
  standards?: string;
  thermalExpansion?: string;
  corrosionResistance?: string;
  heatResistance?: string;
  manufacturing?: string;
  hotForming?: string;
  coldForming?: string;
  welding?: string;
  machining?: string;
  usageIds?: string[];
};

export async function createProductFull(
  data: CreateProductFullInput,
  token?: string,
) {
  const form = new FormData();
  form.append("title", data.title);
  form.append("slug", data.slug);
  form.append("introduction", data.introduction);
  form.append("description", data.description);
  if (data.categoryId != null)
    form.append("categoryId", String(data.categoryId));
  if (data.standards) form.append("standards", data.standards);
  if (data.thermalExpansion)
    form.append("thermalExpansion", data.thermalExpansion);
  if (data.corrosionResistance)
    form.append("corrosionResistance", data.corrosionResistance);
  if (data.heatResistance) form.append("heatResistance", data.heatResistance);
  if (data.manufacturing) form.append("manufacturing", data.manufacturing);
  if (data.hotForming) form.append("hotForming", data.hotForming);
  if (data.coldForming) form.append("coldForming", data.coldForming);
  if (data.welding) form.append("welding", data.welding);
  if (data.machining) form.append("machining", data.machining);
  if (data.usageIds?.length) form.append("usageIds", data.usageIds.join(","));
  if (data.image) form.append("image", data.image);

  const headers: Record<string, string> = { ...authHeaders() };
  const t = token ?? getStoredToken();
  if (t) headers["Authorization"] = `Bearer ${t}`;

  const res = await fetch(apiUrl("/api/cms/products-full"), {
    method: "POST",
    headers,
    body: form,
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ایجاد محصول");
  }
  return res.json();
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

export async function getSiteProducts(): Promise<IProduct[] | null> {
  try {
    const res = await fetch(apiUrl("/api/site/products"));
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    return toCamelCase(data);
  } catch {
    return null;
  }
}

/** گرفتن یک محصول بر اساس id (برای صفحه جزئیات محصول) */
export async function getSiteProductById(id: number): Promise<IProduct | null> {
  try {
    const res = await fetch(apiUrl(`/api/site/products/${id}`));
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("خطا در دریافت محصول");
    const data = await res.json();
    return toCamelCase(data) as IProduct;
  } catch {
    return null;
  }
}

export async function getHeroSections() {
  try {
    const res = await fetch(apiUrl("/api/cms/hero-sections"), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      throw new Error("توکن نامعتبر است");
    }
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    return toCamelCase(data);
  } catch {
    return null;
  }
}

export async function getHomePageAbout() {
  try {
    const res = await fetch(apiUrl("/api/cms/home-page-about"), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      throw new Error("توکن نامعتبر است");
    }
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
    const res = await fetch(apiUrl("/api/cms/contact-us-page"), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      throw new Error("توکن نامعتبر است");
    }
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
    const h = authHeaders();
    const socialRes = await fetch(apiUrl("/api/cms/company-social-links"), {
      headers: h,
    });
    const infoRes = await fetch(apiUrl("/api/cms/company-information"), {
      headers: h,
    });
    if (socialRes.status === 401 || infoRes.status === 401) {
      handleUnauthorized();
      return null;
    }
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
    const res = await fetch(apiUrl("/api/cms/questions"), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      throw new Error("توکن نامعتبر است");
    }
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
  getArticleById,
  createArticle,
  deleteArticle,
  getProducts,
  /** همان getProducts؛ برای سازگاری با صفحات ادمین (المنت‌ها) */
  getElements: getProducts,
  deleteProduct,
  /** همان deleteProduct؛ برای سازگاری با صفحات ادمین */
  deleteElement: deleteProduct,
  getCmsCategories,
  getCmsUsages,
  uploadImage,
  createCategory,
  createProductFull,
  healthCheck,
  getSiteAboutUs,
  getSiteCategories,
  getSiteProducts,
  getSiteProductById,
  getHeroSections,
  getHomePageAbout,
  getContactUsPageData,
  getCompanyInfo,
  getQuestions,
  login,
};
