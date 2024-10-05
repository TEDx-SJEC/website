"use client";

import React from "react";
import HorizontalScroll from "@/components/HorizontalScrollCarousel";
import TextReveal from "@/components/ui/text-reveal";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import ParallaxFooter from "@/components/Footer";
import StackedCards from "@/components/stacking-cards/stacked";

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

        <div className="relative h-screen md:p-32 p-8 py-24 backdrop-invert flex flex-col justify-center items-center">
          <h1 className="text-black text-center md:text-5xl text-2xl w-full font-bold leading-tight mt-10">
            Check out the <br /> Previous Editions
          </h1>
          <div className="mt-24 md:w-2/3 w-full">
            <HeroVideoDialog
              className="block"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
              thumbnailAlt="Hero Video"
            />
          </div>
        </div>

        <div className="backdrop-invert mb-[100vh]">
          <HorizontalScroll />
        </div>

      </div>


      <ParallaxFooter />
    </>
  );
}
