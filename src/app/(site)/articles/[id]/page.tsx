import { IPageProps } from "@/types/type";
import { notFound } from "next/navigation";
import ArticleTexts from "@/components/articles/ArticleTexts";
import { getArticleByIdForSite } from "@/lib/cms/articleApi";
import { IArticle } from "@/types/type";

const ArticleDetailPage = async ({ params }: IPageProps) => {
  const { id } = await params;
  const articleId = Number(id);
  const article = (await getArticleByIdForSite(articleId)) as IArticle | null;
  if (!article) {
    notFound();
  }
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-36 py-10 md:py-16">
      <ArticleTexts article={article} dir="rtl" />
    </div>
  );
};

export default ArticleDetailPage;
