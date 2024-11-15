"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
export function PreviousEdition() {
  return (
    <div className="flex flex-col overflow-hidden">

      <ContainerScroll
        titleComponent={
          <>
            <h1 className="md:text-8xl text-3xl font-semibold text-whiteTheme">
              Check out the Previous Edition
            </h1>
          </>
        }
      >
        {/* <video width="100%" height="100%" controls preload="none" poster="">
          <source src="/path/to/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/NCWwTsAjiys?si=xBkmPtQEYQl_tEIX"
        ></iframe>
      </ContainerScroll>
    </div>
  );
}
