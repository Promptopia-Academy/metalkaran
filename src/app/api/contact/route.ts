import { NextRequest, NextResponse } from "next/server";
import { formSchema } from "@/validation/validations";
import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// مسیر ذخیره داده‌ها
const DATA_DIR = path.join(process.cwd(), "data");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

// تابع برای خواندن contacts
async function getContacts() {
  if (!existsSync(CONTACTS_FILE)) {
    return [];
  }
  const fileContent = await readFile(CONTACTS_FILE, "utf-8");
  return JSON.parse(fileContent);
}

// تابع برای ذخیره contact
async function saveContact(contact: unknown) {
  // ایجاد پوشه data اگر وجود نداشته باشد
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }

  const contacts = await getContacts();
  const newContact = {
    id: Date.now().toString(),
    ...contact,
    createdAt: new Date().toISOString(),
  };
  contacts.push(newContact);

  await writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf-8");
  return newContact;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // اعتبارسنجی با Zod
    const validatedData = formSchema.parse(body);

    // ذخیره در فایل JSON
    const savedContact = await saveContact(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "پیام شما با موفقیت ارسال شد",
        data: savedContact,
      },
      { status: 201 }
    );
  } catch (error) {
    // بررسی خطای Zod
    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "ZodError"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات وارد شده معتبر نیست",
          errors: error,
        },
        { status: 400 }
      );
    }

    console.error("Error saving contact:", error);
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
    const contacts = await getContacts();
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error reading contacts:", error);
    return NextResponse.json(
      { success: false, message: "خطا در خواندن اطلاعات" },
      { status: 500 }
    );
  }
}
