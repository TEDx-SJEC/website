import Providers from "@/components/layout/Provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TEDxStarsCanvas from "@/components/ui/stars";
import Nav from "@/components/widget/header";
import Script from "next/script";
import { ScrollProgressBar } from "@/components/common/scroll-progress";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "TEDxSJEC",
  description:
    "TEDxSJEC is an independently organized event bringing together innovators, thinkers, and visionaries from around the world. Our goal is to inspire change, provoke deep discussions, and foster creativity through groundbreaking ideas. Our goal is to inspire change, provoke deep discussions, and foster creativity through groundbreaking ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark font-satoshi">
      <Script
        defer
        src={process.env.NEXT_PUBLIC_WEBSITE_SRC}
        data-website-id={process.env.NEXT_PUBLIC_WEBSITE_ID}
      ></Script>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={(inter.className = "overflow-x-hidden")}>
        <div className="fixed top-0 w-full h-[100px] z-50 overflow-x-hidden  backdrop-blur-md head-5 bg-black/5" />
        <ScrollProgressBar />
        <Nav />
        <TEDxStarsCanvas />
        <Providers>{children} </Providers>
      </body>
    </html>
  );
}
