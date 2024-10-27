"use client";

import React from "react";
import ParallaxFooter from "@/components/common/Footer";
import StackedCards from "@/components/stacking-cards/stacked";
import { PreviousEdition } from "@/components/common/Container-Scroll";
import About from "@/components/common/About";
import Team from "@/components/common/Team-Section";
import { CtaSection } from "@/components/common/cta-section";
import Performers from "@/components/widget/performers";
import HeroHighlight from "@/components/widget/hero";
import Landing_page from "@/components/widget/landing";

export default function Home() {
    return (
        <>   
            {/* <Landing_page/> */}
            <div className="z-20 relative bg-blackTheme overflow-x-clip">
               <HeroHighlight/>
                {/* <div
                    className="flex flex-col items-center justify-center h-screen w-full p-4  bg-gradient-to-tr from-red-600 via-black to-black  "
                    id="hero"
                ></div> */}
                <div className="h-screen" id="about">
                    <About />
                </div>

                <div>
                    {/* <StackedCards /> */}
                    <h1 className="md:text-8xl mb-[40px] text-4xl text-center font-black text-whiteTheme px-10">
                        The Performers
                    </h1>
                    <Performers />
                </div>
                <div className=" bg-gradient-to-b bg-blackTheme from-blackTheme via-redTheme  to-blackTheme to-95%">
                    <PreviousEdition />
                </div>
                <div className="bg-blackTheme mb-[100vh] h-fit mt-14">
                    <h1 className="md:text-8xl text-4xl text-center font-black text-whiteTheme px-10">
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
