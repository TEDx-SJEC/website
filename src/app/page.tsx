"use client";

import React from "react";
import HorizontalScroll from "@/components/HorizontalScrollCarousel";
import TextReveal from "@/components/ui/text-reveal";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import ParallaxFooter from "@/components/Footer";
import Lenis from 'lenis'
import Nav from "@/components/widget/header";
import ScrollProgress from "@/components/ui/progressBar";

export default function Home() {
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
    console.log(e)
  })
  
  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)
  return (
    <>
      <div className="z-20 relative bg-black ">
        <div className="flex flex-col items-center justify-center h-screen p-4"></div>
        <div className="z-10 flex min-h-64 items-center justify-center rounded-lg ">
          <TextReveal text="TEDxSJEC is a platform that brings together curious, creative, and progressive thinkers from St. Joseph Engineering College." />
        </div>
        <div className="relative p-32 backdrop-invert flex flex-col items-center">
          <h1 className="text-black text-center text-5xl font-bold leading-tight">
            Check out the <br /> Previous Editions
          </h1>
          <div className="mt-24 w-2/3">
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
