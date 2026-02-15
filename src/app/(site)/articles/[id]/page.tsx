import { IPageProps } from "@/types/type";
import { notFound } from "next/navigation";
import { ARTICLE_ITEMS } from "@/lib/constants";
import ArticleTexts from "@/components/articles/ArticleTexts";

const ArticleDetailPage = async ({ params }: IPageProps) => {
  const { id } = params;
  const articleId = Number(id);
  const article = ARTICLE_ITEMS.find((a) => a.id === articleId);

  if (!article || Number.isNaN(articleId)) {
    notFound();
  }

  return (
    <div
      className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-36 py-10 md:py-16"
      dir="rtl"
    >
      <ArticleTexts article={article} dir="rtl" />
    </div>
  );
};

export default ArticleDetailPage;
