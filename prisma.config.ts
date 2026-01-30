/**
 * Prisma Configuration
 * تنظیمات اتصال به دیتابیس برای Prisma 7+
 */

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  datasource: {
    url: env("DATABASE_URL") || "file:./prisma/dev.db",
  },
});

