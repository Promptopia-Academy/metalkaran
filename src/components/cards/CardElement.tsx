"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ICardElementProps } from "@/types/type";
import UploadedImage from "@/components/ui/UploadedImage";

const PLACEHOLDER_IMAGE = "/carousel-img/image-1.png";

const cardContent = ({ product }: ICardElementProps) => (
  <>
    <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60">
      <UploadedImage
        src={product.image || ""}
        alt={product.title}
        fill
        className="rounded-t-xl md:rounded-t-2xl object-cover transform transition-transform duration-700"
      />
      <div className="pointer-events-none absolute inset-0 opacity-0 to-transparent transition-opacity duration-500" />
    </div>
    <div className="flex flex-col gap-1.5 md:gap-2 justify-center items-center p-3 md:p-4">
      <h2 className="text-center text-sm sm:text-base md:text-lg font-medium text-button transition-colors duration-300">
        {product.title}
      </h2>
      {product.standards || product.category?.title && (
        <p className="text-center text-xs sm:text-sm font-normal text-button/80 transition-opacity duration-300 group-hover:opacity-90">
          {product.standards || product.category?.title}
        </p>
      )}
      <span className="relative z-10 inline-flex items-center justify-center rounded-md bg-primary px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-semibold text-primary-foreground transition-all duration-300 group-hover:scale-105 mt-1">
        اطلاعات بیشتر
        <ArrowRight className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  </>
);

export default function CardElement({ product }: ICardElementProps) {
  const wrapperClass =
    "group cursor-pointer bg-card w-full h-full pb-3 md:pb-4 rounded-xl md:rounded-2xl shrink-0 overflow-hidden min-w-0 relative transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1 md:hover:-translate-y-2 flex flex-col";
  const style = { boxShadow: "3px 5px 10px 4px rgba(0, 0, 0, 0.25)" };

  const content = cardContent({ product });

  return (
    <Link href={`/products/${product.id}`} className={`block ${wrapperClass}`} style={style}>
      {content}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 md:w-32 md:h-32 bg-primary-secondary/30 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
    </Link>
  );
}
