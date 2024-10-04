import { tedxsjecAssetsPrefix } from "@/lib/utils";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const HorizontalScroll = () => {
  return (
    <div className="bg-transparent">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-50%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] ">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          <h1 className="text-7xl ml-5 uppercase text-[#ff0000] font-extrabold mb-0">
            The Team
          </h1>
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative md:h-[450px] md:w-[450px] h-[300px] w-[400px] rounded-3xl mr-4 overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute bottom-0 w-full z-10 grid place-content-left">
        <div className="bg-gradient-to-b w-full  from-black/0 to-black/30 p-8 py-4 text-5xl font-black uppercase text-white ">
          <p className=" text-3xl f">{card.name}</p>
          <p className="b text-xl ">{card.title}</p>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;

type CardType = {
  url: string;
  title: string;
  id: number;
  name: string;
};

const cards: CardType[] = [
  // {
  //   url: "https://tedx-sjec.github.io/website-assets/team/dr-binu-k-g.avif",
  //   title: "Faculty Co-Ordinator",
  //   name: "Binu K G",
  //   id: 1,
  // },
  {
    url: `${tedxsjecAssetsPrefix}/team/sharon.avif`,
    title: "Licensee & Organizer",
    id: 2,
    name: "Sharon Tyana Menezes",
  },
  {
    url: "/imgs/abstract/3.jpg",
    title: "Co-Organizer",
    id: 3,
    name: "Sasha Sajith",
  },
  {
    url: "/imgs/abstract/4.jpg",
    title: "Curation Head",
    id: 4,
    name: "Vyasa M Nayak",
  },
  {
    url: "/imgs/abstract/5.jpg",
    title: "Technical Head",
    id: 5,
    name: "Hanniel Andrede",
  },
  {
    url: "/imgs/abstract/6.jpg",
    title: "Design Head",
    id: 6,
    name: "Lawrence Robert D'Souza",
  },
  // {
  //   url: "/imgs/abstract/7.jpg",
  //   title: "Title 7",
  //   id: 7,
  //   name: "Binu K G",
  // },
];
