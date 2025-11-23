import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { IRateLimitEntry } from "@/types/type";

const DATA_DIR = path.join(process.cwd(), "data");
const RATE_LIMIT_FILE = path.join(DATA_DIR, "rate-limit.json");

const RATE_LIMIT_CONFIG = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
};

async function getRateLimitData(): Promise<IRateLimitEntry[]> {
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

async function saveRateLimitData(data: IRateLimitEntry[]) {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  await writeFile(RATE_LIMIT_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(",")[0].trim();

  return "unknown";
}

export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetTime: number;
}> {
  const now = Date.now();
  const data = await getRateLimitData();

  const validEntries = data.filter((entry) => entry.resetTime > now);
  await saveRateLimitData(validEntries);

  let entry = validEntries.find((e) => e.ip === ip);

  if (!entry) {
    const newId =
      validEntries.length > 0
        ? Math.max(...validEntries.map((e) => e.id || 0)) + 1
        : 1;
    entry = {
      id: newId,
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

  if (entry.count >= RATE_LIMIT_CONFIG.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  entry.count++;
  await saveRateLimitData(validEntries);

  return {
    allowed: true,
    remaining: RATE_LIMIT_CONFIG.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}
