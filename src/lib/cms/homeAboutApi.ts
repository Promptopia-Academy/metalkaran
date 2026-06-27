import { authHeaders } from "@/utils/apiHelper";
import type { IHomePageAbout } from "@/types/type";

const BASE_URL = "/api/cms/home-page-about";

/* =========================
   GET
========================= */
export async function getHomePageAbout(): Promise<IHomePageAbout[]> {
  const res = await fetch(BASE_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات صفحه درباره ما");
  }

  return res.json();
}

/* =========================
   CREATE
========================= */
export async function createHomePageAbout(data: IHomePageAbout) {
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
    throw new Error(json.error || "خطا در ایجاد اطلاعات");
  }

  return json;
}

/* =========================
   UPDATE
========================= */
export async function updateHomePageAbout(id: number, data: IHomePageAbout) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify({
      title: data.title,
      detail: data.detail,
      extra_title: data.extra_title,
      extra_detail: data.extra_detail,
    }),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.error || "خطا در بروزرسانی اطلاعات");
  }

  return json;
}

/* =========================
   DELETE
========================= */
export async function deleteHomePageAbout(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.error || "خطا در حذف اطلاعات");
  }

  return json;
}
