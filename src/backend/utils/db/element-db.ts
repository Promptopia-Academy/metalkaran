import { prisma } from "@/lib/prisma";
import { IElement } from "@/types/type";
import { logger } from "../../lib/logger";

export async function getElements(paginationParams?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<{
  data: IElement[];
  total: number;
}> {
  try {
    const page = paginationParams?.page || 1;
    const limit = paginationParams?.limit || 10;
    const search = paginationParams?.search || "";
    const sortBy = paginationParams?.sortBy || "id";
    const sortOrder = paginationParams?.sortOrder || "desc";

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { title: { contains: search } },
            { introduction: { contains: search } },
            { usage: { contains: search } },
          ],
        }
      : {};

    const orderBy: any = {};
    if (sortBy === "title") {
      orderBy.title = sortOrder;
    } else if (sortBy === "createdAt") {
      orderBy.createdAt = sortOrder;
    } else {
      orderBy.id = sortOrder;
    }

    const total = await prisma.element.count({ where });

    const elements = await prisma.element.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    return {
      data: elements.map((element) => ({
        id: element.id,
        image: element.image || "",
        title: element.title,
        introduction: element.introduction,
        usage: element.usage,
        standards: element.standards || "",
        chemicalComposition: element.chemicalComposition || "",
        physicalProperties: element.physicalProperties || "",
        thermalExpansion: element.thermalExpansion || "",
        corrosionResistance: element.corrosionResistance || "",
        heatResistance: element.heatResistance || "",
        manufacturing: element.manufacturing || "",
        hotForming: element.hotForming || "",
        coldForming: element.coldForming || "",
        welding: element.welding || "",
        machining: element.machining || "",
      })),
      total,
    };
  } catch (error) {
    logger.error("Error getting elements from database", error as Error);
    throw error;
  }
}

export async function getElementById(id: number): Promise<IElement | null> {
  try {
    const element = await prisma.element.findUnique({
      where: { id },
    });

    if (!element) {
      return null;
    }

    return {
      id: element.id,
      image: element.image || "",
      title: element.title,
      introduction: element.introduction,
      usage: element.usage,
      standards: element.standards || "",
      chemicalComposition: element.chemicalComposition || "",
      physicalProperties: element.physicalProperties || "",
      thermalExpansion: element.thermalExpansion || "",
      corrosionResistance: element.corrosionResistance || "",
      heatResistance: element.heatResistance || "",
      manufacturing: element.manufacturing || "",
      hotForming: element.hotForming || "",
      coldForming: element.coldForming || "",
      welding: element.welding || "",
      machining: element.machining || "",
    };
  } catch (error) {
    logger.error("Error getting element by ID from database", error as Error);
    throw error;
  }
}

export async function saveElement(
  element: Omit<IElement, "id">
): Promise<IElement> {
  try {
    const newElement = await prisma.element.create({
      data: {
        image: element.image || null,
        title: element.title,
        introduction: element.introduction,
        usage: element.usage,
        standards: element.standards || null,
        chemicalComposition: element.chemicalComposition || null,
        physicalProperties: element.physicalProperties || null,
        thermalExpansion: element.thermalExpansion || null,
        corrosionResistance: element.corrosionResistance || null,
        heatResistance: element.heatResistance || null,
        manufacturing: element.manufacturing || null,
        hotForming: element.hotForming || null,
        coldForming: element.coldForming || null,
        welding: element.welding || null,
        machining: element.machining || null,
      },
    });

    return {
      id: newElement.id,
      image: newElement.image || "",
      title: newElement.title,
      introduction: newElement.introduction,
      usage: newElement.usage,
      standards: newElement.standards || "",
      chemicalComposition: newElement.chemicalComposition || "",
      physicalProperties: newElement.physicalProperties || "",
      thermalExpansion: newElement.thermalExpansion || "",
      corrosionResistance: newElement.corrosionResistance || "",
      heatResistance: newElement.heatResistance || "",
      manufacturing: newElement.manufacturing || "",
      hotForming: newElement.hotForming || "",
      coldForming: newElement.coldForming || "",
      welding: newElement.welding || "",
      machining: newElement.machining || "",
    };
  } catch (error) {
    logger.error("Error saving element to database", error as Error);
    throw error;
  }
}

export async function updateElement(
  id: number,
  element: Partial<Omit<IElement, "id">>
): Promise<IElement | null> {
  try {
    const updatedElement = await prisma.element.update({
      where: { id },
      data: {
        ...(element.image !== undefined && { image: element.image || null }),
        ...(element.title !== undefined && { title: element.title }),
        ...(element.introduction !== undefined && {
          introduction: element.introduction,
        }),
        ...(element.usage !== undefined && { usage: element.usage }),
        ...(element.standards !== undefined && {
          standards: element.standards || null,
        }),
        ...(element.chemicalComposition !== undefined && {
          chemicalComposition: element.chemicalComposition || null,
        }),
        ...(element.physicalProperties !== undefined && {
          physicalProperties: element.physicalProperties || null,
        }),
        ...(element.thermalExpansion !== undefined && {
          thermalExpansion: element.thermalExpansion || null,
        }),
        ...(element.corrosionResistance !== undefined && {
          corrosionResistance: element.corrosionResistance || null,
        }),
        ...(element.heatResistance !== undefined && {
          heatResistance: element.heatResistance || null,
        }),
        ...(element.manufacturing !== undefined && {
          manufacturing: element.manufacturing || null,
        }),
        ...(element.hotForming !== undefined && {
          hotForming: element.hotForming || null,
        }),
        ...(element.coldForming !== undefined && {
          coldForming: element.coldForming || null,
        }),
        ...(element.welding !== undefined && {
          welding: element.welding || null,
        }),
        ...(element.machining !== undefined && {
          machining: element.machining || null,
        }),
      },
    });

    return {
      id: updatedElement.id,
      image: updatedElement.image || "",
      title: updatedElement.title,
      introduction: updatedElement.introduction,
      usage: updatedElement.usage,
      standards: updatedElement.standards || "",
      chemicalComposition: updatedElement.chemicalComposition || "",
      physicalProperties: updatedElement.physicalProperties || "",
      thermalExpansion: updatedElement.thermalExpansion || "",
      corrosionResistance: updatedElement.corrosionResistance || "",
      heatResistance: updatedElement.heatResistance || "",
      manufacturing: updatedElement.manufacturing || "",
      hotForming: updatedElement.hotForming || "",
      coldForming: updatedElement.coldForming || "",
      welding: updatedElement.welding || "",
      machining: updatedElement.machining || "",
    };
  } catch (error) {
    logger.error("Error updating element in database", error as Error);
    if ((error as any).code === "P2025") {
      return null;
    }
    throw error;
  }
}

export async function deleteElement(id: number): Promise<boolean> {
  try {
    await prisma.element.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    logger.error("Error deleting element from database", error as Error);
    if ((error as any).code === "P2025") {
      return false;
    }
    throw error;
  }
}
