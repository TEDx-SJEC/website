"use client";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { extractRouterConfig } from "uploadthing/server";
import React from "react";

export default function Providers({ children }: { children: ReactNode }) {
    const queryClient = new QueryClient();
    return (
        <>
            <SessionProvider>
                <QueryClientProvider client={queryClient}>
                    <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
                    {children}
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            classNames: {
                                error: "text-red-400 border-red-400",
                                success: "text-green-400 border-green-400",
                                warning: "text-yellow-400 border-yellow-400",
                                info: "text-blue-400 border-blue-400",
                            },
                        }}
                    />
                </QueryClientProvider>
            </SessionProvider>
        </>
    );
}
