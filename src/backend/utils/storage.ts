import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { IContact } from "@/types/type";

const DATA_DIR = path.join(process.cwd(), "data");
const IContactS_FILE = path.join(DATA_DIR, "IContacts.json");

export async function getContacts(): Promise<IContact[]> {
  if (!existsSync(IContactS_FILE)) {
    return [];
  }
  try {
    const fileContent = await readFile(IContactS_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

export async function saveContact(
  IContact: Omit<IContact, "id" | "createdAt">
): Promise<IContact> {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }

  const IContacts = await getContacts();
  const newIContact: IContact = {
    id: Date.now().toString(),
    ...IContact,
    createdAt: new Date().toISOString(),
  };
  IContacts.push(newIContact);

  await writeFile(IContactS_FILE, JSON.stringify(IContacts, null, 2), "utf-8");
  return newIContact;
}
