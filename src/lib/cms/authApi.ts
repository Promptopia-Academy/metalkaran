import { apiUrl } from "@/utils/apiHelper";

export type LoginResponse = {
  token: string;
  message?: string;
  user?: { id: number; username: string };
};

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(apiUrl("/api/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || "خطا در ورود");
  return data as LoginResponse;
}
