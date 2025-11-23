import { IArticle, IArticleServiceResponse } from "@/types/type";
import {
  getArticles,
  getArticleById,
  saveArticle,
  updateArticle,
  deleteArticle,
} from "../utils/article-storage";

export async function getAllArticles(): Promise<IArticleServiceResponse> {
  try {
    const articles = await getArticles();
    return {
      success: true,
      message: "Articles retrieved successfully",
      data: articles,
    };
  } catch (error) {
    console.error("Error getting articles:", error);
    return {
      success: false,
      message: "خطا در دریافت اطلاعات",
    };
  }
}

export async function getArticle(id: number): Promise<IArticleServiceResponse> {
  try {
    const article = await getArticleById(id);
    if (!article) {
      return {
        success: false,
        message: "Article not found",
      };
    }
    return {
      success: true,
      message: "Article retrieved successfully",
      data: article,
    };
  } catch (error) {
    console.error("Error getting article:", error);
    return {
      success: false,
      message: "خطا در دریافت اطلاعات",
    };
  }
}

export async function createArticle(
  article: Omit<IArticle, "id">
): Promise<IArticleServiceResponse> {
  try {
    const newArticle = await saveArticle(article);
    return {
      success: true,
      message: "Article created successfully",
      data: newArticle,
    };
  } catch (error) {
    console.error("Error creating article:", error);
    return {
      success: false,
      message: "خطا در ایجاد article",
    };
  }
}

export async function updateArticleById(
  id: number,
  article: Partial<Omit<IArticle, "id">>
): Promise<IArticleServiceResponse> {
  try {
    const updatedArticle = await updateArticle(id, article);
    if (!updatedArticle) {
      return {
        success: false,
        message: "Article not found",
      };
    }
    return {
      success: true,
      message: "Article updated successfully",
      data: updatedArticle,
    };
  } catch (error) {
    console.error("Error updating article:", error);
    return {
      success: false,
      message: "خطا در آپدیت article",
    };
  }
}

export async function deleteArticleById(
  id: number
): Promise<IArticleServiceResponse> {
  try {
    const deleted = await deleteArticle(id);
    if (!deleted) {
      return {
        success: false,
        message: "Article not found",
      };
    }
    return {
      success: true,
      message: "Article deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting article:", error);
    return {
      success: false,
      message: "خطا در حذف article",
    };
  }
}
