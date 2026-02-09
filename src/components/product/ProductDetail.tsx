import Image from "next/image";
import type { IProduct } from "@/types/type";

interface ProductDetailProps {
  product: IProduct;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div dir="rtl" className="space-y-8">
      {product.image && (
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>
        {product.category && (
          <p className="text-lg text-muted-foreground">
            دسته‌بندی: {product.category.title}
          </p>
        )}
        {product.introduction && (
          <p className="text-xl leading-relaxed">{product.introduction}</p>
        )}
        {product.usage && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">کاربردها</h2>
            <p className="text-lg">{product.usage}</p>
          </div>
        )}
        {product.standards && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">استانداردها</h2>
            <p className="text-lg">{product.standards}</p>
          </div>
        )}
        {product.chemicalComposition && product.chemicalComposition.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">ترکیب شیمیایی</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {product.chemicalComposition.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between rounded-lg border bg-card p-3"
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {product.mechanicalProperties && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">خواص مکانیکی</h2>
            <div className="space-y-2 rounded-lg border bg-card p-4">
              <p>
                <span className="font-medium">سختی: </span>
                {product.mechanicalProperties.hardness}
              </p>
              <p>
                <span className="font-medium">مدول الاستیک: </span>
                {product.mechanicalProperties.elasticModulus}
              </p>
              <p>
                <span className="font-medium">درصد تغییر طول: </span>
                {product.mechanicalProperties.elongation}
              </p>
              <p>
                <span className="font-medium">استحکام تسلیم: </span>
                {product.mechanicalProperties.yieldStrength}
              </p>
              <p>
                <span className="font-medium">استحکام کششی: </span>
                {product.mechanicalProperties.tensileStrength}
              </p>
            </div>
          </div>
        )}
        {product.physicalProperties && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">خواص فیزیکی</h2>
            <div className="space-y-2 rounded-lg border bg-card p-4">
              <p>
                <span className="font-medium">چگالی: </span>
                {product.physicalProperties.density}
              </p>
              <p>
                <span className="font-medium">مقاومت الکتریکی: </span>
                {product.physicalProperties.electricalResistivity}
              </p>
              <p>
                <span className="font-medium">نقطه ذوب: </span>
                {product.physicalProperties.meltingPoint}
              </p>
              <p>
                <span className="font-medium">ظرفیت گرمایی ویژه: </span>
                {product.physicalProperties.molarHeatCapacity}
              </p>
            </div>
          </div>
        )}
        {product.thermalExpansion && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">انبساط حرارتی</h2>
            <p className="text-lg">{product.thermalExpansion}</p>
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
    </div>
  );
}
