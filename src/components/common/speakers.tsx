"use client";

// import { useEffect, useState } from 'react'
import { tedxsjecAssetsPrefix } from "@/lib/utils";

const speakers =
  // [
  //   {
  //     id: 1,
  //     name: "Karen Kshiti Suvarna",
  //     profession: "Film Director",
  //     description:
  //       "Karen Kshiti Suvarna's debut short film, Hide & Seek, has made waves in the film industry, winning the Best Debut Director (Female) at the Dadasaheb Phalke Achievers Awards 2024. The film has also been showcased at the prestigious Cannes Film Festival. It has also earned accolades across 12 other international festivals and received 15 nominations.",
  //     img: `${tedxsjecAssetsPrefix}/speakers/Kshiti1.avif`,
  //   },
  //   {
  //     id: 2,
  //     name: "Suma R Nayak",
  //     profession: "Advocate and Animal Welfare Activist",
  //     description:
  //       "Meet Mrs Suma R Nayak, an advocate by profession and animal & environment welfare activist by choice, who believes every creation of God has a right to live a life devoid of pain, suffering and live in dignity. She is the recipient of several awards for her services in the field of environment protection and animal welfare.",
  //     img: `${tedxsjecAssetsPrefix}/speakers/cropped-Suma.avif`,
  //   },
  //   {
  //     id: 3,
  //     name: "Badekkila Pradeep",
  //     profession: "Actor | Voice Artist | Anchor",
  //     description:
  //       "Badekkila Pradeep is a versatile actor, model, writer, and distinguished voice artist from Karnataka. Beginning as a reporter in 2006, Pradeep found his passion in voice-over, transforming Kannada TV narration with his unique style. He's voiced popular shows like Bigg Boss Kannada, Bangalore metro announcements, and numerous campaigns across languages.",
  //     img: `${tedxsjecAssetsPrefix}/speakers/Pradeep 2.avif`,
  //   },
  //   {
  //     id: 4,
  //     name: "Namitha Marimuthu",
  //     profession: "International Model, Actress",
  //     description:
  //       "Namitha Marimuthu is an international model, actress, and social activist who has made history as the first transgender woman to reach the finals of Miss Universe India in 2024. She is the CEO and founder of Miss Queen India and the owner of Alfeem India, both of which promote inclusivity and empowerment.",
  //     img: `${tedxsjecAssetsPrefix}/speakers/Namitha_M1.avif`,
  //   },
  // ];

  [
    {
      id: 1,
      name: "Karen Kshiti Suvarna",
      profession: "Film Director",
      description:
        "Karen Kshiti Suvarna’s debut short film, Hide & Seek, has made waves in the film industry, winning the Best Debut Director (Female) at the Dadasaheb Phalke Achievers Awards 2024. The film has also been showcased at the prestigious Cannes Film Festival. It has also earned accolades across 12 other international festivals, receiving 15 nominations. With a unique narrative style and a commitment to exploring complex themes, she has also worked in several films and advertisements for prestigious brands and Production Houses.",
      img: `${tedxsjecAssetsPrefix}/speakers/image-1.avif`,
    },
    {
      id: 2,
      name: "Suma R Nayak",
      profession:
        "Advocate and Animal Welfare Activist | Trustee of Animal Care Trust",
      description:
        "Mrs. Suma R Nayak is an advocate by profession, and an animal and environment welfare activist by choice who believes that every creation of God has the right to live a life devoid of pain and suffering, and to live with dignity. She is the recipient of several awards for her services in the fields of environmental protection and animal welfare. She is also a trustee of the Animal Care Trust, an NGO that runs a charitable hospital and rescue center for sick and injured community animals and birds in Shakthinagar, Mangaluru that rescues and helps over 150 animals every month.",
      img: `${tedxsjecAssetsPrefix}/speakers/image-2.avif`,
    },
    {
      id: 3,
      name: "Badekkila Pradeep",
      profession: "Actor | Voice Artist | Anchor",
      description:
        "Badekkila Pradeep is a versatile actor, model, writer, and distinguished voice artist from Karnataka. Beginning as a reporter in 2006, Pradeep found his passion in voiceover, transforming Kannada TV narration with his unique style. He's voiced popular shows like Bigg Boss Kannada, Bangalore Metro announcements, and numerous campaigns across languages including Kannada, Tulu, Telugu, Tamil, Hindi, and English. An established voice for major Kannada TV channels, Pradeep is also an actor in Kannada and Tamil television shows and films, and a writer with over 20 years in Kannada publications.",
      img: `${tedxsjecAssetsPrefix}/speakers/image-3.avif`,
    },
    {
      id: 4,
      name: "Namitha Marimuthu",
      profession: "International Model | Actress | Social Activist",
      description:
        "Namitha Marimuthu is an international model, actress, and social activist who has made history as the first transgender woman to reach the finals of Miss Universe India in 2024. She is the CEO and founder of Miss Queen India and the owner of Alfeem India, both of which promote inclusivity and empowerment. Namitha’s accolades include titles like Miss Trans Star International 2019, Miss International Queen 2022, and Miss Popular of the World 2022. Her appearance on Bigg Boss Tamil Season 5 amplified her voice as a champion for LGBTQ+ rights in India. Through her achievements and advocacy, Namitha continues to inspire and pave the way for future generations.",
      img: `${tedxsjecAssetsPrefix}/speakers/image-4.avif`,
    },
    {
      id: 5,
      name: "Shriya Shetty",
      profession: "Chef | Owner of BuCo",
      description:
        "Chef Shriya Shetty, based in Mangaluru, is known for her innovative approach to traditional Mangalorean and Karnataka cuisine, blending authenticity with a fresh twist. Through pop-ups in cities across India and international locations like Bangkok, her dishes, including her celebrated Ghee Roast and Kori Rotti, have gained a loyal following and attracted notable patrons, from celebrities to industrialists. After rigorous training with renowned chefs and co-founding BuCo., an artisanal bakery and café, she has dedicated herself to preserving Karnataka's culinary heritage while sharing her expertise as a chef consultant and mentor to aspiring chefs.",
      img: `${tedxsjecAssetsPrefix}/speakers/cropped-Shriya3.avif`,
    },
    {
      id: 6,
      name: "Ashwin Shetty",
      profession: "Academician | Culturalist | Agriculturist",
      description:
        "Mr. Ashwin Shetty, Assistant Professor of Mechanical Engineering at St Joseph Engineering College, Mangaluru, is a passionate custodian of Tulu Nadu’s cultural heritage. Actively involved in preserving traditions, he participates in indigenous rituals like Bhootha Kola and Yakshagana, showcasing the region's vibrant identity. Renowned for his eloquence in Tulu, he is a sought-after emcee, captivating audiences with his cultural insights. Beyond academia, Ashwin is a dedicated agriculturist and dairy farmer, promoting sustainable practices rooted in local wisdom. Recognized by the Bunts Sangha and other cultural groups, his work reflects a deep commitment to the culture, people, and land of Tulu Nadu.",
      img: `${tedxsjecAssetsPrefix}/speakers/cropped-Ashwin.avif`,
    },
    {
      id: 7,
      name: "Anish Shetty",
      profession: "International Motorcycle Racer & Crossfit Athlete",
      description:
        "Anish Shetty is a motorsport icon with over 206 podiums and 6 championships to his name, blazing trails on national and international platforms. As the first Asian to secure a podium in the eSC World Championship, he has consistently showcased excellence in racing. A multiple-time Indian National Motorcycle Racing and Rallying Champion, and the Royal Enfield Continental GT Cup Champion, Anish combines skill with endurance, earning the title of Fittest Man in Asia-2021 in the EF category. Founder of PRN Motorsport and a dedicated coach, he has trained over 1200+ participants, inspiring future racers through passion and perseverance.",
      img: `${tedxsjecAssetsPrefix}/speakers/cropped-Anish1.avif`,
    },
  ];

export default function Component() {
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
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              } items-stretch justify-between bg-black/40 rounded-2xl  overflow-hidden shadow-xl border border-white border-opacity-20`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2  h-auto md:h-auto">
                <img
                  className="w-full h-full object-cover"
                  src={speaker.img}
                  alt={speaker.name}
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 p-4 md:p-10 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 animate-float">
                  {speaker.name}
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold text-[#EB0028] mb-5 animate-float-delayed">
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
