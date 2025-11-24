/**
 * Database operations for Articles
 * عملیات دیتابیس برای مقالات
 */

import { prisma } from "@/lib/prisma";
import { IArticle } from "@/types/type";
import { logger } from "../../lib/logger";

export async function getArticles(
  paginationParams?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }
): Promise<{
  data: IArticle[];
  total: number;
}> {
  try {
    const page = paginationParams?.page || 1;
    const limit = paginationParams?.limit || 10;
    const search = paginationParams?.search || "";
    const sortBy = paginationParams?.sortBy || "id";
    const sortOrder = paginationParams?.sortOrder || "desc";

    const skip = (page - 1) * limit;

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { title: { contains: search } },
            { introduction: { contains: search } },
            { content1: { contains: search } },
            { content2: { contains: search } },
            { content3: { contains: search } },
          ],
        }
      : {};

    // Build orderBy
    const orderBy: any = {};
    if (sortBy === "title") {
      orderBy.title = sortOrder;
    } else if (sortBy === "createdAt") {
      orderBy.createdAt = sortOrder;
    } else {
      orderBy.id = sortOrder;
    }

    // Get total count
    const total = await prisma.article.count({ where });

    // Get paginated data
    const articles = await prisma.article.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    return {
      data: articles.map((article) => ({
      id: article.id,
      image: article.image || "",
      title: article.title,
      introduction: article.introduction,
      title1: article.title1,
      content1: article.content1,
      title2: article.title2 || "",
      content2: article.content2 || "",
      title3: article.title3 || "",
      content3: article.content3 || "",
      title4: article.title4 || "",
      content4: article.content4 || "",
      title5: article.title5 || "",
      content5: article.content5 || "",
      sources: article.sources || "",
    })),
      total,
    };
  } catch (error) {
    logger.error("Error getting articles from database", error as Error);
    throw error;
  }
}

export async function getArticleById(id: number): Promise<IArticle | null> {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return null;
    }

    return {
      id: article.id,
      image: article.image || "",
      title: article.title,
      introduction: article.introduction,
      title1: article.title1,
      content1: article.content1,
      title2: article.title2 || "",
      content2: article.content2 || "",
      title3: article.title3 || "",
      content3: article.content3 || "",
      title4: article.title4 || "",
      content4: article.content4 || "",
      title5: article.title5 || "",
      content5: article.content5 || "",
      sources: article.sources || "",
    };
  } catch (error) {
    logger.error("Error getting article by ID from database", error as Error);
    throw error;
  }
}

export async function saveArticle(
  article: Omit<IArticle, "id">
): Promise<IArticle> {
  try {
    const newArticle = await prisma.article.create({
      data: {
        image: article.image || null,
        title: article.title,
        introduction: article.introduction,
        title1: article.title1,
        content1: article.content1,
        title2: article.title2 || null,
        content2: article.content2 || null,
        title3: article.title3 || null,
        content3: article.content3 || null,
        title4: article.title4 || null,
        content4: article.content4 || null,
        title5: article.title5 || null,
        content5: article.content5 || null,
        sources: article.sources || null,
      },
    });

    return {
      id: newArticle.id,
      image: newArticle.image || "",
      title: newArticle.title,
      introduction: newArticle.introduction,
      title1: newArticle.title1,
      content1: newArticle.content1,
      title2: newArticle.title2 || "",
      content2: newArticle.content2 || "",
      title3: newArticle.title3 || "",
      content3: newArticle.content3 || "",
      title4: newArticle.title4 || "",
      content4: newArticle.content4 || "",
      title5: newArticle.title5 || "",
      content5: newArticle.content5 || "",
      sources: newArticle.sources || "",
    };
  } catch (error) {
    logger.error("Error saving article to database", error as Error);
    throw error;
  }
}

export async function updateArticle(
  id: number,
  article: Partial<Omit<IArticle, "id">>
): Promise<IArticle | null> {
  try {
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        ...(article.image !== undefined && { image: article.image || null }),
        ...(article.title !== undefined && { title: article.title }),
        ...(article.introduction !== undefined && {
          introduction: article.introduction,
        }),
        ...(article.title1 !== undefined && { title1: article.title1 }),
        ...(article.content1 !== undefined && { content1: article.content1 }),
        ...(article.title2 !== undefined && { title2: article.title2 || null }),
        ...(article.content2 !== undefined && {
          content2: article.content2 || null,
        }),
        ...(article.title3 !== undefined && { title3: article.title3 || null }),
        ...(article.content3 !== undefined && {
          content3: article.content3 || null,
        }),
        ...(article.title4 !== undefined && { title4: article.title4 || null }),
        ...(article.content4 !== undefined && {
          content4: article.content4 || null,
        }),
        ...(article.title5 !== undefined && { title5: article.title5 || null }),
        ...(article.content5 !== undefined && {
          content5: article.content5 || null,
        }),
        ...(article.sources !== undefined && { sources: article.sources || null }),
      },
    });

    return {
      id: updatedArticle.id,
      image: updatedArticle.image || "",
      title: updatedArticle.title,
      introduction: updatedArticle.introduction,
      title1: updatedArticle.title1,
      content1: updatedArticle.content1,
      title2: updatedArticle.title2 || "",
      content2: updatedArticle.content2 || "",
      title3: updatedArticle.title3 || "",
      content3: updatedArticle.content3 || "",
      title4: updatedArticle.title4 || "",
      content4: updatedArticle.content4 || "",
      title5: updatedArticle.title5 || "",
      content5: updatedArticle.content5 || "",
      sources: updatedArticle.sources || "",
    };
  } catch (error) {
    logger.error("Error updating article in database", error as Error);
    if ((error as any).code === "P2025") {
      // Record not found
      return null;
    }
    throw error;
  }
}

export async function deleteArticle(id: number): Promise<boolean> {
  try {
    await prisma.article.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    logger.error("Error deleting article from database", error as Error);
    if ((error as any).code === "P2025") {
      // Record not found
      return false;
    }
    throw error;
  }
}

