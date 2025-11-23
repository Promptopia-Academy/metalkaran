import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const RATE_LIMIT_FILE = path.join(DATA_DIR, "rate-limit.json");

interface RateLimitEntry {
  ip: string;
  count: number;
  resetTime: number;
}

// تنظیمات Rate Limiting
const RATE_LIMIT_CONFIG = {
  maxRequests: 5, // حداکثر 5 درخواست
  windowMs: 15 * 60 * 1000, // در 15 دقیقه
};

// خواندن rate limit data
async function getRateLimitData(): Promise<RateLimitEntry[]> {
  if (!existsSync(RATE_LIMIT_FILE)) {
    return [];
  }
  try {
    const fileContent = await readFile(RATE_LIMIT_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

// ذخیره rate limit data
async function saveRateLimitData(data: RateLimitEntry[]) {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  await writeFile(RATE_LIMIT_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// دریافت IP از request
export function getClientIP(request: Request): string {
  // تلاش برای دریافت IP از headers
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip"); // Cloudflare

  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(",")[0].trim();
  
  return "unknown";
}

// بررسی Rate Limit
export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetTime: number;
}> {
  const now = Date.now();
  const data = await getRateLimitData();

  // پاک کردن entries قدیمی
  const validEntries = data.filter((entry) => entry.resetTime > now);
  await saveRateLimitData(validEntries);

  // پیدا کردن entry برای این IP
  let entry = validEntries.find((e) => e.ip === ip);

  if (!entry) {
    // ایجاد entry جدید
    entry = {
      ip,
      count: 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    };
    validEntries.push(entry);
    await saveRateLimitData(validEntries);
    return {
      allowed: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
      resetTime: entry.resetTime,
    };
  }

  // بررسی تعداد درخواست‌ها
  if (entry.count >= RATE_LIMIT_CONFIG.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // افزایش تعداد
  entry.count++;
  await saveRateLimitData(validEntries);

  return {
    allowed: true,
    remaining: RATE_LIMIT_CONFIG.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

