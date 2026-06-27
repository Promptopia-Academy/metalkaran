import type { IAboutUsPageDescription } from "@/types/type";
import { authHeaders } from "@/utils/apiHelper";

const BASE_URL = "/api/cms/about-us-descriptions";

type AboutUsDescriptionInput = Omit<IAboutUsPageDescription, "id">;

export async function getAboutUsDescriptions(): Promise<IAboutUsPageDescription[]> {
  const res = await fetch(BASE_URL, {
    cache: "no-store",
    headers: authHeaders(),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || "خطا در دریافت توضیحات صفحه درباره ما");
  }

  return res.json();
}

export async function createAboutUsDescription(data: AboutUsDescriptionInput) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(json.error || "خطا در ایجاد توضیح");
  return json;
}

export async function updateAboutUsDescription(
  id: number,
  data: AboutUsDescriptionInput,
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

  if (!res.ok) throw new Error(json.error || "خطا در بروزرسانی توضیح");
  return json;
}

export async function deleteAboutUsDescription(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(json.error || "خطا در حذف توضیح");
  return json;
}
