"use client";

import { Button } from "@/components/ui/button";

export function CtaSection() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-blackTheme">
            <div
                className="absolute inset-0 bg-gradient-to-b from-blackTheme via-blackTheme to-redTheme"
                style={{
                    maskImage: "radial-gradient(ellipse 100% 80% at 50% 100%, black, transparent)",
                    WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 100%, black, transparent)",
                }}
            ></div>
            <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
                    Live What&apos;s Worth Living
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/80">
                    Celebrate the joy of accomplishment with an app designed to track your progress and
                    motivate your efforts.
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 text-lg rounded-md">
                    Register Now
                </Button>
            </div>
        </div>
    );
}
