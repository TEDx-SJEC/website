"use client";

import React from "react";
import ParallaxFooter from "@/components/common/Footer";
import StackedCards from "@/components/stacking-cards/stacked";
import { PreviousEdition } from "@/components/common/Container-Scroll";
import About from "@/components/common/About";
import Team from "@/components/common/Team-Section";

export default function Home() {
  return (
    <>
      <div className="z-20 relative bg-blackTheme overflow-x-clip">
        <div
          className="flex flex-col items-center justify-center h-screen w-full p-4  bg-gradient-to-tr from-red-600 via-black to-black  "
          id="hero"
        ></div>
        <div className="h-screen" id="about">
          <About />
        </div>
        <div>
          <StackedCards />
        </div>
        <div className=" bg-gradient-to-b bg-blackTheme from-blackTheme via-redTheme  to-whiteTheme to-95%">
          <PreviousEdition />
        </div>
        <div className="bg-whiteTheme mb-[100vh] min-h-screen h-fit">
          <h1 className="md:text-8xl text-4xl text-center font-black text-blackTheme px-10">
            The Team
          </h1>
          <Team />
        </div>
      </div>
      <ParallaxFooter />
    </>
  );
}
