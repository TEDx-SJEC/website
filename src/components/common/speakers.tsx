"use client";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
const speakers = [
  {
    id: 1,
    name: "Karen Kshiti Suvarna",
    profession: "Film Director",
    description:
      "Karen Kshiti Suvarna's debut short film, Hide & Seek, has made waves in the film industry, winning the Best Debut Director (Female) at the Dadasaheb Phalke Achievers Awards 2024. The film has also been showcased at the prestigious Cannes Film Festival. It has also earned accolades across 12 other international festivals and received 15 nominations.",
    img: `${tedxsjecAssetsPrefix}/speakers/image-6.avif`,
  },
  {
    id: 2,
    name: "Suma R Nayak",
    profession: "Advocate and Animal Welfare Activist",
    description:
      "Meet Mrs Suma R Nayak, an advocate by profession and animal & environment welfare activist by choice, who believes every creation of God has a right to live a life devoid of pain, suffering and live in dignity. She is the recipient of several awards for her services in the field of environment protection and animal welfare.",
    img: `${tedxsjecAssetsPrefix}/speakers/image-2.avif`,
  },
  {
    id: 3,
    name: "Badekkila Pradeep",
    profession: "Actor | Voice Artist | Anchor",
    description:
      "Badekkila Pradeep is a versatile actor, model, writer, and distinguished voice artist from Karnataka. Beginning as a reporter in 2006, Pradeep found his passion in voice-over, transforming Kannada TV narration with his unique style. He's voiced popular shows like Bigg Boss Kannada, Bangalore metro announcements, and numerous campaigns across languages.",
    img: `${tedxsjecAssetsPrefix}/speakers/image-3.avif`,
  },
  {
    id: 4,
    name: "Namitha Marimuthu",
    profession: "International Model, Actress",
    description:
      "Namitha Marimuthu is an international model, actress, and social activist who has made history as the first transgender woman to reach the finals of Miss Universe India in 2024. She is the CEO and founder of Miss Queen India and the owner of Alfeem India, both of which promote inclusivity and empowerment.",
    img: `${tedxsjecAssetsPrefix}/speakers/image-4.avif`,
  },
];

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
          start: "top 80%", // Adjust this to control when the animation starts
          toggleActions: "play none none reverse", // Animation behavior
        },
      });
    });
  }, []);

  return (
    <div className="min-h-screen overflow-hidden p-2">
      <div className="relative z-10 w-full ma-4xl max-w-5xl mx-auto">
        <h1 className="md:text-8xl mb-[40px] text-4xl mt-20 text-center font-black">
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
                <img
                  className="w-full h-full object-cover"
                  src={speaker.img}
                  alt={speaker.name}
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
