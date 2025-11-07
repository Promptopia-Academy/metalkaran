import Image from "next/image";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

interface ItemProps {
  src: string;
  alt: string;
  title: string;
}

export const CategoryItem: React.FC<ItemProps> = ({ src, alt, title }) => {
  return (
    <div className="p-2">
      <div className="group w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 transform rotate-45 border relative border-gray-300 rounded-2xl shadow-md bg-transparent flex items-center justify-center overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-primary-secondary/60">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full h-full transform -rotate-45 scale-130 relative flex items-center justify-center">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm text-center">{title}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
