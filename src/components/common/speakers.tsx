"use client";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { speakers } from "@/constants";
import Image from "next/image";

export default function Component() {
  useGSAP(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate each speaker as they come into view
    speakers.forEach((_, index) => {
      gsap.from(`.speaker-${index}`, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: `.speaker-${index}`,
          start: "top 90%", // Adjust this to control when the animation starts
          toggleActions: "play none none reverse", // Animation behavior
        },
      });
    });
  }, []);

  return (
    <div className="min-h-screen overflow-hidden p-2">
      <div className="relative z-10 w-full ma-4xl max-w-5xl mx-auto">
        <h1 className="md:text-8xl mb-[40px] text-4xl  text-center font-black">
          The Speakers
        </h1>
        <div className="space-y-20 md:space-y-32">
          {speakers.map((speaker, index) => (
            <div
              key={speaker.id}
              className={`speaker-${index} flex flex-col md:flex-row ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              } items-stretch justify-between bg-black/40 rounded-2xl  overflow-hidden shadow-xl border border-white border-opacity-20`}
            >
              <div className="w-full md:w-1/2  h-auto md:h-auto">
                <Image
                  className="w-full h-full object-cover"
                  src={speaker.img}
                  alt={speaker.name}
                  width={1920}
                  height={1080}
                />
              </div>

              <div className="w-full md:w-1/2 p-4 md:p-10 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                  {speaker.name}
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold text-[#EB0028] mb-5">
                  {speaker.profession}
                </p>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                  {speaker.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
