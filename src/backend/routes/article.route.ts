import { NextRequest, NextResponse } from "next/server";
import {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticleById,
  deleteArticleById,
} from "../services/article.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const result = await getArticle(parseInt(id));
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

    const result = await getAllArticles();
    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });
  } catch (error) {
    console.error("Error in article API:", error);
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
    const result = await createArticle(body);

    return NextResponse.json(result, {
      status: result.success ? 201 : 400,
    });
  } catch (error) {
    console.error("Error in article API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد article",
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
    const result = await updateArticleById(parseInt(id), body);

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error("Error in article API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در آپدیت article",
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

    const result = await deleteArticleById(parseInt(id));

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    console.error("Error in article API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در حذف article",
      },
      { status: 500 }
    );
  }
}
