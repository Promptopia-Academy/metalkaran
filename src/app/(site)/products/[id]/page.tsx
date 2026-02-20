import { IPageProps } from "@/types/type";
import { getProductById } from "@/lib/cms/producstsApi";
import ProductDetail from "@/components/product/ProductDetail";
import { IProduct } from "@/types/type";
import { notFound } from "next/navigation";

const ProductDetailPage = async ({ params }: IPageProps) => {
  const { id } = await params;
  const product = await getProductById(Number(id));
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
