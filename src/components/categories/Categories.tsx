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
    <section className="py-12 min-h-[80vh]">
      <h2 className="text-4xl font-bold text-center mb-8" dir="rtl">
        دسته بندی محصولات
      </h2>

      <div className="container mx-auto flex flex-wrap justify-center relative p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-14">
          {categories.slice(0, 4).map((item, index) => (
            <div key={index}>
              <CategoryItem src={item.src} alt={item.alt} title={item.alt} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 -mt-8 gap-x-14">
          {categories.slice(4, 8).map((item, index) => (
            <div key={index}>
              <CategoryItem src={item.src} alt={item.alt} title={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
