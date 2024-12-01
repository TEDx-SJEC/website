"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Provider";
import { AdminNavbar } from "@/components/admin/Navbar/navbar";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { tailChase } from "ldrs";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: async () => {
      await signIn("google");
    },
  });

  if (typeof window !== "undefined") {
    tailChase.register();
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading || status !== "authenticated" || !session) {
    // Show the loading spinner if session is loading or not authenticated
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <l-tail-chase
          size={"88"}
          speed={"1.75"}
          color={"#FF0000"}
        ></l-tail-chase>
      </div>
    );
  }

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

  if (session.user.role !== "ADMIN" && session.user.role !== "COORDINATOR") {
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
            <main className="ml-16 md:ml-0 flex-1 overflow-y-auto bg-gray-800">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
