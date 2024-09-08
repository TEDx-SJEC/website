"use client";
import { SessionProvider } from "next-auth/react"
import prisma from "@/server/db";

export default function Home() { 
  prisma.user.create({
    data: {
      email: "joywin@",
      name: "Joywin",
    }});


  prisma.user.findMany().then(console.log)
  return (
    <SessionProvider>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
    </SessionProvider>
  );
}
