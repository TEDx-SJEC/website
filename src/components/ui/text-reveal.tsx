"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  // const ref = useRef(null); // Create a reference for the element
  // const isInView = useInView(ref, { once: true }); // Trigger animation once when in view

  // Adjust the transform to make it exit only as it reaches the top of the viewport
  const y = useTransform(scrollYProgress, [0, 0.25], [0, -350]); // Exit moves the heading further up (150px)
  const opacity = useTransform(scrollYProgress, [0.1, 0.25], [2, 0]); // Fade out starts later and ends as it scrolls up

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-[50%]  max-w-8xl justify-center items-start flex-col  bg-transparent py-[1rem]"
        }
      >
        <motion.h1
          className="text-8xl text-start font-extrabold uppercase text-[#ff0000]"
          // ref={ref}
          initial={{ opacity: 1, y: -30 }}
          // animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ y, opacity }} // Bind scroll progress to y and opacity
          // exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
        >
          About
        </motion.h1>

        <p
          ref={targetRef}
          className={
            "flex flex-wrap p-5 w-full text-2xl my-32 font-bold text-black/20 dark:text-white/20 md:p-8 md:text- xl lg:p-10 lg:text-4xl xl:text-6xl "
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
