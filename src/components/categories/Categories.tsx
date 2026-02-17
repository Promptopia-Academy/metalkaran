import Link from "next/link";
import { CategoryItem } from "./CategoryItem";
import { CATEGORIES_ARRAY } from "@/lib/constants";
import type { ICategory } from "@/types/type";

type CategoryGridProps = {
  categories?: ICategory[] | null;
};

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const list = categories?.length ? categories : CATEGORIES_ARRAY;
  return (
    <section className="py-8 md:py-12 px-4">
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8"
        dir="rtl"
      >
        دسته بندی محصولات
      </h2>

      <div className="container gap-20 mx-auto flex flex-wrap justify-center items-center place-items-center sm:gap-6 md:gap-8 lg:gap-10 p-2 md:p-4 w-full max-w-6xl">
        {list.map((item) => (
          <Link
            key={item.id}
            href={`/categories/${item.slug}`}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl sm:mx-4 "
          >
            <CategoryItem category={item} />
          </Link>
        ))}
      </div>
    </section>
  );
}
