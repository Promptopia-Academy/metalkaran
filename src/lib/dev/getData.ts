import { Pagination } from "@/types/type";
import { IProduct } from "@/types/type";

import { apiUrl, authHeaders, toCamelCase } from "@/utils/apiHelper";
import { handleUnauthorized } from "@/utils/apiHelper";
import * as articleApi from "../cms/articleApi";
import * as categoryApi from "../cms/categoryApi";
import * as productsApi from "../cms/producstsApi";
import { login } from "../cms/authApi";
import { uploadImage } from "../cms/uploadImageApi";
import type {
  IAboutUsPageData,
  ICompanyInformation,
  ICompanySocialLink,
  IContactUsPageData,
  IQuestion,
  IWebsiteContent,
} from "@/types/type";
export async function getProductsForSite(params?: {
  page?: number;
  limit?: number;
}): Promise<{
  success: boolean;
  data: IProduct[];
  pagination: Pagination | null;
}> {
  try {
    const res = await fetch("https://metalkarantech.ir/api/cms/products", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("خطا در دریافت محصولات");
    const raw = await res.json();
    const data = Array.isArray(raw) ? raw : (raw?.data ?? []);
    const pagination = raw?.pagination;
    const items = Array.isArray(data) ? data : [];
    const total = pagination?.total ?? items.length;
    const page = params?.page || pagination?.page || 1;
    const limit = params?.limit ?? pagination?.limit ?? 100;
    const totalPages =
      (pagination?.totalPages ?? Math.ceil(total / limit)) || 1;
    const start = pagination ? 0 : (page - 1) * limit;
    const paginated = pagination ? items : items.slice(start, start + limit);
    return {
      success: true,
      data: toCamelCase<IProduct[]>(paginated),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  } catch {
    return {
      success: false,
      data: [],
      pagination: null,
    };
  }
}

export const AUTH_STORAGE_KEY = "admin_api_key";

export async function submitContact(data: {
  name: string;
  phone: string;
  email: string;
  company: string;
}): Promise<{ success: boolean; message?: string; status?: number }> {
  try {
    const res = await fetch(
      "https://metalkarantech.ir/api/cms/contact-form-data",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
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
    const res = await fetch("https://metalkarantech.ir/api/cms/usages", {
      headers: authHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("خطا در دریافت کاربردها");
    const data = await res.json();
    return toCamelCase(data) as { id: string; title: string; image: string }[];
  } catch {
    return [];
  }
}

export async function healthCheck() {
  try {
    const res = await fetch("https://metalkarantech.ir/", {
      cache: "no-store",
    });
    return { status: res.ok ? 200 : res.status };
  } catch {
    return { status: 0 };
  }
}

/** داده درباره ما — از مسیر site بدون auth */
export async function getSiteAboutUs(): Promise<IAboutUsPageData | null> {
  try {
    const res = await fetch("https://metalkarantech.ir/api/site/about-us", {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const raw = toCamelCase(data) as {
      whyUs?: { title?: string; description?: string }[];
      cards?: IAboutUsPageData["aboutUsCards"];
      descriptions?: IAboutUsPageData["aboutUsDescription"];
    };
    if (!raw) return null;
    const whyUs =
      Array.isArray(raw.whyUs) && raw.whyUs[0]
        ? {
            title: raw.whyUs[0].title ?? "",
            description: raw.whyUs[0].description ?? "",
          }
        : { title: "", description: "" };
    return {
      aboutUsCards: raw.cards ?? [],
      whyUs,
      aboutUsDescription: raw.descriptions ?? [],
    };
  } catch {
    return null;
  }
}

/** دسته‌بندی‌ها برای سایت — از مسیر site بدون auth */
export async function getSiteCategories() {
  try {
    const res = await fetch("https://metalkarantech.ir/api/site/categories", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    return toCamelCase(data);
  } catch {
    return null;
  }
}

/** محتوای عمومی سایت (هیرو، دربارهٔ اصلی، تماس، شرکت و...) — از مسیر site بدون auth */
export async function getSiteWebsiteContent(): Promise<IWebsiteContent | null> {
  try {
    const res = await fetch(
      "https://metalkarantech.ir/api/site/website-content",
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const raw = toCamelCase(data) as {
      heroSections?: { id: number; src: string; alt: string }[];
      homePageAbout?: Record<string, unknown>;
      contactUsPageData?: Record<string, unknown>;
      companyInformation?: Record<string, unknown>;
      companySocialLinks?: { id: number; title: string; url: string }[];
    };
    const heroSection = raw.heroSections ?? [];
    const firstHero = heroSection[0];
    return {
      heroSection,
      logoImage: firstHero ?? { id: 0, src: "/logo.png", alt: "لوگو" },
      industriesCarousel: heroSection,
      homePageAbout:
        (raw.homePageAbout as unknown as IWebsiteContent["homePageAbout"]) ?? {
          title: "",
          detail: "",
          extraTitle: "",
          extraDetail: "",
        },
      aboutUsPageData: {
        whyUs: { title: "", description: "" },
        aboutUsCards: [],
        aboutUsDescription: [],
      },
      companyInformation: raw.companyInformation
        ? {
            ...(raw.companyInformation as unknown as ICompanyInformation),
            socialLinks: raw.companySocialLinks ?? [],
          }
        : {
            phoneNumber: "",
            emailAddress: "",
            companyAddress: "",
            socialLinks: raw.companySocialLinks ?? [],
          },
      contactUsPageData:
        (raw.contactUsPageData as unknown as IWebsiteContent["contactUsPageData"]) ?? {
          mainParagraph: "",
          subParagraph: "",
        },
    };
  } catch {
    return null;
  }
}

/** سوالات متداول برای نمایش در سایت — از مسیر site بدون auth */
export async function getSiteQuestions(): Promise<IQuestion[]> {
  try {
    const res = await fetch("https://metalkarantech.ir/api/site/questions", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const arr = Array.isArray(data) ? data : (data?.data ?? []);
    return toCamelCase(arr) as IQuestion[];
  } catch {
    return [];
  }
}

export async function getHeroSections() {
  try {
    const res = await fetch("https://metalkarantech.ir/api/cms/hero-sections", {
      headers: authHeaders(),
      cache: "no-store",
    });
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
    const res = await fetch(
      "https://metalkarantech.ir/api/cms/home-page-about",
      {
        headers: authHeaders(),
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    return data ? toCamelCase(data) : null;
  } catch {
    return null;
  }
}

/** به‌روزرسانی home_page_about (وقتی مسیر website-content روی سرور ۴۰۴ می‌دهد از این استفاده می‌شود) */
export async function updateHomePageAbout(data: {
  title: string;
  detail: string;
  extraTitle: string;
  extraDetail: string;
}) {
  const first = (await getHomePageAbout()) as { id: number } | null;
  if (!first?.id) throw new Error("رکوردی برای به‌روزرسانی یافت نشد");
  const res = await fetch(
    `https://metalkarantech.ir/api/cms/home-page-about/${first.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ذخیره");
  }
}

/** یک رکورد contact_us_page_data (بک‌اند ممکن است آرایه یا تک رکورد برگرداند) */
export async function getContactUsPageData(): Promise<IContactUsPageData | null> {
  try {
    const res = await fetch(
      "https://metalkarantech.ir/api/cms/contact-us-page",
      {
        headers: authHeaders(),
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    const raw = Array.isArray(data) ? data[0] : data;
    return raw ? (toCamelCase(raw) as IContactUsPageData) : null;
  } catch {
    return null;
  }
}

export async function updateContactUsPageData(data: IContactUsPageData) {
  const res = await fetch("https://metalkarantech.ir/api/cms/contact-us-page", {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ذخیره");
  }
}

/** داده درباره ما: whyUs، aboutUsCards، aboutUsDescription (از مسیر تجمیعی بک‌اند) */
export async function getAboutUsPageData(): Promise<IAboutUsPageData | null> {
  try {
    const res = await fetch("https://metalkarantech.ir/api/cms/about-us-page", {
      headers: authHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const raw = data
      ? (toCamelCase(data) as {
          aboutUsCards?: IAboutUsPageData["aboutUsCards"];
          aboutUsWhyUs?: IAboutUsPageData["whyUs"][];
          aboutUsDescriptions?: IAboutUsPageData["aboutUsDescription"];
        })
      : null;
    if (!raw) return null;
    const whyUs =
      Array.isArray(raw.aboutUsWhyUs) && raw.aboutUsWhyUs[0]
        ? raw.aboutUsWhyUs[0]
        : { title: "", description: "" };
    return {
      aboutUsCards: raw.aboutUsCards ?? [],
      whyUs,
      aboutUsDescription: raw.aboutUsDescriptions ?? [],
    };
  } catch {
    return null;
  }
}

export async function updateAboutUsPageData(data: IAboutUsPageData) {
  const res = await fetch("https://metalkarantech.ir/api/cms/about-us-page", {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ذخیره");
  }
}

/** محتوای لندینگ برای ادمین. اگر CMS مسیر نداشت (۴۰۴)، از مسیر site بارگذاری می‌شود. */
export async function getWebsiteContent(): Promise<IWebsiteContent | null> {
  try {
    const res = await fetch(
      "https://metalkarantech.ir/api/cms/website-content",
      {
        headers: authHeaders(),
        cache: "no-store",
      },
    );
    if (!res.ok) {
      return getSiteWebsiteContent();
    }
    const data = await res.json();
    const raw = toCamelCase(data) as {
      heroSections?: { id: number; src: string; alt: string }[];
      homePageAbout?: Record<string, unknown>;
      contactUsPageData?: Record<string, unknown>;
      companyInformation?: Record<string, unknown>;
      companySocialLinks?: { id: number; title: string; url: string }[];
    };
    const heroSection = raw.heroSections ?? [];
    const firstHero = heroSection[0];
    return {
      heroSection,
      logoImage: firstHero ?? { id: 0, src: "/logo.png", alt: "لوگو" },
      industriesCarousel: heroSection,
      homePageAbout:
        (raw.homePageAbout as unknown as IWebsiteContent["homePageAbout"]) ?? {
          title: "",
          detail: "",
          extraTitle: "",
          extraDetail: "",
        },
      aboutUsPageData: {
        whyUs: { title: "", description: "" },
        aboutUsCards: [],
        aboutUsDescription: [],
      },
      companyInformation: raw.companyInformation
        ? {
            ...(raw.companyInformation as unknown as ICompanyInformation),
            socialLinks: raw.companySocialLinks ?? [],
          }
        : {
            phoneNumber: "",
            emailAddress: "",
            companyAddress: "",
            socialLinks: raw.companySocialLinks ?? [],
          },
      contactUsPageData:
        (raw.contactUsPageData as unknown as IWebsiteContent["contactUsPageData"]) ?? {
          mainParagraph: "",
          subParagraph: "",
        },
    };
  } catch {
    return getSiteWebsiteContent();
  }
}

/** به‌روزرسانی محتوای لندینگ. اگر مسیر website-content ۴۰۴ داد، از endpointهای جدا (home-page-about، contact-us-page، company-information) استفاده می‌کند. */
export async function updateWebsiteContent(data: Partial<IWebsiteContent>) {
  const res = await fetch("https://metalkarantech.ir/api/cms/website-content", {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    if (data.homePageAbout) {
      await updateHomePageAbout({
        title: data.homePageAbout.title ?? "",
        detail: data.homePageAbout.detail ?? "",
        extraTitle: data.homePageAbout.extraTitle ?? "",
        extraDetail: data.homePageAbout.extraDetail ?? "",
      });
    }
    if (data.contactUsPageData) {
      await updateContactUsPageData(data.contactUsPageData);
    }
    if (data.companyInformation) {
      await updateCompanyInfo({
        phoneNumber: data.companyInformation.phoneNumber ?? "",
        emailAddress: data.companyInformation.emailAddress ?? "",
        companyAddress: data.companyInformation.companyAddress ?? undefined,
      });
    }
    return;
  }
}

/** اطلاعات شرکت + لینک‌های شبکه اجتماعی (company-information یک رکورد برمی‌گرداند) */
export async function getCompanyInfo(): Promise<ICompanyInformation | null> {
  try {
    const h = authHeaders();
    const socialRes = await fetch(
      "https://metalkarantech.ir/api/cms/company-social-links",
      {
        headers: h,
        cache: "no-store",
      },
    );
    const infoRes = await fetch(
      "https://metalkarantech.ir/api/cms/company-information",
      {
        headers: h,
        cache: "no-store",
      },
    );
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
  const res = await fetch(
    "https://metalkarantech.ir/api/cms/company-information",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ذخیره");
  }
}

export async function createCompanySocialLink(data: {
  title: string;
  url: string;
}): Promise<ICompanySocialLink> {
  const res = await fetch(
    "https://metalkarantech.ir/api/cms/company-social-links",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    },
  );
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
  const res = await fetch(
    `https://metalkarantech.ir/api/cms/company-social-links/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(data),
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ویرایش");
  }
}

export async function deleteCompanySocialLink(id: number) {
  const res = await fetch(
    `https://metalkarantech.ir/api/cms/company-social-links/${id}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در حذف");
  }
}

export async function getQuestions() {
  try {
    const res = await fetch("https://metalkarantech.ir/api/cms/questions", {
      headers: authHeaders(),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("خطا");
    const data = await res.json();
    return toCamelCase(data);
  } catch {
    return null;
  }
}

export async function createQuestion(data: {
  question: string;
  answer: string;
}) {
  const res = await fetch("https://metalkarantech.ir/api/cms/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ذخیره");
  }
}

export async function updateQuestion(
  id: number,
  data: { question: string; answer: string },
) {
  const res = await fetch(`https://metalkarantech.ir/api/cms/questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ویرایش");
  }
}

export async function deleteQuestion(id: number) {
  const res = await fetch(`https://metalkarantech.ir/api/cms/questions/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در حذف");
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
    const res = await fetch(
      "https://metalkarantech.ir/api/cms/contact-form-data",
      {
        headers: authHeaders(),
        cache: "no-store",
      },
    );
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
  updateHomePageAbout,
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
  createQuestion,
  updateQuestion,
  deleteQuestion,
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
