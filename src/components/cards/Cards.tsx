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
    <section className="mt-20 w-full">
      <Carousel className="w-full">
        <CarouselContent className="flex gap-4 items-stretch">
          {cardItems.map((item, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 basis-[16rem] rounded-2xl bg-card pl-0"
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Cards;
