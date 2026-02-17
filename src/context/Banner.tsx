import { IBannerProps } from "@/types/type";

const Banner = ({
  imageSrc,
  text,
  width,
  height,
  overlay,
  overlayColor,
}: IBannerProps) => {
  if (!imageSrc) return null;
  return (
    <div>
      <img
        src={imageSrc}
        alt={text || "Banner image"}
        width={width || 400}
        height={height || 100}
        loading="lazy"
        decoding="async"
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
