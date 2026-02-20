"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HERO_SECTION } from "@/lib/constants";
import { TextAnimate } from "../ui/text-animate";
import type { CarouselApi } from "../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import type { IHeroSection } from "@/types/type";
import { getImageUrl } from "@/lib/cms/uploadImageApi";

type CarouselHeroProps = { heroSection?: IHeroSection[] | null };

const CarouselHero = ({ heroSection: propHero }: CarouselHeroProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const sections = (propHero && propHero.length > 0) ? propHero : HERO_SECTION;

  useEffect(() => {
    if (!api) return;
    const t = setInterval(() => {
      const list = api.scrollSnapList();
      if (list.length === 0) return;
      const next = (api.selectedScrollSnap() + 1) % list.length;
      api.scrollTo(next);
    }, 3000);
    return () => clearInterval(t);
  }, [api]);

  return (
    <Carousel
      className="w-full"
      opts={{
        align: "center",
        loop: true,
      }}
      setApi={setApi}
    >
      <CarouselContent className="ml-0 md:-ml-1">
        {sections.map((image) => (
          <CarouselItem
            key={image.id}
            className="basis-5/7 lg:basis-8/10"
          >
            <div className="group shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative transition-all duration-500 ease-out h-[clamp(260px,55vh,420px)] md:h-[450px] lg:h-[480px] w-full">
              <Image
                src={getImageUrl(image.src) || image.src}
                alt={image.alt}
                fill
                className="rounded-xl md:rounded-2xl object-cover transform transition-transform duration-700"
                priority={image.id === 0}
              />
              <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 md:items-start md:pl-8 lg:pl-14 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent">
                <h1
                  className="w-full max-w-[18rem] sm:max-w-sm md:max-w-md lg:w-80 text-center text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold text-background tracking-tight sm:tracking-normal lg:tracking-[2.88px] drop-shadow-lg"
                  dir="rtl"
                >
                  <TextAnimate animation="blurInUp" by="word" once>
                    {image.alt}
                  </TextAnimate>
                </h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselHero;
