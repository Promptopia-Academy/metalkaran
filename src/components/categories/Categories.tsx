import { CATEGORIES_ARRAY } from "@/lib/constants";
import { CategoryItem } from "./CategoryItem";

export default function CategoryGrid() {
  return (
    <section className="py-8 md:py-12 min-h-[60vh] md:min-h-[80vh] px-4">
      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8"
        dir="rtl"
      >
        دسته بندی محصولات
      </h2>

      <div className="container mx-auto flex flex-wrap justify-center relative p-2 md:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-x-14 w-full">
          {CATEGORIES_ARRAY.slice(0, 4).map((item, index) => (
            <div key={index} className="flex justify-center">
              <CategoryItem src={item.src} alt={item.alt} title={item.alt} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-x-14 -mt-4 md:-mt-8 w-full">
          {CATEGORIES_ARRAY.slice(4, 7).map((item, index) => (
            <div key={index} className="flex justify-center">
              <CategoryItem src={item.src} alt={item.alt} title={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
