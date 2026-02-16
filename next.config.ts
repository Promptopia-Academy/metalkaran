import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // تصاویر آپلودشده از بک‌اند (مثلاً localhost:3001 یا دامنهٔ API)
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "3001", pathname: "/uploads/**" },
      { protocol: "https", hostname: "metalkarantech.com", pathname: "/uploads/**" },
      { protocol: "https", hostname: "www.metalkarantech.com", pathname: "/uploads/**" },
      { protocol: "https", hostname: "metalkarantech.ir", pathname: "/uploads/**" },
      { protocol: "https", hostname: "www.metalkarantech.ir", pathname: "/uploads/**" },
    ],
  },
  // Headers for security and CORS
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.CORS_ORIGIN || "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, API-Key, X-API-Key",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
