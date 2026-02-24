"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api, AUTH_STORAGE_KEY } from "@/lib/dev/getData";

/** همون نامی که در middleware چک می‌شود - باید با لاگین/لاگ‌اوت همگام باشد */
const ADMIN_AUTH_COOKIE = "admin_authenticated";

function setAuthCookie(hasAuth: boolean) {
  if (typeof document === "undefined") return;
  if (hasAuth) {
    document.cookie = `${ADMIN_AUTH_COOKIE}=1; path=/; max-age=86400`; // ۱ روز
  } else {
    document.cookie = `${ADMIN_AUTH_COOKIE}=; path=/; max-age=0`;
  }
}

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const setToken = useCallback((t: string | null) => {
    if (typeof window !== "undefined") {
      if (t) {
        localStorage.setItem(AUTH_STORAGE_KEY, t);
        setAuthCookie(true);
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setAuthCookie(false);
      }
    }
    setTokenState(t);
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      const data = await api.login(username, password);
      const t =
        (data as { token?: string }).token ??
        (data as { access_token?: string }).access_token ??
        null;
      if (!t) throw new Error("سرور توکنی برنگرداند");
      setToken(t);
      router.push("/admin");
      router.refresh();
    },
    [router, setToken],
  );

  const logout = useCallback(() => {
    setToken(null);
    router.push("/admin/login");
    router.refresh();
  }, [router, setToken]);

  useEffect(() => {
    const t =
      typeof window !== "undefined"
        ? localStorage.getItem(AUTH_STORAGE_KEY)
        : null;
    setTokenState(t);
    if (t) setAuthCookie(true);
    setIsLoading(false);
  }, []);

  const value: AuthContextValue = {
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
