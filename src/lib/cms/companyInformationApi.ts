import { ICompanyInformation } from "@/types/type";
import { authHeaders } from "@/utils/apiHelper";



export async function getAllCompanyInformation(): Promise<
  ICompanyInformation[]
> {
  const res = await fetch("/api/cms/company-information", {
    method: "GET",
    headers: {
      ...authHeaders(), // اضافه کردن هدرهای احراز هویت
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch company information");
  }

  return res.json();
}

// تابع برای ایجاد اطلاعات جدید شرکت
export async function createCompanyInformation(
  data: ICompanyInformation,
): Promise<{ id: number; message: string }> {
  const res = await fetch("/api/cms/company-information", {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create company information");
  }

  return res.json();
}

// تابع برای به‌روزرسانی اطلاعات موجود شرکت
export async function updateCompanyInformation(
  id: number,
  data: ICompanyInformation,
): Promise<{ message: string }> {
  const res = await fetch(`/api/cms/company-information/${id}`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update company information");
  }

  return res.json();
}

// تابع برای حذف اطلاعات شرکت
export async function deleteCompanyInformation(
  id: number,
): Promise<{ message: string }> {
  const res = await fetch(`/api/cms/company-information/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete company information");
  }

  return res.json();
}
