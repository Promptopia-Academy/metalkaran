import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { IArticle } from "@/types/type";

const DATA_DIR = path.join(process.cwd(), "data");
const ARTICLES_FILE = path.join(DATA_DIR, "articles.json");

export async function getArticles(): Promise<IArticle[]> {
  if (!existsSync(ARTICLES_FILE)) {
    return [];
  }
  try {
    const fileContent = await readFile(ARTICLES_FILE, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

export async function getArticleById(id: number): Promise<IArticle | null> {
  const articles = await getArticles();
  return articles.find((article) => article.id === id) || null;
}

export async function saveArticle(
  article: Omit<IArticle, "id">
): Promise<IArticle> {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }

  const articles = await getArticles();

  const newId =
    articles.length > 0 ? Math.max(...articles.map((a) => a.id)) + 1 : 1;

  const newArticle: IArticle = {
    id: newId,
    ...article,
  };
  articles.push(newArticle);

  await writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2), "utf-8");
  return newArticle;
}

export async function updateArticle(
  id: number,
  article: Partial<Omit<IArticle, "id">>
): Promise<IArticle | null> {
  const articles = await getArticles();
  const index = articles.findIndex((a) => a.id === id);

  if (index === -1) {
    return null;
  }

  articles[index] = { ...articles[index], ...article };
  await writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2), "utf-8");
  return articles[index];
}

export async function deleteArticle(id: number): Promise<boolean> {
  const articles = await getArticles();
  const filteredArticles = articles.filter((a) => a.id !== id);

  if (filteredArticles.length === articles.length) {
    return false;
  }

  await writeFile(
    ARTICLES_FILE,
    JSON.stringify(filteredArticles, null, 2),
    "utf-8"
  );
  return true;
}
