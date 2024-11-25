"use client";

import { tedxsjecAssetsPrefix } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Calendar } from "lucide-react";
import Link from "next/link";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const StaticShadow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="relative w-72 h-72 md:w-[500px] md:h-[400px]"
      style={{
        filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))",
      }}
    >
      {children}
    </div>
  );
};

const FlipCard = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#EB0028]   rounded-lg shadow-lg p-2 w-full aspect-square overflow-hidden border border-red-500/50">
      <div className="relative w-full h-2/3 bg-black/20 rounded-md flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white"
          >
            {value.toString().padStart(2, "0")}
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="text-xs sm:text-sm md:text-base capitalize text-white mt-2 font-semibold">
        {label}
      </span>
    </div>
  );
};

export default function HeroHighlight() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const svgRef = useRef<SVGSVGElement>(null);
  const targetDate = new Date("2024-12-14");

  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  useEffect(() => {
    setIsLoaded(true);

    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(intervalId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const timeUnits: (keyof TimeLeft)[] = ["days", "hours", "minutes", "seconds"];

  return (
    <section className="w-full mt-10 h-full lg:px-10 px-3  text-white overflow-hidden relative">
      {/* Semi-transparent overlay to allow stars to show through */}
      <div className="absolute inset-0  z-0"></div>

      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,120 C150,180 300,0 500,100 C700,200 800,0 1000,80 C1200,160 1400,0 1600,100 C1800,200 2000,0 2200,80 L2200,600 L0,600 Z"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
          style={{
            pathLength: pathLength,
            strokeDasharray: 1,
            strokeDashoffset: 1,
          }}
        />
      </svg>

      <div className="container mx-auto py-2 lg:py-0 flex flex-col-reverse lg:flex-row  justify-between relative z-20">
        <div className="lg:w-1/2 space-y-8 mt-4 lg:mt-20 hero-2">
          {/* <h1 className="text-[28px] py-1 md:text-5xl font-satoshi  text-center  lg:text-start font-extrabold bg-clip-text text-white">
            Ideas Worth Spreading
          </h1> */}
          <h1 className="text-[28px] md:h-14 lg:h-14 md:text-[40px] xl:text-5xl h-10 font-satoshi text-center lg:text-start font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-red-500">
            Ideas Worth Spreading
          </h1>
          <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-start">
            <p className="text-xl md:text-2xl font-satoshi text-white max-w-2xl leading-relaxed">
              Join us for an inspiring TEDx event featuring thought-provoking
              talks, innovative ideas, and transformative experiences.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-0 text-center lg:text-start flex flex-col sm:flex-row justify-center lg:justify-start items-center lg:items-start">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white py-2 transition-all duration-300 transform hover:scale-105"
              >
                Register Now
              </Button>
            </Link>
          </div>
          <div className="text-md text-white  flex flex-col items-centerv lg:items-start justify-center space-y-2">
            <div className="flex items-center justify-center">
              <Calendar className="mr-2" size={20} />
              <p className="text-center">Date: December 14, 2024</p>
            </div>
          </div>
        </div>
        <div className="lg:w-[50%] lg:mt-0 flex flex-col mb-2 items-center lg:items-end">
          <StaticShadow>
            <Image
              src={`${tedxsjecAssetsPrefix}/logo/main-logo.png`}
              height={500}
              width={500}
              alt="TEDx Event Logo"
            />
          </StaticShadow>
          <p className="text-xl md:text-3xl font-semibold text-center lg:mr-2 text-white">
            Life - Explore What&#39;s Worth Living
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-2 mt-4 relative z-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-satoshi text-white">
          Event Starts In
        </h2>
        <div className="grid grid-cols-4 font-satoshi gap-2 sm:gap-4 md:gap-6 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          {timeUnits.map((unit) => (
            <FlipCard key={unit} value={timeLeft[unit]} label={unit} />
          ))}
        </div>
      </div>
    </section>
  );
}
