import { tedxsjecAssetsPrefix } from "@/lib/utils";
import { PerformerSection, PreviousEdition, Speaker } from "@/types";

export const basePrice = 980.39;
export const initialdiscount = 0;
export const sjecStudentPrice = 735.29;
export const sjecFacultyPrice = 784.31;
export enum UserRole {
  ADMIN = "ADMIN",
  PARTICIPANT = "PARTICIPANT",
  COORDINATOR = "COORDINATOR",
}

export const ADMIN_USERS_PATH = "/admin/users";
export const speakers: Speaker[] = [
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
  {
    id: 8,
    name: " Dr Lavina Marilla Noronha",
    profession: "Director of Ave Maria Palliative Care",
    description:
      "Dr. Lavina Noronha, Director of Ave Maria Palliative Care, exemplifies humility and dedication. With an MPhil from NIMHANS and a Doctorate from the University of Illinois, she has served as an associate professor and director at Our Lady of the Lake University, USA, with extensive clinical experience in mental health, hospice, and crisis care. Her life changed when she returned to India realizing the lack of support for terminally ill patients. She founded Ave Maria Palliative Care, providing free, compassionate care to patients, regardless of their background, with a dedicated team and community support.",
    img: `${tedxsjecAssetsPrefix}/speakers/dr-lavina-1.avif`,
  },
];

export const performers: PerformerSection[] = [
  {
    name: "Yukthi Udupa",
    profession: "Bharatanatyam artist",
    description:
      "Yukthi Udupa, a passionate Bharatanatyam artist, began her journey at 12 under Guru Vid Smt. Pravitha Ashok at Nritya Vasantha Natyalaya® Kundapura. She completed her exams with distinction and earned the Karnataka State Music and Dance Scholarship. Yukthi has won numerous awards, including  and the excelling in international, national, and state-level competitions. Her Bharatanatyam Arangetram was a celebrated display of her technical skill and expressive artistry. Yukthi is also a 'B' grade Doordarshan artist, inspiring young dancers and honoring Bharatanatyam's legacy.",
    images: [
      `${tedxsjecAssetsPrefix}/performers/Yukthi1.avif`,
      `${tedxsjecAssetsPrefix}/performers/Yukthi 3.avif`,
    ],
  },
  {
    name: "Agasthyam Kalaripayattu",
    profession: "Martial Arts Institution",
    description:
      'Agasthyam Kalaripayattu, a premier martial arts institution, preserves and teaches the ancient art of Kalaripayattu from Kerala, India. Founded and led by Gurukkal S Mahesh, Agasthyam carries forward a legacy over 129 years old, deeply rooted in traditional combat techniques, self-defense, weaponry, and spiritual growth. The renowned school offers rigorous training that builds agility, strength, and resilience, blending physical discipline with profound cultural heritage. Among its notable achievements is the "Shakthi" program, which has empowered nearly 12,000 women and continues to inspire and nurture many more.',
    images: [
      `${tedxsjecAssetsPrefix}/performers/Agasthyam1.avif`,
      `${tedxsjecAssetsPrefix}/performers/Agasthyam2.avif`,
      `${tedxsjecAssetsPrefix}/performers/Agasthyam3.avif`,
    ],
  },
  {
    name: "Munita Veigas Rao",
    profession: "Singer | Songwriter | Performer | Vocal Trainer",
    description:
      'Munita Veigas Rao, fondly known as the "Nightingale of Mangalore," is an award-winning singer, songwriter, and vocal trainer celebrated for her dynamic performances across Konkani, regional, and Western music. Having been recently awarded the Dakshina Kannada District Rajyotsava Award in November 2024, Munita has a career spanning over two decades with more than 500 stage performances worldwide. As the founder of her music school, "Musically by Munita," she dedicates her time to nurturing new talent. Her exceptional vocal skills and commitment to music have made her a cherished figure in the community.',
    images: [
      `${tedxsjecAssetsPrefix}/performers/Munita1.avif`,
      `${tedxsjecAssetsPrefix}/performers/cropped-Munita2.avif`,
    ],
  },
  {
    name: "Harman Preet Singh",
    profession: "Comedian",
    description:
      "Harman Preet Singh, a stand-up comedian, ticks every box of the Punjabi stereotype at first sight and then leaves you second-guessing. His comedic observations and ride-the-wave style of portraying himself are a joy to watch. He is an active performer at The Underground Comedy Club Bengaluru, performing with other prominent names in the stand-up space. Beyond comedy, he is the founder of HAK Ventures Private Limited, a company that deals with the curation of events and artist management.",
    images: [
      `${tedxsjecAssetsPrefix}/performers/Harman3.avif`,
      `${tedxsjecAssetsPrefix}/performers/Harman4 .avif`,
    ],
  },
];
export const prevEdition22: PreviousEdition[] = [
  {
    id: 1,
    img: `${tedxsjecAssetsPrefix}/prev/2022/image1.webp`,
  },
  {
    id: 2,
    img: `${tedxsjecAssetsPrefix}/prev/2022/image2.webp`,
  },
  {
    id: 3,
    img: `${tedxsjecAssetsPrefix}/prev/2022/image3.webp`,
  },
  {
    id: 4,
    img: `${tedxsjecAssetsPrefix}/prev/2022/image4.webp`,
  },
  {
    id: 5,
    img: `${tedxsjecAssetsPrefix}/prev/2022/image5.webp`,
  },
  {
    id: 6,
    img: `${tedxsjecAssetsPrefix}/prev/2022/image6.webp`,
  },
  {
    id: 7,
    img: `${tedxsjecAssetsPrefix}/prev/2022/image7.webp`,
  },
];

export const prevEdition20: PreviousEdition[] = [
  {
    id: 1,
    img: `${tedxsjecAssetsPrefix}/prev/2020/image1.webp`,
  },
  {
    id: 2,
    img: `${tedxsjecAssetsPrefix}/prev/2020/image2.webp`,
  },
  {
    id: 3,
    img: `${tedxsjecAssetsPrefix}/prev/2020/image3.webp`,
  },
  {
    id: 4,
    img: `${tedxsjecAssetsPrefix}/prev/2020/image4.webp`,
  },
  {
    id: 5,
    img: `${tedxsjecAssetsPrefix}/prev/2020/image5.webp`,
  },
  {
    id: 6,
    img: `${tedxsjecAssetsPrefix}/prev/2020/image6.webp`,
  },
  {
    id: 7,
    img: `${tedxsjecAssetsPrefix}/prev/2020/image7.webp`,
  },
];
