"use client";

import React, { useState, useEffect } from "react";
// import ParallaxFooter from "@/components/common/Footer";
import Speakers from "@/components/common/speakers";
import { PreviousEdition } from "@/components/common/Container-Scroll";
import About from "@/components/common/About";
import Team from "@/components/common/Team-Section";
// import { CtaSection } from "@/components/common/cta-section";
import Performers from "@/components/widget/performers";
import HeroHighlight from "@/components/widget/hero";
import Footer from "@/components/common/Footer-1";
import CTA from "@/components/common/cta-section-2";
// import Inkcursor from "@/components/common/ink";
import CanvasCursor from "@/components/common/ink";
// import Landing_page from "@/components/widget/landing";// Import the loading screen component

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loading screen after the content is ready
    const timer = setTimeout(() => setLoading(false)); // Adjust as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Ink Cursor overlay for the entire page */}
      {/* <CanvasCursor /> */}

      {/* Loading Screen */}
      {/* <Landing_page  /> */}

      {/* Main Page Content */}
      <div className="z-20 relative pt-20 overflow-x-clip 1">
        <HeroHighlight />
        <div className="h-full mt-20 mb-20" id="about">
          <About />
        </div>
        <div id="speakers" className="">
          <Speakers />
        </div>

        <div>
          <h1
            id="performers"
            className="md:text-8xl mb-[40px] text-4xl mt-20 text-center font-black text-redTheme px-10"
          >
            The Performers
          </h1>
          <Performers />
        </div>
        <div className=" ">
          <PreviousEdition />
        </div>
        <div id="team" className="bg-transparent h-fit mt-14">
          <h1 className="md:text-8xl text-4xl text-center font-black text-redTheme px-10">
            The Team
          </h1>
          <div className="">
            <Team />
          </div>
          <CTA />
        </div>
        <Footer />
      </div>
    </>
  );
}
// ${loading ? 'hidden' : ''}`}
