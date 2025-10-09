import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface CardElementProps {
  image: string;
  title: string;
  slug: string;
}

export default function CardElement({ image, title, slug }: CardElementProps) {
  return (
    <div className="w-full pb-4 bg-card rounded-2xl shrink-0 overflow-hidden min-w-0">
      <div className="relative w-full h-60">
        <Image
          src={image}
          alt="Card image"
          fill
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center p-4">
        <h2 className="text-center text-lg font-medium text-button">{title}</h2>
        <p className="text-center text-sm font-normal text-button">{slug}</p>
        <Button
          variant={"default"}
          className="bg-primary mx-auto text-base font-semibold px-6 py-2"
        >
          اطلاعات بیشتر
          <span>
            <ArrowRight className="ml-2 w-4 h-4 text-white" />
          </span>
        </Button>
      </div>
    </div>
  );
}
