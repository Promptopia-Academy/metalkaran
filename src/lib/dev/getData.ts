import { Pagination } from "@/types/type";
import { IProduct } from "@/types/type";
import { toCamelCase } from "@/utils/apiHelper";

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
