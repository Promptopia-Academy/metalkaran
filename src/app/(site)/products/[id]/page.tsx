import { IPageProps } from "@/types/type";
import { notFound } from "next/navigation";
import { getSiteProductById } from "@/lib/api";
import ProductDetail from "@/components/product/ProductDetail";

const ProductDetailPage = async ({ params }: IPageProps) => {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  const product = await getSiteProductById(productId);
  console.log(product);
  if (!product) {
    notFound();
  }

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-36 py-10 md:py-16">
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;
