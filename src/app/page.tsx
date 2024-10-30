"use client";

import React from "react";
import ParallaxFooter from "@/components/common/Footer";
import Speakers from "@/components/common/speakers";
import { PreviousEdition } from "@/components/common/Container-Scroll";
import About from "@/components/common/About";
import Team from "@/components/common/Team-Section";
import { CtaSection } from "@/components/common/cta-section";
import Performers from "@/components/widget/performers";
import HeroHighlight from "@/components/widget/hero";

export default function Home() {
  return (
    <>
      <div className="z-20 relative bg-blackTheme pt-20 overflow-x-clip">
        <HeroHighlight />
        <div className="h-full mt-20 mb-52" id="about">
          <About />
        </div>
        <div>
          <Speakers />
        </div>

        <div>
          <h1 className="md:text-8xl mb-[40px] text-4xl text-center font-black text-redTheme px-10">
            The Performers
          </h1>
          <Performers />
        </div>
        <div className=" bg-gradient-to-b bg-blackTheme from-blackTheme via-redTheme  to-blackTheme to-95%">
          <PreviousEdition />
        </div>
        <div className="bg-blackTheme mb-[100vh] h-fit mt-14">
          <h1 className="md:text-8xl text-4xl text-center font-black text-redTheme px-10">
            The Team
          </h1>
          <Team />
          <CtaSection />
        </div>
      </div>
      <ParallaxFooter />
    </>
  );
}
