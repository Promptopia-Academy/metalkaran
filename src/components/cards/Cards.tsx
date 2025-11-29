import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CardElement from "./CardElement";

const cardItems = [
  {
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ",
    slug: "UNS N08904",
  },
  {
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ",
    slug: "UNS N08904",
  },
  {
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ",
    slug: "UNS N08904",
  },
  {
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ",
    slug: "UNS N08904",
  },
  {
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ",
    slug: "UNS N08904",
  },
  {
    image: "/carousel-img/image-1.png",
    title: "نوار فولادی ضد زنگ",
    slug: "UNS N08904",
  },
];

const Cards = () => {
  return (
    <section className="mt-12 md:mt-16 lg:mt-20 w-full px-4 md:px-8 lg:px-16 xl:px-32">
      <Carousel className="w-full">
        <CarouselContent className="flex gap-3 md:gap-4 items-stretch pb-6 md:pb-10">
          {cardItems.map((item, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 basis-[85%] sm:basis-[70%] md:basis-[45%] lg:basis-[35%] xl:basis-[16rem] rounded-xl md:rounded-2xl bg-card pl-0"
              style={{ boxShadow: "3px 5px 10px 4px rgba(0, 0, 0, 0.25)" }}
            >
              <CardElement
                image={item.image}
                title={item.title}
                slug={item.slug}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
};

export default Cards;
