import { prisma } from "@/lib/prisma";
import { IContact } from "@/types/type";
import { logger } from "../../lib/logger";

export async function getContacts(): Promise<IContact[]> {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });

    return contacts.map((contact) => ({
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      company: contact.company,
      createdAt: contact.createdAt.toISOString(),
    }));
  } catch (error) {
    logger.error("Error getting contacts from database", error as Error);
    throw error;
  }
}

export async function saveContact(
  contact: Omit<IContact, "id" | "createdAt">
): Promise<IContact> {
  try {
    const newContact = await prisma.contact.create({
      data: {
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        company: contact.company,
      },
    });

    return {
      id: newContact.id,
      name: newContact.name,
      phone: newContact.phone,
      email: newContact.email,
      company: newContact.company,
      createdAt: newContact.createdAt.toISOString(),
    };
  } catch (error) {
    logger.error("Error saving contact to database", error as Error);
    throw error;
  }
}
