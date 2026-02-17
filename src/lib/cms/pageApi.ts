import type { ICompanyInformation, ICompanySocialLink } from "@/types/type";
import { apiUrl, authHeaders, toCamelCase } from "@/utils/apiHelper";
import { handleUnauthorized } from "@/utils/apiHelper";

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

export const api = {
  submitContact,
  getCmsUsages,
  healthCheck,
  getSiteAboutUs,
  getSiteCategories,
  getHeroSections,
  getHomePageAbout,
  getContactUsPageData,
  getCompanyInfo,
  getQuestions,
};
