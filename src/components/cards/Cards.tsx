import { CARD_ITEMS } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CardElement from "./CardElement";

const Cards = () => {
  return (
    <section className="mt-12 md:mt-16 lg:mt-20 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {CARD_ITEMS.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[33.33%] xl:basis-[25%] hover:z-10"
            >
              <div
                className="rounded-xl md:rounded-2xl bg-card h-full"
                style={{ boxShadow: "3px 5px 10px 4px rgba(0, 0, 0, 0.25)" }}
              >
                <CardElement
                  image={item.image}
                  title={item.title}
                  slug={item.slug}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex left-0 lg:left-2" />
        <CarouselNext className="hidden md:flex right-0 lg:right-2" />
      </Carousel>
    </section>
  );
};

export default Cards;
