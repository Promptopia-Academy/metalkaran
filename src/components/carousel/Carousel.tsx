import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { TextAnimate } from "../ui/text-animate";
import { CAROUSEL_IMAGES } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const CarouselHero = () => {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="ml-0 md:-ml-1">
        {CAROUSEL_IMAGES.map((image, index) => (
          <CarouselItem
            key={index}
            className={`pl-0 md:pl-1 basis-full sm:basis-[95%] md:basis-full ${image.basis}`}
          >
            <div className="group shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative transition-all duration-500 ease-out hover:shadow-2xl hover:scale-[1.02] h-[clamp(260px,55vh,420px)] md:h-[450px] lg:h-[480px] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="rounded-xl md:rounded-2xl object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:brightness-90"
                priority={index === 0}
              />
              {image.slug === 1 && (
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 md:items-start md:pl-8 lg:pl-14 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent">
                  <h1
                    className="w-full max-w-[18rem] sm:max-w-sm md:max-w-md lg:w-80 text-center text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold text-background tracking-tight sm:tracking-normal lg:tracking-[2.88px] drop-shadow-lg"
                    dir="rtl"
                  >
                    <TextAnimate animation="blurInUp" by="word" once>
                      نوارهای فولادی ضد زنگ و فویل‌های آلیاژی مخصوص
                    </TextAnimate>
                  </h1>
                  <Link
                    href="#git"
                    className="mt-5 sm:mt-6 md:mt-0 md:absolute md:bottom-8 lg:bottom-10 md:right-8 lg:right-10 border border-white rounded-full p-2.5 sm:p-3 transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-lg"
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
