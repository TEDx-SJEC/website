import CardHoverEffect from "@/components/edil-ozi/card-hover-effect";
import { tedxsjecAssetsPrefix } from "@/lib/utils";

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
];

const Team = () => {
  return (
    <div className="z-10 px-10 py-8 h-full bg-whiteTheme">
      <CardHoverEffect members={team} />
    </div>
  );
};
export default Team;
