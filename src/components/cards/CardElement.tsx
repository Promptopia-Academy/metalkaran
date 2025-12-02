import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface CardElementProps {
  image: string;
  title: string;
  slug: string;
}

export default function CardElement({ image, title, slug }: CardElementProps) {
  return (
    <div className="group w-full pb-3 md:pb-4 bg-card rounded-xl md:rounded-2xl shrink-0 overflow-hidden min-w-0 relative transition-all duration-500 ease-out hover:shadow-2xl ">
      <div className="relative w-full h-48 md:h-56 lg:h-60">
        <Image
          src={image}
          alt="Card image"
          fill
          className="rounded-t-xl md:rounded-t-2xl object-cover transform transition-transform duration-700 hover:scale-110 hover:brightness-90"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 " />
      </div>
      <div className="flex flex-col gap-1.5 md:gap-2 justify-center items-center p-3 md:p-4">
        <h2 className="text-center text-base md:text-lg font-medium text-button transition-colors duration-300 ">
          {title}
        </h2>
        <p className="text-center text-xs md:text-sm font-normal text-button/80 transition-opacity duration-300 ">
          {slug}
        </p>
        <Button
          variant={"default"}
          className="relative bg-primary mx-auto text-sm md:text-base font-semibold px-4 md:px-6 py-1.5 md:py-2 transition-all duration-300 hover:bg-foreground "
        >
          <span className="relative z-10 flex items-center">
            اطلاعات بیشتر
            <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4 text-white transition-transform duration-300 " />
          </span>
          <span className="absolute inset-0 opacity-0  bg-white rounded-md transition-opacity duration-300" />
        </Button>
      </div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary-secondary/30 rounded-full blur-3xl opacity-0 transition-opacity duration-700" />
    </div>
  );
}
