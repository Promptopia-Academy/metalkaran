import { IProductChemicalCompositionProps } from "@/types/type"

const ProductChemicalComposition = ({ ChemicalComposition, color = "#1E78AA" }: IProductChemicalCompositionProps) => {
  return (
    <div
      className="rounded-[8px] w-32 h-48 flex flex-col justify-center items-center font-medium text-white shrink-0"
      style={{ backgroundColor: color }}
    >
      <p className="text-lg">{ChemicalComposition.title}</p>
      <p className="text-lg">{ChemicalComposition.slug}</p>
      <p className="text-xl">{ChemicalComposition.value}</p>
    </div>
  )
}

export default ProductChemicalComposition