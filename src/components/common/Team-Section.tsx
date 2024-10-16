import CardHoverEffect from "@/components/edil-ozi/card-hover-effect";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import TeamCard from "./TeamCard";

const team = [
  {
    url: `${tedxsjecAssetsPrefix}/team/sharon.avif`,
    title: "Licensee & Organizer",
    id: 2,
    name: "Sharon Tyana Menezes",
  },
  {
    url: `${tedxsjecAssetsPrefix}/team/sharon.avif`,
    title: "Co-Organizer",
    id: 3,
    name: "Sasha Sajith",
  },
  {
    url: `${tedxsjecAssetsPrefix}/team/sharon.avif`,
    title: "Curation Head",
    id: 4,
    name: "Vyasa M Nayak",
  },
  {
    url: `${tedxsjecAssetsPrefix}/team/sharon.avif`,
    title: "Technical Head",
    id: 5,
    name: "Hanniel Andrede",
  },
  {
    url: `${tedxsjecAssetsPrefix}/team/sharon.avif`,
    title: "Design Head",
    id: 6,
    name: "Lawrence Robert D'Souza",
  },
  {
    url: `${tedxsjecAssetsPrefix}/team/sharon.avif`,
    title: "Content Manager",
    id: 7,
    name: "Kavya Suresh",
  },
  {
    url: `${tedxsjecAssetsPrefix}/team/sharon.avif`,
    title: "Social Media Head",
    id: 8,
    name: "Rahul Krishna Patel",
  },
  {
    url: `${tedxsjecAssetsPrefix}/team/sharon.avif`,
    title: "Marketing Manager",
    id: 9,
    name: "Mayank Gupta",
  },
  {
    url: `${tedxsjecAssetsPrefix}/team/sharon.avif`,
    title: "Marketing Manager",
    id: 9,
    name: "Mayank Gupta",
  },
];

const Team = () => {
  return (
    <div className="z-10 md:px-10 py-20 h-full  flex items-center justify-center">
      {/* <CardHoverEffect members={team} /> */}

      <TeamCard members={team} />
    </div>
  );
};
export default Team;
