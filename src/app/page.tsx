"use client";

import React from "react";
import HorizontalScroll from "@/components/common/HorizontalScrollCarousel";
import TextReveal from "@/components/ui/text-reveal";
import ParallaxFooter from "@/components/common/Footer";
import StackedCards from "@/components/stacking-cards/stacked";
import { PreviousEdition } from "@/components/common/Container-Scroll";

export default function Home() {
  return (
    <>
      <div className="z-20 relative bg-black overflow-x-clip">
        <div className="flex flex-col items-center justify-center h-screen p-4"></div>
        <div className="z-10 flex min-h-64 items-center justify-center rounded-lg ">
          <TextReveal text="TEDxSJEC is a platform that brings together curious, creative, and progressive thinkers from St. Joseph Engineering College." />
        </div>
        <div>
          <StackedCards />
        </div>
        <div className=" bg-gradient-to-b bg-black from-black via-red-600  to-white to-95%">
          <PreviousEdition />
        </div>
        <div className="backdrop-invert mb-[100vh]">
          <HorizontalScroll />
        </div>
      </div>
      <ParallaxFooter />
    </>
  );
}
