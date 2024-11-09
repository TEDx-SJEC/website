import React from "react";
import Image from "next/image";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Landing_page = () => {
  useGSAP(() => {
    const t2 = gsap.timeline({
      onComplete: () => {
        gsap.set(".menu-g", { zIndex: -1, pointerEvents: "none" });
      },
    });
    t2.to(".menu-logo1", { opacity: 0, x: "100%", duration: 0.3 }, "<").to(
      ".menu-g span",
      {
        duration: 0.5,
        x: "100%",
        stagger: 0.1,
        ease: "Expo.easeInOut",
      },
      "<",
    );
  }, []);
  return (
    <>
      <div className="menu-g h-[100vh] w-[100vw] z-[999] absolute left-0 top-0 flex flex-col justify-center items-center">
        <span className="bg-white block w-full h-[34%] z-[1]"></span>
        <span className="bg-white block w-full h-[34%] z-[1]"></span>
        <span className="bg-white block w-full h-[34%] z-[1]"></span>

        <div className="absolute top-0 left-0 right-0 bottom-0 z-[2] flex justify-center items-center">
          <div className="menu-logo1">
            <Image
              src={`${tedxsjecAssetsPrefix}/logo/blackLogo.webp`}
              height={500}
              width={500}
              alt="logo"
              priority={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing_page;
