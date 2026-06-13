import { authHeaders } from "@/utils/apiHelper";
import type { IHomePageAbout } from "@/types/type";

const BASE_URL = "/api/cms/home-page-about";

export async function getHomePageAbout(): Promise<IHomePageAbout[]> {
  const res = await fetch(BASE_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("خطا در دریافت سوالات");
  }

  return res.json();
}

export async function createHomePageAbout(data: {
  question: string;
  answer: string;
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
    throw new Error(json.error || "خطا در ایجاد سوال");
  }

  return json;
}

export async function updateHomePageAbout(
  id: number,
  data: {
    question: string;
    answer: string;
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
    throw new Error(json.error || "خطا در بروزرسانی سوال");
  }

  return json;
}

export async function deleteHomePageAbout(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.error || "خطا در حذف سوال");
  }

  return json;
}
