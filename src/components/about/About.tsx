import { Button } from "../ui/button";

const aboutArray = {
  title:
    "تنها جایی که می‌توانید راه‌حل‌های ایده‌آل برای نوار فلزی برای تمام نیازهای صنعتی خود را دریافت کنید.",
  detail:
    "ما رهبران صنعت نوارهای فلزی دقیق هستیم و مطمئن‌ترین و به‌روزترین راه‌حل‌هایی را که به دنبال آن هستید، تولید می‌کنیم.",
  extraTitle: "فویل‌های استیل ضد زنگ",
  extraDetail: `فویل‌های استیل ضد زنگ خواسته‌های شما، پیگیری ما.درجه و ضخامت را می‌توان طبق درخواست شما سفارشی کرد.`,
};
export default function About() {
  return (
    <section className="bg-[url('/images/about-bg.jpg')] bg-cover bg-center w-full min-h-[60vh] md:h-[80vh] relative">
      <div className="w-full h-full bg-[#18304ce5] py-8 md:py-12 lg:py-20 flex justify-center items-center">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 flex flex-col lg:flex-row justify-between gap-8 lg:gap-6 xl:gap-8 w-full max-w-7xl" dir="rtl">
          <div className="w-full lg:w-[40%] flex flex-col gap-6 md:gap-10 lg:gap-14" id="title">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-background leading-relaxed md:leading-12"
              dir="rtl"
            >
              {aboutArray.title}
            </h2>
            <div className="w-full h-0.5 bg-white"></div>
            <Button
              type="button"
              className="bg-primary-secondary text-black w-full sm:w-32 h-9 md:h-7 mr-auto text-sm md:text-base"
            >
              اطلاعات بیشتر ...
            </Button>
          </div>
          <div className="w-full lg:w-[40%] flex flex-col gap-4 md:gap-6">
            <h3 className="text-center text-lg md:text-xl lg:text-2xl font-bold leading-relaxed md:leading-12 text-background">
              {aboutArray.detail}
            </h3>
            <div className="w-[80%] h-0.5 bg-white mx-auto"></div>
            <h3 className="text-center text-lg md:text-xl lg:text-2xl font-bold text-background">
              {aboutArray.extraTitle}
            </h3>
            <p className="leading-relaxed md:leading-12 text-base md:text-lg lg:text-2xl font-medium text-center text-background">
              {aboutArray.extraDetail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
