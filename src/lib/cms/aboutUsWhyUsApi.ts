
import { IAboutUsPageWhyUs } from "@/types/type";
import { authHeaders } from "@/utils/apiHelper";

const BASE_URL = "/api/cms/about-us-why-us";

export type AboutUsWhyUsInput = Omit<IAboutUsPageWhyUs, "id">;

/* ============================
   GET
============================ */
export async function getAboutUsWhyUs(): Promise<IAboutUsPageWhyUs[]> {
  const res = await fetch(BASE_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || "خطا در دریافت اطلاعات چرا ما");
  }

  return res.json();
}

/* ============================
   POST
============================ */
export async function createAboutUsWhyUs(data: AboutUsWhyUsInput) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "خطا در ایجاد آیتم جدید");
  return json;
}

/* ============================
   PUT
============================ */
export async function updateAboutUsWhyUs(id: number, data: AboutUsWhyUsInput) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "خطا در بروزرسانی آیتم");
  return json;
}

/* ============================
   DELETE
============================ */
export async function deleteAboutUsWhyUs(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "خطا در حذف آیتم");
  return json;
}
