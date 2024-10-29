"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { tedxsjecAssetsPrefix } from "@/lib/utils";

const performers = [
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
    img: `${tedxsjecAssetsPrefix}/speakers/Kshiti2.avif`,
  },
  {
    id: 3,
    name: "Badekkila Pradeep",
    profession: "Voice Artist and Actor",
    description:
      "Badekkila Pradeep is a versatile actor, model, writer, and distinguished voice artist from Karnataka. Beginning as a reporter in 2006, Pradeep found his passion in voice-over, transforming Kannada TV narration with his unique style. He's voiced popular shows like Bigg Boss Kannada, Bangalore metro announcements, and numerous campaigns across languages, including Kannada, Tulu, Telugu, Tamil, Hindi, and English. An established voice for major Kannada TV channels, Pradeep is also an actor in Kannada and Tamil films and a writer with over 20 years in Kannada publications.",
    img: `${tedxsjecAssetsPrefix}/speakers/Kshiti3.avif`,
  },
  {
    id: 4,
    name: "Namitha Marimuthu",
    profession: "Transgender Rights Activist and Actress",
    description:
      "Namitha Marimuthu is a passionate transgender rights activist and actress who rose to fame with her performances in Tamil cinema. She advocates for the inclusion and recognition of transgender people in the entertainment industry and society. Namitha has also represented the transgender community in various international forums and is committed to creating awareness and understanding through her work.",
    img: `${tedxsjecAssetsPrefix}/speakers/Namitha_M1.avif`,
  },
  {
    id: 5,
    name: "Ashwin Shetty",
    profession: "Entrepreneur and Innovator",
    description:
      "Ashwin Shetty is an inspiring entrepreneur and innovator known for his pioneering contributions to sustainable technology. With a background in environmental science, Ashwin has launched several successful green startups that focus on renewable energy and sustainable living solutions. He is a sought-after speaker at eco-friendly and tech events worldwide.",
    img: `${tedxsjecAssetsPrefix}/speakers/Namitha_M2.avif`,
  },
  {
    id: 6,
    name: "Shriya Shetty",
    profession: "Culinary Expert and Chef",
    description:
      "Shriya Shetty is a renowned culinary expert and chef who has brought traditional Karnataka cuisine to a global audience. She is celebrated for her innovative fusion of local flavors with international techniques, creating a unique culinary experience. Shriya has been featured in multiple food festivals and has authored cookbooks that highlight the diversity of Indian cuisine.",
    img: `${tedxsjecAssetsPrefix}/speakers/Namitha_M3.avif`,
  },
  {
    id: 7,
    name: "Munita Veigas Rao",
    profession: "Philanthropist and Social Worker",
    description:
      "Munita Veigas Rao is a dedicated philanthropist and social worker known for her unwavering support for education and healthcare in underprivileged communities. She runs several non-profit initiatives that focus on women’s empowerment, child welfare, and access to basic health services. Munita is committed to making a tangible difference in society through her charitable activities.",
    img: `${tedxsjecAssetsPrefix}/speakers/Namitha_M4.avif`,
  },
  {
    id: 8,
    name: "Yukthi",
    profession: "Classical Dancer and Cultural Ambassador",
    description:
      "Yukthi is a classical dancer and cultural ambassador specializing in Bharatanatyam and Odissi. With years of rigorous training and international performances, she promotes Indian classical dance and culture on a global stage. Yukthi is involved in mentoring young dancers and actively participates in cultural exchange programs to foster understanding and appreciation of Indian traditions.",
    img: `${tedxsjecAssetsPrefix}/speakers/Kshiti1.avif`,
  },
  {
    id: 9,
    name: "Agasthyam Kalaripayattu",
    profession: "Martial Arts Instructor",
    description:
      "Agasthyam Kalaripayattu is a respected martial arts instructor specializing in Kalaripayattu, an ancient Indian martial art. He has dedicated his life to preserving and promoting this traditional art form, teaching students around the world about the physical and mental discipline required. Agasthyam has also organized international workshops and demonstrations to showcase Kalaripayattu.",
    img: `${tedxsjecAssetsPrefix}/speakers/Kshiti2.avif`,
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
      <div className="grid md:max-w-[1200px] mx-auto grid-rows-4 px-4 box-border">
        {performers.map((card, index) => (
          <div
            className="sticky top-0 rounded-2xl"
            data-index={index}
            key={card.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
          >
            <div className="flex overflow-hidden mt-40 bg-white will-change-transform md:h-[700px] h-[450px]  transform-origin-top-center w-full">
              <div className="flex flex-shrink-0 w-1/2">
                <img
                  className="w-full h-full object-cover aspect-square"
                  src={card.img}
                  alt={`Card Image ${index + 1}`}
                />
              </div>
              <div className="flex flex-col w-1/2 md:p-[40px_30px] p-3">
                <h1 className="text-2xl lg:text-5xl font-black text-blackTheme m-0 p-0 leading-tight md:py-4 py-2">
                  {card.name}
                </h1>
                <p className="md:text-2xl  font-semibold text-blackTheme leading-tight md:pb-4 pb-2">
                  {card.profession}
                </p>
                <p className="md:text-xl text-xs leading-tight  text-blackTheme ">
                  {card.description}
                </p>
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
