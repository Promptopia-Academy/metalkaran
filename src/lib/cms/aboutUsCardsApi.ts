import type { IAboutUsPageCard } from "@/types/type";
import { authHeaders } from "@/utils/apiHelper";

const BASE_URL = "/api/cms/about-us-cards";

type AboutUsCardInput = Omit<IAboutUsPageCard, "id">;

export async function getAboutUsCards(): Promise<IAboutUsPageCard[]> {
  const res = await fetch(BASE_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || "خطا در دریافت کارت‌های صفحه درباره ما");
  }

  return res.json();
}

export async function createAboutUsCard(data: AboutUsCardInput) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(json.error || "خطا در ایجاد کارت");
  return json;
}

export async function updateAboutUsCard(id: number, data: AboutUsCardInput) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(json.error || "خطا در بروزرسانی کارت");
  return json;
}

export async function deleteAboutUsCard(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(json.error || "خطا در حذف کارت");
  return json;
}
