import Image from "next/image";

const AboutUsDes = () => {
  return (
    <div>
      <div className="flex flex-col w-full justify-between items-center gap-6 py-14 md:flex-row md:gap-10">
        <Image
          src="/images/about-des.png"
          alt="توضیحات درباره ما"
          width={580}
          height={400}
        />

        <div className="flex flex-col items-end gap-5">
          <h3 className="text-4xl font font-semibold">رویکرد مشتری محور</h3>
          <p className="text-2xl font-medium max-w-[500px] text-right">
            برای ارائه محصولات نوار فولادی با کیفیت خوب به مشتریان، راهکارهای
            کامل و خدمات کامل که به هر پروژه صنعتی اجازه می‌دهد روان‌تر، ایمن‌تر
            و کارآمدتر اجرا شود.
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full justify-between items-center gap-6 py-14 md:flex-row md:gap-10">
        <Image
          src="/images/about-des.png"
          alt="توضیحات درباره ما"
          width={580}
          height={730}
        />

        <div className="flex flex-col justify-end items-end gap-5">
          <h3 className="text-4xl font font-semibold">کیفیت بی نظیر</h3>
          <p className="text-2xl font-medium max-w-[500px] text-right">
            روحیه شرکت ما این است که ایمنی پایه و اساس تولید است و کیفیت،
            مشتریان را می‌سازد. ما بیشتر به پشتیبانی کیفیت، دامنه تأمین، بازرسی،
            استاندارد آزمایش، بسته‌بندی حمل و نقل، خدمات پس از فروش توجه
            می‌کنیم. مواد اولیه آسیابی با کیفیت بالا، سنگ بنای تولید نوارهای با
            بالاترین کیفیت است. ما فقط کویل‌های مادر با کیفیت بالا را خریداری
            می‌کنیم و مطمئن می‌شویم که تمام موادی که استفاده می‌کنیم مطابق با
            استانداردهای کارخانه ما باشد.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsDes;
