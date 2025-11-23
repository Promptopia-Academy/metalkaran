import { z } from "zod";
import { formSchema } from "@/validation/validations";
import { getContacts, saveContact } from "../utils/storage";
import { checkRateLimit, getClientIP } from "../lib/rate-limit";
import { sendContactEmail, sendConfirmationEmail } from "../lib/email";
import {
  IContact,
  IContactServiceResponse,
  IRateLimitResponse,
} from "@/types/type";

export type ContactData = z.infer<typeof formSchema>;

export async function checkContactRateLimit(
  request: Request
): Promise<{ allowed: boolean; rateLimit?: IRateLimitResponse }> {
  const clientIP = getClientIP(request);
  const rateLimit = await checkRateLimit(clientIP);

  if (!rateLimit.allowed) {
    return { allowed: false, rateLimit };
  }

  return { allowed: true, rateLimit };
}

export async function createContact(
  data: ContactData
): Promise<IContactServiceResponse> {
  try {
    const validatedData = formSchema.parse(data);

    const savedContact = await saveContact(validatedData);

    sendContactEmail(validatedData).catch((error) => {
      console.error("Failed to send admin email:", error);
    });

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

export async function getAllContacts(): Promise<IContact[]> {
  return await getContacts();
}
