import CardElement from "./CardElement";
import { PRODUCT_ITEMS } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const Cards = () => {
  return (
    <section className="mt-12 pb-10 md:mt-16 lg:mt-20 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4 p-6">
          {PRODUCT_ITEMS.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[33.33%] xl:basis-[25%] hover:z-10"
            >
              <CardElement
                id={product.id}
                image={product.image || "/carousel-img/image-1.png"}
                title={product.title}
                slug={product.standards || product.category?.title}
              />
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
