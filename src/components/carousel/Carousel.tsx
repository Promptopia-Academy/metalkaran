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
    size: { width: 882, height: 480 },
    basis: "lg:basis-7/10",
  },
  {
    slug: 2,
    src: "/carousel-img/img-2.jpg",
    alt: "Carousel Image 2",
    size: { width: 278, height: 480 },
    basis: "lg:basis-3/13",
  },
  {
    slug: 3,
    src: "/carousel-img/img-3.jpg",
    alt: "Carousel Image 3",
    size: { width: 278, height: 480 },
    basis: "lg:basis-3/10",
  },
];

const CarouselHero = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {images.map((image, index) => (
          <CarouselItem key={index} className={`pl-1 ${image.basis}`}>
            <div
              className={`shrink-0 rounded-2xl overflow-hidden relative`}
              style={{ width: image.size.width, height: image.size.height }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="rounded-2xl object-cover"
              />
              {image.slug === 1 && (
                <div className="absolute inset-0 w-full h-full flex items-center pl-14 bg-gray-900/50">
                  <h1
                    className="w-80 text-center text-4xl font-extrabold text-background tracking-[2.88px]"
                    dir="rtl"
                  >
                    <TextAnimate animation="blurInUp" by="word" once>
                      نوارهای فولادی ضد زنگ و فویل‌های آلیاژی مخصوص
                    </TextAnimate>
                  </h1>
                  <Link
                    href="#git "
                    className="absolute bottom-10 right-10 border-1 border-white rounded-full px-2 py-1"
                  >
                    <ChevronRight className="text-white w-4" />
                  </Link>
                </div>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselHero;
