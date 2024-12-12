import { SponsorCard } from "./sponsor-card";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import {
  bronzeSponsors,
  goldSponsors,
  platinumSponsors,
  silverSponsors,
} from "@/constants";

export function SponsorSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="md:text-8xl text-4xl font-black text-center mb-20 px-10">
          Our Sponsors
        </h2>
        <h2 className="md:text-4xl text-2xl font-bold text-center mb-8 text-slate-300">
          Platinum Sponsors
        </h2>
        <div className="flex flex-wrap  gap-6 my-10 justify-center">
          {platinumSponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.name}
              name={sponsor.name}
              logoUrl={sponsor.logoUrl}
            />
          ))}
        </div>
        <h2 className="md:text-4xl text-2xl font-bold text-center mb-8 text-yellow-400">
          Gold Sponsors
        </h2>
        <div className="flex flex-wrap  gap-6 my-10 justify-center">
          {goldSponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.name}
              name={sponsor.name}
              logoUrl={sponsor.logoUrl}
            />
          ))}
        </div>
        <h2 className="md:text-4xl text-2xl font-bold text-center mb-8 text-slate-100">
          Silver Sponsors
        </h2>
        <div className="flex flex-wrap  gap-6 my-10 justify-center">
          {silverSponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.name}
              name={sponsor.name}
              logoUrl={sponsor.logoUrl}
            />
          ))}
        </div>
        <h2 className="md:text-4xl text-2xl font-bold text-center mb-8 text-yellow-700">
          Bronze Sponsors
        </h2>
        <div className="flex flex-wrap  gap-6 my-10 justify-center">
          {bronzeSponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.name}
              name={sponsor.name}
              logoUrl={sponsor.logoUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
