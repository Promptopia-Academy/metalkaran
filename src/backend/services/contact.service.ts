import { z } from "zod";
import { formSchema } from "@/validation/validations";
import { saveContact, getContacts, Contact } from "../utils/storage";
import { checkRateLimit, getClientIP } from "../lib/rate-limit";
import { sendContactEmail, sendConfirmationEmail } from "../lib/email";

export type ContactData = z.infer<typeof formSchema>;

export interface ContactServiceResponse {
  success: boolean;
  message: string;
  data?: Contact;
  errors?: unknown;
}

export interface RateLimitResponse {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

// بررسی Rate Limit
export async function checkContactRateLimit(
  request: Request
): Promise<{ allowed: boolean; rateLimit?: RateLimitResponse }> {
  const clientIP = getClientIP(request);
  const rateLimit = await checkRateLimit(clientIP);

  if (!rateLimit.allowed) {
    return { allowed: false, rateLimit };
  }

  return { allowed: true, rateLimit };
}

// ایجاد Contact جدید
export async function createContact(
  data: ContactData
): Promise<ContactServiceResponse> {
  try {
    // اعتبارسنجی با Zod
    const validatedData = formSchema.parse(data);

    // ذخیره در فایل JSON
    const savedContact = await saveContact(validatedData);

    // ارسال ایمیل به ادمین (در background - منتظر نمی‌مانیم)
    sendContactEmail(validatedData).catch((error) => {
      console.error("Failed to send admin email:", error);
      // خطا را لاگ می‌کنیم اما به کاربر نشان نمی‌دهیم
    });

    // ارسال ایمیل تایید به کاربر (در background)
    sendConfirmationEmail(validatedData.email, validatedData.name).catch(
      (error) => {
        console.error("Failed to send confirmation email:", error);
      }
    );

    return {
      success: true,
      message: "پیام شما با موفقیت ارسال شد",
      data: savedContact,
    };
  } catch (error) {
    // بررسی خطای Zod
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "ZodError"
    ) {
      return {
        success: false,
        message: "اطلاعات وارد شده معتبر نیست",
        errors: error,
      };
    }

    console.error("Error creating contact:", error);
    return {
      success: false,
      message: "خطا در ارسال پیام. لطفاً دوباره تلاش کنید.",
    };
  }
}

// دریافت لیست Contacts
export async function getAllContacts(): Promise<Contact[]> {
  return await getContacts();
}

