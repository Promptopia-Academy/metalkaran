import {
  apiUrl,
  authHeaders,
  getStoredToken,
  toCamelCase,
} from "@/utils/apiHelper";
import { handleUnauthorized } from "@/utils/apiHelper";
import { ICategory } from "@/types/type";

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

export async function getCategories(): Promise<ICategory[]> {
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
