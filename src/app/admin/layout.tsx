"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Layout/Provider";
import { AdminNavbar } from "@/components/Admin/Navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="flex">
                        <AdminNavbar />
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
