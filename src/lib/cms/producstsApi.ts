import { CreateProductFullInput, IProduct, Pagination } from "@/types/type";
import { handleUnauthorized } from "@/utils/apiHelper";
import {
  apiUrl,
  authHeaders,
  getStoredToken,
  toCamelCase,
} from "@/utils/apiHelper";

/** برای سایت: یک محصول با id (بدون auth) */
export async function getProductById(id: number): Promise<IProduct | null> {
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

/** برای سایت: لیست محصولات (بدون auth) */
export async function getProductsForSite(params?: {
  page?: number;
  limit?: number;
}): Promise<{
  success: boolean;
  data: IProduct[];
  pagination: Pagination | null;
}> {
  try {
    const res = await fetch(apiUrl("/api/site/products"));
    if (!res.ok) throw new Error("خطا در دریافت محصولات");
    const raw = await res.json();
    const data = Array.isArray(raw) ? raw : raw?.data ?? [];
    const pagination = raw?.pagination;
    const items = Array.isArray(data) ? data : [];
    const total = pagination?.total ?? items.length;
    const page = params?.page || pagination?.page || 1;
    const limit = params?.limit ?? pagination?.limit ?? 100;
    const totalPages = (pagination?.totalPages ?? Math.ceil(total / limit)) || 1;
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

/** برای ادمین: گرفتن یک محصول از CMS با usageIds */
export async function getProductFullForAdmin(id: number): Promise<(IProduct & { usageIds?: string[] }) | null> {
  try {
    const res = await fetch(apiUrl(`/api/cms/products-full/${id}`), {
      headers: authHeaders(),
    });
    if (res.status === 401) {
      handleUnauthorized();
      return null;
    }
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("خطا در دریافت محصول");
    const data = await res.json();
    const parsed = toCamelCase(data) as IProduct & { usageIds?: string };
    const usageIds = typeof parsed.usageIds === "string"
      ? parsed.usageIds.split(",").map((s: string) => s.trim()).filter(Boolean)
      : Array.isArray(parsed.usageIds) ? parsed.usageIds : [];
    return { ...parsed, usageIds };
  } catch {
    return null;
  }
}

export async function createProduct(
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
  if (data.usages?.length)
    form.append("usages", JSON.stringify(data.usages));
  if (data.chemicalComposition?.length)
    form.append(
      "chemicalComposition",
      JSON.stringify(data.chemicalComposition),
    );
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

export async function updateProduct(
  id: number,
  data: Partial<Omit<CreateProductFullInput, "image">> & {
    image?: string | null;
    usageIds?: string[];
    usages?: { title: string; image: string }[];
    chemicalComposition?: { slug: string; title: string; value: string }[];
  },
  token?: string,
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...authHeaders(),
  };
  const t = token ?? getStoredToken();
  if (t) headers["Authorization"] = `Bearer ${t}`;

  const body: Record<string, unknown> = {
    title: data.title,
    slug: data.slug,
    introduction: data.introduction,
    description: data.description,
    categoryId: data.categoryId ?? null,
    standards: data.standards ?? undefined,
    thermalExpansion: data.thermalExpansion ?? undefined,
    corrosionResistance: data.corrosionResistance ?? undefined,
    heatResistance: data.heatResistance ?? undefined,
    manufacturing: data.manufacturing ?? undefined,
    hotForming: data.hotForming ?? undefined,
    coldForming: data.coldForming ?? undefined,
    welding: data.welding ?? undefined,
    machining: data.machining ?? undefined,
    image: data.image ?? undefined,
  };
  if (data.usageIds?.length) body.usageIds = data.usageIds.join(",");
  if (data.usages?.length) body.usages = data.usages;
  if (data.chemicalComposition?.length)
    body.chemicalComposition = data.chemicalComposition;

  const res = await fetch(apiUrl(`/api/cms/products-full/${id}`), {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در ویرایش محصول");
  }
}

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
    if (!res.ok) throw new Error("خطا در دریافت محصولات");
    const raw = await res.json();
    let items = Array.isArray(raw) ? raw : raw?.data ?? [];
    if (params?.search && items.length > 0) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (p: { title?: string; introduction?: string }) =>
          p.title?.toLowerCase().includes(q) ||
          p.introduction?.toLowerCase().includes(q),
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
      data: toCamelCase<IProduct[]>(paginated),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  } catch (err) {
    return {
      success: false,
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    };
  }
}
