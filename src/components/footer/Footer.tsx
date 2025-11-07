import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-60 mt-5 flex justify-between px-24 rounded-t-2xl py-8 bg-primary gap-52">
      <div id="left" className="flex flex-col  w-full">
        <div id="top" className="flex items-center justify-between">
          <Image src="/logo.png" alt="Logo" width={120} height={40} />
          <div
            className="flex flex-col justify-between font-bold text-lg text-background gap-4"
            dir="rtl"
          >
            <p>شماره تماس: 02188776655</p>
            <p>آدرس ایمیل: sh.abbasi7527@gmail.com</p>
          </div>
        </div>
        <div className="w-full h-[2px] bg-background mb-4"></div>
        <div className="flex gap-16">
          <InstagramLogoIcon className="w-6 h-6 text-background cursor-pointer" />
          <LinkedInLogoIcon className="w-6 h-6 text-background cursor-pointer" />
          <TwitterLogoIcon className="w-6 h-6 text-background cursor-pointer" />
        </div>
      </div>
      <div
        id="right"
        className="flex flex-col gap-4 text-background font-bold text-lg min-w-36"
        dir="rtl"
      >
        <Link href="/contact-us">تماس با ما</Link>
        <Link href="/products">محصولات</Link>
        <Link href="/faq">سوالات متداول</Link>
        <Link href="/about-us">درباره ما</Link>
      </div>
    </div>
  );
};

export default Footer;
