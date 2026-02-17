import { CreateProductFullInput, IProduct, Pagination } from "@/types/type";
import { handleUnauthorized } from "@/utils/apiHelper";
import {
  apiUrl,
  authHeaders,
  getStoredToken,
  toCamelCase,
} from "@/utils/apiHelper";

export async function getProductById(id: number): Promise<IProduct | null> {
  try {
    const res = await fetch(apiUrl(`/api/site/products_full/${id}`));
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("خطا در دریافت محصول");
    const data = await res.json();
    return toCamelCase(data) as IProduct;
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
    return {
      success: false,
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    };
  }
}
