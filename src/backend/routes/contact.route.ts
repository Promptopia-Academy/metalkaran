import { NextRequest, NextResponse } from "next/server";
import {
  checkContactRateLimit,
  createContact,
  getAllContacts,
} from "../services/contact.service";

export async function POST(request: NextRequest) {
  try {
    // بررسی Rate Limit
    const rateLimitCheck = await checkContactRateLimit(request);

    if (!rateLimitCheck.allowed && rateLimitCheck.rateLimit) {
      const resetDate = new Date(rateLimitCheck.rateLimit.resetTime);
      const minutesLeft = Math.ceil(
        (rateLimitCheck.rateLimit.resetTime - Date.now()) / 60000
      );

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

    // ایجاد Contact
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
    console.error("Error in contact API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در ارسال پیام. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 }
    );
  }
}

// برای دریافت لیست contacts (اختیاری - برای ادمین)
export async function GET() {
  try {
    const contacts = await getAllContacts();
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error reading contacts:", error);
    return NextResponse.json(
      { success: false, message: "خطا در خواندن اطلاعات" },
      { status: 500 }
    );
  }
}

