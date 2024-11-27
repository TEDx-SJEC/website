"use client";

import { tedxsjecAssetsPrefix } from "@/lib/utils";
import TeamCard from "@/components/common/team-card";

import BackButton from "@/components/shared/back-button";
const webAndDesignTeam = [
    {
        url: `${tedxsjecAssetsPrefix}/team/joywin.avif`,
        title: "Web Lead",
        id: 1,
        name: "Joywin Bennis",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/vyshnav.avif`,
        title: "Full Stack ",
        id: 2,
        name: "Vyshnav K",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/charis.avif`,
        title: "Frontend ",
        id: 3,
        name: "Charis Pinto",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/pranav.avif`,
        title: "Frontend ",
        id: 4,
        name: "Pranavv",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/santhishm.avif`,
        title: "Frontend ",
        id: 5,
        name: "Santhishm",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/naveen.avif`,
        title: "UI/UX Designer",
        id: 6,
        name: "Naveen",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/joshua.avif`,
        title: "App Developer",
        id: 7,
        name: "Joshua",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/rachan.avif`,
        title: "Design",
        id: 8,
        name: "Rachan Karkera",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/nihaal.avif`,
        title: "Design",
        id: 9,
        name: "Nihaal Y K",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/uthpal.avif`,
        title: "Design",
        id: 10,
        name: "Uthpal",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/deric.avif`,
        title: "Design",
        id: 11,
        name: "Deric Jojo",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/alston.avif`,
        title: "Design",
        id: 12,
        name: "Alston Peter",
    },
    {
        url: `${tedxsjecAssetsPrefix}/team/dhanush.avif`,
        title: "Design",
        id: 13,
        name: "Dhanush D",
    },
    
];

export default function Teams() {
    return (
        <div className="min-h-screen w-full bg-background py-16 px-4 sm:px-6 md:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl">
                <BackButton className="mt-5" />
                <h1 className="mt-8 mb-8 md:mb-12 text-center text-3xl font-black text-redTheme sm:text-4xl md:text-5xl lg:text-7xl">
                    The Web Team and Design Team
                </h1>
                <div className="z-10 md:px-10 py-20 h-full flex flex-col items-center justify-center">
                    <TeamCard members={webAndDesignTeam} />
                </div>
            </div>
        </div>
    );
}
