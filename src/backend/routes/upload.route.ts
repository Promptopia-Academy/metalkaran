import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "../services/upload.service";
import { requireAuth } from "../lib/auth";
import { logger } from "../lib/logger";

// POST - Protected endpoint
export const POST = requireAuth(async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      const duration = Date.now() - startTime;
      logger.request("POST", "/api/upload", 400, duration);
      
      return NextResponse.json(
        { success: false, message: "فایلی ارسال نشده است" },
        { status: 400 }
      );
    }

    const result = await uploadFile(file);

    if (!result.success) {
      const duration = Date.now() - startTime;
      logger.request("POST", "/api/upload", 400, duration);
      
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 400 }
      );
    }

    const duration = Date.now() - startTime;
    logger.request("POST", "/api/upload", 200, duration, {
      fileName: result.data?.fileName,
      fileSize: result.data?.size,
    });
    
    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Error in upload API", error as Error);
    logger.request("POST", "/api/upload", 500, duration);
    
    return NextResponse.json(
      {
        success: false,
        message: "خطا در آپلود فایل. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 }
    );
  }
});
