import { paginationSchema } from "@/validation/validations";

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function parsePaginationParams(
  searchParams: URLSearchParams
): PaginationParams {
  const parsed = paginationSchema.parse({
    page: searchParams.get("page"),
    limit: searchParams.get("limit"),
    search: searchParams.get("search"),
    sortBy: searchParams.get("sortBy"),
    sortOrder: searchParams.get("sortOrder"),
  });

  return parsed;
}

export function paginate<T>(
  items: T[],
  params: PaginationParams
): PaginatedResponse<T> {
  let filtered = [...items];

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter((item) => {
      const itemString = JSON.stringify(item).toLowerCase();
      return itemString.includes(searchLower);
    });
  }

  if (params.sortBy) {
    filtered.sort((a, b) => {
      const aVal = (a as any)[params.sortBy!];
      const bVal = (b as any)[params.sortBy!];

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return params.sortOrder === "asc" ? comparison : -comparison;
    });
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / params.limit);
  const startIndex = (params.page - 1) * params.limit;
  const endIndex = startIndex + params.limit;
  const paginatedData = filtered.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages,
      hasNext: params.page < totalPages,
      hasPrev: params.page > 1,
    },
  };
}
