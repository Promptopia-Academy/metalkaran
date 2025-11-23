import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// مسیر ذخیره عکس‌ها
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// تابع برای ایجاد نام یکتا برای فایل
export function generateUniqueFileName(originalName: string): string {
  const ext = path.extname(originalName);
  const name = path.basename(originalName, ext);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${name}-${timestamp}-${random}${ext}`;
}

// بررسی و اعتبارسنجی فایل
export function validateFile(file: File): { valid: boolean; message?: string } {
  // بررسی وجود فایل
  if (!file) {
    return { valid: false, message: "فایلی ارسال نشده است" };
  }

  // بررسی نوع فایل (فقط تصاویر)
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: "فقط فایل‌های تصویری (jpg, png, webp) مجاز هستند",
    };
  }

  // بررسی حجم فایل (حداکثر 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      message: "حجم فایل نباید بیشتر از 5 مگابایت باشد",
    };
  }

  return { valid: true };
}

// ذخیره فایل
export async function saveFile(file: File): Promise<{ url: string; fileName: string }> {
  // ایجاد پوشه uploads اگر وجود نداشته باشد
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }

  // تبدیل File به Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // ایجاد نام یکتا برای فایل
  const fileName = generateUniqueFileName(file.name);
  const filePath = path.join(UPLOAD_DIR, fileName);

  // ذخیره فایل
  await writeFile(filePath, buffer);

  // برگرداندن URL فایل
  const fileUrl = `/uploads/${fileName}`;

  return { url: fileUrl, fileName };
}

