import { IElement, IElementServiceResponse } from "@/types/type";
import {
  getElements,
  getElementById,
  saveElement,
  updateElement,
  deleteElement,
} from "../utils/element-storage";
import { logger } from "../lib/logger";
import { PaginationParams, PaginatedResponse } from "../utils/pagination";

export async function getAllElements(
  paginationParams?: PaginationParams
): Promise<
  IElementServiceResponse & {
    pagination?: PaginatedResponse<IElement>["pagination"];
  }
> {
  try {
    const params = paginationParams || { page: 1, limit: 100 };
    const result = await getElements(params);

    if (paginationParams) {
      const totalPages = Math.ceil(result.total / paginationParams.limit);
      const pagination = {
        page: paginationParams.page,
        limit: paginationParams.limit,
        total: result.total,
        totalPages,
        hasNext: paginationParams.page < totalPages,
        hasPrev: paginationParams.page > 1,
      };

      logger.info("Elements retrieved with pagination", {
        total: result.total,
        page: paginationParams.page,
      });

      return {
        success: true,
        message: "Elements retrieved successfully",
        data: result.data,
        pagination,
      };
    }

    logger.info("All elements retrieved", { count: result.data.length });
    return {
      success: true,
      message: "Elements retrieved successfully",
      data: result.data,
    };
  } catch (error) {
    logger.error("Error getting elements", error as Error);
    return {
      success: false,
      message: "خطا در دریافت اطلاعات",
    };
  }
}

export async function getElement(id: number): Promise<IElementServiceResponse> {
  try {
    const element = await getElementById(id);
    if (!element) {
      return {
        success: false,
        message: "Element not found",
      };
    }
    return {
      success: true,
      message: "Element retrieved successfully",
      data: element,
    };
  } catch (error) {
    logger.error("Error getting element", error as Error, { id });
    return {
      success: false,
      message: "خطا در دریافت اطلاعات",
    };
  }
}

export async function createElement(
  element: Omit<IElement, "id">
): Promise<IElementServiceResponse> {
  try {
    const newElement = await saveElement(element);
    logger.info("Element created successfully", {
      id: newElement.id,
      title: newElement.title,
    });
    return {
      success: true,
      message: "Element created successfully",
      data: newElement,
    };
  } catch (error) {
    logger.error("Error creating element", error as Error);
    return {
      success: false,
      message: "خطا در ایجاد element",
    };
  }
}

export async function updateElementById(
  id: number,
  element: Partial<Omit<IElement, "id">>
): Promise<IElementServiceResponse> {
  try {
    const updatedElement = await updateElement(id, element);
    if (!updatedElement) {
      return {
        success: false,
        message: "Element not found",
      };
    }
    return {
      success: true,
      message: "Element updated successfully",
      data: updatedElement,
    };
  } catch (error) {
    logger.error("Error updating element", error as Error, { id });
    return {
      success: false,
      message: "خطا در آپدیت element",
    };
  }
}

export async function deleteElementById(
  id: number
): Promise<IElementServiceResponse> {
  try {
    const deleted = await deleteElement(id);
    if (!deleted) {
      logger.warn("Element not found for deletion", { id });
      return {
        success: false,
        message: "Element not found",
      };
    }
    logger.info("Element deleted successfully", { id });
    return {
      success: true,
      message: "Element deleted successfully",
    };
  } catch (error) {
    logger.error("Error deleting element", error as Error, { id });
    return {
      success: false,
      message: "خطا در حذف element",
    };
  }
}
