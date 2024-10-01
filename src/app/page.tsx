"use client";

import { useState } from "react";
import React from "react";
import HorizontalScroll from "@/components/HorizontalScrollCarousel";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen p-4"></div>
      <div>
        <HorizontalScroll />
      </div>
      <div className="h-screen"></div>
    </>
  );
}
