"use client";
import UnsplashGrid from "@/components/common/gridsplash";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Previous = (props: Props) => {
  const router = useRouter();
  return (
    <div className="mx-auto w-full ">
      <div
        className="h-[60vh] flex flex-col text-center bg-gradient-to-b from-redTheme/60 py-8"
        // style={{
        //   borderBottomLeftRadius: "100% 60%",
        //   borderBottomRightRadius: "100% 60%",
        // }}
      >
        <div className="flex items-center justify-start w-min lg:px-20 px-4 mb-4">
          <button
            className="text-white font-semibold hover:text-slate-300 transition-all flex items-center space-x-2"
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
        <div className="my-auto">
          {/* <h1 className="text-center xl:text-7xl text-3xl font-black py-5 text-redTheme">
            Looking back at TEDxSJEC
          </h1>
          <p className="xl:w-1/3 xl:text-2xl font-semibold text-neutral-300 mx-auto ">
            Revisit TEDxSJEC 2020 and 2022, where inspiring stories and
            transformative ideas left a lasting impact.
          </p> */}
          <h2 className="sm:text-6xl text-3xl md:text-[80px] font-black text-whiteTheme mb-4 md:mb-6 leading-tight">
            Looking back at TED<sup>x</sup>
            <span className="pl-1 font-semibold">SJEC</span>
          </h2>
          <p className="text-base xl:w-1/2 mx-auto md:text-3xl leading-relaxed mb-4 md:mb-6 text-gray-300">
            Revisit TED<sup>x</sup>
            <span className="pl-1">SJEC</span> 2020 and 2022, where inspiring
            stories and transformative ideas left a lasting impact.
          </p>
        </div>
      </div>
      <h1 className="text-center xl:text-6xl text-2xl my-5 font-black">
        2022 Edition
      </h1>
      <UnsplashGrid year={2022} />
      <h1 className="text-center xl:text-6xl text-2xl my-5 mt-40 font-black">
        2020 Edition
      </h1>
      <UnsplashGrid year={2020} />
    </div>
  );
};

export default Previous;
