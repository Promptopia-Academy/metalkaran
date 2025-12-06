"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Search } from "../search/Search";
import { NAV_LINKS } from "@/lib/constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <section
        dir="rtl"
        className="w-full max-w-[95%] md:max-w-[90%] lg:max-w-[85%] h-auto md:h-[72px] bg-primary flex items-center mx-auto mt-4 md:mt-8 px-4 md:px-8 lg:px-24 rounded-xl md:rounded-2xl justify-between relative z-50"
      >
        <div className="flex items-center justify-between w-full gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <nav
              className="hidden md:flex items-center gap-2 md:gap-4 lg:gap-6 text-sm md:text-lg lg:text-xl font-medium"
              dir="rtl"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-background font-semibold hover:underline whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 text-background hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between w-20 md:w-32">
            <div className="w-full h-full">
              <Search />
            </div>

            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Metalkaran Logo"
                width={86}
                height={63}
                className="w-12 h-auto md:w-16 lg:w-20 lg:h-auto hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMenu}
          />
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-primary shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            dir="rtl"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <Image
                  src="/logo.png"
                  alt="Metalkaran Logo"
                  width={60}
                  height={44}
                  className="h-auto"
                />
                <button
                  onClick={closeMenu}
                  className="w-10 h-10 flex items-center justify-center text-background hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <nav className="flex flex-col p-4 gap-4 flex-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-background font-semibold text-lg py-3 px-4 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
