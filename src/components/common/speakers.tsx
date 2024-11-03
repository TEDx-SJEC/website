"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import MoreInfo from "../ui/SpringModal";

const speakers = [
  {
    id: 1,
    name: "Karen Kshiti Suvarna",
    profession: "Film Director",
    description:
      "Karen Kshiti Suvarna’s debut short film, Hide & Seek, has made waves in the film industry, winning the Best Debut Director (Female) at the Dadasaheb Phalke Achievers Awards 2024. The film has also been showcased at the prestigious Cannes Film Festival. It has also earned accolades across 12 other international festivals and received 15 nominations. With a unique narrative style and a commitment to exploring complex themes. She has also worked in several films and advertisements for prestigious brands and Production Houses.",
    img: `${tedxsjecAssetsPrefix}/speakers/Kshiti1.avif`,
  },
  {
    id: 2,
    name: "Suma R Nayak",
    profession: "Advocate and Animal Welfare Activist",
    description:
      "Meet Mrs Suma R Nayak, an advocate by profession and animal & environment welfare activist by choice, who believes every creation of God has a right to live a life devoid of pain, suffering and live in dignity. She is the recipient of several awards for her services in the field of environment protection and animal welfare. She is the Trustee of Animal Care Trust, an NGO which runs a charitable hospital cum rescue center for sick and injured community animals and birds at Shakthinagar, Mangalore that rescues and helps over 150 animals every single month.",
    img: `${tedxsjecAssetsPrefix}/speakers/Suma.avif`,
  },
  {
    id: 3,
    name: "Badekkila Pradeep",
    profession: "Actor | Voice Artist | Anchor",
    description:
      "Badekkila Pradeep is a versatile actor, model, writer, and distinguished voice artist from Karnataka. Beginning as a reporter in 2006, Pradeep found his passion in voice-over, transforming Kannada TV narration with his unique style. He's voiced popular shows like Bigg Boss Kannada, Bangalore metro announcements, and numerous campaigns across languages, including Kannada, Tulu, Telugu, Tamil, Hindi, and English. An established voice for major Kannada TV channels, Pradeep is also an actor in Kannada and Tamil Television shows and films and a writer with over 20 years in Kannada publications.",
    img: `${tedxsjecAssetsPrefix}/speakers/Pradeep.avif`,
  },
  {
    id: 4,
    name: "Namitha Marimuthu",
    profession: "International Model, Actress, and Social Activist",
    description:
      "Namitha Marimuthu is an international model, actress, and social activist who has made history as the first transgender woman to reach the finals of Miss Universe India in 2024. She is the CEO and founder of Miss Queen India and the owner of Alfeem India, both of which promote inclusivity and empowerment. Namitha’s accolades include titles like Miss Trans Star International 2019, Miss International Queen 2022, and Miss Popular of the World 2022. Her appearance on Bigg Boss Tamil Season 5 amplified her voice as a champion for LGBTQ+ rights in India. Through her achievements and advocacy, Namitha continues to inspire and pave the way for future generations.",
    img: `${tedxsjecAssetsPrefix}/speakers/Namitha_M1.avif`,
  },
];

export default function Speakers() {
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
      gsap.to(card, {
        scale: 1,
        rotationX: 0,
        top: 0,
        left: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: e,
          start: "top " + 120,
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
    <div className="relative mt-[200px] box-border ">
      <h1 className="md:text-8xl text-4xl font-black text-center pt-8 text-redTheme">
        The Speakers
      </h1>
      <div className="grid md:max-w-[1200px] mx-auto grid-rows-4 gap-y-20 px-4 box-border">
        {speakers.map((card, index) => (
          <div
            className="sticky top-0 rounded-2xl"
            data-index={index}
            key={card.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
          >
            <div className="flex flex-col md:flex-row my-32  overflow-hidden bg-white will-change-transform md:h-[700px] h-[470px]  transform-origin-top-center w-full">
              <div className="flex flex-shrink-0 md:w-1/2 md:h-full h-2/3">
                <img
                  className="w-full h-full object-cover aspect-square"
                  src={card.img}
                  alt={`Card Image ${index + 1}`}
                />
              </div>
              <div className="flex flex-col md:w-1/2 md:p-[40px_30px] p-3">
                <h1 className="text-2xl lg:text-5xl font-black text-blackTheme m-0 p-0 leading-tight md:py-4 py-2">
                  {card.name}
                </h1>
                <p className="md:text-2xl  font-semibold text-blackTheme leading-tight md:pb-4 pb-2">
                  {card.profession}
                </p>
                <p className="md:text-xl text-xs leading-tight hidden md:block  text-blackTheme ">
                  {card.description}
                </p>
                <div className="block md:hidden">
                  <MoreInfo description={card.description} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[200px] text-[24px]"></div>
      <div className="end-animation"></div>
    </div>
  );
}
