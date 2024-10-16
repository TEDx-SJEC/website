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
    return <div>Unauthorized</div>;
  }

  if (session.user.role !== "ADMIN") {
    return <div>Forbidden</div>;
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen">
            <div className="fixed h-full">
              <AdminNavbar />
            </div>
            <div className="flex-1 ml-[250px] overflow-y-auto">
              {children}
            </div>
          </div>
        
        </Providers>
      </body>
    </html>
  );
}
