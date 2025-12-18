import Image from "next/image";
import React from "react";

interface BannerProps {
  imageSrc: string;
  text?: string;
  width?: number;
  height?: number;
  overlay?: boolean;
  overlayColor?: string;
}

const Banner = ({
  imageSrc,
  text,
  width,
  height,
  overlay,
  overlayColor,
}: BannerProps) => {
  return (
    <div>
      <Image
        src={imageSrc}
        alt={text || "Banner image"}
        width={width || 400}
        height={height || 100}
      />
      {overlay && (
        <div
          className={`absolute inset-0 bg-${
            overlayColor || "black"
          } opacity-50 w-full h-full`}
        >
          <div className=" flex items-center justify-center w-full h-full">
            {text && <p className="text-white text-lg font-semibold">{text}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
