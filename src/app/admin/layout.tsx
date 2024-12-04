"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Provider";
import { AdminNavbar } from "@/components/admin/Navbar/navbar";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession({
    required: true,
  });

  if (!session) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Unauthorized
      </div>
    );
  }

  if (session.user.role !== "ADMIN") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Forbidden
      </div>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <AdminNavbar />
            <main className="flex-1 overflow-auto bg-indigo-50">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
