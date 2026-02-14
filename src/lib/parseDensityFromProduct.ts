import { IProduct } from "@/types/type";

export function parseDensityFromProduct(product: IProduct): number {
    const raw = product.physicalProperties?.density;
    if (!raw || typeof raw !== "string") return 7.9;
    const persianToEn = raw.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace("٫", ".");
    const match = persianToEn.match(/[\d.]+/);
    const num = match ? parseFloat(match[0]) : NaN;
    return Number.isFinite(num) ? num : 7.9;
}
