"use client";
import UnsplashGrid from "@/components/common/gridsplash";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Previous = (props: Props) => {
  const router = useRouter();
  return (
    <div className="my-24 mx-auto w-fit px-4">
      <div className="flex items-center justify-start w-min lg:px-20 px-4 mb-4">
        <button
          className="text-red-600 hover:text-red-800 flex items-center space-x-2"
          onClick={() => router.back()}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back</span>
        </button>
      </div>
      <h1 className="text-center text-6xl font-black">2022 Edition</h1>
      <UnsplashGrid year={2022} />
      <h1 className="text-center text-6xl font-black">2020 Edition</h1>
      <UnsplashGrid year={2020} />
    </div>
  );
};

export default Previous;
