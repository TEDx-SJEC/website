"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "@studio-freight/lenis"
import { useGSAP } from "@gsap/react"
import { tedxsjecAssetsPrefix } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"
gsap.registerPlugin(ScrollTrigger)

interface PerformerSection {
  images: string[]
  name: string
  profession: string
  description: string
}

const performerSections: PerformerSection[] = [
  {
    name: "Yukthi Udupa",
    profession: "Bharatanatyam artist",
    description:
      "Yukthi Udupa, a passionate Bharatanatyam artist, began her journey at 12 under Guru Vid Smt. Pravitha Ashok at Nritya Vasantha Natyalaya® Kundapura. She completed her exams with distinction and earned the Karnataka State Music and Dance Scholarship. Yukthi has won numerous awards, including  and the excelling in international, national, and state-level competitions. Her Bharatanatyam Arangetram was a celebrated display of her technical skill and expressive artistry. Yukthi is also a 'B' grade Doordarshan artist, inspiring young dancers and honoring Bharatanatyam's legacy.",
    images: [
      `${tedxsjecAssetsPrefix}/performers/Yukthi1.avif`,
    ],
  },
]

export default function Component() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>(performerSections.map(() => 0))
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([])
  const [selectedSection, setSelectedSection] = useState<PerformerSection | null>(null)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useGSAP(() => {
    const lenis = new Lenis({ lerp: 0.07 })

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.utils
      .toArray<HTMLDivElement>(".img-container")
      .forEach((container) => {
        const img = container.querySelector("img")

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
          )
        }
      })

    // Set up hover animations for description on desktop
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1200px)", () => {
      setIsLargeScreen(true)
      gsap.utils
        .toArray<HTMLDivElement>(".performer-section")
        .forEach((section) => {
          const description = section.querySelector(".description")
          const tl = gsap.timeline({ paused: true })

          tl.fromTo(
            description,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          )

          section.addEventListener("mouseenter", () => tl.play())
          section.addEventListener("mouseleave", () => tl.reverse())
        })
    })

    mm.add("(max-width: 1200px)", () => {
      setIsLargeScreen(false)
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((st) => st.kill())
      mm.revert()
    }
  }, [])

  useEffect(() => {
    performerSections.forEach((_, index) => {
      intervalRefs.current[index] = setInterval(() => {
        setCurrentImageIndices((prevIndices) => {
          const newIndices = [...prevIndices]
          newIndices[index] =
            (newIndices[index] + 1) % performerSections[index].images.length
          return newIndices
        })
      }, 2500 + index * 1000)
    })

    return () => {
      intervalRefs.current.forEach((interval) => {
        if (interval) clearInterval(interval)
      })
    }
  }, [])

  const handleSectionClick = (section: PerformerSection) => {
    if (!isLargeScreen) {
      setSelectedSection(section)
    }
  }

  // Effect to disable body scroll when dialog is open
  useEffect(() => {
    if (selectedSection) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }

    return () => document.body.classList.remove("no-scroll")
  }, [selectedSection])

  return (
    <Dialog open={!!selectedSection} onOpenChange={(open) => !open && setSelectedSection(null)}>
      <div ref={containerRef} className="overflow-hidden ">
        {performerSections.map((section, sectionIndex) => (
          <section
            key={sectionIndex}
            className="flex md:max-w-[1200px] items-center justify-center relative mx-auto px-4 my-24 first:mt-0 last:mb-0"
            aria-labelledby={`section-title-${sectionIndex}`}
          >
            <div 
              className={`relative w-full aspect-[16/9] overflow-hidden img-container performer-section ${!isLargeScreen ? 'cursor-pointer' : ''}`}
              onClick={() => handleSectionClick(section)}
            >
              {section.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image}
                  alt={`Performer section ${sectionIndex + 1}, slide ${imageIndex + 1} of ${section.images.length}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${imageIndex === currentImageIndices[sectionIndex] ? "opacity-100" : "opacity-0"}`}
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
              <img
                src={selectedSection.images[0]}
                alt={`${selectedSection.name} - ${selectedSection.profession}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="">
              <h2 className="text-2xl font-bold mb-2">{selectedSection.name}</h2>
              <p className="text-xl italic mb-4">{selectedSection.profession}</p>
              <p className="text-base">{selectedSection.description}</p>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}
