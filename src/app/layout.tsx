import Providers from "@/components/layout/Provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StarsCanvas } from "@/components/ui/stars";
import Navbar from "@/components/navbar";
// import ScrollProgress from "@/components/ui/progressBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark font-satoshi">
      <body className={(inter.className = "overflow-x-hidden")}>
        <Navbar />
        <StarsCanvas />
        <Providers>{children} </Providers>
      </body>
    </html>
  );
}
