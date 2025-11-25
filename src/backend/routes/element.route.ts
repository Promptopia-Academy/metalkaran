import { NextRequest, NextResponse } from "next/server";
import {
  getAllElements,
  getElement,
  createElement,
  updateElementById,
  deleteElementById,
} from "../services/element.service";
import { requireAuth } from "../lib/auth";
import { elementSchema, elementUpdateSchema } from "@/validation/validations";
import { logger } from "../lib/logger";
import { parsePaginationParams } from "../utils/pagination";

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const result = await getElement(parseInt(id));
      const duration = Date.now() - startTime;
      logger.request(
        "GET",
        `/api/element?id=${id}`,
        result.success ? 200 : 404,
        duration
      );

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

    const paginationParams = parsePaginationParams(searchParams);
    const result = await getAllElements(paginationParams);

    const duration = Date.now() - startTime;
    logger.request(
      "GET",
      "/api/element",
      result.success ? 200 : 500,
      duration,
      {
        paginated: !!paginationParams,
      }
    );

    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Error in element API GET", error as Error);
    logger.request("GET", "/api/element", 500, duration);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در پردازش درخواست",
      },
      { status: 500 }
    );
  }
}

export const POST = requireAuth(async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();

    const validatedData = elementSchema.parse(body);

    const result = await createElement(validatedData);

    const duration = Date.now() - startTime;
    logger.request(
      "POST",
      "/api/element",
      result.success ? 201 : 400,
      duration
    );

    return NextResponse.json(result, {
      status: result.success ? 201 : 400,
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "ZodError"
    ) {
      logger.warn("Element validation failed", { error });
      logger.request("POST", "/api/element", 400, duration);

      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات وارد شده معتبر نیست",
          errors: error,
        },
        { status: 400 }
      );
    }

    logger.error("Error in element API POST", error as Error);
    logger.request("POST", "/api/element", 500, duration);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ایجاد element",
      },
      { status: 500 }
    );
  }
});

export const PUT = requireAuth(async function PUT(request: NextRequest) {
  const startTime = Date.now();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      const duration = Date.now() - startTime;
      logger.request("PUT", "/api/element", 400, duration);

      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const validatedData = elementUpdateSchema.parse(body);

    const result = await updateElementById(parseInt(id), validatedData);

    const duration = Date.now() - startTime;
    logger.request(
      "PUT",
      `/api/element?id=${id}`,
      result.success ? 200 : 404,
      duration
    );

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "ZodError"
    ) {
      logger.warn("Element update validation failed", { error });
      logger.request("PUT", "/api/element", 400, duration);

      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات وارد شده معتبر نیست",
          errors: error,
        },
        { status: 400 }
      );
    }

    logger.error("Error in element API PUT", error as Error);
    logger.request("PUT", "/api/element", 500, duration);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در آپدیت element",
      },
      { status: 500 }
    );
  }
});

export const DELETE = requireAuth(async function DELETE(request: NextRequest) {
  const startTime = Date.now();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      const duration = Date.now() - startTime;
      logger.request("DELETE", "/api/element", 400, duration);

      return NextResponse.json(
        {
          success: false,
          message: "ID is required",
        },
        { status: 400 }
      );
    }

    const result = await deleteElementById(parseInt(id));

    const duration = Date.now() - startTime;
    logger.request(
      "DELETE",
      `/api/element?id=${id}`,
      result.success ? 200 : 404,
      duration
    );

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Error in element API DELETE", error as Error);
    logger.request("DELETE", "/api/element", 500, duration);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در حذف element",
      },
      { status: 500 }
    );
  }
});
