import { NextRequest, NextResponse } from "next/server";
import {
  getAllElements,
  getElement,
  createElement,
  updateElementById,
  deleteElementById,
} from "../services/element.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const result = await getElement(parseInt(id));
      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            message: result.message,
          },
          { status: 404 }
        );
      }
      return NextResponse.json(result);
    }

    const result = await getAllElements();
    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });
  } catch (error) {
    console.error("Error in element API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در پردازش درخواست",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await createElement(body);

    return NextResponse.json(result, {
      status: result.success ? 201 : 400,
    });
  } catch (error) {
    console.error("Error in element API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد element",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const result = await updateElementById(parseInt(id), body);

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error("Error in element API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در آپدیت element",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 }
      );
    }

    const result = await deleteElementById(parseInt(id));

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error("Error in element API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در حذف element",
      },
      { status: 500 }
    );
  }
}
