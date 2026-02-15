import { IPageProps } from "@/types/type";
import { notFound } from "next/navigation";
import { PRODUCT_DETAIL_MOCK } from "@/lib/constants";
import ProductDetail from "@/components/product/ProductDetail";

const ProductDetailPage = async ({ params }: IPageProps) => {
  const { id } = params;
  const productId = Number(id);
  const product = PRODUCT_DETAIL_MOCK[productId];

  if (!product || Number.isNaN(productId)) {
    notFound();
  }

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-36 py-10 md:py-16">
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;
