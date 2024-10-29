/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface PerformerSection {
  images: string[];
  title: string;
  subtitle: string;
  description: string;
}

const performerSections: PerformerSection[] = [
  {
    images: [
      "https://images.unsplash.com/photo-1506157491319-81aab3add711?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    title: "The Spotlight Crew",
    subtitle: "Shining brightest when it matters most.",
    description:
      "The Spotlight Crew is a dynamic ensemble of performers who thrive under pressure. With their electrifying energy and captivating stage presence, they turn every performance into an unforgettable experience. From dazzling choreography to powerful vocals, they leave audiences spellbound and craving more.",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1540908625033-6e2d915074fb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    title: "The Rhythm Masters",
    subtitle: "Keeping the beat, moving your feet.",
    description:
      "The Rhythm Masters are the pulse of any performance. With their impeccable timing and infectious grooves, they create the foundation that drives the entire show. From thunderous drums to funky basslines, their rhythmic prowess keeps audiences moving and grooving all night long.",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1707716489310-0bee7330ff6b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    title: "The Harmony Collective",
    subtitle: "Blending voices, touching souls.",
    description:
      "The Harmony Collective is a group of vocal virtuosos who create magic with their voices. Their seamless harmonies and emotive performances transport listeners to another world. From soaring ballads to intricate a cappella arrangements, they showcase the true power and beauty of the human voice.",
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
                {section.title}
              </h2>
              <p className="text-xl md:text-2xl text-white italic">
                {section.subtitle}
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
