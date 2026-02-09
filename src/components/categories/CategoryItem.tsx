import Image from "next/image";
import { ICategoryItemProps } from "@/types/type";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

export const CategoryItem: React.FC<ICategoryItemProps> = ({
  category
}) => {
  return (
    <div className="group w-[clamp(5.5rem,16vw,11rem)] h-[clamp(5.5rem,16vw,11rem)] transform rotate-45 border relative border-gray-300 rounded-2xl shadow-md bg-transparent flex items-center justify-center overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-primary-secondary/60">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full h-full transform -rotate-45 scale-[1.22] sm:scale-[1.28] relative flex items-center justify-center">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.slug}
                fill
                className="object-contain transition-transform duration-300 ease-out group-hover:scale-110"
              />
            ) : null}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm text-center">{category.title}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
