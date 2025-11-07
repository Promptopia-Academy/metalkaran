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
    <section className="bg-[url('/images/about-bg.jpg')] bg-cover bg-center w-full h-[80vh] relative">
      <div className="w-full h-full bg-[#18304ce5] py-20 flex justify-center items-center">
        <div className="px-32 flex justify-between" dir="rtl">
          <div className="w-[40%] flex flex-col gap-14" id="title">
            <h2
              className="text-4xl font-bold text-background leading-12"
              dir="rtl"
            >
              {aboutArray.title}
            </h2>
            <div className="w-full h-0.5 bg-white"></div>
            <Button
              type="button"
              className="bg-primary-secondary text-black w-32 h-7 mr-auto transition-transform duration-200 ease-out hover:scale-105 hover:shadow-lg"
            >
              اطلاعات بیشتر ...
            </Button>
          </div>
          <div className="w-[40%] flex flex-col gap-6">
            <h3 className="text-center text-2xl font-bold leading-12 text-background">
              {aboutArray.detail}
            </h3>
            <div className="w-[80%] h-0.5 bg-white mx-auto"></div>
            <h3 className="text-center text-2xl font-bold text-background">
              {aboutArray.extraTitle}
            </h3>
            <p className="leading-12 text-2xl font-medium text-center text-background">
              {aboutArray.extraDetail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
