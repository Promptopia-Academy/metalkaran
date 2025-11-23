import { IElement, IElementServiceResponse } from "@/types/type";
import {
  getElements,
  getElementById,
  saveElement,
  updateElement,
  deleteElement,
} from "../utils/element-storage";

export async function getAllElements(): Promise<IElementServiceResponse> {
  try {
    const elements = await getElements();
    return {
      success: true,
      message: "Elements retrieved successfully",
      data: elements,
    };
  } catch (error) {
    console.error("Error getting elements:", error);
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
    console.error("Error getting element:", error);
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
    return {
      success: true,
      message: "Element created successfully",
      data: newElement,
    };
  } catch (error) {
    console.error("Error creating element:", error);
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
    console.error("Error updating element:", error);
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
      return {
        success: false,
        message: "Element not found",
      };
    }
    return {
      success: true,
      message: "Element deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting element:", error);
    return {
      success: false,
      message: "خطا در حذف element",
    };
  }
}
