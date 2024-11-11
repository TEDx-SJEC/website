"use client";

// import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent    ">
      <div
        className="absolute inset-0 "
        style={{
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 100%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 100%, black, transparent)",
        }}
      ></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
          Explore What&apos;s Worth Living
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/80">
          Join us as we explore the core of what gives life purpose through
          thought-provoking concepts, novel viewpoints, and inspirational tales.
          This journey is sure to be amazing, filled with revelations that
          inspire us to think, connect, and uncover the real meaning of our
          life.
        </p>
        {/* <Button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 text-lg rounded-md">
          Registrations Open Soon
        </Button> */}
      </div>
    </div>
  );
}
