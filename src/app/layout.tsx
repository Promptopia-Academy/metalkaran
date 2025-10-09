import type { Metadata } from "next";
import { Geist_Mono, Source_Code_Pro } from "next/font/google";
import Header from "@/components/header/Header";

import "./globals.css";

const sourceCode = Source_Code_Pro({
  variable: "--source-code",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metalkaran",
  description:
    "ما رهبران صنعت نوارهای فلزی دقیق هستیم و مطمئن‌ترین و به‌روزترین راه‌حل‌هایی را که به دنبال آن هستید، تولید می‌کنیم.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceCode.variable} ${geistMono.variable} antialiased box-border overflow-x-hidden`}
      >
        <header>
          <Header />
        </header>
        {children}
      </body>
    </html>
  );
}
