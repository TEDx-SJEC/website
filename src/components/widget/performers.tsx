/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useGSAP } from "@gsap/react";
import { tedxsjecAssetsPrefix } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface PerformerSection {
  images: string[];
  name: String;
  profession: string;
  description: string;
}

const performerSections: PerformerSection[] = [
  {
    name: "Yukthi Udupa",
    profession: "Bharatanatyam artist",
    description:
      "Yukthi Udupa, a passionate Bharatanatyam artist, began her journey at 12 under Guru Vid Smt. Pravitha Ashok at Nritya Vasantha Natyalaya® Kundapura. She completed her “Vidwath” exams with distinction and earned the Karnataka State Music and Dance Scholarship. Yukthi has won numerous awards, including “Natya Sammohini,” “Yuva Kala Prashasti,” and the “Kalashree Award,” excelling in international, national, and state-level competitions. Her Bharatanatyam Arangetram was a celebrated display of her technical skill and expressive artistry. Yukthi is also a ‘B’ grade Doordarshan artist, inspiring young dancers and honoring Bharatanatyam's legacy.",
    images: [
      `${tedxsjecAssetsPrefix}/performers/Yukthi1.avif`,
      `${tedxsjecAssetsPrefix}/performers/Yukthi1.avif`,
      `${tedxsjecAssetsPrefix}/performers/Yukthi1.avif`,
      // `${tedxsjecAssetsPrefix}/performers/Yukthi2.avif`,
    ],
  },
];

export default function Performers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>(
    performerSections.map(() => 0)
  );
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([]);

  useGSAP(() => {
    const lenis = new Lenis({ lerp: 0.07 });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.utils
      .toArray<HTMLDivElement>(".img-container")
      .forEach((container) => {
        const img = container.querySelector("img");

        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                scrub: true,
                start: "top bottom",
                end: "bottom top",
              },
            }
          );
        }
      });

    // Set up hover animations for description
    gsap.utils
      .toArray<HTMLDivElement>(".performer-section")
      .forEach((section) => {
        const description = section.querySelector(".description");
        const tl = gsap.timeline({ paused: true });

        tl.fromTo(
          description,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
        );

        section.addEventListener("mouseenter", () => tl.play());
        section.addEventListener("mouseleave", () => tl.reverse());
      });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    performerSections.forEach((_, index) => {
      intervalRefs.current[index] = setInterval(() => {
        setCurrentImageIndices((prevIndices) => {
          const newIndices = [...prevIndices];
          newIndices[index] =
            (newIndices[index] + 1) % performerSections[index].images.length;
          return newIndices;
        });
      }, 2500 + index * 1000); // Stagger the intervals to make the changes less synchronized
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      intervalRefs.current.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden">
      {performerSections.map((section, sectionIndex) => (
        <section
          key={sectionIndex}
          className="flex md:max-w-[1200px] items-center justify-center relative mx-auto px-4 my-16 first:mt-0 last:mb-0"
          aria-labelledby={`section-title-${sectionIndex}`}
        >
          <div className="relative w-full aspect-[16/9] overflow-hidden img-container performer-section">
            {section.images.map((image, imageIndex) => (
              <img
                key={imageIndex}
                src={image}
                alt={`Performer section ${sectionIndex + 1}, slide ${
                  imageIndex + 1
                } of ${section.images.length}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  imageIndex === currentImageIndices[sectionIndex]
                    ? "opacity-100"
                    : "opacity-0"
                }`}
                aria-hidden={imageIndex !== currentImageIndices[sectionIndex]}
              />
            ))}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8">
              <h2
                id={`section-title-${sectionIndex}`}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2"
              >
                {section.name}
              </h2>
              <p className="text-xl md:text-2xl text-white italic">
                {section.profession}
              </p>
            </div>
            <div className="description absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-8 opacity-0">
              <p className="text-white text-lg md:text-xl lg:text-2xl text-center">
                {section.description}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
