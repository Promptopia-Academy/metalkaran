import Image from "next/image";
import { IBannerProps } from "@/types/type";


const Banner = ({
  imageSrc,
  text,
  width,
  height,
  overlay,
  overlayColor,
}: IBannerProps) => {
  return (
    <div>
      <Image
        src={imageSrc}
        alt={text || "Banner image"}
        width={width || 400}
        height={height || 100}
        unoptimized
      />
      {overlay && (
        <div
          className={`absolute inset-0 bg-${overlayColor || "black"
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
