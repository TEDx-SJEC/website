"use client";

import { motion } from "framer-motion";

export default function ScrollingBanner() {
  const sentence = "   Registrations closed   •   ";
  const repeatCount = 20; // Increase this number to add more repetitions

  return (
    <div className="bg-redTheme h-fit text-whiteTheme   overflow-hidden py-2">
      <motion.div
        className="whitespace-nowrap inline-block"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 15, // Reduced from 20 to 15 to speed up the animation
            ease: "linear",
          },
        }}
      >
        <span className="text-lg font-semibold px-4">
          {sentence.repeat(repeatCount)}
        </span>
      </motion.div>
    </div>
  );
}
