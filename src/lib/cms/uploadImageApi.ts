import { apiUrl, authHeaders, handleUnauthorized } from "@/utils/apiHelper";

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(apiUrl("/api/upload-image"), {
    method: "POST",
    headers: authHeaders(),
    body: form,
  });
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("توکن نامعتبر است");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || "خطا در آپلود تصویر");
  }
  const json = (await res.json()) as { path: string };
  return json.path;
}

function getUploadsBaseUrl(): string {
  const uploadsUrl = process.env.NEXT_PUBLIC_UPLOADS_URL;
  if (uploadsUrl) return uploadsUrl.replace(/\/$/, "");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) return apiUrl.replace(/\/$/, "");
  return "";
}

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = getUploadsBaseUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}
