import { NextRequest, NextResponse } from "next/server";

/** نام کوکی که موقع لاگین ست می‌شود تا middleware بتواند قبل از لود صفحه چک کند */
const ADMIN_AUTH_COOKIE = "admin_authenticated";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // فقط مسیرهای زیر /admin (غیر از خود لاگین) را چک کن
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const hasCookie = request.cookies.get(ADMIN_AUTH_COOKIE)?.value === "1";

  if (!hasCookie) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
