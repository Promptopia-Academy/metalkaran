import type { IProductDetailProps } from "@/types/type";
import UploadedImage from "@/components/ui/UploadedImage";
import ProductTable from "@/components/product/product-table/ProductTable";
import ProductUsageDiv from "@/components/product/product-usage/ProductUsageDix";
import ProductChemicalCompositionDiv from "@/components/product/product-chemical/ProductChemicalCompositionDiv";


export default function ProductDetail({ product }: IProductDetailProps) {
  return (
    <div dir="rtl" className="space-y-8">
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-start w-full gap-4">
        <div className="w-full">
          <h1 className="text-3xl md:text-4xl font-bold">{product.title}-{product.slug}</h1>
          {product.category && (
            <p className="text-lg text-muted-foreground">
              دسته‌بندی: {product.category.title}
            </p>
          )}
          {product.introduction && (
            <p className="text-xl leading-relaxed">{product.introduction}</p>
          )}
        </div>
        <div className="w-full">
          {product.image && (
            <div className="relative aspect-video rounded-xl bg-amber-800 overflow-hidden">
              <UploadedImage
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>


      {product.chemicalComposition && product.chemicalComposition.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">ترکیبات شیمیایی</h2>
          <ProductChemicalCompositionDiv productChemicalComposition={product} />
        </div>
      )}
      {(product.mechanicalProperties || product.physicalProperties) && (
        <ProductTable
          mechanicalProperties={product.mechanicalProperties}
          physicalProperties={product.physicalProperties}
        />
      )}
      {product.description && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">توضیحات</h2>
          <p className="text-lg">{product.description}</p>
        </div>
      )}
      {Array.isArray(product.usage) && product.usage.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">کاربردها</h2>
          <ProductUsageDiv usages={product.usage} />
        </div>
      )}
      {product.thermalExpansion && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">انبساط حرارتی</h2>
          <p className="text-lg">{product.thermalExpansion}</p>
        </div>
      )}
      {product.standards && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">استانداردها</h2>
          <p className="text-lg">{product.standards}</p>
        </div>
      )}
      {product.corrosionResistance && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">مقاومت در برابر خوردگی</h2>
          <p className="text-lg">{product.corrosionResistance}</p>
        </div>
      )}
      {product.heatResistance && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">مقاومت حرارتی</h2>
          <p className="text-lg">{product.heatResistance}</p>
        </div>
      )}
      {product.manufacturing && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">تولید</h2>
          <p className="text-lg">{product.manufacturing}</p>
        </div>
      )}
      {product.hotForming && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">فرم‌دهی گرم</h2>
          <p className="text-lg">{product.hotForming}</p>
        </div>
      )}
      {product.coldForming && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">فرم‌دهی سرد</h2>
          <p className="text-lg">{product.coldForming}</p>
        </div>
      )}
      {product.welding && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">جوشکاری</h2>
          <p className="text-lg">{product.welding}</p>
        </div>
      )}
      {product.machining && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">ماشینکاری</h2>
          <p className="text-lg">{product.machining}</p>
        </div>
      )}
    </div>
  );
}
