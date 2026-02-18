"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Lock, User, Loader2, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) router.replace("/admin");
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password) {
      setError("نام کاربری و رمز عبور را وارد کنید");
      return;
    }
    setLoading(true);
    try {
      await login(username.trim(), password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "خطا در ورود");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              در حال انتقال به پنل...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">ورود به پنل مدیریت</CardTitle>
          <p className="text-sm text-muted-foreground">
            Metalkaran
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md text-right">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2 text-right">نام کاربری</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="pr-10 pl-10"
                  autoComplete="username"
                  disabled={loading}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-right">رمز عبور</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded"
                  tabIndex={-1}
                  aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10 pl-10"
                  autoComplete="current-password"
                  disabled={loading}
                />
              </div>
            </div>
            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                  در حال ورود...
                </>
              ) : (
                "ورود"
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">
            فقط کاربران مجاز می‌توانند به پنل دسترسی داشته باشند.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
