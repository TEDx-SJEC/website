"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import { speakers } from "@/constants";
import { prevEdition22, prevEdition20 } from "@/constants";

type UnsplashGridProps = {
  year: number;
};

function UnsplashGrid(props: UnsplashGridProps) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {props.year === 2022 ? (
        <div className="flex  justify-center">
          <div className="container mx-auto p-2 sm:p-4 lg:px-20 ">
            <div className="columns-2 md:columns-3  2xl:columns-3 gap-3">
              <>
                <Suspense fallback={<ImagePlaceholder />}>
                  {prevEdition22.map((img, index) => (
                    <ImageItem
                      key={img.id}
                      item={img}
                      index={index}
                      setSelected={setSelected}
                    />
                  ))}
                </Suspense>
              </>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="container mx-auto p-2 sm:p-4 lg:px-20 ">
            <div className="columns-2 md:columns-3 2xl:columns-3 gap-3">
              <>
                <Suspense fallback={<ImagePlaceholder />}>
                  {prevEdition20.map((img, index) => (
                    <ImageItem
                      key={img.id}
                      item={img}
                      index={index}
                      setSelected={setSelected}
                    />
                  ))}
                </Suspense>
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface PreviousEdition {
  id: number;
  img: string;
}

interface ImageItemProps {
  item: PreviousEdition;
  index: number | string;
  setSelected: any;
}

const ImagePlaceholder: React.FC = () => (
  <div role="status" className="animate-pulse flex items-center justify-center mb-3 w-full h-full bg-gray-300 rounded-2xl dark:bg-gray-700">
    <svg className="w-10 h-56 md:h-72   text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

function ImageItem({ item, index, setSelected }: ImageItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }); // 2-second delay
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <ImagePlaceholder />;
  }

  return (
    <motion.figure
      initial="hidden"
      animate={isInView && "visible"}
      ref={ref}
      className="inline-block group w-full rounded-md relative dark:bg-black bg-white cursor-pointer"
      onClick={() => setSelected(item)}
    >
      <Image
        // layoutId={`card-${item.id}`}
        // whileHover={{ scale: 1.025 }}
        src={item.img}
        className="w-full bg-base-100 rounded-md shadow-xl image-full cursor-pointer hover:scale-105 transition-transform"
        alt={""}
        height={300}
        width={400}
        priority
        loading="eager"
        // quality={90}
      />
    </motion.figure>
  );
}

interface ModalProps {
  selected: PreviousEdition | null;
  setSelected: any;
}

function Modal({ selected, setSelected }: ModalProps) {
  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.2 },
    },
    exit: { opacity: 0, y: 20 },
  };

  useEffect(() => {
    if (selected) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer overflow-y-scroll"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            layoutId={`card-${selected.id}`}
            className="w-full max-w-[1000px] relative mx-auto my-24 cursor-default dark:bg-[#202020] bg-[#ebebeb]"
          >
            <button
              className="absolute top-2 right-2 p-2"
              onClick={() => setSelected(null)}
            >
              <X />
            </button>
            <motion.div className="p-2 h-[70vh] rounded-md">
              <Image
                width={400}
                height={400}
                alt="Speaker"
                src={selected.img}
                className="w-full h-full object-contain rounded-md dark:bg-black bg-white"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white dark:bg-black text-white p-4 rounded-md px-8"
            >
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold mb-2"
              >
                {/* {selected.name} */}
              </motion.h3>
              <motion.p variants={itemVariants} className="my-4">
                {/* {selected.description} */}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UnsplashGrid;
