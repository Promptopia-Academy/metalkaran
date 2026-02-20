"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { INDUSTRIES_CAROUSEL } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "@/lib/cms/uploadImageApi";
import type { IHeroSection } from "@/types/type";

type IndustriesCarouselProps = { industriesCarousel?: IHeroSection[] | null };

export default function IndustriesCarousel({ industriesCarousel }: IndustriesCarouselProps) {
  const items = (industriesCarousel && industriesCarousel.length > 0)
    ? industriesCarousel.map((h, i) => ({ id: i, src: h.src, alt: h.alt }))
    : INDUSTRIES_CAROUSEL;
  const [current, setCurrent] = useState(1);

  const next = () =>
    setCurrent((prev) => (prev + 1) % items.length);
  const prev = () =>
    setCurrent(
      (prev) =>
        (prev - 1 + items.length) % items.length
    );

  return (
    <section className="w-full py-12 bg-[#eaf1f4]">
      <h2 className="text-2xl font-bold text-center mb-10">
        صنایعی که به آنها خدمت می‌کنیم!
      </h2>

      <div className="relative flex items-center justify-center overflow-hidden h-[400px]">
        <AnimatePresence>
          {items.map((item) => {
            const diff =
              (item.id - current + items.length) %
              items.length;

            const scale =
              diff === 0
                ? 1
                : diff === 1 || diff === items.length - 1
                  ? 0.8
                  : 0.6;
            const x =
              diff === 0
                ? 0
                : diff === 1
                  ? 220
                  : diff === items.length - 1
                    ? -220
                    : diff === 2
                      ? 440
                      : -440;
            const zIndex =
              diff === 0
                ? 30
                : diff === 1 || diff === items.length - 1
                  ? 20
                  : 10;
            const opacity =
              diff > 2 && diff < items.length - 2 ? 0 : 1;

            return (
              <motion.div
                key={item.id}
                className={cn(
                  "group absolute rounded-2xl overflow-hidden shadow-md hover:shadow-xl",
                  diff === 0 ? "cursor-default" : "cursor-pointer"
                )}
                style={{
                  zIndex,
                  opacity,
                }}
                animate={{
                  scale,
                  x,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                onClick={() => setCurrent(item.id)}
                whileHover={{ scale: diff === 0 ? 1.03 : 0.85 }}
              >
                <Image
                  src={getImageUrl(item.src) || item.src}
                  alt={item.alt}
                  width={350}
                  height={400}
                  className={cn(
                    "object-cover w-[350px] h-[400px] transition-all duration-500",
                    diff === 0 ? "" : "grayscale group-hover:grayscale-0"
                  )}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white shadow rounded-full px-2 py-1 flex text-xl hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white shadow rounded-full px-2 py-1 text-xl hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
