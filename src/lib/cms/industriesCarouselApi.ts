import { authHeaders } from "@/utils/apiHelper";

export type IndustriesCarouselItem = {
  id: number;
  src: string;
  alt: string;
};

const BASE_URL = "/api/cms/industries-carousel";

export async function getIndustriesCarousel(): Promise<IndustriesCarouselItem[]> {
  const res = await fetch(BASE_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("خطا در دریافت آیتم‌های کاروسل صنایع");
  }

  return res.json();
}

export async function createIndustriesCarousel(data: {
  src: string;
  alt: string;
}) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.error || "خطا در ایجاد آیتم کاروسل صنایع");
  }

  return json;
}

export async function updateIndustriesCarousel(
  id: number,
  data: {
    src: string;
    alt: string;
  },
) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.error || "خطا در بروزرسانی آیتم کاروسل صنایع");
  }

  return json;
}

export async function deleteIndustriesCarousel(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.error || "خطا در حذف آیتم کاروسل صنایع");
  }

  return json;
}
