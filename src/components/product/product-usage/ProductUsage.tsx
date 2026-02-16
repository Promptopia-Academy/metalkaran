import Image from "next/image";
import type { IProductUsageProps } from "@/types/type";
import { getImageUrl } from "@/lib/api";

export default function ProductUsage({ usage }: IProductUsageProps) {
    return (
        <div
            className="shrink-0 w-72 h-80 overflow-hidden flex flex-col rounded-[8px]"
        >
            <div className="relative flex-1 min-h-0 w-full">
                <Image
                    src={getImageUrl(usage.image)}
                    alt={usage.title}
                    fill
                    className="object-cover rounded-t-[8px]"
                />
            </div>
            <div
                className="h-12 bg-[#004e89a5] text-base font-medium flex items-center justify-center px-3 text-white text-center"
            >
                {usage.title}
            </div>
        </div>
    );
}
