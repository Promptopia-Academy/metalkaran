import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { IElement } from "@/types/type";

const DATA_DIR = path.join(process.cwd(), "data");
const ELEMENTS_FILE = path.join(DATA_DIR, "elements.json");

export async function getElements(): Promise<IElement[]> {
  if (!existsSync(ELEMENTS_FILE)) {
    return [];
  }
  try {
    const fileContent = await readFile(ELEMENTS_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

export async function getElementById(id: number): Promise<IElement | null> {
  const elements = await getElements();
  return elements.find((element) => element.id === id) || null;
}

export async function saveElement(
  element: Omit<IElement, "id">
): Promise<IElement> {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }

  const elements = await getElements();

  const newId =
    elements.length > 0 ? Math.max(...elements.map((e) => e.id)) + 1 : 1;

  const newElement: IElement = {
    id: newId,
    ...element,
  };
  elements.push(newElement);

  await writeFile(ELEMENTS_FILE, JSON.stringify(elements, null, 2), "utf-8");
  return newElement;
}

export async function updateElement(
  id: number,
  element: Partial<Omit<IElement, "id">>
): Promise<IElement | null> {
  const elements = await getElements();
  const index = elements.findIndex((e) => e.id === id);

  if (index === -1) {
    return null;
  }

  elements[index] = { ...elements[index], ...element };
  await writeFile(ELEMENTS_FILE, JSON.stringify(elements, null, 2), "utf-8");
  return elements[index];
}

export async function deleteElement(id: number): Promise<boolean> {
  const elements = await getElements();
  const filteredElements = elements.filter((e) => e.id !== id);

  if (filteredElements.length === elements.length) {
    return false;
  }

  await writeFile(
    ELEMENTS_FILE,
    JSON.stringify(filteredElements, null, 2),
    "utf-8"
  );
  return true;
}
