import { CategoryItem } from "./CategoryItem";

const categories = [
  { src: "/images/aluminum_profile.png", alt: "Aluminum Profiles" },
  { src: "/images/metal_coils.png", alt: "Metal Coils" },
  { src: "/images/steel_sheets.png", alt: "Steel Sheets" },
  { src: "/images/platinum_ingots.png", alt: "Platinum Ingots" },
  { src: "/images/aluminum_sheets.png", alt: "Aluminum Sheets" },
  { src: "/images/tin_alloy.png", alt: "Tin Alloys" },
  { src: "/images/ingots.png", alt: "Ingots" },
];

export default function CategoryGrid() {
  return (
    <section className="py-8 md:py-12 min-h-[60vh] md:min-h-[80vh] px-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8" dir="rtl">
        دسته بندی محصولات
      </h2>

      <div className="container mx-auto flex flex-wrap justify-center relative p-2 md:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-x-14 w-full">
          {categories.slice(0, 4).map((item, index) => (
            <div key={index} className="flex justify-center">
              <CategoryItem src={item.src} alt={item.alt} title={item.alt} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-x-14 -mt-4 md:-mt-8 w-full">
          {categories.slice(4, 7).map((item, index) => (
            <div key={index} className="flex justify-center">
              <CategoryItem src={item.src} alt={item.alt} title={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
