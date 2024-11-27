"use client";

import { useState } from "react";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import TeamCard from "./team-card";
import { Button } from "../ui/button";
import Link from "next/link";

const coreTeam = [
    {
        url: `${tedxsjecAssetsPrefix}/team/sharon.avif`,
        title: "Organizer & Licensee",
        id: 1,
        name: "Sharon Tyana Menezes",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/sasha.avif`,
        title: "Co-Organizer",
        id: 2,
        name: "Sasha Sajith",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/hanniele.avif`,
        title: "Technical Head",
        id: 3,
        name: "Hanniel Andrade",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/vyasa.avif`,
        title: "Curation Head",
        id: 4,
        name: "Vyasa M Nayak",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/kaneeksha.avif`,
        title: "Publicity & Promotions Head",
        id: 5,
        name: "Kaneeksha Kiran",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/lawrence.avif`,
        title: "Design Head",
        id: 6,
        name: "Lawrence Robert D'Souza",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/larsen.avif`,
        title: "Creative Head",
        id: 7,
        name: "Larsen Lionel Dsouza",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/ritesh.avif`,
        title: "Creative Head",
        id: 8,
        name: "Ritesh",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/anupam.avif`,
        title: "Logistics Head",
        id: 9,
        name: "Anupam B Shetty",
    },
];

const Team = () => {
    return (
        <div className="z-10 md:px-10 py-20 h-full flex flex-col items-center justify-center">
            <TeamCard members={coreTeam} />
            <Link href="/team">
                <Button className="mt-8 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Show More
                </Button>
            </Link>
        </div>
    );
};

export default Team;
