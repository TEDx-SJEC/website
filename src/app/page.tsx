"use client";

import React from "react";
import Speakers from "@/components/common/speakers";
import { PreviousEdition } from "@/components/common/container-scroll";
import About from "@/components/common/about";
import Team from "@/components/common/team-section";
import Performers from "@/components/widget/performers";
import HeroHighlight from "@/components/widget/hero";
import Footer from "@/components/common/contact-page";
import CTA from "@/components/common/cta-section-2";
export default function Home() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false));
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <div className="z-20 relative pt-20 overflow-x-clip 1">
        <HeroHighlight />
        <div className="h-full  mt-20 mb-20 lg:mb-40" id="about">
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
        <div className="">
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
        <div id="contact" className="mt-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
