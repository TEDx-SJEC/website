import React from "react";

type Member = {
  title: string;
  name: string;
  id: number;
  url: string;
};

type Props = {
  members: Member[];
};

const TeamCard: React.FC<Props> = ({ members }) => {
  return (
    <>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3  gap-x-14 gap-y-8 items-center justify-items-center md:px-8 md:pl-16 w-full">
        {members.map(({ name, title, url }) => (
          <div
            key={url}
            className="relative rounded-2xl md:h-[230px] md:w-[350px] h-[250px] w-[250px] my-4 bg-cover text-center flex content-center items-end bg-center bg-no-repeat text-white saturate-0 hover:saturate-100 group transition-all ease-in-out duration-500 hover:bg-scale-105"
            style={{ backgroundImage: `url(${url})`, backgroundSize: "100%" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundSize = "105%")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundSize = "100%")
            }
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-redTheme from-15% via-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-2xl"></div>

            <div className="relative w-full py-6 bg-gradient-to-t from-blackTheme group-hover:from rounded-2xl transition duration-500">
              <h1 className="md:text-2xl text-lg font-black">{name}</h1>
              <h2 className="font-bold">{title}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamCard;
