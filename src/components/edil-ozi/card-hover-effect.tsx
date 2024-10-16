import { FC, useState } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface Props {
  members: { title: string; name: string; id: number; url: string }[];
  wrapperClasses?: string;
  itemClasses?: string;
}

const Index: FC<Props> = ({ members, itemClasses, wrapperClasses }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid lg:grid-cols-4 sm:grid-cols-2 space-x-4 min-h-fit",
        itemClasses
      )}
    >
      {members.map(({ name, title, url }, idx) => (
        <div
          key={idx}
          className={cn(
            "relative flex flex-col h-fit max-h-min items-center gap-3 p-4",
            itemClasses
          )}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <AnimatePresence>
            {hoveredIdx === idx && (
              <motion.span
                className={cn(
                  "absolute inset-0 z-0 block h-full w-full  bg-redTheme bg-opacity-80",
                  wrapperClasses
                )}
                layoutId="cardHoverEffect"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.8,
                  transition: { duration: 0.1 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.1, delay: 0.2 },
                }}
              >
                {/* <Image
                  src={
                    "https://tedx-sjec.github.io/website-assets/logo/ActualLogo.PNG"
                  }
                  alt="logo"
                  height={70}
                  width={70}
                  className="fixed px-4 right-0 items-center"
                /> */}
              </motion.span>
            )}
          </AnimatePresence>
          <div className="z-[1] w-fit h-min space-y-2 flex flex-col md:items-start items-center">
            <Image
              src={url}
              alt={name}
              height={250}
              width={250}
              className="object-cover w-fit md:h-fit h-1/2"
            />
            <h1 className="font-black text-xl text-blackTheme">{name}</h1>
            <p className="text-blackTheme ">{title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Index;
