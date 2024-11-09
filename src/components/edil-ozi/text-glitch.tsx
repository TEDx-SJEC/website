"use client";
import { FC } from "react";
import { cn } from "@/lib/utils";

interface Props {
  textOne: string;
  textTwo: string;
  className?: string;
}

const TextGlitchEffect: FC<Props> = ({ textOne, textTwo, className }) => {
  return (
    <div
      className={cn(
        "group relative inline-block overflow-hidden leading-tight",
        className,
      )}
    >
      <span className="invisible whitespace-nowrap">{textOne}</span>
      <span className="absolute left-0 top-0 text-blackTheme md:text-blackTheme transition-transform duration-300 ease-in-out group-hover:-translate-y-full whitespace-nowrap">
        {textOne}
      </span>
      <span className="absolute left-0 top-0 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 text-redTheme whitespace-nowrap">
        {textTwo}
      </span>
    </div>
  );
};

export default TextGlitchEffect;
