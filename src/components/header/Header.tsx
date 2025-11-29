import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <section className="w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] h-auto md:h-[72px] bg-primary flex items-center mx-auto mt-4 md:mt-8 px-4 md:px-8 lg:px-32 rounded-xl md:rounded-2xl justify-center">
      <div className="flex items-center justify-between w-full gap-2 md:gap-4">
        <MagnifyingGlassIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-background flex-shrink-0" />
        <nav className="flex items-center gap-2 md:gap-4 lg:gap-6 text-sm md:text-lg lg:text-xl font-medium flex-wrap justify-center" dir="rtl">
          <Link
            href="#"
            className="text-background font-semibold hover:underline whitespace-nowrap"
          >
            خانه
          </Link>
          <Link
            href="#"
            className="text-background font-semibold hover:underline whitespace-nowrap"
          >
            تماس با ما
          </Link>
          <Link
            href="#"
            className="text-background font-semibold hover:underline whitespace-nowrap"
          >
            محصولات
          </Link>
          <Link
            href="#"
            className="text-background font-semibold hover:underline whitespace-nowrap"
          >
            سوالات متداول
          </Link>
          <Link
            href="#"
            className="text-background font-semibold hover:underline whitespace-nowrap"
          >
            درباره ما
          </Link>
        </nav>
        <Image
          src="/logo.png"
          alt="Metalkaran Logo"
          width={86}
          height={63}
          className="w-12 h-auto md:w-16 lg:w-20 lg:h-auto flex-shrink-0"
        />
      </div>
    </section>
  );
};

export default Header;
