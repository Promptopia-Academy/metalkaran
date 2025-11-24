import { NextRequest, NextResponse } from "next/server";
import {
  checkContactRateLimit,
  createContact,
  getAllContacts,
} from "../services/contact.service";
import { logger } from "../lib/logger";
import { requireAuth } from "../lib/auth";

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const rateLimitCheck = await checkContactRateLimit(request);

    if (!rateLimitCheck.allowed && rateLimitCheck.rateLimit) {
      const resetDate = new Date(rateLimitCheck.rateLimit.resetTime);
      const minutesLeft = Math.ceil(
        (rateLimitCheck.rateLimit.resetTime - Date.now()) / 60000
      );

      const duration = Date.now() - startTime;
      logger.request("POST", "/api/contact", 429, duration, { rateLimited: true });
      
      return NextResponse.json(
        {
          success: false,
          message: `تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً ${minutesLeft} دقیقه دیگر تلاش کنید.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": minutesLeft.toString(),
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": resetDate.toISOString(),
          },
        }
      );
    }

    const body = await request.json();

    const result = await createContact(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
          errors: result.errors,
        },
        { status: result.errors ? 400 : 500 }
      );
    }

    const duration = Date.now() - startTime;
    logger.request("POST", "/api/contact", result.success ? 201 : 400, duration);
    
    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: result.data,
      },
      {
        status: 201,
        headers: {
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": rateLimitCheck.rateLimit
            ? rateLimitCheck.rateLimit.remaining.toString()
            : "4",
          "X-RateLimit-Reset": rateLimitCheck.rateLimit
            ? new Date(rateLimitCheck.rateLimit.resetTime).toISOString()
            : new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        },
      }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Error in contact API POST", error as Error);
    logger.request("POST", "/api/contact", 500, duration);
    
    return NextResponse.json(
      {
        success: false,
        message: "خطا در ارسال پیام. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 }
    );
  }
}

// GET - Protected endpoint (only admins should see contacts)
export const GET = requireAuth(async function GET() {
  const startTime = Date.now();
  
  try {
    const contacts = await getAllContacts();
    
    const duration = Date.now() - startTime;
    logger.request("GET", "/api/contact", 200, duration);
    
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Error reading contacts", error as Error);
    logger.request("GET", "/api/contact", 500, duration);
    
    return NextResponse.json(
      { success: false, message: "خطا در خواندن اطلاعات" },
      { status: 500 }
    );
  }
});
