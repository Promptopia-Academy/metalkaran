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

const images = [
  {
    slug: 1,
    src: "/carousel-img/img-1.jpg",
    alt: "Carousel Image 1",
    basis: "basis-full md:basis-2/3 lg:basis-7/10",
  },
  {
    slug: 2,
    src: "/carousel-img/img-2.jpg",
    alt: "Carousel Image 2",
    basis: "hidden md:basis-1/6 lg:basis-3/13",
  },
  {
    slug: 3,
    src: "/carousel-img/img-3.jpg",
    alt: "Carousel Image 3",
    basis: "hidden md:basis-1/6 lg:basis-3/10",
  },
];

const CarouselHero = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {images.map((image, index) => (
          <CarouselItem key={index} className={`pl-1 ${image.basis}`}>
            <div className="group shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative transition-all duration-500 ease-out hover:shadow-2xl hover:scale-[1.02] aspect-video md:aspect-auto md:h-[480px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="rounded-xl md:rounded-2xl object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:brightness-90"
              />
              {image.slug === 1 && (
                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4 md:px-8 lg:pl-14 bg-gray-900/50">
                  <h1
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:w-80 text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-background tracking-tight md:tracking-normal lg:tracking-[2.88px] drop-shadow-lg"
                    dir="rtl"
                  >
                    <TextAnimate animation="blurInUp" by="word" once>
                      نوارهای فولادی ضد زنگ و فویل‌های آلیاژی مخصوص
                    </TextAnimate>
                  </h1>
                  <Link
                    href="#git"
                    className="absolute bottom-4 md:bottom-6 lg:bottom-10 right-4 md:right-6 lg:right-10 border border-white rounded-full p-2 md:px-2 md:py-1 hover:bg-white/20 transition-colors transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-lg"
                  >
                    <ChevronRight className="text-white w-3 h-3 md:w-4 md:h-4" />
                  </Link>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_60%)] transition-opacity duration-700" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};

export default CarouselHero;
