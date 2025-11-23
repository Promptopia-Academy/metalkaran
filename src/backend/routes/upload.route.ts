import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "../services/upload.service";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "فایلی ارسال نشده است" },
        { status: 400 }
      );
    }

    // آپلود فایل
    const result = await uploadFile(file);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in upload API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در آپلود فایل. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 }
    );
  }
}

