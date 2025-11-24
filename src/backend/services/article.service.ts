import { IArticle, IArticleServiceResponse } from "@/types/type";
import {
  getArticles,
  getArticleById,
  saveArticle,
  updateArticle,
  deleteArticle,
} from "../utils/article-storage";
import { logger } from "../lib/logger";
import { PaginationParams, PaginatedResponse, paginate } from "../utils/pagination";

export async function getAllArticles(
  paginationParams?: PaginationParams
): Promise<IArticleServiceResponse & { pagination?: PaginatedResponse<IArticle>["pagination"] }> {
  try {
    // Use pagination params or default values
    const params = paginationParams || { page: 1, limit: 100 };
    const result = await getArticles(params);
    
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
      
      logger.info("Articles retrieved with pagination", {
        total: result.total,
        page: paginationParams.page,
      });
      
      return {
        success: true,
        message: "Articles retrieved successfully",
        data: result.data,
        pagination,
      };
    }
    
    logger.info("All articles retrieved", { count: result.data.length });
    return {
      success: true,
      message: "Articles retrieved successfully",
      data: result.data,
    };
  } catch (error) {
    logger.error("Error getting articles", error as Error);
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
    logger.error("Error getting article", error as Error, { id });
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
    logger.info("Article created successfully", { id: newArticle.id, title: newArticle.title });
    return {
      success: true,
      message: "Article created successfully",
      data: newArticle,
    };
  } catch (error) {
    logger.error("Error creating article", error as Error);
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
    logger.error("Error updating article", error as Error, { id });
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
      logger.warn("Article not found for deletion", { id });
      return {
        success: false,
        message: "Article not found",
      };
    }
    logger.info("Article deleted successfully", { id });
    return {
      success: true,
      message: "Article deleted successfully",
    };
  } catch (error) {
    logger.error("Error deleting article", error as Error, { id });
    return {
      success: false,
      message: "خطا در حذف article",
    };
  }
}
