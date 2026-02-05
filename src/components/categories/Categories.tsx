import { CategoryItem } from "./CategoryItem";
import { CATEGORIES_ARRAY } from "@/lib/constants";

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
        <div className="grid place-items-center grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-x-14 w-full max-w-6xl">
          {CATEGORIES_ARRAY.slice(0, 4).map((item, index) => (
            <div key={index} className="flex justify-center w-full">
              <CategoryItem src={item.src} alt={item.alt} title={item.alt} />
            </div>
          ))}
        </div>
        <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-x-14 mt-3 sm:mt-4 md:-mt-6 lg:-mt-8 w-full max-w-6xl">
          {CATEGORIES_ARRAY.slice(4, 7).map((item, index) => (
            <div key={index} className="flex justify-center w-full">
              <CategoryItem src={item.src} alt={item.alt} title={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
