import { ARTICLE_ITEMS } from "@/lib/constants";
import ArticleCard from "@/components/articles/article-card/ArticleCard";
import { getArticles } from "@/lib/cms/articleApi";
import { IArticle } from "@/types/type";

const ArticlesPage = async () => {
  const articles = await getArticles({
    page: 1,
    limit: 10,
    search: undefined,
  });
  console.log(articles);
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12">
      <section className="w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {articles.data?.map((article: IArticle) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};
export default ArticlesPage;
