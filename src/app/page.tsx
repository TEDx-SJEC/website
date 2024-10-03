"use client";

import { useState } from "react";
import React from "react";
import HorizontalScroll from "@/components/HorizontalScrollCarousel";
import TextReveal from "@/components/ui/text-reveal";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen p-4"></div>
      <div className="z-10 flex min-h-64 items-center justify-center rounded-lg ">
        <TextReveal text="TEDxSJEC is a platform that brings together curious, creative, and progressive thinkers from St. Joseph Engineering College." />
      </div>
      <div>
        <HorizontalScroll />
      </div>
      <div className="h-screen"></div>
    </>
  );
}
