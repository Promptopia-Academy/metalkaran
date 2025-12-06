import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { ICardElementProps } from "@/types/type";

export default function CardElement({ image, title, slug }: ICardElementProps) {
  return (
    <div className="group w-full pb-3 md:pb-4 bg-card rounded-xl md:rounded-2xl shrink-0 overflow-hidden min-w-0 relative transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1 md:hover:-translate-y-2">
      <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60">
        <Image
          src={image}
          alt="Card image"
          fill
          className="rounded-t-xl md:rounded-t-2xl object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:brightness-90"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/40 via-black/10 to-transparent transition-opacity duration-500" />
      </div>
      <div className="flex flex-col gap-1.5 md:gap-2 justify-center items-center p-3 md:p-4">
        <h2 className="text-center text-sm sm:text-base md:text-lg font-medium text-button transition-colors duration-300 group-hover:text-primary-secondary">
          {title}
        </h2>
        <p className="text-center text-xs sm:text-sm font-normal text-button/80 transition-opacity duration-300 group-hover:opacity-90">
          {slug}
        </p>
        <Button
          variant={"default"}
          className="relative bg-primary mx-auto text-xs sm:text-sm md:text-base font-semibold px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 transition-all duration-300 hover:bg-primary-secondary hover:scale-105 mt-1"
        >
          <span className="relative z-10 flex items-center">
            اطلاعات بیشتر
            <ArrowRight className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white rounded-md transition-opacity duration-300" />
        </Button>
      </div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 md:w-32 md:h-32 bg-primary-secondary/30 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
    </div>
  );
}
