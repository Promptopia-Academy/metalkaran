import ProductUsage from "./ProductUsage";
import type { IProductUsageDivProps } from "@/types/type";

export default function ProductUsageDiv({ usages }: IProductUsageDivProps) {
  if (!usages?.length) return null;

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden">
      <div className="flex flex-row gap-4 items-stretch min-w-min py-2" dir="rtl">
        {usages.map((usage) => (
          <ProductUsage key={usage.id} usage={usage} />
        ))}
      </div>
    </div>
  );
}
