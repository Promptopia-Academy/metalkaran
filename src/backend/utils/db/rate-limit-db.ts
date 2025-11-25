import { prisma } from "@/lib/prisma";
import { logger } from "../../lib/logger";

const RATE_LIMIT_CONFIG = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
};

export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetTime: number;
}> {
  const now = Date.now();

  try {
    await prisma.rateLimit.deleteMany({
      where: {
        resetTime: {
          lt: now,
        },
      },
    });

    const existingEntry = await prisma.rateLimit.findFirst({
      where: {
        ip,
        resetTime: {
          gte: now,
        },
      },
      orderBy: {
        resetTime: "desc",
      },
    });

    if (!existingEntry) {
      const newEntry = await prisma.rateLimit.create({
        data: {
          ip,
          count: 1,
          resetTime: now + RATE_LIMIT_CONFIG.windowMs,
        },
      });

      return {
        allowed: true,
        remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
        resetTime: newEntry.resetTime,
      };
    }

    if (existingEntry.count >= RATE_LIMIT_CONFIG.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: existingEntry.resetTime,
      };
    }

    const updatedEntry = await prisma.rateLimit.update({
      where: { id: existingEntry.id },
      data: { count: { increment: 1 } },
    });

    return {
      allowed: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests - updatedEntry.count,
      resetTime: updatedEntry.resetTime,
    };
  } catch (error) {
    logger.error("Error checking rate limit", error as Error);
    return {
      allowed: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    };
  }
}
