"use client";

import { useState } from "react";
import React from "react";
import HorizontalScroll from "@/components/HorizontalScrollCarousel";
import TextReveal from "@/components/ui/text-reveal";
import Lenis from 'lenis'
import Nav from "@/components/widget/header";
import ScrollProgress from "@/components/ui/progressBar";
import { VortexDemo } from "@/components/widget/hero";
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
    
      <div className="flex flex-col items-center justify-center h-screen ">
      </div>
      <div className="z-10 flex  items-center justify-center rounded-lg ">
        {/* <TextReveal text="TEDxSJEC is a platform that brings together curious, creative, and progressive thinkers from St. Joseph Engineering College." /> */}
      </div>
      <div>
        <HorizontalScroll />
      </div>
      <div className="h-screen"></div>
    </>
  );
}
