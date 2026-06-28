import { authHeaders } from "@/utils/apiHelper";
import type { ICompanySocialLink } from "@/types/type";

const BASE_URL = "/api/cms/company-social-links";

type ICompanySocialLinkApi = Omit<ICompanySocialLink, "id">;

export async function getAllCompanySocialLinks(): Promise<
  ICompanySocialLink[]
> {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch company social links");
  }

  return res.json();
}

export async function createCompanySocialLink(
  data: ICompanySocialLinkApi,
): Promise<{ id: number; message: string }> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create company social link");
  }

  return res.json();
}

export async function updateCompanySocialLink(
  id: number,
  data: ICompanySocialLinkApi,
): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update company social link");
  }

  return res.json();
}

export async function deleteCompanySocialLink(
  id: number,
): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete company social link");
  }

  return res.json();
}
