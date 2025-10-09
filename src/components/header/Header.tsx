import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <section className="w-80% h-[72px] bg-primary flex items-center mx-32 mt-8 rounded-2xl justify-center">
      <div className="flex items-center justify-between w-10/12">
        <MagnifyingGlassIcon className="ml-6 w-8 h-8 text-background" />
        <nav className="flex items-center gap-6 text-xl font-medium" dir="rtl">
          <Link
            href="#"
            className="text-background font-semibold hover:underline"
          >
            خانه
          </Link>
          <Link
            href="#"
            className="text-background font-semibold hover:underline"
          >
            تماس با ما
          </Link>
          <Link
            href="#"
            className="text-background font-semibold hover:underline"
          >
            محصولات
          </Link>
          <Link
            href="#"
            className="text-background font-semibold hover:underline"
          >
            سوالات متداول
          </Link>
          <Link
            href="#"
            className="text-background font-semibold hover:underline"
          >
            درباره ما
          </Link>
        </nav>
        <Image
          src="/logo.png"
          alt="Metalkaran Logo"
          width={86}
          height={63}
          className="mr-6"
        />
      </div>
    </section>
  );
};

export default Header;
