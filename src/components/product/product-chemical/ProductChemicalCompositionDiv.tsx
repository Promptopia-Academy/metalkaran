import { CHEMICAL_COLORS } from "@/lib/constants";
import { IProductChemicalCompositionDivProps } from "@/types/type";
import ProductChemicalComposition from "./ProductChemicalComposition";


const ProductChemicalCompositionDiv = ({ productChemicalComposition }: IProductChemicalCompositionDivProps) => {
  return (
    <div className="w-full overflow-x-auto overflow-y-hidden">
      <div className="w-full flex flex-row gap-4 items-center min-w-min py-2">
        {productChemicalComposition.chemicalComposition?.map((chemicalComposition, index) => (
          <ProductChemicalComposition
            key={chemicalComposition.id}
            ChemicalComposition={chemicalComposition}
            color={CHEMICAL_COLORS[index % CHEMICAL_COLORS.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductChemicalCompositionDiv