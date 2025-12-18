import { ABOUT_ARRAY } from "@/lib/constants";
import { Button } from "../ui/button";

export default function About() {
  return (
    <section className="bg-[url('/images/about-bg.jpg')] bg-cover bg-center w-full relative">
      <div className="w-full bg-[#18304ce5]">
        <div
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-10 md:py-12 lg:py-20"
          dir="rtl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start lg:items-center">
            <div className="flex flex-col gap-6 md:gap-10" id="title">
              <h2
                className="text-[clamp(1.35rem,3.2vw,2.25rem)] font-bold text-background leading-relaxed break-words"
                dir="rtl"
              >
                {ABOUT_ARRAY.title}
              </h2>
              <div className="w-full h-0.5 bg-white"></div>
              <Button
                type="button"
                className="bg-primary-secondary text-black w-full sm:w-fit px-5 h-10 text-sm md:text-base transition-transform duration-200 ease-out hover:scale-105 hover:shadow-lg"
              >
                اطلاعات بیشتر ...
              </Button>
            </div>

            <div className="flex flex-col gap-4 md:gap-6">
              <h3 className="text-center text-[clamp(1.05rem,2.4vw,1.5rem)] font-bold leading-relaxed text-background break-words">
                {ABOUT_ARRAY.detail}
              </h3>
              <div className="w-[80%] h-0.5 bg-white mx-auto"></div>
              <h3 className="text-center text-[clamp(1.05rem,2.4vw,1.5rem)] font-bold text-background break-words">
                {ABOUT_ARRAY.extraTitle}
              </h3>
              <p className="leading-relaxed text-[clamp(1rem,2.2vw,1.5rem)] font-medium text-center text-background break-words">
                {ABOUT_ARRAY.extraDetail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
