"use client";
import { SessionProvider } from "next-auth/react"

export default function Home() {
  
  return (
    <SessionProvider>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
    </SessionProvider>
  );
}
