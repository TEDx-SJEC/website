"use client";
import { FC } from "react";

interface Props {
  text: string;
}

const TextGlitch: FC<Props> = ({ text }) => {
  text;
  return (
    <div className="group relative inline-block overflow-hidden">
      <span className="invisible">Text Glitch Effect</span>
      <span className="absolute left-0 top-0 text-white transition duration-300 ease-in-out group-hover:-translate-y-full ">
        {text}
      </span>
      <span className="absolute left-0 top-0 translate-y-full  transition duration-300 ease-in-out group-hover:translate-y-0 text-red-600">
        tedxsjec
      </span>
    </div>
  );
};

export default TextGlitch;
