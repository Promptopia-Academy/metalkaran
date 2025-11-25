import type { Metadata } from "next";
import { Geist_Mono, Source_Code_Pro } from "next/font/google";
import Header from "@/components/header/Header";

import "./globals.css";
import Footer from "@/components/footer/Footer";
import AnimatedSection from "@/components/ui/animated-section";

const sourceCode = Source_Code_Pro({
  variable: "--source-code",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Metalkaran | نوارهای فلزی دقیق",
    template: "%s | Metalkaran",
  },
  description:
    "ما رهبران صنعت نوارهای فلزی دقیق هستیم و مطمئن‌ترین و به‌روزترین راه‌حل‌هایی را که به دنبال آن هستید، تولید می‌کنیم.",
  keywords: [
    "نوار فلزی",
    "فویل فلزی",
    "آلومینیوم",
    "فولاد ضد زنگ",
    "متال کاران",
    "Metalkaran",
  ],
  authors: [{ name: "Metalkaran" }],
  creator: "Metalkaran",
  publisher: "Metalkaran",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    title: "Metalkaran | نوارهای فلزی دقیق",
    description:
      "ما رهبران صنعت نوارهای فلزی دقیق هستیم و مطمئن‌ترین و به‌روزترین راه‌حل‌هایی را که به دنبال آن هستید، تولید می‌کنیم.",
    siteName: "Metalkaran",
  },
  twitter: {
    card: "summary_large_image",
    title: "Metalkaran | نوارهای فلزی دقیق",
    description:
      "ما رهبران صنعت نوارهای فلزی دقیق هستیم و مطمئن‌ترین و به‌روزترین راه‌حل‌هایی را که به دنبال آن هستید، تولید می‌کنیم.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console
    // google: "your-google-verification-code",
    // Bing
    // other: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${sourceCode.variable} ${geistMono.variable} antialiased box-border overflow-x-hidden min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
