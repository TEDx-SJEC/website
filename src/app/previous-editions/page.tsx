import UnsplashGrid from "@/components/common/gridsplash";
import React from "react";

type Props = {};

const previous = (props: Props) => {
  return (
    <div className="my-24">
      <h1 className="text-center text-6xl font-black">2022 Edition</h1>
      <UnsplashGrid year={2022} />
      <h1 className="text-center text-6xl font-black">2020 Edition</h1>
      <UnsplashGrid year={2020} />
    </div>
  );
};

export default previous;
