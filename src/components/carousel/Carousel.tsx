import { ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { TextAnimate } from "../ui/text-animate";
import { CAROUSEL_IMAGES } from "@/lib/constants";

const CarouselHero = () => {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-1">
        {CAROUSEL_IMAGES.map((image, index) => (
          <CarouselItem
            key={index}
            className={`pl-2 md:pl-1 basis-[90%] sm:basis-[85%] md:basis-full ${image.basis}`}
          >
            <div className="group shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative transition-all duration-500 ease-out hover:shadow-2xl hover:scale-[1.02] h-[350px] sm:h-[400px] md:h-[450px] lg:h-[480px] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="rounded-xl md:rounded-2xl object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:brightness-90"
                priority={index === 0}
              />
              {image.slug === 1 && (
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 md:items-start md:pl-8 lg:pl-14 bg-gray-900/50">
                  <h1
                    className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:w-80 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-background tracking-tight sm:tracking-normal lg:tracking-[2.88px] drop-shadow-lg"
                    dir="rtl"
                  >
                    <TextAnimate animation="blurInUp" by="word" once>
                      نوارهای فولادی ضد زنگ و فویل‌های آلیاژی مخصوص
                    </TextAnimate>
                  </h1>
                  <Link
                    href="#git"
                    className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-4 sm:right-6 md:right-8 lg:right-10 border border-white rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-lg"
                  >
                    <ChevronRight className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_60%)] transition-opacity duration-700" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex left-2 lg:left-4" />
      <CarouselNext className="hidden md:flex right-2 lg:right-4" />
    </Carousel>
  );
};

export default CarouselHero;
