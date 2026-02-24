import { CalculatorForm } from "./CalculatorForm";
import type { ICategory, IProduct } from "@/types/type";

type CalculatorProps = {
  categories?: ICategory[] | null;
  products?: IProduct[] | null;
};

export default function Calculator({ categories = [], products = [] }: CalculatorProps) {
  return <CalculatorForm categories={categories} products={products} />;
}
