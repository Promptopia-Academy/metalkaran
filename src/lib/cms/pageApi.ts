import type {
  IAboutUsPageData,
  ICompanyInformation,
  ICompanySocialLink,
  IContactUsPageData,
  IQuestion,
  IWebsiteContent,
} from "@/types/type";
import { apiUrl, authHeaders, toCamelCase } from "@/utils/apiHelper";
import { handleUnauthorized } from "@/utils/apiHelper";
import * as articleApi from "./articleApi";
import * as categoryApi from "./categoryApi";
import * as productsApi from "./producstsApi";
import { login } from "./authApi";
import { uploadImage } from "./uploadImageApi";

export const AUTH_STORAGE_KEY = "admin_api_key";

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

export async function healthCheck() {
  try {
    const res = await fetch(apiUrl("/"));
    return { status: res.ok ? 200 : res.status };
  } catch {
    return { status: 0 };
  }
}

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

/** محتوای عمومی سایت (هیرو، دربارهٔ اصلی، تماس، شرکت و...) — بدون auth */
export async function getSiteWebsiteContent(): Promise<IWebsiteContent | null> {
  try {
    const res = await fetch(apiUrl("/api/site/website-content"));
    if (!res.ok) return null;
    const data = await res.json();
    return toCamelCase(data) as IWebsiteContent;
  } catch {
    return null;
  }
}

/** سوالات متداول برای نمایش در سایت — بدون auth */
export async function getSiteQuestions(): Promise<IQuestion[]> {
  try {
    const res = await fetch(apiUrl("/api/site/questions"));
    if (!res.ok) return [];
    const data = await res.json();
    const arr = Array.isArray(data) ? data : data?.data ?? [];
    return toCamelCase(arr) as IQuestion[];
  } catch {
    return [];
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

/** یک رکورد home_page_about (بک‌اند فقط اولین رکورد را برمی‌گرداند) */
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
    return data ? toCamelCase(data) : null;
  } catch {
    return null;
  }
}

/** یک رکورد contact_us_page_data (بک‌اند ممکن است آرایه یا تک رکورد برگرداند) */
export async function getContactUsPageData(): Promise<IContactUsPageData | null> {
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
    const raw = Array.isArray(data) ? data[0] : data;
    return raw ? (toCamelCase(raw) as IContactUsPageData) : null;
  } catch {
    return null;
  }
}

export async function updateContactUsPageData(data: IContactUsPageData) {
  const res = await fetch(apiUrl("/api/cms/contact-us-page"), {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ذخیره");
  }
}

/** داده درباره ما: whyUs، aboutUsCards، aboutUsDescription */
export async function getAboutUsPageData(): Promise<IAboutUsPageData | null> {
  try {
    const res = await fetch(apiUrl("/api/cms/about-us-page"), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      return null;
    }
    if (!res.ok) return null;
    const data = await res.json();
    return data ? (toCamelCase(data) as IAboutUsPageData) : null;
  } catch {
    return null;
  }
}

export async function updateAboutUsPageData(data: IAboutUsPageData) {
  const res = await fetch(apiUrl("/api/cms/about-us-page"), {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ذخیره");
  }
}

export async function getWebsiteContent(): Promise<IWebsiteContent | null> {
  try {
    const res = await fetch(apiUrl("/api/cms/website-content"), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      return null;
    }
    if (!res.ok) return null;
    const data = await res.json();
    return toCamelCase(data) as IWebsiteContent;
  } catch {
    return null;
  }
}

export async function updateWebsiteContent(data: Partial<IWebsiteContent>) {
  const res = await fetch(apiUrl("/api/cms/website-content"), {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ذخیره");
  }
}

/** اطلاعات شرکت + لینک‌های شبکه اجتماعی (company-information یک رکورد برمی‌گرداند) */
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
    const infoRaw = infoRes.ok ? await infoRes.json() : null;
    const first = Array.isArray(infoRaw) ? infoRaw[0] : infoRaw;
    if (!first) return null;

    const base = toCamelCase<Omit<ICompanyInformation, "socialLinks">>(first);
    const socialLinks = toCamelCase<ICompanySocialLink[]>(social);
    return { ...base, socialLinks };
  } catch {
    return null;
  }
}

export async function updateCompanyInfo(data: {
  phoneNumber: string;
  emailAddress: string;
  companyAddress?: string | null;
}) {
  const res = await fetch(apiUrl("/api/cms/company-information"), {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ذخیره");
  }
}

export async function createCompanySocialLink(data: {
  title: string;
  url: string;
}): Promise<ICompanySocialLink> {
  const res = await fetch(apiUrl("/api/cms/company-social-links"), {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ایجاد");
  }
  const json = await res.json();
  return toCamelCase(json) as ICompanySocialLink;
}

export async function updateCompanySocialLink(
  id: number,
  data: { title: string; url: string },
) {
  const res = await fetch(apiUrl(`/api/cms/company-social-links/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ویرایش");
  }
}

export async function deleteCompanySocialLink(id: number) {
  const res = await fetch(apiUrl(`/api/cms/company-social-links/${id}`), {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در حذف");
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

export type ContactFormItem = {
  id: number;
  name: string;
  phone: string;
  email: string;
  company: string;
  createdAt?: string;
};

export async function getContactFormData(): Promise<ContactFormItem[]> {
  try {
    const res = await fetch(apiUrl("/api/cms/contact-form-data"), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      return [];
    }
    if (!res.ok) throw new Error("خطا در دریافت پیام‌ها");
    const data = await res.json();
    const arr = Array.isArray(data) ? data : [];
    return toCamelCase(arr) as ContactFormItem[];
  } catch {
    return [];
  }
}

export const api = {
  submitContact,
  getCmsUsages,
  healthCheck,
  getSiteAboutUs,
  getSiteCategories,
  getSiteWebsiteContent,
  getSiteQuestions,
  getHeroSections,
  getHomePageAbout,
  getContactUsPageData,
  updateContactUsPageData,
  getCompanyInfo,
  updateCompanyInfo,
  createCompanySocialLink,
  updateCompanySocialLink,
  deleteCompanySocialLink,
  getAboutUsPageData,
  updateAboutUsPageData,
  getWebsiteContent,
  updateWebsiteContent,
  getQuestions,
  getContactFormData,
  // ادمین - مقالات
  getArticles: articleApi.getArticles,
  getArticleById: articleApi.getArticleById,
  createArticle: articleApi.createArticle,
  updateArticle: articleApi.updateArticle,
  deleteArticle: articleApi.deleteArticle,
  // ادمین - دسته‌بندی
  getCmsCategories: categoryApi.getCategories,
  getCategoryById: categoryApi.getCategoryById,
  createCategory: categoryApi.createCategory,
  updateCategory: categoryApi.updateCategory,
  deleteCategory: categoryApi.deleteCategory,
  // ادمین - محصولات
  getProducts: productsApi.getProducts,
  getElements: productsApi.getProducts,
  getProductById: productsApi.getProductById,
  getProductFullForAdmin: productsApi.getProductFullForAdmin,
  deleteProduct: productsApi.deleteProduct,
  deleteElement: productsApi.deleteProduct,
  createProductFull: productsApi.createProduct,
  updateProduct: productsApi.updateProduct,
  // ادمین - آپلود و احراز هویت
  uploadImage,
  login,
};
