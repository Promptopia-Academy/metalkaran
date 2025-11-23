import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// مسیر ذخیره داده‌ها
const DATA_DIR = path.join(process.cwd(), "data");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  createdAt: string;
}

// تابع برای خواندن contacts
export async function getContacts(): Promise<Contact[]> {
  if (!existsSync(CONTACTS_FILE)) {
    return [];
  }
  try {
    const fileContent = await readFile(CONTACTS_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

// تابع برای ذخیره contact
export async function saveContact(contact: Omit<Contact, "id" | "createdAt">): Promise<Contact> {
  // ایجاد پوشه data اگر وجود نداشته باشد
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }

  const contacts = await getContacts();
  const newContact: Contact = {
    id: Date.now().toString(),
    ...contact,
    createdAt: new Date().toISOString(),
  };
  contacts.push(newContact);

  await writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf-8");
  return newContact;
}

