"use client";

import { Button } from "@/components/ui/button";

export function CtaSection() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-red-900 text-white p-6">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                    Live What&apos;s Worth Living
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-80">
                    Celebrate the joy of accomplishment with an app designed to track your progress and
                    motivate your efforts.
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 text-lg rounded-md">
                    Register
                </Button>
            </div>
        </div>
    );
}
