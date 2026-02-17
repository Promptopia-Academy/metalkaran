"use client";
import CardElement from "@/components/cards/CardElement";
import { getSiteProducts } from "@/lib/api";
import { IProduct } from "@/types/type";

const ProductsPage = async () => {
  const products = await getSiteProducts();
  console.log(products);
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12">
      <section className="w-full max-w-[1600px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8" dir="rtl">
          همه محصولات
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products?.map((product: IProduct) => (
            <CardElement
              key={product.id}
              id={product.id}
              image={product.image || ""}
              title={product.title}
              slug={product.standards || product.category?.title}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
