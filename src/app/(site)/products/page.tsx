import { PRODUCT_ITEMS } from "@/lib/constants";
import CardElement from "@/components/cards/CardElement";

const ProductsPage = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 md:py-12">
      <section className="w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {PRODUCT_ITEMS.map((product) => (
            <CardElement
              key={product.id}
              id={product.id}
              image={product.image || "/carousel-img/image-1.png"}
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
