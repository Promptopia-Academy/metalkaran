import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const Vazir = localFont({
  src: [
    {
      path: "../fonts/vazirmatn/Vazirmatn-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/vazirmatn/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/vazirmatn/Vazirmatn-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/vazirmatn/Vazirmatn-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/vazirmatn/Vazirmatn-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/vazirmatn/Vazirmatn-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-vazir-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Metalkaran | متالکاران",
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

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),

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
    <html lang="fa" suppressHydrationWarning>
      <body
        className={`${Vazir.variable} font-sans antialiased box-border overflow-x-hidden`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
