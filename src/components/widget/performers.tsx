/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "@studio-freight/lenis"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

interface PerformerSection {
  image: string
  title: string
  subtitle: string
}

const performerSections: PerformerSection[] = [
  {
    image: "https://images.unsplash.com/photo-1506157491319-81aab3add711?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Spotlight Crew",
    subtitle: "Shining brightest when it matters most.",
  },
  {
    image: "https://images.unsplash.com/photo-1540908625033-6e2d915074fb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Spotlight Crew",
    subtitle: "Shining brightest when it matters most.",
  },
  {
    image: "https://images.unsplash.com/photo-1707716489310-0bee7330ff6b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "The Spotlight Crew",
    subtitle: "Shining brightest when it matters most.",
  },
]

export default function Performers() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const lenis = new Lenis({ lerp: 0.07 })

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.utils.toArray<HTMLDivElement>(".img-container").forEach((container) => {
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

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="overflow-hidden">
      {performerSections.map((section, index) => (
        <section
          key={index}
          className="flex items-center justify-center relative my-16 first:mt-0 last:mb-0"
          aria-labelledby={`section-title-${index}`}
        >
          <div className="relative w-full max-w-5xl aspect-[16/9] overflow-hidden img-container">
            <img
              src={section.image}
              alt={`Performer section ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8">
              <h2
                id={`section-title-${index}`}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2"
              >
                {section.title}
              </h2>
              <p className="text-xl md:text-2xl text-white italic">{section.subtitle}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}