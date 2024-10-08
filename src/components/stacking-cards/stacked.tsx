"use client";
import { useEffect, useRef } from "react";
import "@/components/stacking-cards/stacked.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import performersData from "@/components/stacking-cards/performers.json";

export default function StackedCards() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const cardsWrapper = gsap.utils.toArray<HTMLDivElement>(".cards__item");
    const cardsEl = gsap.utils.toArray<HTMLDivElement>(".cards_el");

    cardsWrapper.forEach((e, i) => {
      const card = cardsEl[i] as HTMLDivElement;
      let scale = 1,
        rotate = 0;

      if (i !== cardsEl.length - 1) {
        scale = 0.9 + 0.025 * i;
        rotate = -5;
      }
      // console.log(`Card Index: ${i}, Scale: ${scale}, Rotate: ${rotate}`);

      gsap.to(card, {
        scale: scale,
        rotationX: rotate,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: e,
          start: "top " + (120 + 30 * i),
          end: "bottom +=650px",
          endTrigger: ".end-animation",
          pin: e,
          pinSpacing: false,
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div className="sticky-section">
      <div className="cards">
        {performersData.map((card, index) => (
          <div
            className="cards__item"
            data-index={index}
            key={card.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
          >
            <div className="cards_el">
              <div className="card__image-container">
                <img
                  className="card__image"
                  src={card.imgSrc}
                  alt={`Card Image ${index + 1}`}
                />
              </div>
              <div className="card__content">
                <h1 className="card__title">{card.title}</h1>
                <p className="card__description">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space"></div>
      <div className="end-animation"></div>
    </div>
  );
}
