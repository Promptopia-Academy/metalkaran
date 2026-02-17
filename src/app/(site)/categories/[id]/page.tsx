import { notFound } from "next/navigation";
import { ICategoryPageProps } from "@/types/type";
import CardElement from "@/components/cards/CardElement";
import { getCategories } from "@/lib/cms/categoryApi";
import { ICategory, IProduct } from "@/types/type";
import { getProducts } from "@/lib/cms/producstsApi";

export default async function CategoryPage({ params }: ICategoryPageProps) {
  const { slug } = params;
  const categories = await getCategories();
  const category = categories.find((c: ICategory) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const products = (await getProducts()).data.filter(
    (product: IProduct) => product.category?.slug === slug,
  );

  console.log(products);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12">
      <section className="w-full max-w-[1600px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8" dir="rtl">
          {category.title}
        </h1>
        {products.length === 0 ? (
          <p className="text-muted-foreground text-center py-12" dir="rtl">
            محصولی در این دسته‌بندی یافت نشد.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <CardElement key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
