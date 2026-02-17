"use client";

import { getImageUrl } from "@/lib/api";

type UploadedImageProps = {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: "cover" | "contain";
};

/**
 * عکس آپلودشده را با تگ <img> لود می‌کند (بدون next/image) تا همیشه از آدرس بک‌اند درست بگیرد و ۴۰۰ نخورد.
 */
export default function UploadedImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority,
  sizes,
  objectFit = "cover",
}: UploadedImageProps) {
  const url = getImageUrl(src);
  if (!url) return null;

  if (fill) {
    return (
      <img
        src={url}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit }}
      />
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
