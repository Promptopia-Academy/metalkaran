import { validateFile, saveFile } from "../utils/file-utils";

export interface UploadServiceResponse {
  success: boolean;
  message: string;
  data?: {
    url: string;
    fileName: string;
    size: number;
    type: string;
  };
}

// آپلود فایل
export async function uploadFile(file: File): Promise<UploadServiceResponse> {
  try {
    // اعتبارسنجی فایل
    const validation = validateFile(file);
    if (!validation.valid) {
      return {
        success: false,
        message: validation.message || "فایل معتبر نیست",
      };
    }

    // ذخیره فایل
    const { url, fileName } = await saveFile(file);

    return {
      success: true,
      message: "عکس با موفقیت آپلود شد",
      data: {
        url,
        fileName,
        size: file.size,
        type: file.type,
      },
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      success: false,
      message: "خطا در آپلود فایل. لطفاً دوباره تلاش کنید.",
    };
  }
}

