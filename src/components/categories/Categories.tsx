import Link from "next/link";
import { CategoryItem } from "./CategoryItem";
import { CATEGORIES_ARRAY } from "@/lib/constants";

export default function CategoryGrid() {
  return (
    <section className="py-8 md:py-12 px-4">
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8"
        dir="rtl"
      >
        دسته بندی محصولات
      </h2>

      <div className="container gap-20 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center sm:gap-6 md:gap-8 lg:gap-10 p-2 md:p-4 w-full max-w-6xl">
        {CATEGORIES_ARRAY.map((item) => (
          <Link
            key={item.id}
            href={`/categories/${item.slug}`}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
          >
            <CategoryItem category={item} />
          </Link>
        ))}
      </div>
    </section>
  );
}
