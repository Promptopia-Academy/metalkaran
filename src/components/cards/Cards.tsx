import CardElement from "./CardElement";
import { PRODUCT_ITEMS } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import type { IProduct } from "@/types/type";

type CardsProps = { products?: IProduct[] };

const Cards = ({ products: propProducts }: CardsProps) => {
  const products = (propProducts && propProducts.length > 0) ? propProducts : PRODUCT_ITEMS;
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
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[33.33%] xl:basis-[25%] hover:z-10"
            >
              <CardElement product={product} />
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
