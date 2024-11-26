"use client";
import React, { useEffect, useRef, useState } from "react";
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
        <div className="flex justify-center">
          <div className="container mx-auto p-2 sm:p-4 lg:px-20 ">
            <div className="columns-2 md:columns-3 2xl:columns-3 gap-3">
              <>
                {prevEdition22.map((img, index) => (
                  <ImageItem
                    key={img.id}
                    item={img}
                    index={index}
                    setSelected={setSelected}
                  />
                ))}
              </>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="container mx-auto p-2 sm:p-4 lg:px-20 ">
            <div className="columns-2 md:columns-3 2xl:columns-3 gap-3">
            <>
                {prevEdition20.map((img, index) => (
                  <ImageItem
                    key={img.id}
                    item={img}
                    index={index}
                    setSelected={setSelected}
                  />
                ))}
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

function ImageItem({ item, index, setSelected }: ImageItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.figure
      initial="hidden"
      animate={isInView && "visible"}
      ref={ref}
      className="inline-block group w-full rounded-md relative dark:bg-black bg-white cursor-pointer"
      onClick={() => setSelected(item)}
    >
      <motion.img
        layoutId={`card-${item.id}`}
        whileHover={{ scale: 1.025 }}
        src={item.img}
        className="w-full bg-base-100 rounded-md shadow-xl image-full cursor-pointer"
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
