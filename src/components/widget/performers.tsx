"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useGSAP } from "@gsap/react";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { performers } from "@/constants";
import { PerformerSection } from "@/types";
gsap.registerPlugin(ScrollTrigger);

const ImagePlaceholder: React.FC = () => (
  <div
    role="status"
    className="animate-pulse flex items-center justify-center w-full h-full bg-gray-300 rounded-2xl dark:bg-gray-700"
  >
    <svg
      className="w-10 h-10 text-gray-200 dark:text-gray-600"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 18"
    >
      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

const DelayedImage: React.FC<{
  src: string;
  alt: string;
  sectionIndex: number;
  imageIndex: number;
  section: PerformerSection;
  currentImageIndices: number[];
}> = ({ src, alt, sectionIndex, imageIndex, section, currentImageIndices }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }); // 2-second delay
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <ImagePlaceholder />;
  }

  return (
    <Image
      // key={imageIndex}
      src={src}
      width={1200}
      height={675}
      alt={`Performer section ${sectionIndex + 1}, slide ${imageIndex + 1} of ${
        section.images.length
      }`}
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-8000 ${
        imageIndex === currentImageIndices[sectionIndex]
          ? "opacity-100"
          : "opacity-0"
      }`}
      aria-hidden={imageIndex !== currentImageIndices[sectionIndex]}
    />
  );
};

export default function Component() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>(
    performers.map(() => 0)
  );
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([]);
  const [selectedSection, setSelectedSection] =
    useState<PerformerSection | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useGSAP(() => {
    const lenis = new Lenis({ lerp: 0.07 });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.utils
      .toArray<HTMLDivElement>(".img-container")
      .forEach((container) => {
        const images = container.querySelectorAll("img");

        if (images.length) {
          images.forEach((img) => {
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
                  onUpdate: (self) => {
                    images.forEach((image) => {
                      const isVisible = image.classList.contains("opacity-100");
                      if (isVisible) {
                        gsap.set(image, { yPercent: self.progress * 20 - 10 });
                      }
                    });
                  },
                },
              }
            );
          });
        }
      });

    // Set up hover animations for description on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1200px)", () => {
      setIsLargeScreen(true);
      gsap.utils
        .toArray<HTMLDivElement>(".performer-section")
        .forEach((section) => {
          const description = section.querySelector(".description");
          const tl = gsap.timeline({ paused: true });
          mm.add("(min-width: 1200px)", () => {
            setIsLargeScreen(true);
            gsap.utils
              .toArray<HTMLDivElement>(".performer-section")
              .forEach((section) => {
                const description = section.querySelector(".description");
                const tl = gsap.timeline({ paused: true });

                tl.fromTo(
                  description,
                  { yPercent: 100, opacity: 0 },
                  { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                );

                section.addEventListener("mouseenter", () => tl.play());
                section.addEventListener("mouseleave", () => tl.reverse());
              });
          });
          section.addEventListener("mouseenter", () => tl.play());
          section.addEventListener("mouseleave", () => tl.reverse());
        });
    });

    mm.add("(max-width: 1200px)", () => {
      setIsLargeScreen(false);
    });
    mm.add("(max-width: 1200px)", () => {
      setIsLargeScreen(false);
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      mm.revert();
    };
  }, []);

  useEffect(() => {
    performers.forEach((_, index) => {
      intervalRefs.current[index] = setInterval(() => {
        setCurrentImageIndices((prevIndices) => {
          const newIndices = [...prevIndices];
          newIndices[index] =
            (newIndices[index] + 1) % performers[index].images.length;
          return newIndices;
        });
      }, 2500 + index * 1000);
    });
    const currentInterval = intervalRefs.current;
    return () => {
      currentInterval.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  const handleSectionClick = (section: PerformerSection) => {
    if (!isLargeScreen) {
      setSelectedSection(section);
    }
  };

  // Effect to disable body scroll when dialog is open
  useEffect(() => {
    if (selectedSection) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [selectedSection]);

  return (
    <Dialog
      open={!!selectedSection}
      onOpenChange={(open) => !open && setSelectedSection(null)}
    >
      <div ref={containerRef} className="overflow-hidden ">
        {performers.map((section, sectionIndex) => (
          <section
            key={sectionIndex}
            className="flex md:max-w-[1200px] items-center justify-center relative mx-auto px-4 my-12 first:mt-0 last:mb-0"
            aria-labelledby={`section-title-${sectionIndex}`}
          >
            <div
              className={`relative w-full aspect-[16/9] overflow-hidden img-container performer-section ${
                !isLargeScreen ? "cursor-pointer" : ""
              }`}
              onClick={() => handleSectionClick(section)}
            >
              <Suspense fallback={<ImagePlaceholder />}>
                {section.images.map((image, imageIndex) => (
                  <DelayedImage
                    key={imageIndex}
                    src={image}
                    alt={image}
                    sectionIndex={sectionIndex}
                    imageIndex={imageIndex}
                    section={section}
                    currentImageIndices={currentImageIndices}
                  />
                ))}
              </Suspense>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 lg:p-8">
                <h2
                  id={`section-title-${sectionIndex}`}
                  className="text-xl md:text-5xl lg:text-6xl font-bold text-white "
                >
                  {section.name}
                </h2>
                <p className="text-md md:text-3xl text-white italic">
                  {section.profession}
                </p>
              </div>
              <div className="description absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-8 opacity-0 pointer-events-none lg:pointer-events-auto">
                <p className="text-white text-lg md:text-xl lg:text-2xl text-center">
                  {section.description}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>
      {!isLargeScreen && selectedSection && (
        <DialogContent className="rounded-md  sm:max-w-[calc(95vw-15px)] max-w-[calc(100vw-15px)] max-h-[calc(100vh-15px)] overflow-hidden flex z-[999] items-center justify-center p-2">
          <div className="flex flex-col md:flex-col gap-6 max-h-full overflow-y-auto p-2">
            <div className="">
              <Image
                width={600}
                height={600}
                src={selectedSection.images[0]}
                alt={`${selectedSection.name} - ${selectedSection.profession}`}
                className="w-full h-auto object-cover rounded-lg"
                priority={true}
                loading="eager"
              />
            </div>
            <div className="">
              <h2 className="text-2xl font-bold mb-2">
                {selectedSection.name}
              </h2>
              <p className="text-xl italic mb-4">
                {selectedSection.profession}
              </p>
              <p className=" text-sm">{selectedSection.description}</p>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
