import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export function generateUniqueFileName(originalName: string): string {
  const ext = path.extname(originalName);
  const name = path.basename(originalName, ext);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${name}-${timestamp}-${random}${ext}`;
}

export function validateFile(file: File): { valid: boolean; message?: string } {
  if (!file) {
    return { valid: false, message: "فایلی ارسال نشده است" };
  }

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: "فقط فایل‌های تصویری (jpg, png, webp) مجاز هستند",
    };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      message: "حجم فایل نباید بیشتر از 5 مگابایت باشد",
    };
  }

  return { valid: true };
}

export async function saveFile(
  file: File
): Promise<{ url: string; fileName: string }> {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = generateUniqueFileName(file.name);
  const filePath = path.join(UPLOAD_DIR, fileName);

  await writeFile(filePath, buffer);

  const fileUrl = `/uploads/${fileName}`;

  return { url: fileUrl, fileName };
}
