import { authHeaders } from "@/utils/apiHelper";

export type HeroSlide = {
  id: number;
  src: string;
  alt: string;
};

const BASE_URL = "/api/cms/hero-sections";

export async function getHeroSections(): Promise<HeroSlide[]> {
  const res = await fetch(BASE_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("خطا در دریافت اسلایدها");
  }

  return res.json();
}

export async function createHeroSection(data: {
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
    throw new Error(json.error || "خطا در ایجاد اسلاید");
  }

  return json;
}

export async function updateHeroSection(
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
    throw new Error(json.error || "خطا در بروزرسانی");
  }

  return json;
}

export async function deleteHeroSection(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.error || "خطا در حذف");
  }

  return json;
}