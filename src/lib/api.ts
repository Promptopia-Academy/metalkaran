import { IApiOptions } from "@/types/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

async function apiRequest<T>(
  endpoint: string,
  options: IApiOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, apiKey } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (apiKey) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${apiKey}`,
    };
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "خطا در ارتباط با سرور" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const api = {
  getArticles: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.limit) queryParams.set("limit", params.limit.toString());
    if (params?.search) queryParams.set("search", params.search);
    if (params?.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.set("sortOrder", params.sortOrder);

    const query = queryParams.toString();
    return apiRequest<any>(`/article${query ? `?${query}` : ""}`);
  },

  getArticle: (id: number) => apiRequest<any>(`/article?id=${id}`),

  createArticle: (data: any, apiKey: string) =>
    apiRequest<any>("/article", {
      method: "POST",
      body: data,
      apiKey,
    }),

  updateArticle: (id: number, data: any, apiKey: string) =>
    apiRequest<any>(`/article?id=${id}`, {
      method: "PUT",
      body: data,
      apiKey,
    }),

  deleteArticle: (id: number, apiKey: string) =>
    apiRequest<any>(`/article?id=${id}`, {
      method: "DELETE",
      apiKey,
    }),

  getElements: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.limit) queryParams.set("limit", params.limit.toString());
    if (params?.search) queryParams.set("search", params.search);
    if (params?.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params?.sortOrder) queryParams.set("sortOrder", params.sortOrder);

    const query = queryParams.toString();
    return apiRequest<any>(`/element${query ? `?${query}` : ""}`);
  },

  getElement: (id: number) => apiRequest<any>(`/element?id=${id}`),

  createElement: (data: any, apiKey: string) =>
    apiRequest<any>("/element", {
      method: "POST",
      body: data,
      apiKey,
    }),

  updateElement: (id: number, data: any, apiKey: string) =>
    apiRequest<any>(`/element?id=${id}`, {
      method: "PUT",
      body: data,
      apiKey,
    }),

  deleteElement: (id: number, apiKey: string) =>
    apiRequest<any>(`/element?id=${id}`, {
      method: "DELETE",
      apiKey,
    }),

  getContacts: (apiKey: string) =>
    apiRequest<any>("/contact", {
      method: "GET",
      apiKey,
    }),

  uploadFile: (file: File, apiKey: string) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw new Error(err.message || "خطا در آپلود فایل");
        });
      }
      return res.json();
    });
  },
};
