"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { IArticleCardProps } from "@/types/type";
import { getImageUrl } from "@/lib/api";

const PLACEHOLDER_IMAGE = "/images/articles.png";

export default function ArticleCard({ article }: IArticleCardProps) {
  const title = article.title || article.title1 || "مقاله";
  const intro = article.introduction || article.content1 || "";
  const snippet = intro.length > 120 ? intro.slice(0, 120).trim() + "…" : intro;
  const imageSrc = getImageUrl(article.image) || PLACEHOLDER_IMAGE;

  return (
    <Link href={`/articles/${article.id}`} className="block h-full">
      <div
        style={{ boxShadow: "3px 5px 10px 4px rgba(0, 0, 0, 0.25)" }}
        className="group cursor-pointer bg-card w-full h-full pb-3 md:pb-4 rounded-xl md:rounded-2xl shrink-0 overflow-hidden min-w-0 relative transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1 md:hover:-translate-y-2 flex flex-col"
      >
        <div className="relative w-full h-40 sm:h-44 md:h-52 lg:h-56 flex-shrink-0">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="rounded-t-xl md:rounded-t-2xl object-cover transform transition-transform duration-700"
            sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 45vw, 33vw"
          />
        </div>
        <div className="flex flex-col gap-1.5 md:gap-2 justify-center items-center p-3 md:p-4 flex-1">
          <h2 className="text-center text-sm sm:text-base md:text-lg font-medium text-button line-clamp-2">
            {title}
          </h2>
          {snippet ? (
            <p className="text-center text-xs sm:text-sm font-normal text-button/80 line-clamp-2">
              {snippet}
            </p>
          ) : null}
          <span
            className="relative z-10 inline-flex items-center justify-center rounded-md bg-primary px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base font-semibold text-primary-foreground transition-all duration-300 group-hover:scale-105 mt-1"
            aria-hidden
          >
            اطلاعات بیشتر
            <ArrowRight className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 md:w-32 md:h-32 bg-primary-secondary/30 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
      </div>
    </Link>
  );
}
