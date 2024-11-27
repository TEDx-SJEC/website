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
      <div className="w-screen h-screen flex justify-center items-center bg-black text-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-red-500">Unauthorized</h1>
          <p className="text-gray-400">
            You need to log in to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (session.user.role !== "ADMIN") {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black text-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-red-500">Forbidden</h1>
          <p className="text-gray-400">
            You do not have the required permissions to view this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <AdminNavbar />
            <main className="flex-1 overflow-auto bg-gray-800">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
